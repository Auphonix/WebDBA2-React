import React, { Component } from 'react';
import logo from '../logo.svg';
import { Button, Jumbotron } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleClick = props.handleClick;
    }

    render () {
        return (
            <Jumbotron className="text-center">
                <img src={logo} className="App-logo" alt="logo" style={{width:200}} />
                <h1>Sign in to continue</h1>
                <p>
                    Please select your account type:
                </p>

                <div className="text-center">
                    <Button bsSize="large" bsStyle="primary" style={{marginRight:10}} onClick={() => this.handleClick('helpdesk')}>Helpdesk User</Button>
                    <Button bsSize="large" bsStyle="success" onClick={() => this.handleClick('tech')}>Tech User</Button>
                </div>
            </Jumbotron>
        )
    }
}

export default Login;