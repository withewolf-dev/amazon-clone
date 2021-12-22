import React from "react";
import styled from "styled-components";
import RatingIcon from "@mui/material/Rating";
import { useAppDispatch, useAppSelector } from "../store/redux-hook";
import { removeItem, SelectBasket } from "../store/slice/basket-slice";

interface Props {
  id: string;
  title: string;
  image: string;
  rating: number;
  price: number;
}

const CheckoutProduct = ({ image, price, title, rating, id }: Props) => {
  const dispatch = useAppDispatch();
  const remove = () => {
    dispatch(
      removeItem({
        id,
      })
    );
  };

  return (
    <Container>
      <Image src={image} alt="image" />
      <div>
        <ProductInfo>
          <p style={{ fontSize: "17px", fontWeight: "800" }}>{title}</p>
          <Price>
            <small>$</small>
            <strong>{price}</strong>
          </Price>
          <RatingIcon size="small" value={rating} />
        </ProductInfo>
        <Button onClick={remove}> remove item</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: white;
  margin-bottom: 10px;
`;

const Price = styled.div``;
const ProductInfo = styled.div``;
const Image = styled.img`
  // max-height: 200px;
  width: 180px;
  height: 180px;
  object-fit: contain;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #f0c14b;
  border: 1px solid;
`;

export default CheckoutProduct;
