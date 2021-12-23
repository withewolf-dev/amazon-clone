import React, { ComponentType } from "react";
import styled from "styled-components";
import ProtectedRoute from "../protected/ProtectedRoute";
import { useAppSelector } from "../store/redux-hook";
import { SelectBasket } from "../store/slice/basket-slice";
import CheckoutProduct from "./CheckoutProduct";
import Product from "./CheckoutProduct";
import SubTotal from "./SubTotal";

interface Props {}

const Checkout = (props: Props) => {
  const select = useAppSelector(SelectBasket);
  return (
    <CheckoutLayout>
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
      {select.basket.length !== 0 && <SubTotal />}
    </CheckoutLayout>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;
const Image = styled.img`
  width: 100%;
`;

const CheckoutLayout = styled.div`
  display: flex;
`;
export default ProtectedRoute(Checkout);
