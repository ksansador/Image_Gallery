import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCardsRequest} from "../../store/actions/cardsActions";
import {Box, Grid, Typography} from "@mui/material";
import CardItem from "../../components/CardItem/CardItem";
import {fetchUserRequest} from "../../store/actions/fetchUserActions";

const UserCard = ({match}) => {
    const dispatch = useDispatch();
    const fetchUser = useSelector(state => state.fetchUser.fetchUser);
    const user = useSelector(state => state.users.user);
    const cards = useSelector(state => state.cards.cards);
    const loading = useSelector(state => state.cards.fetchLoading);

    useEffect(() => {
        dispatch(fetchUserRequest(match.params.id));
        dispatch(fetchCardsRequest('?user=' + match.params.id));
    }, [dispatch, match.params.id]);


    return (
        <div>
            <Grid container spacing={3}>
                {fetchUser &&
                    <Grid item xs={12}>
                        <Typography variant={'h5'}>{fetchUser.displayName}'s gallery</Typography>
                    </Grid>
                }
                {loading?  <Box sx={{textAlign: 'center', margin: '100px auto'}}>Loading...</Box>
                    : ( cards && cards.map(card => {
                        if(card.publish) {
                           return <CardItem
                                key={card._id}
                                author={card.user.displayName}
                                image={card.image}
                                title={card.title}
                                userId={card.user._id}
                            />
                         } else if(card.user._id === (user && user._id)) {
                            return <CardItem
                                key={card._id}
                                author={card.user.displayName}
                                image={card.image}
                                title={card.title}
                                userId={card.user._id}
                            />
                        }
                    }
                ))
                }
            </Grid>
        </div>
    );
};

export default UserCard;