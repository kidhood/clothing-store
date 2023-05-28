import { useState } from "react";
import styled from "styled-components";
import { registerUser } from "../components/api/UserApiService";
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Message = styled.h3`
  font-size: 18px;
  background-color: yellow;
  color: black;
  padding: 10px;
  text-align: center;
`;


const Button = styled.button`
  text-align: center;
  margin: 20px auto;
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  margin-top: 0;
  font-size: 14px;
  color: red;
`

const Register = () => {


  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid Email')
      .required('You must fill in this section!'),
    firstName: Yup.string()
      .min(5, 'Your first name must be at least 5 characters!')
      .max(25, 'Your first name must be under 25 characters!')
      .required('You must fill in this section!'),
    lastName: Yup.string()
      .min(5, 'Your last name must be at least 5 characters!')
      .max(25, 'Your last name must be under 25 characters!')
      .required('You must fill in this section!'),
    userName: Yup.string()
      .trim()
      .strict(true)
      .min(5, 'Your user name must be at least 5 characters!')
      .max(25, 'Your user name must be under 25 characters!')
      .required('You must fill in this section!'),
    password: Yup.string()
      .min(5, 'Your password must be at least 5 characters!')
      .max(25, 'Your password must be under 25 characters!')
      .required('You must fill in this section!'),
    matchingPassword:Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('You must fill in this section!'),
  });

  const handleSubmit = (values,fun) => {
      console.log(values)
      registerUser(values)
      .then(response => {
          let status = response.status
          let message = response.data
          console.log(response)
          fun.resetForm()
          notify(status, message )
      })
      .catch(error =>notify(500, '') )
  }

  function notify (status, message) {
    if(status == 202){
        toast.success('🦄 Register successfully ' + message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }else if(status == 400 || status == 500){
        toast.error('🦄 Register fail! ' + message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
}

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
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
        <Formik initialValues={{firstName:"",lastName:"",userName:"",email:"", password:"",matchingPassword:""}}
                enableReinitialize = {true}
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
                <Grid container>
                    <Grid item xs={6}>
                        <div>
                        <TextField 
                            id="firstName"
                            label="First Name"
                            value={values.firstName == null ? "" : values.firstName}
                            name="firstName"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          {values.firstName && touched.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage> }
                        </div>
                        <div>
                        <TextField label="User Name"
                            value={values.userName == null ? "" : values.userName}
                            name="userName"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          { values.userName && touched.userName && <ErrorMessage>{errors.userName}</ErrorMessage>}
                        </div>
                        <div>
                        <TextField 
                            label="Password"
                            value={values.password == null ? "" : values.password}
                            name="password"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          {touched.password &&  <ErrorMessage>{errors.password}</ErrorMessage>}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                    <div>
                        <TextField label="Last Name"
                            value={values.lastName == null ? "" : values.lastName}
                            name="lastName"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          { touched.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
                        </div>
                        <div>
                        <TextField label="Email"
                            value={values.email == null ? "" : values.email}
                            name="email"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          { touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                        </div>
                        <div>
                        <TextField label="Confirm password"
                            value={values.matchingPassword == null ? "" : values.matchingPassword}
                            name="matchingPassword"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          {touched.matchingPassword && <ErrorMessage>{errors.matchingPassword}</ErrorMessage>}
                        </div>
                    </Grid>
                      <Button type='submit'>
                        Submit
                      </Button>
                </Grid>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Register;