import '../styles/Profile.css';
import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

const Profile = ({user}) => {
    const { nickname, picture, email } = user;
    return (
        <Container fluid className="profile-container">
            <Row>
                <Col xs={3} className="user-container">
                    <img
                        src={picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                    <h2>{nickname}</h2>
                    <h2>{email}</h2>
                </Col>
                <Col xs={9} className="dashboard-container">
                    <Dropdown>
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            Show
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <h2>Visualizations</h2>
                    <div className="dashboard-container">

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;