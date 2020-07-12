import React from 'react';
import './login.css';
import logo from './../logo.svg';
/*
<div className="login-wrapper">
      <form className="login-form">
        <p>Login</p>
        <div>
          <input type="text" id="login-id" placeholder="ID"/>
        </div>
        <div>
        <input type="password" id="login-password" placeholder="Password"/>
        </div>
        <div>
        <button type="submit" id="login-button">login</button>
        </div>
      </form>
    </div>
*/

function LoginForm() {
  // from https://www.w3schools.com/howto/howto_css_login_form.asp
    return (
    <form method="post">
    <div class="imgcontainer">
      <img src={logo} className="App-logo" alt="logo"/>
    </div>
  
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required/>
  
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required/>
  
      <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"/> Remember me
      </label>
    </div>
  
    <div class="container bottom-buttons-container">
      <button type="button" class="cancelbtn">Cancel</button>
      <span class="psw">Forgot <a href="/">password?</a></span>
    </div>
  </form>
    );
}
export default LoginForm;