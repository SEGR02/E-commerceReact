import React, { useState } from 'react';
import {Navbar, Container, Nav, Offcanvas} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Cart from './Cart';

const NavBar = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to='/' href="#home">E-commerce</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/login' href="#home">Login</Nav.Link>
              <Nav.Link as={Link} to='/purchases' href="#features">Purchases</Nav.Link>
              <Nav.Link onClick={handleShow}>Carrito</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <Cart show={show} handleClose={handleClose}/>
  </>
  );
};

export default NavBar;