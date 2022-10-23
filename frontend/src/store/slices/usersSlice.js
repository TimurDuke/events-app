import {createSlice} from "@reduxjs/toolkit";

const name = 'user';

export const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        registerUserRequest(state) {
            state.registerLoading = true;
        },
        registerUserSuccess(state, {payload: user}) {
            state.registerLoading = false;
            state.user = user;
        },
        registerUserFailure(state, {payload: error}) {
            state.registerLoading = false;
            state.registerError = error;
        },
        clearRegisterErrors(state) {
            state.registerError = null;
        },
        loginUserRequest(state) {
            state.loginLoading = true;
        },
        loginUserSuccess(state, {payload: user}) {
            state.loginLoading = false;
            state.user = user;
        },
        loginUserFailure(state, {payload: error}) {
            state.loginLoading = false;
            state.loginError = error;
        },
        clearLoginErrors(state) {
            state.loginError = null;
        },
        facebookLoginRequest(state) {
            state.loginLoading = true;
        },
        logoutUserRequest (state) {
            state.user = null;
        },
    }
});

export default usersSlice;