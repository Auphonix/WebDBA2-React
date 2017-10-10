import React, {Component} from 'react';
import {apiurl} from "../../helpers/constants";
import {Switch, Redirect, Route} from 'react-router-dom';
import Tickets from '../tickets/Tickets';
import TicketInstance from '../tickets/TicketInstance';

class Tech extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            firebaseUser: this.props.firebaseUser,
            techUserID: null,
            selectedTicket: null
        };
    }

    componentDidMount() {
        // Retrieve techUserID .then() fetch it's tickets
        this.getTechUserAndSetID().then(() => {
            // Fetch all tickets assigned to this tech user
            fetch(`${apiurl}/api/techUser/${this.state.techUserID}/tickets`)
                .then(res => res.json())
                .then(tickets => this.setState({tickets}));
        })
    }

    getTechUserAndSetID = () => {
        const options = {
            method: 'post',
            body: JSON.stringify({
                firebaseId: this.state.firebaseUser.uid,
                firebaseName: this.state.firebaseUser.displayName
            })
        };

        // Add to Database
        return fetch(`${apiurl}/api/techUser/findOrCreate`, options)
            .then(res => res.json())
            .then(techUserID => this.setState({techUserID}));
    }

    handleTicket = (ticket) => {
        this.setState({selectedTicket: ticket});
        {/*<Redirect to="dashboard/tickets/' + ticket.id" />*/}
        // console.log("Ticket with id: " + ticket.id + "selected");
    }

    render() {
        const {tickets, firebaseUser, selectedTicket} = this.state;
        return (
            <Switch>
                <Route exact path="/dashboard" render={(props) =>
                    <Tickets firebaseUser={firebaseUser} tickets={tickets} onSelectTicket={this.handleTicket}/>}/>
                <Route path="/dashboard/tickets/:number" render={(props) =>
                    <TicketInstance firebaseUser={firebaseUser} ticket={selectedTicket}/>}/>
            </Switch>

        );
    }
}

export default Tech;