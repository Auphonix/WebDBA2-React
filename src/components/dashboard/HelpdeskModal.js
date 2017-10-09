import React, { Component } from 'react';

// Components
import { Jumbotron, Button, Col } from 'react-bootstrap';

class HelpdeskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTicket: props.selectedTicket,
            techUsers: props.techUsers,
            closeDialogClick: props.closeDialogClick,
            handleTechChange: props.handleTechChange,
            assignTicketToTech: props.assignTicketToTech
        }
    }
    render () {
        const { selectedTicket, techUsers } = this.state

        return (
            <Col md={5}>
                <Jumbotron style={{padding: 10}}>
                    <Button block bsStyle="danger" onClick={this.state.closeDialogClick}>Close Dialog</Button>
                    <h3 className="text-uppercase">Ticket Details</h3>
                    <p><b>ID: </b>{selectedTicket.id}</p>
                    <p><b>Title: </b><br/>{selectedTicket.title}</p>
                    <p><b>Comment: </b><br/>{selectedTicket.comment}</p>
                    {techUsers.length > 0 && (
                        <div>
                            <hr/>
                            <h3 className="text-uppercase">Assign to tech</h3>
                            <select className="form-control" onChange={this.state.handleTechChange} defaultValue="-1">
                                <option value="-1" defaultValue disabled>Select a tech user</option>
                                {techUsers.map((user, i) => (
                                    <option key={i} value={user.id}>{user.firebaseName}</option>
                                ))}
                            </select>

                            <div className="clearfix"><br/>
                                <Button className="pull-right" bsStyle="success" onClick={this.state.assignTicketToTech}>Assign</Button>
                            </div>
                        </div>
                    )
                    }
                </Jumbotron>
            </Col>
        );
    }
}

export default HelpdeskModal;