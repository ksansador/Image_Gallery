import cardsSlice from "../slices/cardsSlice";

export const {
    fetchCardsRequest,
    fetchCardsSuccess,
    fetchCardsFailure,

    generateTokenRequest,
    generateTokenSuccess,
    generateTokenFailure,

} = cardsSlice.actions;