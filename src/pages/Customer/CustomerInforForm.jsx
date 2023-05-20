import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField, colors } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCusProfile } from '../../components/api/CustomerApiService';


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]


export default function CustomerInforForm  (props)  {
    const firstvalue = props.customer

    const [values, setValues ] =  useState(firstvalue)

    const [success, SetSuccess] = useState(null)
    
    useEffect( () => {
                setValues(props.customer)
            },
                [props]
            )

    const handleInputChange = e => {
        const {name,value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleInputAddressChange = (e) => {
        const { name, value } = e.target;
        setValues((values) => ({
          ...values,
          address: {
            ...values.address,
            [name]: value,
          },
        }));
      };

    const handleSubmit = async () => {
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
        }else if(props == 400 || props == 500){
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
        <Grid container>
            <Grid item xs={6}>
                <TextField 
                    name = "firstName"
                    type='text'
                    label = "First Name"
                    value = {values.firstName == null ? "" : values.firstName}
                    onChange={handleInputChange}
                    sx={{margin: "20px", width:"80%" }}
                />
            
                <TextField 
                    name = "phoneNumber"
                    type='number'
                    label = "Phone Number"
                    value = {values.phoneNumber == null ? "" :values.phoneNumber}
                    onChange={handleInputChange}
                    sx={{margin: "20px",width:"80%"}}
                />

                <TextField 
                    name = "line"
                    type='text'
                    label = "Line"
                    value = {values.address== null ? "" : values.address.line  }
                    onChange={handleInputAddressChange}
                    sx={{margin: "20px",width:"80%"}}
                />

                <TextField 
                    name = "country"
                    type='text'
                    label = "Country"
                    value = {values.address == null ? "" : values.address.country }
                    onChange={handleInputAddressChange}
                    sx={{margin: "20px",width:"80%"}}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    name = "lastName"
                    type='text'
                    label = "Last Name"
                    value = {values.lastName == null ? "" :values.lastName}
                    onChange={handleInputChange}
                    sx={{margin: "20px",width:"80%"}}
                />
                <TextField 
                    name = "email"
                    type='email'
                    label = "Email"
                    value = {values.email == null ? "" :values.email}
                    onChange={handleInputChange}
                    sx={{margin: "20px",width:"80%"}}
                />
                <TextField 
                    name = "city"
                    type='text'
                    label = "City"
                    value = {values.address == null ? "" : values.address.city}
                    onChange={handleInputAddressChange}
                    sx={{margin: "20px",width:"80%"}}
                />
            </Grid>
            <Button variant="contained" color="success" type='submit' sx={{margin: "auto", Padding: "20px", marginBottom: "20px", width:"40%"}} onClick={handleSubmit}>
                Submit
            </Button>
        </Grid>
    </div>
  )
}


