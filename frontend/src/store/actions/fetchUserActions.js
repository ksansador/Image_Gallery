import fetchUserSlice from "../slices/fetchUserSlice";

export const {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
} = fetchUserSlice.actions;