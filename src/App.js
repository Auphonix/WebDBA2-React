import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import firebase from 'firebase';
import { apiurl } from './helpers/constants';

// Components
import NavBarPanel from './components/NavBarPanel';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from "./components/Footer";

import './App.css';

class App extends Component {
    state = {
        type: null,
        user: null
    }

    componentWillMount () {
        firebase.auth().onAuthStateChanged(this.handleCredentials);
    }

    componentWillUnmount() {
        if(this.state.user !== null) {
            localStorage.setItem('type', this.state.type);
        }
    }

    handleClick = (type) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((success) => { this.handleCredentials(success.user) })
            .then(() => { this.handleLogin(type) });
    }

    handleCredentials = (params) => {
        this.setState({
            user: params,
            type: localStorage.getItem('type')
        });
    }

    handleLogin = (type) => {
        localStorage.setItem('type', type);
        this.setState({
            type: type
        });

        // FIXME Need to add the user to MySQL Database
        const user = {};
        user['user/' + this.state.user.uid] = {
            type: type,
            name: this.state.user.displayName,
            id: this.state.user.uid
        };
        firebase.database().ref().update(user)
    }

    handleSignout = () => {
        const vm = this;
        vm.setState({
            user: null,
            type: null
        });
        localStorage.setItem('type', null);
        firebase.auth().signOut().then(function () {
            alert('You have been signed out');
        });
    }

    render() {
        return (
            <div className="App">
                <NavBarPanel user={this.state.user} handleSignout={this.handleSignout} />

                <div className="container">
                    <Route exact path="/" render={() =>
                        this.state.user === null ? <Login handleClick={this.handleClick} />
                                                 : <Redirect to="/dashboard" />
                    } />
                    <Route exact path="/dashboard" render={() =>
                        this.state.user !== null ? <Dashboard user={this.state.user} type={this.state.type} />
                                                 : <Redirect to="/" />
                    } />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
