import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {popularProducts} from "../data"
import Product from './Product'
import { retrieveProducts } from './api/ProductApiService'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = () => {
  const [products, setProducts] = useState([])

  const [isSetProducts,  setIsSetProducts] = useState(false)

  useEffect( () => {refreshProductList()} , [] )

  async function refreshProductList(){
    await retrieveProducts()
          .then(response => {
              setProducts(response.data)
              console.log(response.data)
              setIsSetProducts(true)
          }
          )
          .catch(error => console.log(error))
  }

  return (
    <Container>
        {products.map((item) => (
            <Product item = {item} key={item.productID}/>
        ))}
    </Container>
  )
}

export default Products
