import {createSlice} from "@reduxjs/toolkit";

const name = 'cards';

export const initialState = {
    cards: null,
    fetchLoading: false,
    fetchError: null,

    card: null,
    generateLoading: false,
    generateError: null,

    createLoading: false,
    createError: null,
};

const cardsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchCardsRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchCardsSuccess(state, { payload: cards }) {
            state.fetchLoading = false;
            state.cards = cards;
        },
        fetchCardsFailure(state, { payload: error }) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        generateTokenRequest(state) {
            state.generateLoading = true;
            state.generateError = null;
        },
        generateTokenSuccess(state, { payload: card }) {
            state.generateLoading = false;
            state.card = card;
        },
        generateTokenFailure(state, { payload: error}) {
            state.generateLoading = false;
            state.generateError = error;
        },
        createCardRequest(state) {
            state.createLoading = true;
            state.createError = null;
        },
        createCardSuccess(state) {
            state.createLoading = false;
        },
        createCardFailure(state, {payload: error}) {
            state.createLoading = false;
            state.createError = error;
        }
    }
});

export default cardsSlice;