import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../components/security/AuthContext";
import { changePasswordUser } from "../components/api/UserApiService";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import { Button,  Grid, TextField } from "@mui/material";


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
  color: red;
  font-size: 14px;
  text-align: center;
  padding: 10px;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const CenterGird = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`

const LinkCus = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ChangePassword = () => {


  const navigate = useNavigate()

  const authContext = useAuth()
   
  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .trim()
      .strict(true)
      .min(5, 'Your old password must be at least 5 characters!')
      .max(25, 'Your old password must be under 25 characters!')
      .required('You must fill in this section!'),
    newPassword: Yup.string()
      .min(5, 'Your new password must be at least 5 characters!')
      .max(25, 'Your new password must be under 25 characters!')
      .required('You must fill in this section!'),
    confirmPassword:Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('You must fill in this section!'),
  });

  const handleSubmit = (values,fun) => {
    console.log(values)
    changePasswordUser(values)
    .then(response => {
        let status = response.status
        let message = response.data
        console.log(response)
        fun.resetForm()
        notify(status, message )
    })
    .catch(error => notify(400, error.response.data))
}

function notify (status, message) {
  if(status == 202 || status == 200){
      toast.success('🦄' + message, {
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
      toast.error('🦄 Change password fail! ' + message, {
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
        <Title>CHANGE PASSWORD</Title>
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
        <Formik initialValues={{userName: authContext.username,oldPassword: "", newPassword:"", confirmPassword:""}}
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
                <Grid  >
                      <div>
                      <TextField 
                          label="Old Password"
                          value={values.oldPassword == null ? "" : values.oldPassword}
                          name="oldPassword"
                          type="password"
                          onChange={ handleChange}
                          onBlur={handleBlur}
                          sx={{margin: "20px 20px 0 20px",width:"90%"}}/>
                        {touched.oldPassword &&  <ErrorMessage>{errors.oldPassword}</ErrorMessage>}
                      </div>
                      <div>
                      <TextField label="New Password"
                          value={values.newPassword == null ? "" : values.newPassword}
                          name="newPassword"
                          type="password"
                          onChange={ handleChange}
                          onBlur={handleBlur}
                          sx={{margin: "20px 20px 0 20px",width:"90%"}}/>
                        { touched.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}
                      </div>
                      <div>
                      <TextField label="Confirm Password"
                          value={values.confirmPassword == null ? "" : values.confirmPassword}
                          name="confirmPassword"
                          type="password"
                          onChange={ handleChange}
                          onBlur={handleBlur}
                          sx={{margin: "20px 20px 0 20px",width:"90%"}}/>
                        {touched.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                      </div>
                    <CenterGird> 
                      <Button type='submit' sx={{width:"80%", padding:"10px", marginTop:"10px", backgroundColor:"black", color:"white"}}>
                          Submit
                      </Button>
                    </CenterGird>
                </Grid>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default ChangePassword;