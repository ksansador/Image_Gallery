import {createSlice} from "@reduxjs/toolkit";

const name = 'fetchUser';

export const initialState = {
    fetchUser: null,
    fetchLoading: false,
    fetchError: null,
};

const fetchUserSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchUserRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchUserSuccess(state, {payload: user}) {
            state.fetchLoading = false;
            state.fetchUser = user;
        },
        fetchUserFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        }
    }
});
export default fetchUserSlice;