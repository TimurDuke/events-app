import React from 'react';
import PropTypes from "prop-types";

const Event = ({user, authorId, title, date, leadTime, deleteHandler}) => {
    return (
        <div>
            <b>{title}</b>
            <span>{date}</span>
            <span>{leadTime}</span>
            {user?._id === authorId ? <button onClick={deleteHandler}>Delete</button> : null}
        </div>
    );
};

Event.propTypes = {
    user: PropTypes.object.isRequired,
    authorId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    leadTime: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func
};

export default Event;