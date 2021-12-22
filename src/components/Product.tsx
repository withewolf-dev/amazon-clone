import React from "react";
import styled from "styled-components";
import RatingIcon from "@mui/material/Rating";
import "./product.css";
interface Props {
  Id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
}

const Product = ({ Id, title, price, image, rating }: Props) => {
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <RatingIcon size="small" value={rating} />
      </div>
      <img src={image} alt="" />
      <Button>Add to cart</Button>
    </div>
    // <Section>
    //   <Container>
    //     <p>{title}</p>
    //     <Price>
    //       <p>
    //         <small>$</small>
    //         <strong>{price}</strong>
    //       </p>

    //       <RatingIcon size="small" value={rating} />
    //     </Price>
    //   </Container>
    //   <Banner src={image} />
    //   <Button>Add to cart</Button>
    // </Section>
  );
};

// const Section = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: white;
//   z-index: 1;
//   max-height: 400px;
//   min-width: 100px;
//   align-items: center;
//   justify-content: flex-end;
//   margin: 10px;
//   padding: 20px;
// `;
// const Container = styled.div`
//   height: 100px;
//   margin-bottom: 25px;
// `;
// const Banner = styled.img`
//   max-height: 200px;
//   width: 100%;
//   object-fit: contain;
//   margin-bottom: 15px;
// `;

const Button = styled.button`
  background-color: #f0c14b;
  border: 1px solid;
`;
// const Price = styled.p`
//   margin-top: 5px;
//   display: flex;
//   flex-direction: column;
// `;
export default Product;
