import React from 'react';
import PropTypes from "prop-types";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Event = ({user, authorId, title, date, leadTime, deleteHandler}) => (
    <Card sx={{maxWidth: '80%', marginBottom: '20px'}}>
        <CardContent>
            <Typography variant="h5" component="div" sx={{marginBottom: '10px'}}>
                {title}
            </Typography>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography
                    variant="body1"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '10px',
                        padding: '8px 14px',
                        backgroundColor: '#d7d4d4',
                        borderRadius: '10px',
                    }}
                >
                    {new Date(date).toLocaleDateString()}
                    <CalendarMonthIcon sx={{marginLeft: '5px'}}/>
                </Typography>
                <Typography
                    color="text.secondary"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '10px',
                        padding: '6px 12px',
                        backgroundColor: '#e8e5e5',
                        borderRadius: '10px',
                    }}
                >
                    {leadTime}
                    <AccessTimeIcon sx={{marginLeft: '5px'}}/>
                </Typography>
            </div>
        </CardContent>
        {user?._id === authorId
            ? <CardActions>
                <Button
                    color='error'
                    onClick={deleteHandler}
                >
                    Delete
                </Button>
            </CardActions>
            : null}
    </Card>
);

Event.propTypes = {
    user: PropTypes.object.isRequired,
    authorId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    leadTime: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func
};

export default Event;