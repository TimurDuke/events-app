import React from 'react';
import {Router} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./store/configureStore";
import App from './App';
import history from "./history";
import './index.css';

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);