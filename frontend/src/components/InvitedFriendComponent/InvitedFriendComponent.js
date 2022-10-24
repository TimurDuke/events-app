import React from 'react';
import PropTypes from "prop-types";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const InvitedFriendComponent = ({email, deleteHandler}) => (
    <Card sx={{display: 'flex', justifyContent: 'space-between'}}>
        <CardContent>
            <Typography variant='body'>
                {email}
            </Typography>
        </CardContent>
        <CardActions>
            <Button
                variant='outlined'
                color='error'
                onClick={deleteHandler}
            >
                Delete
            </Button>
        </CardActions>
    </Card>
);

InvitedFriendComponent.propTypes = {
    email: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};

export default InvitedFriendComponent;