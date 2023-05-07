import React, { useEffect, useState } from 'react'
import { retrieveSizes } from './api/SizeApiService'
import styled from 'styled-components'


const Container = styled.div`
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Sizes = () => {

    const [sizes, setSizes] = useState([])

    useEffect( () => {refreshSizes()} , [])

    async function refreshSizes(){
        await retrieveSizes()
            .then(reponse => {
                setSizes(reponse.data)
                console.log(reponse.data)
            })
            .catch(error => console.log(error))
    }

  return (
    <Container>
        <Select defaultValue={'DEFAULT'}>
            <Option disabled value="DEFAULT">
              Size
            </Option>
            {sizes.map(
                (size) => (
                    <Option key={size.sizeID} value={size.sizeName}>{size.sizeName}</Option>
                ) 
            )}
          </Select>
    </Container>
  )
}

export default Sizes
