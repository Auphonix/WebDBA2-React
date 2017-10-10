import React, {Component} from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import firebase from 'firebase';
import {apiurl} from './helpers/constants';

// Components
import NavBarPanel from './components/NavBarPanel';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Tickets from './components/tickets/Tickets';
import Footer from "./components/Footer";

import './App.css';
import HelpdeskModal from "./components/dashboard/HelpdeskModal";

class App extends Component {
    state = {
        type: null,
        firebaseUser: null
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(this.handleCredentials);
    }

    componentWillUnmount() {
        if (this.state.firebaseUser !== null) {
            localStorage.setItem('type', this.state.type);
        }
    }

    handleClick = (type) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((success) => {
                this.handleCredentials(success.user)
            })
            .then(() => {
                this.handleLogin(type)
            });
    }

    handleCredentials = (params) => {
        this.setState({
            firebaseUser: params,
            type: localStorage.getItem('type')
        });
    }

    handleLogin = (type) => {
        localStorage.setItem('type', type);
        this.setState({
            type: type
        });
    }

    handleSignout = () => {
        const vm = this;
        vm.setState({
            firebaseUser: null,
            type: null
        });
        localStorage.setItem('type', null);
        firebase.auth().signOut().then(function () {
            alert('You have been signed out');
        });
    }

    render() {
        const {firebaseUser, type} = this.state;
        return (
            <div className="App">
                <NavBarPanel user={firebaseUser} handleSignout={this.handleSignout}/>

                <div className="container">
                        <Switch>
                            <Route exact path="/" render={() =>
                                !firebaseUser
                                    ? <Login handleClick={this.handleClick}/>
                                    : <Redirect to="/dashboard"/>
                            }/>
                            <Route path="/ticket" render={(props) =>
                                <Tickets firebaseUser={firebaseUser} type={type}/>}/>

                            <Route path='/dashboard' render={() =>
                                firebaseUser
                                    ? <Dashboard firebaseUser={firebaseUser} type={type}/>
                                    : <Redirect to="/"/>
                            }/>
                        </Switch>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default App;
