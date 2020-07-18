import React from 'react';
import AuthInput from '../Components/AuthInput';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom';
import useInput from '../hooks/UseInput';


const SIGN_UP = gql`
  mutation  join($id: String!, $pw: String!, $name: String!){
      join(id: $id, pw: $pw, name: $name)
  }
`

function SignUp() {
  const idInput = useInput("")
  const pwInput = useInput("")
  const nameInput = useInput("")

  console.log(idInput)
  console.log(pwInput)
  console.log(nameInput)

  const [signUpMutation] = useMutation(SIGN_UP, {
    variables: {
      id: idInput.value,
      pw: pwInput.value,
      name: nameInput.value,
    }
  })


  const history = useHistory();
  const onSubmit = async e => {
    e.preventDefault(); // 새로고침 같은 것을 막아줌
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
        const {
          data: {join: signup_result}
        } = await signUpMutation()
        console.log("result : ")
        console.log(signup_result)
        if (signup_result === "true") {
          alert("가입되었습니다")
          history.push("/")
        }
        else if(signup_result.indexOf("오류") !== -1){
          const wrongplace = signup_result.substring(0, signup_result.indexOf("에"))
          alert(wrongplace + "가 잘못되었습니다.")
        }
        //}
      }
    } catch (error) {
      console.log(error);
    }
  }


  // from https://www.w3schools.com/howto/howto_css_signup_form.asp
  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <div className="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label><b>Username</b></label>
        <AuthInput placeholder={"EnterUsername"} {...nameInput} type={"text"}></AuthInput>

        <label><b>ID</b></label>
        <AuthInput placeholder={"EnterID"} {...idInput} type={"text"}></AuthInput>

        <label><b>Password</b></label>
        <AuthInput placeholder={"EnterPassword"} {...pwInput} type={"password"}></AuthInput>

        {/* <p>By creating an account you agree to our <a href="/">Terms & Privacy</a>.</p> */}

        <div className="clearfix">
          <button className="cancelbtn" type="button" onClick={history.goBack}>Cancel</button>
          <button className="signupbtn" type="submit">Sign Up</button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
