import usersSlice from "../slices/usersSlice";

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    clearRegisterErrors
} = usersSlice.actions;