import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LOGIN_URL,
  REGISTER_URL,
  RESTORE_URL,
  RESET_URL,
  USER_URL,
  LOGOUT_URL,
} from "../../consts";
import { fetchRequestJSON, fetchWithRefresh } from "../../utils/api";
import setTokens from "../../utils/setTokens";

const REGEXP_URLS = [
  LOGIN_URL,
  REGISTER_URL,
  RESTORE_URL,
  RESET_URL,
  USER_URL,
].join(" | ");

const fetchProfileRequest = (url) =>
  createAsyncThunk(url, async (body, { rejectWithValue }) => {
    try {
      const result = await fetchRequestJSON(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  });

export const fetchLogin = (body) => fetchProfileRequest(LOGIN_URL)(body);
export const fetchRegister = (body) => fetchProfileRequest(REGISTER_URL)(body);
export const fetchRestore = (body) => fetchProfileRequest(RESTORE_URL)(body);
export const fetchReset = (body) => fetchProfileRequest(RESET_URL)(body);
export const fetchLogout = (body) => fetchProfileRequest(LOGOUT_URL)(body);

export const getUserDetails = createAsyncThunk(USER_URL, async () =>
  fetchWithRefresh(USER_URL, {
    method: "GET",
  }).catch((e) => {
    console.log(e.message);
  }),
);
export const patchUserDetails = createAsyncThunk(USER_URL, async (body) =>
  fetchWithRefresh(USER_URL, {
    method: "PATCH",
    body: JSON.stringify(body),
  }).catch((e) => {
    console.log(e.message);
  }),
);

const initialProfileState = {
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
    builder.addCase(`${LOGIN_URL}/fulfilled`, (state, action) => {
      if (action.payload.success) {
        setTokens(action.payload);
        state.user = action.payload.user;
      }
    });
    builder.addCase(`${REGISTER_URL}/fulfilled`, (state, action) => {
      if (action.payload.success && action.payload.user) {
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
        (state, action) => {
          if (!action?.payload?.success) {
            state.error = action.payload;
            state.loading = false;
          }
        },
      );
  },
});

export const { resetProfile, resetProfileError } = profileSlice.actions;

export const ProfileSelector = (state) => state.profile;

export default profileSlice.reducer;
