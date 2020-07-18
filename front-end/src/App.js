// App.js
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import {gql} from "apollo-boost";
import { useQuery } from 'react-apollo-hooks';
import Routes from './Components/Routes';

const CHECK = gql`
  {
    check @client
  }
`

// function Navigator() {

// }

// function Header() {
//   return (
//       <header className="App-header">
//         <Link to="/">
//         <img src={logo} className="App-logo" alt="logo"/>
//         </Link>
//         <p>Inven</p>
//       </header>
//       )
// }

// function Footer() {

// }



function App() {
  const {
    data: {check}
  } = useQuery(CHECK)
  return (
    <div className="App">
      {/* {Header()}
      {Navigator()}
      <Switch>
        <Route path="/" exact="true" component ={HomePage}/>
        <Route path="/Login" exact="true" component ={LoginForm}/>
        <Route path="/Signup" exact="true" component ={SignUpForm}/>
        <Route component={NotFound} />
      </Switch>
      {Footer()} */}
      <Router>
        <Routes check={check}></Routes>
      </Router>
    </div>
  )
}

export default App;
