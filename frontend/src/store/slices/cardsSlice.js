import {createSlice} from "@reduxjs/toolkit";

const name = 'cards';

export const initialState = {
    cards: null,
    card: null,
    fetchLoading: false,
    fetchError: null,

    token: null,
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
        fetchCardRequest(state) {
            state.fetchLoading = true;
            state.fetchError = null;
        },
        fetchCardSuccess(state, { payload: card }) {
            state.fetchLoading = false;
            state.card = card;
        },
        fetchCardFailure(state, { payload: error }) {
            state.fetchLoading = false;
            state.fetchError = error;
        },
        generateTokenRequest(state) {
            state.generateLoading = true;
            state.generateError = null;
        },
        generateTokenSuccess(state, {payload: token}) {
            state.generateLoading = false;
            state.token = token;
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
        },
        deleteCardRequest(state) {
            state.createLoading = true;
            state.createError = null;
        },
        deleteCardSuccess(state) {
            state.createLoading = false;
        },
        deleteCardFailure(state, {payload: error}) {
            state.createLoading = false;
            state.createError = error;
        },
        publishCardRequest(state) {
            state.createLoading = true;
            state.createError = null;
        },
        publishCardSuccess(state) {
            state.createLoading = false;
        },
        publishCardFailure(state, {payload: error}) {
            state.createLoading = false;
            state.createError = error;
        },
    }
});

export default cardsSlice;