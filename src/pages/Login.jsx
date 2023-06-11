import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../components/security/AuthContext";
import { Google} from "@mui/icons-material";
import { GOOGLE_AUTH_URL } from "../constants/Url.js";
import * as Yup from 'yup';
import { Grid, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Form, Formik } from "formik";
// import { GOOGLE_AUTH_URL } from '../constants'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const ErrorMessage = styled.div`
    margin-top: 0;
  font-size: 14px;
  color: red;
`


const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  border-radius: 20px;
  width: 80%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px auto;
`;

const LoginButton = styled.div`
  margin-top: 10px;
  display: flex;
`

const LinkCus = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;

const SocialButton = styled.div`
  max-width: 70%;
  border: 1px solid lightgrey;
  border-radius: 20px;
  padding: 10px 20px;
  text-align: center;
  background-color: lightgrey;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
`

const SocialLogin = styled.a`

  text-decoration: none;
  color: black;
  margin-left: 10px;
`

const Login = () => {


  const navigate = useNavigate()

  const authContext = useAuth()

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .strict(true)
      .min(5, 'Your user name must be at least 5 characters!')
      .max(25, 'Your user name must be under 25 characters!')
      .required('You must fill in this section!'),
    password: Yup.string()
      .min(5, 'Your password must be at least 5 characters!')
      .max(25, 'Your password must be under 25 characters!')
      .required('You must fill in this section!'),
  });


  async function handleSubmit(values){
    console.log(values)
    if(await authContext.login(values.username, values.password) ){
        navigate('/home')
    }else{
      
    }
  }


  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <ToastContainer 
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        <Formik initialValues={{username:"",password:""}}
                // enableReinitialize = {true}
                validationSchema ={validationSchema}
                validateOnChange = {true}
                validateOnBlur = {true}
                onSubmit={handleSubmit}
                >
                
          {
            ({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              
              <Form>
                <Grid>
                        <div>
                        <TextField label="User Name"
                            value={values.username == null ? "" : values.username}
                            name="username"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"90%"}}/>
                          { values.username && touched.username && <ErrorMessage>{errors.username}</ErrorMessage>}
                        </div>
                        <div>
                        <TextField 
                            label="Password"
                            value={values.password == null ? "" : values.password}
                            name="password"
                            type="password"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"90%"}}/>
                          {touched.password &&  <ErrorMessage>{errors.password}</ErrorMessage>}
                        </div>
                        <LoginButton>
                            <Button type='submit'>
                            Login
                          </Button>
                        </LoginButton>
                        <SocialButton>
                        <Google />
                        <SocialLogin href={GOOGLE_AUTH_URL}>Login With Google</SocialLogin>
                      </SocialButton>
                      <LinkCus><Link>DO YOU NOT REMEMBER THE PASSWORD?</Link></LinkCus>
                      <LinkCus><Link to="/register">CREATE A NEW ACCOUNT</Link></LinkCus>
                </Grid>
              </Form>
              
            )
          }
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Login;