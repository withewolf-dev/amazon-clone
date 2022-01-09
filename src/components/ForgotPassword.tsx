import { CircularProgress } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseinit/firebaseinit";

interface Props {}

const ForgotPassword = (props: Props) => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);

  const SentEmail = () => {
    setloading(true);
    sendPasswordResetEmail(auth, email, {
      url: "https://clone-pop.web.app/",
    })
      .then(() => {
        // ..

        alert("check your inbox for the reset link");
        setloading(false);
        setemail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("email not available ");
      });
  };
  return (
    <Section>
      <Link to={"/"}>
        <Img src="https://pngimg.com/uploads/amazon/amazon_PNG21.png" />
      </Link>
      <Container>
        <Wrap>
          <h4>Forgot Password</h4>
          <div>
            <Input
              placeholder="email"
              type={"email"}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
            />
          </div>

          {!loading && <Button onClick={SentEmail}>Confirm Email</Button>}
          {loading && <CircularProgress />}
        </Wrap>
      </Container>
    </Section>
  );
};

const Img = styled.img`
  width: 100px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: white;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 2px solid #dddddd;
  align-items: center;
  height: 350px;
  width: 350px;
`;

const Button = styled.button`
  background-color: #f0c14b;
  border: 1px solid;
  width: 230px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 5px 5px;
`;

export default ForgotPassword;
