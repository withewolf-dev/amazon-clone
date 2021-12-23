import { Navigate } from "react-router-dom";
import React, { ComponentType, ReactElement, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseinit/firebaseinit";
import { useAppDispatch, useAppSelector } from "../store/redux-hook";
import { SelectUser, setUserEmail } from "../store/slice/user-slice";

const ProtectedRoute = (WrappedComponent: ComponentType) => {
  return (props: any) => {
    const [pending, setPending] = useState(true);

    const dispatch = useAppDispatch();
    const select = useAppSelector(SelectUser);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user.email!);
          setPending(false);
        } else {
          setPending(false);
        }
      });
    }, []);

    const setUser = (userEmail: string) => {
      dispatch(setUserEmail(userEmail));
    };

    if (pending) {
      return <>Loading...</>;
    }
    return select.email === "" ? (
      <Navigate to="/login" />
    ) : (
      <WrappedComponent {...props} />
    );
  };
};

export default ProtectedRoute;
