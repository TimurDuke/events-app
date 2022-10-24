import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Grid} from "@mui/material";
import {deleteEventRequest, getEventsRequest} from "../../store/actions/eventsActions";
import Event from "../../components/Event/Event";
import ButtonControllers from "../../components/ButtonControllers/ButtonControllers";

const Main = () => {
    const dispatch = useDispatch();

    const events = useSelector(state => state.events.events);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(getEventsRequest());
    }, [dispatch]);

    const deleteEventHandler = async eventId => {
        await dispatch(deleteEventRequest(eventId));
        await dispatch(getEventsRequest());
    };

    if (!user) {
        return <Redirect to='/login'/>;
    }

    return (
        <>
            <Grid container spacing={2}>
                {!!events.length
                    ? <Grid item xs={9}>
                        {events.map(event => {
                            if (!!user?.inviters.filter(user => user.id === event.author).length || user['_id'] === event.author) {
                                return <Event
                                    key={event['_id']}
                                    user={user}
                                    authorId={event.author}
                                    title={event.title}
                                    date={event.date}
                                    leadTime={event.leadTime}
                                    deleteHandler={() => deleteEventHandler(event['_id'])}
                                />;
                            } else {
                                return null;
                            }
                        })}
                    </Grid>
                    : null
                }
                <Grid item xs={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <ButtonControllers/>
                </Grid>
            </Grid>
        </>
    );
};

export default Main;