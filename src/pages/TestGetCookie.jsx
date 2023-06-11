import React, { useEffect, useState } from 'react'
import { apiClient } from '../components/api/ApiClient'
import axios from 'axios'

const TestGetCookie = () => {
    const [data,setDate] = useState('')
    useEffect( () => {refresh()},[data])
    
    async function refresh () {
        try{
            const hihi  = await apiClient.get('/api/v1/users/get-cookie')
            .then(response => setDate(response.data))      
            console.log(hihi)   
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div>
        <b>{data}</b>
    </div>
  )
}

export default TestGetCookie
