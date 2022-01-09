import { confirmPasswordReset } from "firebase/auth";
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseinit/firebaseinit";

interface Props {}

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

const ResetPassword = (props: Props) => {
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const query = useQuery();

  let navigate = useNavigate();

  const passwordRest = async () => {
    try {
      await confirmPasswordReset(auth, query.get("oobCode")!, password);
      navigate("/login");
    } catch (error) {
      alert("password failed to reset");
      console.log(error);
    }
  };
  return (
    <Section>
      <Link to={"/"}>
        <Img src="https://pngimg.com/uploads/amazon/amazon_PNG21.png" />
      </Link>
      <Container>
        <Wrap>
          <h4>Enter New Password</h4>
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

          <Button onClick={passwordRest}>Confirm password</Button>
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

const Input = styled.input``;

export default ResetPassword;
