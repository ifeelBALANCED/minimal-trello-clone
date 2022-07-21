import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Project Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" />
      </Container>
    </Navbar>
  );
};
