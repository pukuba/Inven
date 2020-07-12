// App.js
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import HomePage from './pages/home';
import LoginForm from './pages/login';
import SignUpForm from './pages/signup';



function Navigator() {

}

function Header() {
  return (
      <header className="App-header">
        <Link to="/">
        <img src={logo} className="App-logo" alt="logo"/>
        </Link>
        <p>Inven</p>
      </header>
      )
}

function Footer() {

}



function App() {
  return (
    <div className="App">
      {Header()}
      {Navigator()}
      <Switch>
        <Route path="/" exact="true" component ={HomePage}/>
        <Route path="/login" exact="true" component ={LoginForm}/>
        <Route path="/signup" exact="true" component ={SignUpForm}/>
      </Switch>
      {Footer()}
    </div>
  )
}

export default App;
