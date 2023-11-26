import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn === null || isLoggedIn === "false" || isLoggedIn === false) {
      console.log("Not Logged In");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // If you need cleanup logic when the component unmounts,
  // you can add a cleanup function like this:
  // useEffect(() => {
  //   return () => {
  //     // Cleanup logic here
  //   };
  // }, []);

  return null;
};

export default AuthCheck;
