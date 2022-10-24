import {createSlice} from "@reduxjs/toolkit";

const name = 'user';

export const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
    inviteLoading: false,
    inviteError: null,
    deleteFriendLoading: false,
    deleteFriendError: null,
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
        logoutUserRequest(state) {
            state.user = null;
        },
        inviteFriendRequest(state) {
            state.inviteLoading = true;
        },
        inviteFriendSuccess(state, {payload: user}) {
            state.inviteLoading = false;
            state.user = user;
        },
        inviteFriendFailure(state, {payload: error}) {
            state.inviteLoading = false;
            state.inviteError = error;
        },
        clearInviteError(state) {
            state.inviteError = null;
        },
        deleteFriendRequest(state) {
            state.deleteFriendLoading = true;
        },
        deleteFriendSuccess(state, {payload: user}) {
            state.deleteFriendLoading = false;
            state.user = user;
        },
        deleteFriendFailure(state, {payload: error}) {
            state.deleteFriendLoading = false;
            state.deleteFriendError = error;
        },
    }
});

export default usersSlice;