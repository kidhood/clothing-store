import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { apiClient } from '../../api/ApiClient'
import { useAuth } from '../../security/AuthContext'

const Container = styled.div`
    
`
const OAuth2RedirectHandler = () => {

    const params = new URLSearchParams(window.location.search) // id=123

    const navigate = useNavigate()

    const authContext = useAuth()

    let token = params.get('token')
    
    if(token){
        authContext.loginWithGoogle(token)
        navigate('/home')
    }else{
        navigate('/login') 
    }

    
  return (
    <Container>
      
    </Container>
  )
}

export default OAuth2RedirectHandler
