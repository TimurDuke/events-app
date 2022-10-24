import React, {useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/Form/FormElement/FormElement";
import {postEventRequest} from "../../store/actions/eventsActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputLead: {
        "& .MuiOutlinedInput-root": {
            paddingRight: '0',
            '& fieldset': {
                borderTopColor: '#fff',
            },
            '&:hover fieldset': {
                borderTopColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderTopColor: '#fff',
            },
        },
        "& .MuiInputLabel-root": {
            paddingLeft: '35px'
        }
    },
    inputDate: {
        "& .MuiOutlinedInput-root": {
            paddingRight: '0',
            '& fieldset': {
                borderTopColor: '#fff',
            },
            '&:hover fieldset': {
                borderTopColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderTopColor: '#fff',
            },
        },
        "& .MuiInputLabel-root": {
            paddingLeft: '85px'
        }
    }
}));

const AddEventForm = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    const error = useSelector(state => state.events.postEventError);

    const [eventData, setEventDate] = useState({
        title: '',
        leadTime: '',
        date: ''
    });

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(postEventRequest({...eventData}));
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setEventDate(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="sm">
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    Add event
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        name='title'
                        label='Title'
                        required={true}
                        onChange={inputChangeHandler}
                        value={eventData.title}
                        error={getFieldError('title')}
                    />

                    <FormElement
                        styles={classes.inputLead}
                        name='leadTime'
                        label='Lead Time'
                        required={true}
                        onChange={inputChangeHandler}
                        type='time'
                        value={eventData.leadTime}
                        error={getFieldError('leadTime')}
                    />

                    <FormElement
                        styles={classes.inputDate}
                        name='date'
                        label='Date'
                        type='date'
                        required={true}
                        onChange={inputChangeHandler}
                        value={eventData.date}
                        error={getFieldError('date')}
                    />

                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            variant='outlined'
                            type='submit'
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>

            </div>
        </Container>
    );
};

export default AddEventForm;