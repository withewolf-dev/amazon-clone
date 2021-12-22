import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/redux-hook";
import { SelectBasket } from "../store/slice/basket-slice";

interface Props {}

const SubTotal = (props: Props) => {
  const dispatch = useAppDispatch();
  const select = useAppSelector(SelectBasket);

  const getTotal = () => {
    return select.basket.reduce((amount, item) => item.price + amount, 0);
  };
  return (
    <Container>
      <P>
        subtotal ({select.basket.length} items) : $ {getTotal()}
      </P>
      <Input>
        <input type={"checkbox"} /> <P>This order contains a gift card</P>
      </Input>
      <Button>Proceed to Checkout</Button>
    </Container>
  );
};

const Container = styled.div`
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
  height: 200px;
  background-color: #f3f3f3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #dddddd;
  justify-content: space-evenly;
`;

const P = styled.p`
  font-size: 18px;
  font-weight: 800;
`;
const Button = styled.button`
  background-color: #f0c14b;
  border: 1px solid;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default SubTotal;
