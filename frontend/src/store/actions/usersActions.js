import usersSlice from "../slices/usersSlice";

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    facebookRequest,
    logOutRequest,
    logOutSuccess,
    logOutFailure,
    clearErrorUser,
} = usersSlice.actions;