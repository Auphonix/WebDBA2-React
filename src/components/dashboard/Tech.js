import React, { Component } from 'react';
import { apiurl } from "../../helpers/constants";

// Components
import { Panel } from 'react-bootstrap';

class Tech extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            firebaseUser: this.props.firebaseUser,
            techUserID: null
        };
    }

    componentDidMount() {
        // Retrieve techUserID .then() fetch it's tickets
        this.getTechUserAndSetID().then(() => {
            // Fetch all tickets assigned to this tech user
            fetch(`${apiurl}/api/techUser/${this.state.techUserID}/tickets`)
                .then(res => res.json())
                .then(tickets => this.setState({ tickets }));
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
            .then(techUserID => this.setState({ techUserID }));
    }

    render () {
        const { tickets } = this.state;
        return (
            <div>
                <h1>My Tickets</h1>
                {tickets.length < 1
                    ? <div className="alert alert-info">You have not been assigned any tickets.</div>
                    : tickets.map((ticket, i) => (
                        <Panel key={i} header={ticket.issue}>
                            <p>{ticket.description}</p>
                        </Panel>
                    ))}
            </div>
        );
    }
}

export default Tech;