import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../store/redux-hook";
import { SelectBasket } from "../store/slice/basket-slice";
import CheckoutProduct from "./CheckoutProduct";

interface Props {}

const Checkout = (props: Props) => {
  const select = useAppSelector(SelectBasket);
  return (
    <Container>
      <Image src="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2021/img/Events/Holiday/EpicDailyDeals/LandingPage/HOL21_EDD_Phase5_hero-banner_short_desktop_1500x150.jpg" />
      {select.basket.length === 0 && (
        <div>
          <h1>You have nothing in your Cart</h1>
          <p>add something to your basket </p>
        </div>
      )}

      {select.basket.length !== 0 && (
        <>
          {select.basket.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              image={item.image}
              price={item.price}
              rating={item.rating}
              title={item.title}
            />
          ))}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
`;
const Image = styled.img`
  width: 100%;
`;
export default Checkout;
