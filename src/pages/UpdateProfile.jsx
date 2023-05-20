import * as React from 'react';
import Paper from '@mui/material/Paper';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputRounded } from '@mui/icons-material';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useAuth } from '../components/security/AuthContext';
import { retrieveCusByUserName } from '../components/api/CustomerApiService';
import CustomerInforForm from './Customer/CustomerInforForm';


const Warapper = styled.div`
   
`

const Container = styled.div`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -15%;
    margin-left: -25%;
    width: 50%;
    height: 50%;
`
const Title = styled.h3`
    
`

const TwoInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const InputLeft = styled.input` flex: 1;
    min-width: 40%;
    margin: 10px 10px;
    padding: 10px;
`

const InputRight = styled.input` flex: 1;
    min-width: 40%;
    margin: 10px 10px;
    padding: 10px;
`

const Button = styled.button`
    width: 80%;
    color: white;
    background-color: black;
    height: 40px;
    cursor: pointer;

    &:hover{
        background-color: white;
        color: black;
    }
`


export default function UpdateProfile() {

  const authContext = useAuth()

  const username = authContext.username

  const [firstName, setFirstName] = React.useState('')

  const [lastName, setLastName] = React.useState('')

  const [email, setEmail] = React.useState('')

  const [phone, setPhone] = React.useState('')

  const [line, setLine] = React.useState('')

  const [city, setCity] = React.useState('')

  const [country, setCountry] = React.useState('')

  const [customer, setCustomer] = React.useState('')

  React.useEffect( () => {refreshCustomer()}, [username])
  
   const refreshCustomer = async () => {
    console.log(username)
    const account = {
        username: username,
        password: ''
    }
    if(username){
        await retrieveCusByUserName(account)
        .then(response => {setCustomer(response.data)
                
            }   
            )
        .catch(error => console.log(error))
    }
  }


  return (
    <Warapper>
        <Navbar/>
        <Container >
            <Title>Update Profile</Title>
            <Paper>
                {/* <TwoInput>
                    <InputLeft placeholder='First Name' onChange={ (e) => setFirstName(e.target.value)} />
                    <InputRight placeholder='Last Name' onChange={ (e) => setLastName(e.target.value)}/>
                </TwoInput>
                <TwoInput>
                    <InputLeft placeholder='Email' onChange={ (e) => setEmail(e.target.value)}/>
                    <InputRight placeholder='Phone Number' onChange={ (e) => setPhone(e.target.value)}/>
                </TwoInput>
                <TwoInput>
                    <InputLeft placeholder='Line' onChange={ (e) => setLine(e.target.value)} />
                    <InputRight placeholder='City'onChange={ (e) => setCity(e.target.value)}/>
                </TwoInput>
                <TwoInput>
                    <InputLeft placeholder='Country' onChange={ (e) => setCountry(e.target.value)}/>
                </TwoInput>
                <TwoInput>
                    <Button onClick={handleUpdateProfile}>Update Profile</Button>
                </TwoInput>    */}
                <CustomerInforForm customer = {customer}/>
            </Paper>
        </Container> 
    </Warapper>
    
  );
}