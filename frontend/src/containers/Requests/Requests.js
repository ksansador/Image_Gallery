import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {fetchCardsRequest, publishCardRequest} from "../../store/actions/cardsActions";
import {Box, Button, Grid} from "@mui/material";
import CardItem from "../../components/CardItem/CardItem";

const Requests = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.cards.fetchLoading);
    const user = useSelector(state => state.users.user);
    const cards = useSelector(state => state.cards.cards);

    useEffect(() => {
        dispatch(fetchCardsRequest(''));
    }, [dispatch]);

    if(!user || user.role !== 'admin') {
        return <Redirect to={'/login'}/>
    }


    const onPublish = async id => {
        console.log(id);
        await  dispatch(publishCardRequest(id));
    };


    return (
        <Grid container spacing={3}>
            {loading? <Box sx={{textAlign: 'center', margin: '10% auto'}}>Loading....</Box>
            :
                cards && cards.map(card => (
                    card.publish === false &&
                        <CardItem
                            key={card._id}
                            author={card.user.displayName}
                            image={card.image}
                            title={card.title}
                            userId={card.user._id}
                            token={card.token}
                            publish={card.publish}
                            id={card._id}>
                            <Button onClick={() => onPublish(card._id)}> Publish</Button>
                        </CardItem>
                ))
            }
        </Grid>
    );
};

export default Requests;