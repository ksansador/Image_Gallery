import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button, Grid} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import {createCardRequest} from "../../store/actions/cardsActions";

const NewCard = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const error = useSelector(state => state.cards.createError);

    const [state, setState] = useState({
        title: '',
        image: '',
    });

    if(!user) {
        return <Redirect to={'/login'}/>
    }

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(state).forEach(key => {
            formData.append(key, state[key] );
        });

        dispatch(createCardRequest(formData));
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >
                <FormElement
                    label="Title"
                    onChange={inputChangeHandler}
                    value={state.title}
                    name="title"
                    required
                    error={getFieldError('title')}
                />
                <Grid item>
                    <FileInput
                        label="Image"
                        name="image"
                        required
                        onChange={fileChangeHandler}
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
            
        </form>
    );
};

export default NewCard;