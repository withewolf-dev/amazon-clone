import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseinit/firebaseinit";
import { useAppDispatch } from "../store/redux-hook";
import { setUserEmail } from "../store/slice/user-slice";
import "./login.css";
interface Props {}

const Login = (props: Props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useAppDispatch();

  let navigate = useNavigate();

  const CreateUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.email!);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const Login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user.email!);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const setUser = (userEmail: string) => {
    dispatch(setUserEmail(userEmail));
  };

  return (
    <Section>
      <Link to={"/"}>
        <Img src="https://pngimg.com/uploads/amazon/amazon_PNG21.png" />
      </Link>
      <Container>
        <h4>Sign In</h4>
        <div>
          <Input
            type={"email"}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div>
          <Input
            type={"password"}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <Button onClick={Login}>Sign in</Button>
        <small style={{ fontSize: "10px" }}> by usig amazon</small>
        <button onClick={CreateUser}>create your amazon account</button>
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
