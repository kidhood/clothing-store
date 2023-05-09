import React, { useEffect, useMemo, useState } from 'react'
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { Add, Remove } from "@mui/icons-material";
import { retrieveProductById} from "../components/api/ProductApiService";
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/security/AuthContext';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  margin-top: 20px;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
`;

const Image = styled.img`
  width: 70%;
  height: 80vh;
  /* object-fit: cover; */
  margin: auto;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterCategory = styled.div`
  font-size: 14;
  margin: 0 10px;
  border: 1px solid lightgrey;
  padding: 10px;
  width: 55px;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: ${props => props.name === "operator" ? "" : "15px"} ;
  border: ${props => props.name === "operator" ? "none" : "2px solid teal"} ;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

 const Product = () => {

  const authContext = useAuth()

  const {id} = useParams()

  const [amount, setAmount] = useState(1)

  const [product, setProduct] = useState([])

  const [isSetProduct, setIsSetProduct] = useState(false)

  const [size, setSize] = useState('')

  useEffect( () => {
    refreshProduct();
    }, [id] )

  async function refreshProduct (){
    await retrieveProductById(id)
      .then (  (response) => {
         setProduct(response.data);
         setIsSetProduct(true);
         console.log(response.data);
      }
      )
      .catch(error => console.log(error))     
  }

  

  function increaseAmount(){
    setAmount(amount + 1)
  }

  function decreaseAmount(){
    if(amount > 0){
      setAmount(amount - 1)
    }
  }


  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src= { isSetProduct == true ?product.imageUrl : ""} />
        </ImgContainer>
        <InfoContainer>
          <Title>{ isSetProduct && product.productName}</Title>
          <Desc>
            {isSetProduct && product.description}
          </Desc>
          <Price>$ {isSetProduct && product.sellPrice}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Category</FilterTitle>
              <FilterCategory>{isSetProduct && product.category.categoryName}</FilterCategory>
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={e => setSize(e.target.value)}>
                {isSetProduct &&
                  product.sizes.map(
                    size => (
                      <FilterSizeOption key={size.sizeID}>{size.sizeName}</FilterSizeOption>
                    )
                  )
                }
                
                
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Button name="operator" onClick={ ()=>  decreaseAmount() } >
                <Remove />
              </Button>
              <Amount>{amount}</Amount>
              <Button name="operator" onClick={ () => increaseAmount() } >
                <Add />
              </Button>
            </AmountContainer>
            <Button onClick={ () => authContext.addToCart(product, size === "" ? 'M' : size,amount  )}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;