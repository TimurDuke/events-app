import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Register from "./containers/Register/Register";
import Main from "./containers/Main/Main";
import Login from "./containers/Login/Login";
import AddEventForm from "./containers/AddEventForm/AddEventForm";
import InviteForm from "./containers/IviteForm/InviteForm";
import InvitedFriends from "./containers/InvitedFriends/InvitedFriends";
import EditEventForm from "./containers/EditEventForm/EditEventForm";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Main}/>

                <ProtectedRoute
                    isAllowed={!user}
                    redirectTo="/"
                    path="/register"
                    component={Register}
                />

                <ProtectedRoute
                    isAllowed={!user}
                    redirectTo="/"
                    path="/login"
                    component={Login}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/addEvent"
                    component={AddEventForm}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/editEvent/:id"
                    component={EditEventForm}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/inviteFriend"
                    component={InviteForm}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/login"
                    path="/viewInvites"
                    component={InvitedFriends}
                />

            </Switch>
        </Layout>
    );
};

export default App;