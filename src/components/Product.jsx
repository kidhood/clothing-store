import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from './security/AuthContext'
import { ToastContainer, toast } from 'react-toastify'

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor:pointer;
`
const Container = styled.div`
    flex:1;
    margin: 5px;
    min-width: 280px;
    max-height: calc(100%/4);
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`

const Image = styled.img`
    height: 75%;
    z-index: 1;
`

const Icon = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`


const Product = ({item}) => {

    const navigate = useNavigate()

    const authContext = useAuth()

    function showMoreInfor (id){
        console.log(id)
        navigate(`/products/${id}`)
    }

    const hanldeAdd = () => {
        toast.success('Add to cart success!', {
            position: "top-right",
            autoClose: 250,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }

  return (
    <Container>
        <ToastContainer
          position="top-right"
          autoClose={250}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
        <Circle/>
        <Image src={item.imageUrl} />
        <Info>
            <Icon onClick={ () => {authContext.addToCart(item, 'M', 1) ;hanldeAdd()}}>
                <ShoppingCartOutlined/>
            </Icon>
            <Icon onClick={ () => showMoreInfor(item.productID) }>
                <SearchOutlined/>
            </Icon>
            <Icon>
                <FavoriteBorderOutlined/>
            </Icon>
        </Info>
    </Container>
  )
}

export default Product
