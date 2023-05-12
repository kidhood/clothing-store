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

const Products = (props) => {
  const [products, setProducts] = useState([])

  const [isSetProducts,  setIsSetProducts] = useState(false)

  const filterBySize = props.filterBySize

  useEffect( () => {refreshProductList()
                     } , [filterBySize] )

  async function refreshProductList(){
    await retrieveProducts()
          .then(response => {
              setProducts(response.data)
              setIsSetProducts(true)
          }
          )
          .catch(error => console.log(error))
  }

  return (
    <Container>
        {products.filter( (item) => {
            return (filterBySize === "" || filterBySize == null) ? item : item.sizes.some( size  => size.sizeName === filterBySize)
        }       
        ).map((item) => (
            <Product item = {item} key={item.productID}/>
        ))}
    </Container>
  )
}

export default Products
