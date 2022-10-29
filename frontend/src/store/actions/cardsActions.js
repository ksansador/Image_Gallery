import cardsSlice from "../slices/cardsSlice";

export const {
    fetchCardsRequest,
    fetchCardsSuccess,
    fetchCardsFailure,

    fetchCardRequest,
    fetchCardSuccess,
    fetchCardFailure,

    generateTokenRequest,
    generateTokenSuccess,
    generateTokenFailure,

    createCardRequest,
    createCardSuccess,
    createCardFailure,

    deleteCardRequest,
    deleteCardSuccess,
    deleteCardFailure,

} = cardsSlice.actions;