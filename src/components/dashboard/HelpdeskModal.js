import React, { Component } from 'react';

// Components
import { Jumbotron, Button, Col } from 'react-bootstrap';

class HelpdeskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: props.selectedTicket,
            techUsers: props.techUsers,
            closeDialogClick: props.closeDialogClick,
            tech: null,
            priority: null,
            escalation: null
        }
    }

    handleTechChange = (e) => {
        this.setState({ tech: e.target.value });
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

        const { tech, priority, escalation } = this.state;
        if(tech === null || priority === null || escalation === null) {
            return;

        }

        // TODO: Interact with our API
        alert('TODO: Tech successfully assigned to ticket!');
        window.location.reload();
    }

    render() {
        const { ticket, techUsers } = this.state

        return (
            <Col md={5}>
                <Jumbotron style={{padding: 10}}>
                    <Button block bsStyle="danger" onClick={this.state.closeDialogClick}>Close Dialog</Button>
                    <h3 className="text-uppercase">Ticket Details</h3>
                    <p><strong>ID: </strong>{ticket.id}</p>
                    <p><strong>Issue: </strong><br/>
                        {ticket.issue}</p>
                    <p><strong>Description: </strong><br/>
                        {ticket.description}</p>
                    {techUsers.length > 0 && (
                        <div>
                            <hr/>
                            <form onSubmit={this.assignTicketToTech}>
                                <h3 className="text-uppercase">Assign to tech</h3>
                                <select className="form-control" onChange={this.handleTechChange} defaultValue="-1">
                                    <option value="-1" defaultValue disabled>Select a tech user</option>
                                    {techUsers.map((user, i) => (
                                        <option key={i} value={user.id}>{user.firebaseName}</option>
                                    ))}
                                </select>

                                <h3 className="text-uppercase">Select priority</h3>
                                <select className="form-control" onChange={this.handlePriorityChange} defaultValue="-1">
                                    <option value="-1" defaultValue disabled>Select a priority</option>
                                    <option value="low">Low</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="high">High</option>
                                </select>

                                <h3 className="text-uppercase">Select escalation level</h3>
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
                </Jumbotron>
            </Col>
        );
    }
}

export default HelpdeskModal;