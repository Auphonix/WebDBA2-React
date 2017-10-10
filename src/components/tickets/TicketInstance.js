import React, {Component} from 'react';
import {apiurl} from "../../helpers/constants";
import {Redirect, Link} from 'react-router-dom';
import {Row, Grid, Col, Button, } from 'react-bootstrap';

// Components
import {Panel} from 'react-bootstrap';


// Styles
const ticketStyle = {
    textAlign: 'left',
    width: '100px',
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
            comments: [],
        };
    }

    componentDidMount() {
        // Retrieve techUserID .then() fetch it's tickets
        this.getTechUserAndSetID().then(() => {
            // Fetch all tickets assigned to this tech user
            fetch(`${apiurl}/api/ticket/${this.state.ticket.id}/getComments`)
                .then(res => res.json())
                .then(comments => this.setState({comments}));
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

    render() {
        const {ticket, comments} = this.state;

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
                    <div className="container" style={{width: '100%'}}>
                        <table width={'100%'}>
                            <thead>
                            <Row>
                                <div className="comment-header">
                                <Col lg={3}><td>Tech User</td></Col>
                                <Col lg={6}><td>Comment</td></Col>
                                <Col lg={3}><td>Date</td></Col>

                                </div>
                            </Row>
                            </thead>
                            <hr/>
                            {comments.map((comment, i) => (
                            <div className="comment-content">
                                <Row>
                                <Col lg={3}><td>{comment.techUserID}</td></Col>
                                <Col lg={6}><td>{comment.content}</td></Col>
                                <Col lg={3}><td>{comment.created_at}</td></Col>
                                    <hr/>
                                </Row>
                            </div>
                            ))}
                        </table>
                    </div>
                </Panel>
            </div>
        )
    }
}

export default TicketInstance;