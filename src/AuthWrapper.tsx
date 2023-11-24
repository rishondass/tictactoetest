import React from "react";

import { createContext, useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

type Player = {
  id: string;
  name: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: Player;
  login: (userName: string) => Promise<string>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthData = () => useContext(AuthContext);

const AuthWrapper: React.FC<{ children: React.ReactChild }> = ({ children }) =>{
  const [user, setUser] = useState<Player>({
    id: uuidv4().toString(),
    name: "",
    isAuthenticated: false,
  });
  const login = (userName: string) => {
    return new Promise<string>((resolve, reject) => {
      if (userName) {
        setUser({ id: user.id, name: userName, isAuthenticated: true });
        resolve("success");
      } else {
        reject("Name not set");
      }
    });
  };

  const logout = () => {
    setUser({ ...user, name: "", isAuthenticated: false });
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
