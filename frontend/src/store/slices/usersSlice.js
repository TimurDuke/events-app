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
        }
    }
});

export default usersSlice;