import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import styled from 'styled-components'
import {sliderItems} from "../data"
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 0.5s ease-in;
    transform: translateX(${props => props.slideIndex * -100}vw);
`
const Silde = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: ${props => props.bg};
`
const ImgContainer = styled.div`
    flex:1;
    height: 100%;
`
const InfoContainer = styled.div`
    flex:1;
    padding: 50px;
`
const Title = styled.h1`
    font-size: 70px;
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`


const Image = styled.img`
    height: 80%;
`
const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const navigate = useNavigate()

    const handleClick = (direction)  => {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }

    }

    const showProductList = () => {
        navigate('/productlist')
    }

  return (
    <div>
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}> 
                <ArrowLeftOutlined/>
            </Arrow>
            <Wrapper slideIndex = {slideIndex}>
                {sliderItems.map((item) => (
                    <Silde bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img}/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>
                            {item.desc}                            
                        </Desc>
                        <Button onClick={ () => showProductList()}>SHOW NOW</Button>
                    </InfoContainer>
                     </Silde> 
                )) }
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined/>
            </Arrow >
        </Container>
    </div>
  )
}

export default Slider
