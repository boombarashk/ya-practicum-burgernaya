import { LOGIN_URL, REGISTER_URL, USER_URL } from "../../../consts";
import profileReducer, {
  initialProfileState,
  resetProfile,
  resetProfileError,
} from "../profile";

const mockUser = { email: "test@test.com", name: "username" };
const mockResponseSuccess = {
  success: true,
  user: mockUser,
  accessToken: "Bearer ...",
  refreshToken: "",
};
const mockProfileState = {
  ...initialProfileState,
  user: mockUser,
};

describe("profile reducer", () => {
  it("should return the initial state", () => {
    expect(profileReducer(undefined, { type: "" })).toEqual(
      initialProfileState,
    );
  });

  it("should reset state", () => {
    expect(
      profileReducer(mockProfileState, { type: resetProfile.type }),
    ).toEqual(initialProfileState);
  });

  it("should reset error", () => {
    expect(
      profileReducer(
        { ...initialProfileState, error: "error" },
        { type: resetProfileError.type },
      ),
    ).toEqual(initialProfileState);
  });

  it("login success", async () => {
    expect(
      profileReducer(undefined, {
        type: `${LOGIN_URL}/fulfilled`,
        payload: mockResponseSuccess,
      }),
    ).toEqual(mockProfileState);
  });

  it("register success", async () => {
    expect(
      profileReducer(undefined, {
        type: `${REGISTER_URL}/fulfilled`,
        payload: mockResponseSuccess,
      }),
    ).toEqual(mockProfileState);
  });

  it("should set pending params", () => {
    expect(profileReducer(undefined, { type: `${USER_URL}/pending` })).toEqual({
      ...initialProfileState,
      loading: true,
      isAuthChecked: true,
    });
  });

  it("should set user", () => {
    expect(
      profileReducer(undefined, {
        type: `${USER_URL}/fulfilled`,
        payload: { success: true, user: mockUser },
      }).user,
    ).toEqual(mockUser);
  });

  it("should set error", () => {
    expect(
      profileReducer(undefined, { type: `${USER_URL}/rejected` }).error,
    ).not.toBeNull();
  });
});
