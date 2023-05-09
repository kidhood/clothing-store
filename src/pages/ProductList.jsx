import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Sizes from "../components/Sizes";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {

  const [filterSize, setFilterSize] = useState('')

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Clothing</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select defaultValue={'DEFAULT'}>
            <Option disabled value="DEFAULT">
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          
          <Sizes setFilterSize={setFilterSize}></Sizes>

        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select defaultValue={'DEFAULT'}>
            <Option disabled value="DEFAULT">Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <Products filterBySize={filterSize} />

      <Newsletter />

      <Footer />
    </Container>
  );
};

export default ProductList;