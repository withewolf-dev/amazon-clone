import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Search from "@mui/icons-material/Search";
import Basket from "@mui/icons-material/ShoppingBasket";
import { useAppDispatch, useAppSelector } from "../store/redux-hook";
import { addToBasket, SelectBasket } from "../store/slice/basket-slice";
import { SelectUser, setUserEmail } from "../store/slice/user-slice";
import { auth } from "../firebaseinit/firebaseinit";
import { signOut } from "firebase/auth";
import ProtectedRoute from "../protected/ProtectedRoute";

interface Props {}

const Header = (props: Props) => {
  const select = useAppSelector(SelectBasket);
  const userSelect = useAppSelector(SelectUser);
  const dispatch = useAppDispatch();

  const setUser = (userEmail: string) => {
    dispatch(setUserEmail(userEmail));
  };

  let navigate = useNavigate();

  const Logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        setUser("");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <>
      <Nav>
        <Link to={"/"}>
          <AmazonLogo
            src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
            alt="amazon"
          />
        </Link>
        <SearchContainer>
          <SearchBar />
          <SearchIcon />
        </SearchContainer>
        <LinkSection>
          <LinkStyle to={"/"}>
            <OptionOne>hello</OptionOne>
            {userSelect.email === "" && (
              <OptionTwo
                onClick={() => {
                  navigate("/login");
                }}
              >
                sign in
              </OptionTwo>
            )}
            {userSelect.email !== "" && (
              <OptionTwo onClick={Logout}>Logout</OptionTwo>
            )}
          </LinkStyle>
          <LinkStyle to={"/"}>
            <OptionOne>Returns</OptionOne>
            <OptionTwo>{`& Orders`}</OptionTwo>
          </LinkStyle>
          <LinkStyle to={"/"}>
            <OptionOne>your</OptionOne>
            <OptionTwo>Prime</OptionTwo>
          </LinkStyle>
        </LinkSection>
        <BasketLink to={"/checkout"}>
          <BasketIcon />
          <OptionTwo style={{ marginRight: "10px", marginLeft: "10px" }}>
            {select.basket.length}
          </OptionTwo>
        </BasketLink>
      </Nav>
      <Outlet />
    </>
  );
};
const Nav = styled.nav`
  background-color: #131921;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BasketLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
`;

const BasketIcon = styled(Basket)``;
const Items = styled.span`
  text-decoration: none;
`;
const LinkStyle = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
`;

const OptionOne = styled.span`
  font-size: 12px;
`;
const OptionTwo = styled.span`
  font-size: 15px;
  font-weight: 800;
`;
const AmazonLogo = styled.img`
  width: 100px;
  margin-top: 18px;
  margin-left: 20px;
  margin-right: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex: 1;
`;
const SearchBar = styled.input`
  height: 12px;
  padding: 10px;
  border: none;
  width: 100%;
  outline: none;
`;

const SearchIcon = styled(Search)`
  background-color: #cd9042;
  height: 32px !important;
`;

const LinkSection = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export default ProtectedRoute(Header);
