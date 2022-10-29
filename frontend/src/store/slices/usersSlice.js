import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
    logOutLoading: false,
    logOutError: null,
};
const userSlice = createSlice({
    name,
    initialState,
    reducers: {
        registerRequest(state) {
            state.registerLoading = true;
            state.registerError = null;
        },
        registerSuccess(state, {payload: user}) {
            state.registerLoading = false;
            state.user = user;
        },
        registerFailure(state, action) {
            state.registerLoading = false;
            state.registerError = action.payload;
        },
        loginRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        loginSuccess(state, {payload: user}) {
            state.loginLoading = false;
            state.user = user;
        },
        loginFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        facebookRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        logOutRequest(state) {
            state.logOutLoading= true;
            state.logOutError = null;
        },
        logOutSuccess(state) {
            state.logOutLoading = false;
            state.user = null;
        },
        logOutFailure(state, action) {
            state.logOutLoading = false;
            state.logOutError = action.payload;
        },
        clearErrorUser(state) {
            state.registerError = null;
            state.loginError = null
        },

    }
});
export default userSlice;