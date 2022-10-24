import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getEventsRequest} from "../../store/actions/eventsActions";
import Event from "../../components/Event/Event";
import {Grid} from "@mui/material";

const Main = () => {
    const dispatch = useDispatch();

    const events = useSelector(state => state.events.events);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(getEventsRequest());
    }, [dispatch]);

    if (!user) {
        return <Redirect to='/login' />;
    }

    return (
        <>
            <Grid container spacing={2}>
                {!!events.length
                    ? <Grid item xs={10}>
                        {events.map(event => {
                            if (!!user?.inviters.filter(user => user === event.author).length || user['_id'] === event.author) {
                                return <Event
                                    key={event['_id']}
                                    user={user}
                                    authorId={event.author}
                                    title={event.title}
                                    date={event.date}
                                    leadTime={event.leadTime}
                                />;
                            } else {
                                return null;
                            }
                        })}
                    </Grid>
                    : null
                }
                <Grid item xs={2}>
                    Buttons
                </Grid>
            </Grid>
        </>
    );
};

export default Main;