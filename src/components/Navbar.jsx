import { Search, ShoppingCartOutlined  } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAuth } from './security/AuthContext';

const Container = styled.div`
    height:60px;
    margin-bottom: 20px;
`;
const Warrpper = styled.div`
    padding:10px 20px;
    display: flex;
    align-items: center;
    justify-content:space-between;
`;
const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size:14px;
    cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 1px solid lightgrey;  
  display: flex;
  align-items: center; 
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
    border:none;
`
const Logo = styled.h1`
    font-weight: bold;
`
const Center = styled.div`    
    flex:1;
    text-align:center;
`;
const Right = styled.div`    
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`
const Button = styled.button`
    border: none;
    cursor: pointer;
    background-color: none;
    color: none;
`

const Navbar = () => {

    const navigate = useNavigate()

    const authContext = useAuth()

    const carts = authContext.cart

    function handleShowCart(){
        navigate('/cart')
    }

  return (
    <Container>
        <Warrpper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input></Input>
                    <Search style={{color:"gray", fontSize:16}}></Search>
                </SearchContainer>
            </Left>
            <Center><Logo>LAMA.</Logo></Center>
            <Right>

                <MenuItem>REGISTER</MenuItem>
                <MenuItem>SIGN IN</MenuItem>
                <MenuItem>
                    <Badge badgeContent={carts.length} color="primary">
                    <Button onClick={handleShowCart}><ShoppingCartOutlined color="action" /></Button>
                    </Badge>
                </MenuItem>
            </Right>
        </Warrpper>
    </Container>
  )
}

export default Navbar
