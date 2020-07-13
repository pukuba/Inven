import React from 'react';
import './login.css';
import logo from './../logo.svg';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import AuthInput from '../Components/AuthInput';
import AuthButton from '../Components/AuthButton';
import Title from '../Components/Title';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';

const LOGIN = gql`
  mutation login($id: String!, $pw: String!){
    login(id: $id,pw: $pw)
  }
`
const TOKENLOGIN = gql`
  mutation logUserIn($token: String!){
    logUserIn(token: $token) @client
  }
`




const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  form {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  flex-direction: column;
`

const Text = styled.span`
  font-size: 13px;
  color: #8e8e8e;
  text-decoration: none;
`

function Login() {
  const idInput = useInput("")
  const pwInput = useInput("")

  const [loginMutation] = useMutation(LOGIN, {
    variables: {
      id: idInput.value,
      pw: pwInput.value,
    }
  })
  
  const [tokenLoginMutation] = useMutation(TOKENLOGIN)

  const onSubmit = async e => {
    e.preventDefault();
    if(idInput.value !== "" &&
        pwInput.value !== ""){
      try {
        const {
          data: {login: token}
        } = await loginMutation();
        if(token !== "" || token !== undefined) {
          tokenLoginMutation({variables: {token}});
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      } catch (error) {
        console.log(error)
      }
    } 
  }


  // from https://www.w3schools.com/howto/howto_css_login_form.asp
  return (
    <Wrapper>
      <Container>
        {/*  TODO : onSubmit */}
        <Title title="LINBAN"></Title>
        <form className="login-form" onSubmit={onSubmit}>
          <div className="imgcontainer">
            <img src={logo} className="App-logo" alt="logo" />
          </div>

          <div className="container">
            <label for="uname"><b>Username</b></label>
            <AuthInput placeholder={"ID"} {...idInput}></AuthInput>

            <label for="psw"><b>Password</b></label>
            <AuthInput placeholder={"Password"} {...pwInput} type={"password"}></AuthInput>

            <AuthButton text="Login"></AuthButton>
            <Link style={{textDecoration:"none"}} to="SignUp">
              <Text>SignUp</Text>
            </Link>
            <label>
              {/* <input type="checkbox" name="remember" /> Remember me */}
             </label>
          </div>

          {/* <div className="container bottom-buttons-container">
            <button type="button" className="cancelbtn">Cancel</button>
            <span className="psw">Forgot <a href="/">password?</a></span>
          </div> */}
        </form>
      </Container>
    </Wrapper>
  );
}
export default Login;