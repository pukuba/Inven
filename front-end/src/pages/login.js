import React from 'react';
import './login.css';

function LoginForm() {
    return (
    <form>
          <fieldset className="login_form">
            <legend>Login</legend>
            <input type="text" id="login-id" placeholder="ID"/>
            <input type="password" id="login-password" placeholder="Password"/>
            <button type="submit" id="login-button">login</button>
          </fieldset>
    </form>
    );
}
export default LoginForm;