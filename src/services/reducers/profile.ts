import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LOGIN_URL,
  REGISTER_URL,
  RESTORE_URL,
  RESET_URL,
  USER_URL,
  LOGOUT_URL,
} from "../../consts";
import { fetchRequestJSON, fetchWithRefresh } from "../../utils/api.ts";
import setTokens from "../../utils/setTokens.ts";
import { TUser, TValues } from "../../utils/types.ts";

type TBodyForms = TValues<string, unknown>;

type TResponse = {
  success?: boolean,
  user: Omit<TUser, 'password'>,
}

type TResponseWithTokens = TResponse & {
  accessToken: string,
  refreshToken: string
}

type TResponseProfile = TResponse | TResponseWithTokens;

export type TProfileState = {
  user: Partial<Omit<TUser, "password">>;
  error: string | null;
  loading: boolean;
  isAuthChecked: boolean;
};

const REGEXP_URLS = [
  LOGIN_URL,
  REGISTER_URL,
  RESTORE_URL,
  RESET_URL,
  USER_URL,
].join(" | ");

const fetchProfileRequest = (url: string) =>
  createAsyncThunk<
    TResponseProfile,
    TBodyForms | { token: string },
    { rejectValue: unknown }
  >(url, async (body, { rejectWithValue }) => {
    try {
      const result = await fetchRequestJSON<TResponseProfile>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });
      return result;
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message);
    }
  });

export const fetchLogin = (body: TBodyForms) =>
  fetchProfileRequest(LOGIN_URL)(body);
export const fetchRegister = (body: TBodyForms) =>
  fetchProfileRequest(REGISTER_URL)(body);
export const fetchRestore = (body: TBodyForms) =>
  fetchProfileRequest(RESTORE_URL)(body);
export const fetchReset = (body: TBodyForms) =>
  fetchProfileRequest(RESET_URL)(body);
export const fetchLogout = (body: { token: string }) =>
  fetchProfileRequest(LOGOUT_URL)(body);

export const getUserDetails = createAsyncThunk<TResponse | void, unknown, {rejectValue: unknown}>(USER_URL, async () =>
  fetchWithRefresh<TResponse>(USER_URL, {
    method: "GET",
  }).catch((e: Error) => {
    console.log(e.message);
  }),
);
export const patchUserDetails = createAsyncThunk<{success?: boolean} | void, TBodyForms, {rejectValue: unknown}>(USER_URL, async (body) =>
  fetchWithRefresh<{success?: boolean}>(USER_URL, {
    method: "PATCH",
    body: JSON.stringify(body),
  }).catch((e: Error) => {
    console.log(e.message);
  }),
);

const initialProfileState: TProfileState = {
  user: {},
  error: null,
  loading: false,
  isAuthChecked: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    resetProfile(state) {
      state.user = initialProfileState.user;
      state.error = initialProfileState.error;
      state.loading = initialProfileState.loading;
      state.isAuthChecked = initialProfileState.isAuthChecked;

      localStorage.clear();
    },
    resetProfileError(state) {
      state.error = initialProfileState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(`${LOGIN_URL}/fulfilled`, (state, action: PayloadAction<TResponseWithTokens>) => {
      if (action.payload?.success) {
        setTokens(action.payload);
        state.user = action.payload.user;
      }
    });
    builder.addCase(`${REGISTER_URL}/fulfilled`, (state, action: PayloadAction<TResponseWithTokens>) => {
      if (action.payload?.success) {
        setTokens(action.payload);
        state.user = action.payload.user;
      }
    });
    builder.addCase(`${RESET_URL}/fulfilled`, (state) => {
      profileSlice.actions.resetProfile(state);
    });
    builder.addCase(getUserDetails.pending, (state) => {
      // GET and PATCH
      state.isAuthChecked = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      if (action?.payload?.success) {
        state.user = { ...action.payload.user };
      }
    });
    builder.addMatcher(
      (action) => action.type.match(new RegExp(`[${REGEXP_URLS}]/fulfilled`)),
      (state) => {
        state.loading = false;
      },
    );
    builder
      .addMatcher(
        (action) => action.type.match(new RegExp(`[${REGEXP_URLS}]/pending`)),
        (state) => {
          state.error = initialProfileState.error;
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => action.type.match(new RegExp(`[${REGEXP_URLS}]/rejected`)),
        (state, action: PayloadAction<{ success?: boolean, payload?: string}>) => {
          if (!action?.payload?.success) {
            state.error = String(action.payload);
            state.loading = false;
          }
        },
      );
  },
});

export const { resetProfile, resetProfileError } = profileSlice.actions;

export default profileSlice.reducer;
