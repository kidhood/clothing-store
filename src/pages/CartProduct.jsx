import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Add, Remove } from "@mui/icons-material";
import { useAuth } from "../components/security/AuthContext";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkOut } from "../components/api/OrderApiService";
import { ToastContainer, toast } from "react-toastify";
import { FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const ButtonRemove = styled.button `
  border: none;
  background-color: white;
  cursor: pointer;
  margin-right: ${(props) => props.mar !== "none" && "20px"} ;
`

const RemoveProduct = styled.div`
  padding: 10px;
  background-color: red;
  color: white;
  border: 2px solid lightgray;
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-bottom: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
`;

const CartProduct = () => {

  const authContext = useAuth()

  const carts = authContext.cart

  const setCart = authContext.setCart

  const navigate = useNavigate()

  const itemsPrice = carts.reduce( (a,c ) => a + c.sellPrice * c.amount , 0)

  const taxPrice = itemsPrice * 0.14;

  const shippingPirce = itemsPrice > 1000 ? 0 : itemsPrice * 0.01;

  const totalPrice = itemsPrice + taxPrice + shippingPirce;


  const handleToProductList = () => {
    navigate('/productlist')
  }

  const handleIncrease = (product) => {
    console.log(carts)
    const exist = carts.find((x)  => x.id === product.id)
    setCart(
      carts.map( (x) => 
          x.id === product.id ? {...exist, amount: exist.amount + 1} : x
      )
  )
  }

  const handleDescrease = (product) => {
    if(product.amount > 1){
      const exist = carts.find((x)  => x.id === product.id)
      setCart(
        carts.map( (x) => 
            x.id === product.id ? {...exist, amount: exist.amount - 1} : x
        )
      )
    }else{
      hanldeRemove(product)
    }
  }

  const hanldeRemove = (product) => {
    const exist = carts.find((x)  => x.id === product.id)
    if(exist != null){
      setCart( carts.filter( (x) => x.id !== product.id)  )
    }
  }

  const handleCheckOut =() => {
    if(authContext.isAuthenticated){
      const transformedCarts = carts.map(cart => {
        const cartItem = {
          productId: cart.productID,
          amount: cart.amount,
          size: cart.sizes
        };
        return cartItem;
      });
      checkOut(transformedCarts)
        .then(response => console.log(response))
        .catch(error => console.log(error))
      console.log(transformedCarts);
    }else{
      setTimeout( () => {
        notify(400,"")
      },100)
      navigate('/login')
    }
  }

  function notify (status, message) {
    if(status == 202 || status == 200){
        toast.success('🦄' + message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }else if(status == 400 || status == 500){
        toast.error('🦄 Please login to checkout order! ', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
  }

  return (
    <>
    <Container>
      <Navbar />
      <ToastContainer 
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={handleToProductList}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({ carts.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={handleCheckOut}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            { 
              carts.map(item => (
                <div>
                <Product>
                  <ProductDetail>
                    <Image src={  item.imageUrl} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> { item.productName}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> { item.productID}
                      </ProductId>
                      <ProductColor color="black" />
                      <ProductSize>
                        <b>Size:</b> {item.sizes}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ButtonRemove onClick={() => {handleIncrease(item)}} mar="none">
                        <Add />
                      </ButtonRemove>
                      <ProductAmount>{ item.amount}</ProductAmount>
                      <ButtonRemove onClick={() =>  handleDescrease (item)} mar="none">
                        <Remove />
                      </ButtonRemove>
                    </ProductAmountContainer>
                    <ProductPrice>$ {Math.round(item.sellPrice * item.amount * 100) / 100}</ProductPrice>
                  </PriceDetail>
                  <ButtonRemove onClick={() => hanldeRemove(item)}>
                      <RemoveProduct>REMOVE</RemoveProduct>
                  </ButtonRemove>
              </Product>
              <Hr/>
              </div>
              ))
            }
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {itemsPrice.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {shippingPirce}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Tax Price</SummaryItemText>
              <SummaryItemPrice>$ {taxPrice.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <Hr/>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <Hr/>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {totalPrice.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <FormLabel id="demo-radio-buttons-group-label">Payment method</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                    <FormControlLabel value="vnpay" control={<Radio />} label= 
                              {<Typography sx={{fontSize: 14}}>VN PAY</Typography>} />
                    <FormControlLabel value="cod" control={<Radio />} label= 
                              {<Typography sx={{fontSize: 14}}>COD</Typography>} />
                  </RadioGroup>
            <Button onClick={handleCheckOut}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
    <Footer />
    </>
  );
};

export default CartProduct;