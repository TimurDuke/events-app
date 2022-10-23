import usersSlice from "../slices/usersSlice";

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    clearRegisterErrors,
    loginUserRequest,
    loginUserSuccess,
    loginUserFailure,
    clearLoginErrors,
    facebookLoginRequest,
    logoutUserRequest
} = usersSlice.actions;