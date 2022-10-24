import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const ButtonControllers = () => {
    return (
        <>
            <Button
                fullWidth
                variant='outlined'
                component={Link}
                to='/addEvent'
                sx={{marginBottom: '10px'}}
            >
                Add event
            </Button>
            <Button
                fullWidth
                variant='outlined'
                component={Link}
                to='/inviteFriend'
                sx={{marginBottom: '10px'}}
            >
                Invite friend
            </Button>
            <Button
                fullWidth
                variant='outlined'
                component={Link}
                to='/viewInvites'
                sx={{marginBottom: '10px'}}
            >
                View invited friends
            </Button>
        </>
    );
};

export default ButtonControllers;