import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const RefreshSignature = (update) => {
  let refreshToken = localStorage.getItem("refresh_token");
  let refresh_token;
  if (refreshToken !== null) {
    refresh_token = refreshToken.replace(/['"]+/g, "");
  }

  //const navigate = useNavigate();

  // UPDATING ACCESS TOKEN WITH REFRESH TOKEN
  const updateToken = useCallback(async () => {
    try {
      const res = await fetch(`https://restapi-main-01.woit.net/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
      });
      let response = await res.json();
      if (response.status === 422) {
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        //navigate('/')
      }
      localStorage.setItem("token", response.access_token);
    } catch (error) {
      console.log(error);
    }
  }, []);
  let time = localStorage.getItem("token_expire_time") * 59 * 1000;
  if (!time || time === null || time === undefined){
    time = 5*59*1000
  }

  // REFRESH TOKEN AFTER EVERY 4.5 MINUTES AND ON PAGE LOAD
  useEffect(() => {
  const interval = setInterval(updateToken, time);
  window.addEventListener("load", updateToken);
  return () => {
    clearInterval(interval);
    window.removeEventListener("load", updateToken);
  };
  }, [time, updateToken,]);

  // UPDATE IF true IS PASSED IN CALLING FUNCTION
  // if (update === true) {
  //     updateToken()
  // }

  return null;
};
export default RefreshSignature;
