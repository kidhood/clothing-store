import * as React from 'react';
import Paper from '@mui/material/Paper';
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
const Title = styled.h1`
    
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
                <CustomerInforForm customer = {customer}/>
            </Paper>
        </Container> 
    </Warapper>
    
  );
}