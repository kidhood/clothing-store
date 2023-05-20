import { AccountCircle, Edit, Help, Inbox, Logout, ManageAccounts, Password, Search, Settings, ShoppingCartOutlined  } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAuth } from './security/AuthContext';
import { changePasswordUser} from './api/UserApiService';

const Container = styled.div`
    height:60px;
    margin-bottom: 20px;
`;
const Warrpper = styled.div`
    padding:10px 20px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    /* background-color: #DCDCDC; */
    
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

const DropdownMenu = styled.div`
     position: absolute;
    top: 100px;
    right: 20px;
    background-color: #fff;
    border-radius: var(--border-radius);
    padding: 10px 20px;
    width: 200px;
    border: 1px solid lightgrey;

    opacity: 1;
    visibility: ${props => props.visibily === 'active'?'visible':'hidden'};
    z-index: 3;
    transform: ${props => props.visibily === 'active'?'translateY(0)':'translateY(-20px)'};
    transition: var(--speed) ease;

    &::before{
        content: '';
        position: absolute;
        top: -5px;
        right: 20px;
        height: 20px;
        width: 20px;
        background: var(--secondary-bg);
        transform: rotate(45deg);
    }
`



const UserName = styled.h3`
     width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
    font-weight: 500;
    font-size: 18px;
    color: var(--primary-text-color);
    line-height: 1.2rem;
`

const ListDropdownItem = styled.ul`
    list-style: none;
    padding: 10px  0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
`

const DropdownItem = styled.div`
    margin: auto;
    display: flex;
`

const DropdownItemIcon = styled.div`
     max-width: 20px;
    margin-right: 10px;
    opacity: 0.5;
    transition: var(--speed);
`
const DropdownItemLi = styled.li`
    padding: 10px  0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    margin: 10px 40px;
    align-items: center;
    



     &:hover{
        color: rgb(212, 33, 9);
        cursor: pointer;
     }
`
const DropdownItemA = styled.a`
    color: rgb(212, 33, 9);
    cursor: pointer;
    max-width: 100px;
    margin-left: 10px;
    transition: var(--speed);
`

const Button = styled.button`
    border: none;
    cursor: pointer;
    background-color: white;
    color: none;
`
const Hr = styled.hr`
    color: lightgrey;
    opacity: 0.3;
`

const Navbar = () => {

    const navigate = useNavigate()

    const authContext = useAuth()

    const carts = authContext.cart

    const isAuthenticated = authContext.isAuthenticated

    const [open, setOpen] = useState(false);

    function handleShowCart(){
        navigate('/cart')
    }

    function handleSignIn(){
        navigate('/login')
    }

    function handleRegister() {
        navigate('/register')
    }

    function handleLogout () {
        authContext.logout()
    }

    function handleChangePassword(){
        navigate('/user/changepassword')
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
            <Button onClick={() => navigate('/')}><Center><Logo>Clothing-Store</Logo></Center></Button>
            <Right>
                {isAuthenticated && 
                                        <MenuItem>
                                            <IconButton onClick={() => setOpen(!open)}>
                                                <ManageAccounts/>
                                            </IconButton>
                                            <DropdownMenu visibily={open ? 'active' : 'inactive'}>
                                                <UserName>{authContext.username}</UserName>
                                                <ListDropdownItem>
                                                    {/* <DropdownItem><DropdownItemFunction func = {() => navigate('/user/updateprofile')} icon = {<AccountCircle/>} text = {"My Profile"}/></DropdownItem> */}
                                                    <DropdownItem><DropdownItemFunction func = {() => navigate('/user/updateprofile')} icon = {<Edit/>} text = {"Edit Profile"}/></DropdownItem>
                                                    <DropdownItem><DropdownItemFunction func = {handleChangePassword} icon = {<Password/>} text = {"Edit Password"}/></DropdownItem>
                                                    <DropdownItem><DropdownItemFunction icon = {<Settings/>} text = {"Settings"}/></DropdownItem>
                                                    <DropdownItem><DropdownItemFunction icon = {<Help/>} text = {"Helps"}/></DropdownItem>
                                                    <DropdownItem><DropdownItemFunction func = { handleLogout} icon = {<Logout/>} text = {"Logout"}/></DropdownItem>
                                                </ListDropdownItem>
                                            </DropdownMenu>
                                        </MenuItem>
                }
                {!isAuthenticated && 
                    <Right>
                        <MenuItem><Button onClick={handleRegister}>REGISTER</Button></MenuItem>
                        <MenuItem><Button onClick={handleSignIn}>SIGN IN</Button></MenuItem>
                    </Right>
                }
                
                <MenuItem>
                    <Badge badgeContent={carts.length} color="primary">
                    <IconButton onClick={handleShowCart}><ShoppingCartOutlined color="action" /></IconButton>
                    </Badge>
                </MenuItem>  
            </Right>
        </Warrpper>
        <Hr/>
    </Container>
  )
}

function DropdownItemFunction(props){
    
    return(
      <DropdownItemLi onClick={() => props.func() } className = 'dropdownItem'>      
        <DropdownItemIcon>{props.icon}</DropdownItemIcon>
        <DropdownItemA> {props.text} </DropdownItemA>
      </DropdownItemLi>
    );
  }

export default Navbar
