import React, { Component } from 'react';
import { apiurl } from '../../helpers/constants';

// Components
import { Table, Row, Col, Button } from 'react-bootstrap';
import HelpdeskModal from "./HelpdeskModal";

class Helpdesk extends Component {
    state = {
        tickets: [],
        selectedTicket: null,
        techUsers: [],
        selectedTech: null
    }

    /* Once component has mounted, fetch from API + firebase */
    componentDidMount() {
        // Fetch all tickets and techUsers
        fetch(`${apiurl}/api/ticket/list`)
            .then(res => res.json())
            .then(tickets => this.setState({ tickets }));

        fetch(`${apiurl}/api/techUser/list`)
            .then(res => res.json())
            .then(techUsers => this.setState({ techUsers }));
    }

    /* Toggle the ticket dialog */
    ticketDetailsClick = (ticket) => {
        const { selectedTicket } = this.state;
        this.setState({
            selectedTicket: (selectedTicket !== null && selectedTicket.id === ticket.id ? null : ticket)
        });
    }

    /* Close button for dialog */
    closeDialogClick = () => {
        this.setState({
            selectedTicket: null
        })
    }

    /* Update the selected tech from dropdown box */
    handleTechChange = (e) => {
        this.setState({
            selectedTech: e.target.value
        });
    }

    /* Click assign button */
    assignTicketToTech = () => {
        if(this.state.selectedTech === null) {
            return;
        }

        /* Add assigned ticket+tech into database*/
        // TODO: Implement
        alert('TODO: Tech successfully assigned to ticket!');
        window.location.reload();
    }

    render () {
        const vm = this
        const { selectedTicket, tickets, techUsers } = this.state

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
                                    <Button bsStyle={vm.state.selectedTicket !== null && vm.state.selectedTicket.id === ticket.id ? 'success' : 'info'} onClick={() => vm.ticketDetailsClick(ticket)}>More Details</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
                { selectedTicket !== null && <HelpdeskModal selectedTicket={selectedTicket}
                                                            techUsers={techUsers}
                                                            closeDialogClick={this.closeDialogClick}
                                                            handleTechChange={this.handleTechChange}
                                                            assignTicketToTech={this.assignTicketToTech} /> }
            </Row>
        );
    }
}

export default Helpdesk;