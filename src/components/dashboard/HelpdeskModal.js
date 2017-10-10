import React, { Component } from 'react';
import { apiurl } from '../../helpers/constants';

// Components
import { Well, Button, Col } from 'react-bootstrap';

class HelpdeskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: props.selectedTicket,
            techUsers: props.techUsers,
            closeDialogClick: props.closeDialogClick,
            techID: null,
            priority: null,
            escalation: null
        }
    }

    handleTechChange = (e) => {
        this.setState({ techID: e.target.value });
    }

    handlePriorityChange = (e) => {
        this.setState({ priority: e.target.value });
    }

    handleEscalationChange = (e) => {
        this.setState({ escalation: e.target.value });
    }

    // Click assign button
    assignTicketToTech = (e) => {
        e.preventDefault();

        const { techID, priority, escalation } = this.state;
        if(techID === null || priority === null || escalation === null) {
            return;

        }

        const options = {
            method: 'post',
            body: JSON.stringify({
                techUserID: techID,
                ticketID: this.state.ticket.id,
                priority,
                escalationLevel: escalation
            })
        };
        // Create tech ticket handler
        fetch(`${apiurl}/api/techUser/assignToTicket`, options)

        alert('Tech successfully assigned to ticket!');
        window.location.reload();
    }

    render() {
        const { ticket, techUsers } = this.state
        return (
            <Col md={5}>
                <Well style={{padding: 10}}>
                    <Button block bsStyle="danger" onClick={this.state.closeDialogClick}>Close Dialog</Button>
                    <h3><strong>ID: </strong>{ticket.id}</h3>
                    <h3><strong>Issue: </strong><br/>
                        {ticket.issue}</h3>
                    <h4><strong>Description: </strong><br/>
                        {ticket.description}</h4>
                    <p><strong>Assigned Tech User: </strong>{ticket.tech_ticket_handler ? ticket.tech_ticket_handler.tech_user.firebaseName : 'None'}</p>
                    <p><strong>User: </strong>{ticket.userID}</p>
                    <p><strong>Operating System: </strong>{ticket.operatingSystem}</p>
                    <p><strong>Status: </strong>{ticket.status}</p>
                    <p><strong>Priority: </strong>{ticket.priority}</p>
                    <p><strong>Escalation Level: </strong>{ticket.escalationLevel}</p>

                    {techUsers.length > 0 && (
                        <div>
                            <hr/>
                            <form onSubmit={this.assignTicketToTech}>
                                <p className="text-uppercase">Assign to tech</p>
                                <select className="form-control" onChange={this.handleTechChange} defaultValue="-1">
                                    <option value="-1" defaultValue disabled>Select a tech user</option>
                                    {techUsers.map((user, i) => (
                                        <option key={i} value={user.id}>{user.firebaseName}</option>
                                    ))}
                                </select>

                                <p className="text-uppercase">Select priority</p>
                                <select className="form-control" onChange={this.handlePriorityChange} defaultValue="-1">
                                    <option value="-1" defaultValue disabled>Select a priority</option>
                                    <option value="low">Low</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="high">High</option>
                                </select>

                                <p className="text-uppercase">Select escalation level</p>
                                <select className="form-control" onChange={this.handleEscalationChange} defaultValue="-1">
                                    <option value="-1" defaultValue disabled>Select an escalation level</option>
                                    <option value="1" >1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>

                                <div className="clearfix"><br/>
                                    <Button type="submit" className="pull-right" bsStyle="success">Assign</Button>
                                </div>
                            </form>
                        </div>
                    )}
                </Well>
            </Col>
        );
    }
}

export default HelpdeskModal;