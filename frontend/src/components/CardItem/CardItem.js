import React, {useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {apiUrl} from "../../config";
import Modal from "../UI/Modal/Modal";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteCardRequest, fetchCardsRequest, generateTokenRequest} from "../../store/actions/cardsActions";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const CardItem = ({author, image, title, userId, token, publish, id}) => {
    const dispatch = useDispatch();
    const fetchUser = useSelector(state => state.fetchUser.fetchUser);
    const user = useSelector(state => state.users.user);
    const [shown, setShown] = useState(false);

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
                genLink = <Typography sx={{display: 'block' }}
                                      component={Link}
                                      to={'/image/?token=' + token}>
                    <CopyToClipboard text={'localhost:3000/image/?token=' + token}>

                        <span>Share</span>
                    </CopyToClipboard>
                </Typography>
            }

        }
    }

    const modalHandler = () => {
        setShown(!shown);
    };

    const createLink = async(id) => {
       await dispatch(generateTokenRequest(id));
       await dispatch(fetchCardsRequest('?user=' + fetchUser._id));
    }

    const cardDelete = async(id) => {
       await dispatch(deleteCardRequest(id));
       await dispatch(fetchCardsRequest('?user=' + fetchUser._id));
    };

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
                        {genLink}

                        { (user && (user._id === userId) )&&
                            <Box>
                                <Button onClick={() =>  cardDelete(id)}> Delete</Button>
                            </Box>
                        }

                    </CardContent>

                </Card>
            </Grid>
        </>
    );
};

export default CardItem;