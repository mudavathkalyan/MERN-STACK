import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Header.css';
// import logo from "../Header/logo22.jpeg"

import { logout } from './../../actions/userActions';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            fixed="top"
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
        >
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

               

                    <LinkContainer to="/">
                        <Nav.Link className="nav-cal">HOME</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/farmer">
                        <Nav.Link className="nav-cal">FARMER</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/consumer">
                        <Nav.Link className="nav-cal">CONSUMER</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="login?redirect=supplier">
                        <Nav.Link className="nav-cal">SUPPLIER</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/weather">
    <Nav.Link className="nav-cal">WEATHER</Nav.Link>
</LinkContainer>

                    <LinkContainer to="/chatbot">
                        <Nav.Link className="nav-cal">CHARTBOT</Nav.Link>
                    </LinkContainer>
                    
                    <LinkContainer to="/cart">
                        <Nav.Link
                            className={`${
                                userInfo ? 'remove-space' : 'add-space cart nav-cal'
                            }`}
                        >
                            <i className="fas fa-shopping-cart"></i>
                            CART
                        </Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                        <NavDropdown
                            title={userInfo.name.toUpperCase()}
                            id="username"
                        >
                            {userInfo.isAdmin && (
                                <LinkContainer to="/admin/dashboard">
                                    <NavDropdown.Item>DASHBOARD</NavDropdown.Item>
                                </LinkContainer>
                            )}
                            <LinkContainer to="/profile">
                                <NavDropdown.Item>PROFILE</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <NavDropdown.Item onClick={logoutHandler}>
                                    LOGOUT
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link className="login nav-cal">SIGN IN</Nav.Link>
                        </LinkContainer>
                    )}
                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="ADMIN" id="adminmenu">
                            <LinkContainer to="/admin/userlist">
                                <NavDropdown.Item>USERS</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/productlist">
                                <NavDropdown.Item>PRODUCTS</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/orderlist">
                                <NavDropdown.Item>ORDERS</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
