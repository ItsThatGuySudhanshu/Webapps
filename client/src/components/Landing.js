import '../styles/Landing.css';
import Hero from "../assets/hero.png";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';

const Landing = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Container id="landing-container">
            <h1>Pack Movie Manager</h1>
            <Row className="hero-action">
                <Col xs={5}>
                    <Image src={Hero} className="hero-image"/>
                </Col>
                <Col xs={6} className="mt-5 call-action">
                    <h1>Don't know what movie to pick? Let us help you.</h1>
                    <Button variant="outline-danger" size="lg" onClick={() => loginWithRedirect()}>Get Started</Button>
                </Col>
            </Row>
            <Row className="mt-5" id="benefits-offering">
                <Col xs={4} id="benefits-1">
                    <h2>
                        Most Popular Movies
                    </h2>
                    <p>
                        Our system maintains a list of the current most popular movies
                        so we'll always keep you up-to-date with the newest upcoming releases.
                    </p>
                </Col>
                <Col xs={4} id="benefits-2">
                    <h2>
                        Movie Recommendations
                    </h2>
                    <p>
                        We know it's sometimes difficult to pick what movie to watch. That's why we 
                        provide you with recommendations so you can spend more time enjoying movies
                        without the hassle.
                    </p>
                </Col>
                <Col xs={4} id="benefits-3">
                    <h2>
                        Personalized visualizations
                    </h2>
                    <p>
                        We also let our users reflect on their movie experiences with personalized 
                        dashboards. It displays a wide variety of information based on your watch history 
                        such as favorite genre, number of movies watched, hours watched, and more. 
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Landing;