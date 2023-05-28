import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField, colors } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCusProfile } from '../../components/api/CustomerApiService';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Controls from "../../components/controls/Controls";
import Input from '../../components/controls/Input';

const ErrorMessage = styled.p`
  margin-top: 0;
  font-size: 14px;
  color: red;
`

export default function CustomerInforForm  (props)  {
    const firstvalue = props.customer

    const [value, setValues ] =  useState(firstvalue)

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
        phoneNumber: Yup.string()
          .matches(/^[0-9]{10}$/, 'Please enter a valid phone number')
          .required('You must fill in this section!'),
        address: Yup.object().shape({
          line: Yup.string()
            .min(5, 'Your line must be at least 5 characters!')
            .max(25, 'Your line must be under 25 characters!')
            .required('You must fill in this section!'),
          city: Yup.string()
            .min(5, 'Your city must be at least 5 characters!')
            .max(25, 'Your city must be under 25 characters!')
            .required('You must fill in this section!'),
          country: Yup.string()
            .min(5, 'Your country must be at least 5 characters!')
            .max(25, 'Your country must be under 25 characters!')
            .required('You must fill in this section!'),
        }),
      });
  
    useEffect( () => {
                setValues(props.customer)
            },
                [props]
            )

    const handleInputChange = e => {
        const {name,value} = e.target
        setValues({
            ...value,
            [name]:value
        })
    }

    const handleInputAddressChange = (e) => {
        const { name, value } = e.target;
        setValues((value) => ({
          ...value,
          address: {
            ...value.address,
            [name]: value,
          },
        }));
      };

    const handleSubmit = async (values) => {
        console.log(values)
        let success = 0;
        updateCusProfile(values)
            .then(response => {
                success = response.status
                notify(success)
            })
            .catch(error => console.log(error))
    }

    function notify (pros) {
        if(pros == 202){
            toast.success('🦄 Update profile successfully', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else if(pros == 400 || pros == 500){
            toast.error('🦄 Update profile fail!', {
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
    console.log(value)
  return (
    // <Form>
    <div  >
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
        <Formik initialValues={value} 
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
                        <TextField label="Phone Number"
                            value={values.phoneNumber == null ? "" : values.phoneNumber}
                            name="phoneNumber"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          { values.phoneNumber && touched.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
                        </div>
                        <div>
                        <TextField 
                          
                            label="Email"
                            value={values.email == null ? "" : values.email}
                            name="email"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          {touched.email &&  <ErrorMessage>{errors.email}</ErrorMessage>}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                        <TextField label="Line"
                            value={values.address?.line == null ? "" : values.address?.line}
                            name="address.line"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          { touched.address?.line && <ErrorMessage>{errors.address?.line}</ErrorMessage>}
                        </div>
                        <div>
                        <TextField label="City"
                            value={values.address?.city == null ? "" : values.address?.city}
                            name="address.city"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          { touched.address?.city && <ErrorMessage>{errors.address?.city}</ErrorMessage>}
                        </div>
                        <div>
                        <TextField label="Country"
                            value={values.address?.country == null ? "" : values.address?.country}
                            name="address.country"
                            type="text"
                            onChange={ handleChange}
                            onBlur={handleBlur}
                            sx={{margin: "20px 20px 0 20px",width:"80%"}}/>
                          {touched.address?.country && <ErrorMessage>{errors.address?.country}</ErrorMessage>}
                        </div>
                    </Grid>
                </Grid>
                <Button type='submit' sx={{padding:"10px", background:"green", color:"black", margin:"20px 0px 20px 0px", width:"40%"}
                  }>
                  Submit
                </Button>
              </Form>
            )
          }
        </Formik>
    </div>
  )
}


