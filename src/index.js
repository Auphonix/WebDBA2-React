import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase'; // Used only if we use firebase
import {BrowserRouter} from 'react-router-dom';

// Initialize Firebase if needed
var config = {
    apiKey: "AIzaSyDS3c8NqwBuOdQlCJskTgt6tpMeEz1kfss",
    authDomain: "webdba2.firebaseapp.com",
    databaseURL: "https://webdba2.firebaseio.com",
    projectId: "webdba2",
    storageBucket: "webdba2.appspot.com",
    messagingSenderId: "517402513368"
};
firebase.initializeApp(config);

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();