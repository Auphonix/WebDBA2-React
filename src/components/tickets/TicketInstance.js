import React, {Component} from 'react';
import {apiurl} from "../../helpers/constants";
import {Redirect, Link} from 'react-router-dom';
import {Row, Grid, Col, Button} from 'react-bootstrap';

// Components
import {Panel} from 'react-bootstrap';

const ticketStyle = {
    textAlign: 'left',
}

const alignRight = {
    textAlign: 'right',
}

class TicketInstance extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firebaseUser: this.props.firebaseUser,
            ticket: this.props.ticket,
        };
    }

    render() {
        const {ticket} = this.state;

        // Test ticket
        return (
            <div>
                <div style={alignRight}><Link to='/dashboard'><Button>Back</Button></Link></div>

                {/*Ticket Panel*/}
                <Panel header={"Ticket No {#" + ticket.id + "} - Status: " + ticket.status}>
                    <div style={ticketStyle}>
                        <Grid>
                            <Col>
                                <Row><p>{"Issue: " + ticket.issue}</p></Row>
                                <Row><p>{"Description: " + ticket.description}</p></Row>
                                <Row><p>{"OS: " + ticket.operatingSystem}</p></Row>
                                <Row><p>{"Priority: " + ticket.priority}</p></Row>
                                <Row><p>{"Escalation Level: " + ticket.escalationLevel}</p></Row>
                            </Col>
                        </Grid>
                    </div>
                </Panel>

                {/*Comment Panel*/}
                <Panel>

                </Panel>
            </div>
        )
    }
}

export default TicketInstance;