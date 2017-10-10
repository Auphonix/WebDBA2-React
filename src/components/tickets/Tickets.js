import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Components
import {Panel} from 'react-bootstrap';


class Tickets extends Component {
    render() {
        const {firebaseUser, type, tickets} = this.props;
        if (!firebaseUser) {
            return (
                <div>
                    <p>Please log in</p>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>My Tickets</h1>
                    {tickets.length < 1
                        ? <div className="alert alert-info">You have not been assigned any tickets.</div>
                        : tickets.map((ticket, i) => (
                            <Link to={"dashboard/tickets/" + ticket.id}>
                                <Panel key={i} header={ticket.issue} onClick={() => this.props.onSelectTicket(ticket)}>
                                    <p>{ticket.description}</p>
                                </Panel>
                            </Link>
                        ))}
                </div>
            )
        }
    }
}

export default Tickets;