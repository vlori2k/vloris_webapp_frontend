// AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load initial authentication state from localStorage
  const initialUserData = JSON.parse(localStorage.getItem('userData')) || {
    isAuthenticated: false,
    accessToken: '',
    tokenExpireTime: 0,
    refreshToken: '',
    email_address: '',
    user_reg_ID: '',
  };

  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    // Save authentication state to localStorage whenever it changes
    localStorage.setItem('userData', JSON.stringify(userData));

    // Log updated userData whenever it changes
    console.log('Updated userData:', userData);
  }, [userData]);

  useEffect(() => {
    // Refresh token every 4 minutes




    const tokenRefreshInterval = setInterval(() => {
      refreshAccessToken(userData.refreshToken);
    //}, 4 * 60 * 1000);   //every 4 minutes
   
    }, 20* 1000); 

    // Clear interval on component unmount
    return () => clearInterval(tokenRefreshInterval);
  }, [refreshAccessToken, userData.refreshToken]);


  const saveAccessToken = (accessToken) => {
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    console.log("hei og ja hei og ja saving refresh token");
    setUserData((prevUserData) => ({
      ...prevUserData,
      accessToken,
    }));
    console.log("ok so how does the access token look now?", userData.accessToken);
    // Log updated userData after saving access token
    console.log('Access token saved! Updated userData:', userData);
  };
  
  const saveRefreshToken = (refreshToken, tokenExpireTime) => {
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    console.log("hey hey hey aving refresh token");
    setUserData((prevUserData) => ({
      ...prevUserData,
      refreshToken,
      tokenExpireTime, // Add this line to save tokenExpireTime
  }));

    console.log("ok so how does the refresh token look now?", userData.refreshAccessToken);
    // Log updated userData after saving refresh token
    console.log('Refresh token saved! Updated userData:', userData);
  };



  const saveLoginData = (loginDataReceived) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      isAuthenticated: true,
      user: {
        ...prevUserData.user,
        user_reg_ID: loginDataReceived.user.user_reg_ID,
        email_address: loginDataReceived.user.email_address,
        first_name: loginDataReceived.user.first_name,
        last_name: loginDataReceived.user.last_name,
        phone_number: loginDataReceived.user.phone_number,
        user_role_ID : loginDataReceived.user.user_role_ID,
      },
    }));

    // Log updated userData after saving login data
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");
    console.log("UPDATING USERDATA!");

    console.log('Login data saved! Updated userData:', userData);
  };



  const refreshAccessToken = async (refreshToken) => {
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");
    console.log("REFRESHING TOKEN");


    // Check if the user is still authenticated
    if (!userData.isAuthenticated) {
      console.log('User is not authenticated. Skipping token refresh.');

      return;
    }
  
    // Log the refresh token for debugging
    console.log("user is authenticated, refresh the token")
    console.log('what is the refresh token we are going to use?:', refreshToken);
  
    try {
      const response = await fetch(
        'http://139.59.156.28:5080/user_auth/refresh_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`, // Include the Authorization header
          },
          body: JSON.stringify({
            refresh_token: refreshToken,
          }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('Access token refreshed successfully:', data.access_token);
  
        // Update the user data with the new tokens
        saveLoginData(data);
  
        // Log updated userData after saving login data
        console.log('userData after refresh:', userData);

      } else {
        console.error('Error refreshing access token:', response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const logout = () => {

    setUserData({
      isAuthenticated: false,
      accessToken: '',
      tokenExpireTime: 0,
      refreshToken: '',
      email_address: '',
      user_reg_ID: '',
    });
    console.log("how does the data look after i log out?", userData)
  };



  return (
    <AuthContext.Provider
      value={{ userData, saveLoginData, saveAccessToken, saveRefreshToken, refreshAccessToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};