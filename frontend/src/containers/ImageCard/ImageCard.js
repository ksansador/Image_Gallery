import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {fetchCardRequest} from "../../store/actions/cardsActions";
import {Box, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {apiUrl} from "../../config";

const ImageCard = () => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.cards.card);

    const query = useLocation().search;


    useEffect(() => {
        dispatch(fetchCardRequest(query));
    }, [dispatch, query]);

    return (
        <Grid container justifyContent={'center'}>
            {card &&
                <Card>
                    <CardMedia
                        component="img"
                        sx={{ width: 350 }}
                        image={ apiUrl + '/' + card.image}
                        alt={card.title}
                    />
                    <Box sx={{marginLeft: '3rem'}}>
                        <CardContent>
                            <Typography variant="h4">
                                {card.title}
                            </Typography>
                            <Typography variant="h5">
                                by {card.user.displayName}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            }
        </Grid>

    );
};

export default ImageCard;