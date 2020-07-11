import React from 'react';

function SignUpForm() {
    return (
      <form>
            <fieldset>
              <legend>Register</legend>
              <label>ID</label>
              <input type="text" id="user_id" />
              <br/>
              <label>Password</label>
              <input type="password" id="password" />
              <br/>
              <button id="submitBtn" type="submit">
                <span>submit</span>
              </button>
            </fieldset>
      </form>
      );
  }

  export default SignUpForm;