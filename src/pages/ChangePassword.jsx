import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../components/security/AuthContext";
import { changePasswordUser } from "../components/api/UserApiService";
import { Try } from "@mui/icons-material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const ErrorMessage = styled.div`
  background-color: yellow;
  font-size: 18px;
  text-align: center;
  padding: 10px;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const LinkCus = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ChangePassword = () => {


  const navigate = useNavigate()

  const authContext = useAuth()

  const [oldPassword, setOldPassword] = useState('')

  const [newPassowrd, setNewPassowrd] = useState('')

  const [comNewPassword, setComNewPassword] = useState('')

  const [message, setMessage] = useState(null)

  useEffect( ()  => { 
      if(message){
        checkChangePassword()
      }
   }, [message])

  async function handleSubmit() {
    if (oldPassword == '' || newPassowrd == '' || comNewPassword == '') {
      setMessage("PLease fill all input")
      return
    } else {
      if (newPassowrd != comNewPassword) {
        setMessage("Comfirm new password does not match!")
        return
      }
    }
    const passwordModel = {
      userName: authContext.username,
      oldPassword: oldPassword,
      newPassword: newPassowrd
    }
    
    changePasswordUser(passwordModel)
      .then( (response) =>  setMessage(response.data))
      .catch( (error) => console.log(error))

  }

  function checkChangePassword() {
    if (message.indexOf("Succesfully") > -1) {
      setTimeout(() => { navigate('/login')}, 1000)
      authContext.logout()
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CHANGE PASSWORD</Title>
        {message && <ErrorMessage>{message}</ErrorMessage>}
        <Form>
          <Input type="password" placeholder="oldPassword" onChange={(e) => setOldPassword(e.target.value)} />
          <Input type="password" placeholder="new password" onChange={(e) => setNewPassowrd(e.target.value)} />
          <Input type="password" placeholder="comfirm new password" onChange={(e) => setComNewPassword(e.target.value)} />
          <Button onClick={handleSubmit}>CHANGE PASSWORD</Button>
          <LinkCus><Link to="/register">CREATE A NEW ACCOUNT</Link></LinkCus>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ChangePassword;