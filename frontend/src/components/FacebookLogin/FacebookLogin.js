import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import {facebookAppId} from "../../config";
import {useDispatch} from "react-redux";
import {facebookRequest} from "../../store/actions/usersActions";


const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        dispatch(facebookRequest(response));
    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name,email,picture"
            callback={facebookResponse}
            render={props => (
                <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    startIcon={<FacebookIcon/>}
                    onClick={props.onClick}
                >
                    Enter with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;