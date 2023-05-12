import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../components/security/AuthContext";

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
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {


  const navigate = useNavigate()

  const authContext = useAuth()

  const [username, setUsername] = useState('')

  const [passowrd, setPassword] = useState('')

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  async function handleSubmit(){
    if(await authContext.login(username, passowrd) ){
        navigate('/home')
    }else{
      setShowErrorMessage(true)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        {showErrorMessage && <ErrorMessage>Authentication Failed. 
                                                            Please check your credentials.</ErrorMessage>}
        <Form>
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleSubmit}>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;