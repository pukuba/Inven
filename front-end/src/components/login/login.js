import React from 'react';

function LoginForm() {
    return (
    <form>
          <fieldset>
            <legend>Login</legend>
            <label>ID</label>
            <input type="text" id="user_id" />
            <br/>
            <label>Password</label>
            <input type="password" id="password" />
            <br/>
            <button type="submit">login</button>
          </fieldset>
    </form>
    );
}
export default LoginForm;