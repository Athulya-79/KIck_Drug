// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authData, setAuthData] = useState({
//     token: sessionStorage.getItem('token') || null,
//     user: JSON.parse(sessionStorage.getItem('user')) || null,
//   });

//   // Update context when token changes
//   const login = (token, user) => {
//     setAuthData({ token, user });
//     sessionStorage.setItem('token', token);
//     sessionStorage.setItem('user', JSON.stringify(user));
//   };

//   const logout = () => {
//     setAuthData({ token: null, user: null });
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ authData, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: sessionStorage.getItem('token') || null,
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    image: sessionStorage.getItem('image') || "https://i.imgur.com/QlRphfQ.png",
  });

  const login = (token, user, image = null) => {
    setAuthData({ token, user, image: image || authData.image });
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    if (image) {
      sessionStorage.setItem('image', image);  // Persist image in sessionStorage
    }
  };

  const logout = () => {
    setAuthData({ token: null, user: null, image: null });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('image');
  };

  const updateImage = (newImage) => {
    if (newImage) {
      setAuthData((prevData) => {
        sessionStorage.setItem('image', newImage);
        return { ...prevData, image: newImage };
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, updateImage }}>
      {children}
    </AuthContext.Provider>
  );
};
