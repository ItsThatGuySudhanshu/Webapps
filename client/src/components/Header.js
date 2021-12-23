import '../styles/Header.css';
import Logo from '../assets/state.png';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const {loginWithRedirect, logout, isAuthenticated} = useAuth0();

    const buttonStyle = {
        width: '90px',
        height: '45px'
    };

    const renderAuthButton = () => {
        if (isAuthenticated) {
            return (
            <Nav.Link eventKey={2} to='/'>
                <Button style={buttonStyle} onClick={() => logout()} variant="danger">
                    Logout
                </Button>
            </Nav.Link>
            )
        } else {
            return (
                <Nav.Link eventKey={2} to='/'>
                    <Button style={buttonStyle} onClick={() => loginWithRedirect()} variant="danger">
                        Login
                    </Button>
                </Nav.Link>
                )
        }
    }  

    return (
        <Navbar collaspeonselect="true" expand="sm" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img src={Logo} alt="logo" className="state-logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href='/movies'>Movies</Nav.Link>
                    <Nav.Link href='/watchlist'>Watchlist</Nav.Link>
                    <Nav.Link></Nav.Link>
                </Nav>
                <Nav>
                    {renderAuthButton()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;