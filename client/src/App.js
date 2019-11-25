import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logorugby from "./resources/logorugby.png";

import "bootstrap/dist/css/bootstrap.min.css";

import TodosList from "./components/TodosList";
import EditTodo from "./components/EditTodo";
import CreateTodo from "./components/CreateTodo";

function App() {
  return (

    <Router>
      <div className="container">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a href="https://www.google.com/" className="navbar-brand" target="_blank" rel="noopener noreferrer">
            <img src={logorugby} alt="logo rugby" width="30" height="30" />
          </a>
          <Link to="/" className="navbar-brand"> Mern-Stack Todo app</Link>
          <div >
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </ul>

          </div>

        </nav>

        <h2>MERN-Stack Todo App</h2>
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </div>

    </Router>
  );
}

export default App;
