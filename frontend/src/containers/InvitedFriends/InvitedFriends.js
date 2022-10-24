import React from 'react';
import {Container, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import InvitedFriendComponent from "../../components/InvitedFriendComponent/InvitedFriendComponent";
import {deleteFriendRequest} from "../../store/actions/usersActions";
import Preloader from "../../components/UI/Preloader/Prealoder";

const InvitedFriends = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);
    const inviteLoading = useSelector(state => state.users.inviteLoading);
    const deleteLoading = useSelector(state => state.users.deleteFriendLoading);

    const deleteFriendHandler = friendId => {
        dispatch(deleteFriendRequest(friendId));
    };

    return (
        <>
            <Preloader
                showPreloader={inviteLoading || deleteLoading}
            />
            <Container maxWidth='sm'>
                {!!user?.invited.length
                    ? user.invited.map(user => (
                        <InvitedFriendComponent
                            key={user.id}
                            deleteHandler={() => deleteFriendHandler(user.id)}
                            email={user.email}
                        />
                    )) : <Typography variant='h4' textAlign='center'>You don't have invited friends.</Typography>}
            </Container>
        </>
    );
};

export default InvitedFriends;