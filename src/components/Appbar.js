import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useStore } from "../Store";

function Appbar() {
  const { state } = useStore();

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          Spring Club
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/products" className="text-white">
              Products
            </Nav.Link>
            <Nav.Link href="/cart" className="text-white">
              Cart
              <Badge pill bg="success">
                {state.cart ? state.cart.cartItems.length : 0}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;
