import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid} from "@mui/material";
import {fetchCardsRequest} from "../../store/actions/cardsActions";
import CardItem from "../../components/CardItem/CardItem";

const Cards = () => {
    const dispatch = useDispatch();
    const cards = useSelector(state => state.cards.cards);
    const loading = useSelector(state => state.cards.fetchLoading);

    useEffect(() => {
        dispatch(fetchCardsRequest(''));
    }, [dispatch]);

    return (
        <Grid container spacing={3}>
            {loading?  <Box sx={{textAlign: 'center', margin: '100px auto'}}>Loading...</Box>
                : ( cards && cards.map(card => (
                    card?.publish &&
                      <CardItem
                        key={card._id}
                        author={card.user.displayName}
                        image={card.image}
                        title={card.title}
                        userId={card.user._id}
                        token={card.token}
                        publish={card.publish}
                        id={card._id}
                    />

                )))
            }
        </Grid>
    );
};

export default Cards;