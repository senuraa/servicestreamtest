import React from 'react';
import './App.css';
import {Container} from "react-bootstrap";
import AppHeader from "./components/AppHeader";
import MoviesList from "./components/MoviesList";

function App() {
  return (
    <div className="App">
        <AppHeader />
        <Container>
            <MoviesList />
        </Container>
    </div>
  );
}

export default App;
