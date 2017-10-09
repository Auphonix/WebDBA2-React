import React, { Component } from 'react';

// Components
import { Row, Grid, Col, Jumbotron } from 'react-bootstrap';
import Helpdesk from './dashboard/Helpdesk';
import Tech from './dashboard/Tech';

class Dashboard extends Component {
    render () {
        const { firebaseUser, type } = this.props;
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col md={3}>
                            <Jumbotron style={{padding: 10}} className="text-center">
                                <img src={firebaseUser.photoURL} className="img-responsive img-circle" style={{padding:20}} />
                                <h4 className="text-uppercase">Hello</h4>
                                <h3>{firebaseUser.displayName}</h3>
                            </Jumbotron>
                        </Col>
                        <Col md={9}>
                            {
                                type === 'helpdesk'
                                    ? <Helpdesk />
                                    : type === 'tech'
                                        ? <Tech firebaseUser={firebaseUser} />
                                        : null
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Dashboard;