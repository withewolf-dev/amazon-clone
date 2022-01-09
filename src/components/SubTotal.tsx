import { CircularProgress } from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firestore from "../firebaseinit/firebaseinit";
import { useAppDispatch, useAppSelector } from "../store/redux-hook";
import { checkout, SelectBasket } from "../store/slice/basket-slice";
import { SelectUser } from "../store/slice/user-slice";

interface Props {}

const SubTotal = (props: Props) => {
  const [loading, setloading] = useState(false);

  const select = useAppSelector(SelectBasket);
  const userSelect = useAppSelector(SelectUser);

  const dispatch = useAppDispatch();
  const getTotal = () => {
    return select.basket.reduce((amount, item) => item.price + amount, 0);
  };

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const addOrder = async (paymentId: string, orderId: string) => {
    try {
      const newDocRef = doc(collection(firestore, "Order"));
      await setDoc(newDocRef, {
        email: userSelect.email,
        paymentId,
        orderId,
      });
    } catch (e) {
      alert("Error adding document: ");
    }
    dispatch(checkout);
  };

  const displayRazoprPay = async () => {
    setloading(true);
    const data = await fetch(
      "https://payment-razorpay-amazon.herokuapp.com/razorpay",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getTotal() }),
      }
    ).then((t) => t.json());

    setloading(false);

    const options = {
      key: "rzp_live_nxRkbDUeStVAQw",
      currency: data.currency,
      amount: data.amount,
      name: "Amazone clone ",
      description: "",
      image: "https://pngimg.com/uploads/amazon/amazon_PNG25.png",
      order_id: data.id,
      handler: async function async(response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
      }) {
        //alert("PAYMENT ID ::" + response.razorpay_payment_id);
        await addOrder(
          response.razorpay_payment_id,
          response.razorpay_order_id
        );
        // dispatch(Checkout);
        alert(
          " Your payment is made with ORDER ID :: " + response.razorpay_order_id
        );
        dispatch(checkout([]));
      },
      prefill: {
        email: `${userSelect.email}`,
      },
    };

    const _window = window as any;
    const paymentObject = new _window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Container>
      <P>
        subtotal ({select.basket.length} items) : $ {getTotal()}
      </P>
      <Input>
        <input type={"checkbox"} /> <P>This order contains a gift card</P>
      </Input>

      {loading && <CircularProgress color="secondary" />}

      {!loading && <Button onClick={displayRazoprPay}>checkout</Button>}
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
  color: black;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default SubTotal;
