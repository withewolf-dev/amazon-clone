import React from "react";
import styled from "styled-components";
import Product from "./Product";
interface Props {}

const Home = (props: Props) => {
  return (
    <Section>
      <Banner src="images/banner.png" />
      <RowOne>
        <Product
          Id="166627"
          image="https://m.media-amazon.com/images/I/81AaNJqE+wS._AC_SY741_.jpg"
          price={89999}
          rating={4}
          title="
        Apple iPhone 11 Pro, 256GB, Midnight Green -256GB Apple iPhone 11 Pro, 256GB, Midnight Green -256GB"
          key={"4444"}
        />
        <Product
          Id="166827"
          image="https://m.media-amazon.com/images/I/81AaNJqE+wS._AC_SY741_.jpg"
          price={89999}
          rating={4}
          title="
        Apple iPhone 11 Pro, 256GB, Midnight Green Apple iPhone 11 Pro, 256GB, Midnight Green"
          key={"6666"}
        />
        <Product
          Id="144827"
          image="https://m.media-amazon.com/images/I/81AaNJqE+wS._AC_SY741_.jpg"
          price={89999}
          rating={4}
          title="
        Apple iPhone 11 Pro, 256GB, Midnight Green Apple iPhone 11 Pro, 256GB, Midnight Green"
          key={"66556"}
        />
      </RowOne>
    </Section>
  );
};

const Banner = styled.img`
  width: 100%;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: -1;
  margin-bottom: -150px;
`;

const RowOne = styled.div`
  display: flex;
  z-index: 1;
  margin-left: 5px;
  margin-right: 5px;
`;
const Section = styled.div`
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
`;
export default Home;
