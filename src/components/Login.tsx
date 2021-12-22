import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./login.css";
interface Props {}

const Login = (props: Props) => {
  return (
    <Section>
      <Link to={"/"}>
        <Img src="https://pngimg.com/uploads/amazon/amazon_PNG21.png" />
      </Link>
      <Container>
        <h4>Sign In</h4>
        <div>
          <Input type={"email"} />
        </div>
        <div>
          <Input type={"password"} />
        </div>
        <Button>Sign in</Button>
        <small style={{ fontSize: "10px" }}> by usig amazon</small>
        <button>create your amazon account</button>
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
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 2px solid #dddddd;
  align-items: center;
  height: 360px;
  width: 350px;
`;

const Button = styled.button`
  background-color: #f0c14b;
  border: 1px solid;
  width: 230px;
`;

const Input = styled.input``;
export default Login;
