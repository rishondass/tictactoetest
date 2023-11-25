import React from "react";

import { createContext, useContext, useState} from "react";

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


//sessionStorage.getItem("user")  {user: JSON.parse(sessionStorage.getItem("user")||"")} as Partial<AuthContextType>

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export function AuthData(){return useContext(AuthContext)};

const AuthWrapper: React.FC<{ children: React.ReactChild }> = ({ children }) =>{
  const [globalUser, setGlobalUser] = useState<Player>({
    id: uuidv4().toString(),
    name: "",
    isAuthenticated: false,
  });
  
  sessionStorage.getItem("user") && globalUser.name=="" && !globalUser.isAuthenticated && setGlobalUser(JSON.parse(sessionStorage.getItem("user")||""))

  const login = (userName: string) => {
    return new Promise<string>((resolve, reject) => {
      if (userName) {
        const tempUser:Player = { id: globalUser.id, name: userName, isAuthenticated: true };
        setGlobalUser(tempUser);
        sessionStorage.setItem("user",JSON.stringify(tempUser));
        resolve("success");
      } else {
        reject("Name not set");
      }
    });
  };

  const logout = () => {
    setGlobalUser({ ...globalUser, name: "", isAuthenticated: false });
  };

  const contextValue: AuthContextType = {
    user: globalUser,
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
