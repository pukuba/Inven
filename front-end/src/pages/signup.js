import React from 'react';
import './signup.css';
import AuthButton from '../Components/AuthButton';
import AuthInput from '../Components/AuthInput';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { useHistory } from 'react-router-dom';


const SIGN_UP = gql`
  mutation  join($id: String!, $pw: String!, $name: String!){
      join(id: $id, pw: $pw,name: $name)
  }
`




function SignUp() {
  const idInput = AuthInput("")
  const pwInput = AuthInput("")
  const nameInput = AuthInput("")

  const [signUpMutation] = useMutation(SIGN_UP, {
    variables: {
      name: nameInput.value,
      id: idInput.value,
      pw: pwInput.value,
    }
  })


  const history = useHistory();
  const onSubmit = async e => {
    e.preventDefault();
    console.log("idInput : ", idInput.value)
    console.log("pwInput : ", pwInput.value)
    try {
      if (idInput.value !== "" &&
        pwInput.value !== "" &&
        nameInput.value !== "") {
          // 비밀번호 확인 기능 추가시 필요
          // if(pwInput.value !== passConfirmInput.value)
          //   alert("비밀번호가 일치하지 않음")
          // else {
          const {data: create} = await signUpMutation();
          if(create) {
            alert("가입되었습니다")
            history.push("/")
          }
          //}
      }
    } catch(error) {
      console.log(error);
    }
  }


  // from https://www.w3schools.com/howto/howto_css_signup_form.asp
    return (
      <form className="signup-form" onSubmit={onSubmit}>
      <div className="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr/>

        <label for="username"><b>Username</b></label>
        <AuthInput placeholder={"Enter Username"} {...nameInput} type={"text"}></AuthInput>
        
        <label for="id"><b>ID</b></label>
        <AuthInput placeholder={"Enter ID"} {...idInput} type={"text"}></AuthInput>

        <label for="pw"><b>Password</b></label>
        <AuthInput placeholder={"Enter Password"} {...pwInput} type={"password"}></AuthInput>
    
        {/* <p>By creating an account you agree to our <a href="/">Terms & Privacy</a>.</p> */}
    
        <div className="clearfix">
          <AuthButton text="Sign Up"></AuthButton>
        </div>
      </div>
    </form>
      );
  }

  export default SignUp;