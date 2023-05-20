import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../components/security/AuthContext";
import { Google} from "@mui/icons-material";
import { GOOGLE_AUTH_URL } from "../constants/Url.js";
// import { GOOGLE_AUTH_URL } from '../constants'

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
  color: black;
`;

const SocialButton = styled.div`
  min-width: 40%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 15px 20px;
  text-align: center;
  background-color: lightgrey;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SocialLogin = styled.a`
  text-decoration: none;
  color: black;
  margin-left: 10px;
`

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
          <SocialButton>
            <Google />
            <SocialLogin href={GOOGLE_AUTH_URL}>Login With Google</SocialLogin>
          </SocialButton>
          <LinkCus><Link>DO YOU NOT REMEMBER THE PASSWORD?</Link></LinkCus>
          <LinkCus><Link to="/register">CREATE A NEW ACCOUNT</Link></LinkCus>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;