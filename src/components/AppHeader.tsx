import React from 'react';
import {Container, Navbar} from 'react-bootstrap';

const AppHeader = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    Movies List
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default AppHeader;
