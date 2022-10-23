import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Register from "./containers/Register/Register";
import Main from "./containers/Main/Main";

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

            </Switch>
        </Layout>
    );
};

export default App;