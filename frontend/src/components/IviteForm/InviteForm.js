import React, {useState} from 'react';
import {Button, Container, Grid, Typography} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {inviteFriendRequest} from "../../store/actions/usersActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

const InviteForm = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    const error = useSelector(state => state.users.inviteError);

    const [friendEmail, setFriendEmail] = useState('');

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(inviteFriendRequest({email: friendEmail}));
    };

    const getFieldError = () => {
        try {
            return error.message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="sm">
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    Invite friend
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        name='email'
                        label='Email'
                        required={true}
                        onChange={e => setFriendEmail(e.target.value)}
                        value={friendEmail}
                        error={getFieldError()}
                    />

                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            variant='outlined'
                            type='submit'
                        >
                            Invite
                        </Button>
                    </Grid>
                </Grid>

            </div>
        </Container>
    );
};

export default InviteForm;