import React from 'react';
import './signup.css';

/*
<div className="signup-wrapper">
        <form className="signup-form">
          <p>SignUp</p>
          <label>ID</label>
          <input type="text" id="user_id" />
          <br/>
          <label>Password</label>
          <input type="password" id="password" />
          <br/>
          <button id="submitBtn" type="submit">Submit</button>
        </form>
      </div>
*/

function SignUpForm() {
  // from https://www.w3schools.com/howto/howto_css_signup_form.asp
    return (
      <form >
      <div class="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr/>
    
        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" required/>
    
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required/>
    
        <label for="psw-repeat"><b>Repeat Password</b></label>
        <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
    
        <label>
          <input type="checkbox" name="remember"/> Remember me
        </label>
    
        {/* <p>By creating an account you agree to our <a href="/">Terms & Privacy</a>.</p> */}
    
        <div class="clearfix">
          <button type="button" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Sign Up</button>
        </div>
      </div>
    </form>
      );
  }

  export default SignUpForm;