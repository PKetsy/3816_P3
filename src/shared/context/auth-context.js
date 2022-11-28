import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
//object that can shared between components, and when updated, comopnents that listen to this will be updated also

//Context in React will allow users to pass data between any components in the application without using PROPS
// useful for data such as "is user logged in?"  Passing data for this through props would be a nightmare
