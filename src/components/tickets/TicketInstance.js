import React, {Component} from 'react';
import {apiurl} from "../../helpers/constants";
import {Redirect} from 'react-router-dom';

// Components
import {Panel} from 'react-bootstrap';

class TicketInstance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firebaseUser: this.props.firebaseUser,
            ticketID:  this.props.ticketID,
            ticket: this.props.selectedTicket,
        };
    }

    render() {
        const {firebaseUser, techUserID, ticketID, ticket} = this.state;

        // Test ticket
        return (
            <div>
                <p> {ticket.id} </p>
            </div>
        )
    }
}

export default TicketInstance;