import React from 'react';

import './Preloader.css';

const Preloader = ({showPreloader}) => (
    <div id="preloader" style={showPreloader ? {display: 'block'} : {display: 'none'}}>
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default Preloader;