import React, { useState } from "react";

interface Prop {
  children: JSX.Element;
}
export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

const AuthContextProvider = (props: Prop) => {
  const [isAuthantificated, setAuthentificated] = useState<boolean>(false);

  const loginHandler = () => {
    setAuthentificated(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: isAuthantificated, login: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
