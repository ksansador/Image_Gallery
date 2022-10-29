import React, {useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {apiUrl} from "../../config";
import Modal from "../UI/Modal/Modal";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {generateTokenRequest} from "../../store/actions/cardsActions";

const CardItem = ({author, image, title, userId, token, publish, id}) => {
    const dispatch = useDispatch();
    // const card = useSelector(state => state.cards.card);

    const [shown, setShown] = useState(false);
    const [open, setOpen] = useState('none');

    let cardImage;
    let getButton;
    let genLink;

    if (image) {
        cardImage = apiUrl + '/' + image;
        if(publish === false) {
            if (!isNaN(token)) {
                getButton = <Box>
                    <Button onClick={() => createLink(id)}>Create link</Button>
                </Box>

            } else {
                genLink =
                        <a href={cardImage}> {cardImage}</a>
            }

        }
    }

    const modalHandler = () => {
        setShown(!shown);
    };

    const createLink = async(id) => {
       await dispatch(generateTokenRequest(id));
       genLink = <a href={cardImage}> {cardImage}</a>
    }

    // const disabledOnTrue= () => {
    //     setOpen(!open);
    // };

    return (
        <>
        <Modal show={shown} closed={modalHandler}>
            <Box >
                <img style={{maxHeight: '500px'}}
                     src={`${cardImage}?w=164&h=164&fit=crop&auto=format`}
                     srcSet={`${cardImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x\``}
                     alt={title}
                />
                <Button onClick={modalHandler}>Close</Button>
            </Box>
        </Modal>
            <Grid item xs={3}>
                <Card>
                    {image? <CardMedia
                            title={title}
                            image={cardImage}
                            sx={{paddingTop: '70.25%', height: 0}}
                        />
                        : <ImageNotSupportedIcon fontSize={'large'} sx={{margin: '100px', width: '100px'}}/>
                    }
                    <CardContent>
                        <Typography
                            variant={'h5'}
                            onClick={modalHandler}
                            sx={{cursor: 'pointer', textDecoration: 'underline'}}
                        >
                            {title}
                        </Typography>
                        by <Typography component={Link} to={`/users/${userId}`}>{author} </Typography>
                        {getButton}
                        <Box sx={{display: open}}>{genLink}</Box>
                        {genLink}

                    </CardContent>

                </Card>
            </Grid>
        </>
    );
};

export default CardItem;