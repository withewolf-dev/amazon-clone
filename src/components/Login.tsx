import { CircularProgress } from "@mui/material";
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
  const [loadingLogin, setloadingLogin] = useState(false);
  const [loadingCreate, setloadingCreate] = useState(false);

  const dispatch = useAppDispatch();

  let navigate = useNavigate();

  const CreateUser = () => {
    setloadingCreate(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setloadingCreate(false);

        setUser(user.email!);
        navigate("/");
      })
      .catch((error) => {
        setloadingCreate(false);

        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode);
        // console.log(errorMessage);
      });
  };

  const Login = () => {
    setloadingLogin(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setloadingLogin(false);

        const user = userCredential.user;
        setUser(user.email!);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password");
        }
        setloadingLogin(false);

        const errorMessage = error.message;
        // console.log(errorCode);
        // console.log(errorMessage);
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
            placeholder="email"
            type={"email"}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div>
          <Input
            placeholder="password"
            type={"password"}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
          />
        </div>
        {!loadingLogin && <Button onClick={Login}>Sign in </Button>}
        {loadingLogin && <CircularProgress />}
        <small style={{ fontSize: "12px", width: "230px" }}>
          already have an account? enter your email and password and then click
          on sign in. If new to the website enter email and password and click
          on create new acccount
        </small>
        {!loadingCreate && (
          <button style={{ cursor: "pointer" }} onClick={CreateUser}>
            create your amazon account
          </button>
        )}
        {loadingCreate && <CircularProgress />}
        <span
          onClick={() => {
            navigate("/forgot-password");
          }}
          style={{ fontSize: "12px", color: "blue", cursor: "pointer" }}
        >
          Forgot Password?
        </span>
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
  height: 390px;
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
export default Login;
