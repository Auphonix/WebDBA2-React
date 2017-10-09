import React, { Component } from 'react';
import { apiurl } from '../../helpers/constants';

// Components
import { Table, Row, Col, Button } from 'react-bootstrap';
import HelpdeskModal from "./HelpdeskModal";

class Helpdesk extends Component {
    state = {
        tickets: [],
        selectedTicket: null,
        techUsers: []
    }

    componentDidMount() {
        // Fetch all tickets and tech users
        fetch(`${apiurl}/api/ticket/list`)
            .then(res => res.json())
            .then(tickets => this.setState({ tickets }));

        fetch(`${apiurl}/api/techUser/list`)
            .then(res => res.json())
            .then(techUsers => this.setState({ techUsers }));
    }

    // Toggle the ticket dialog
    ticketDetailsClick = (ticket) => {
        const { selectedTicket } = this.state;
        this.setState({
            selectedTicket: selectedTicket && selectedTicket.id === ticket.id ? null : ticket
        });
    }

    // Close button for dialog
    closeDialogClick = () => {
        this.setState({ selectedTicket: null });
    }

    render () {
        const { selectedTicket, tickets } = this.state

        return (
            <Row>
                <Col md={(selectedTicket !== null ? 7 : 12)}>
                    <h1>Pending Tickets</h1>
                    {tickets.length < 1 && (
                        <p className="alert alert-info">There are no tickets to display.</p>
                    )}
                    <Table striped hover>
                        <thead>
                            <tr >
                                <th>ID</th>
                                <th>User</th>
                                <th>OS</th>
                                <th>Issue</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tickets.map((ticket, i) => (
                            <tr key={i}>
                                <td>{ticket.id}</td>
                                <td>{ticket.userID}</td>
                                <td>{ticket.operatingSystem}</td>
                                <td>{ticket.issue}</td>
                                <td>{ticket.description}</td>
                                <td>{ticket.status}</td>
                                <td>
                                    <Button bsStyle={selectedTicket !== null && selectedTicket.id === ticket.id ? 'success' : 'info'} onClick={() => this.ticketDetailsClick(ticket)}>More Details</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
                { selectedTicket !== null && <HelpdeskModal selectedTicket={selectedTicket}
                                                            techUsers={this.state.techUsers}
                                                            closeDialogClick={this.closeDialogClick} /> }
            </Row>
        );
    }
}

export default Helpdesk;