import { useEffect, useCallback } from "react";

const RefreshSignature = () => {
  const refresh_token = localStorage.getItem("refresh_token")?.replace(/['"]+/g, "");

  const updateToken = useCallback(async () => {
    try {
      //const res = await fetch(`https://restapi-main-01.woit.net/refresh_token`, {
        const res = await fetch(`http://139.59.156.28:5080/user_auth/refresh_token`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
      });

      if (!res.ok) {
        // Handle other error cases
        console.error(`Failed to refresh token. Status: ${res.status}`);
        return;
      }

      const response = await res.json();
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
      } else {
        console.error("Access token not found in the response");
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  }, [refresh_token]);

  const calculateRefreshInterval = () => {
    let tokenExpireTime = parseInt(localStorage.getItem("token_expire_time"), 10);
    if (isNaN(tokenExpireTime) || tokenExpireTime <= 0) {
      tokenExpireTime = 5; // Default to 5 minutes if the value is invalid or not present
    }

    return tokenExpireTime * 59 * 1000;
  };

  const time = calculateRefreshInterval();

  useEffect(() => {
    const interval = setInterval(updateToken, time);

    return () => {
      clearInterval(interval);
    };
  }, [time, updateToken]);

  return null;
};

export default RefreshSignature;
