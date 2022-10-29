import {createSlice} from "@reduxjs/toolkit";

const name = 'cards';

export const initialState = {
    cards: null,
    fetchLoading: false,
    fetchError: null,
};

const cardsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchCardsRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchCardsSuccess(state, {payload: cards}) {
            state.fetchLoading = false;
            state.cards = cards;
        },
        fetchCardsFailure(state, {payload: error}) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
    }
});

export default cardsSlice;