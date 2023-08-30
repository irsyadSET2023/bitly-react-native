import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [jwt, setJwt] = useState("");
  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContext.displayName = "AuthProvider";

export default AuthContextProvider;
