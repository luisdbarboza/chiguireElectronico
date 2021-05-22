import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

let objUsuario = {
  loggedIn: false,
  nickname: "",
  email: "",
  profilePic: ""
}

const userReducer = (state, action) => {
    switch(action.type) {
        case "LOG_IN":
            const {email, username, profilePicture} = action.user;
            const token = action.token;

            action.user.loggedIn = true;

            localStorage.setItem("usuario", JSON.stringify(action.user));
            localStorage.setItem("token", JSON.stringify(token));

            return {loggedIn: true, username, email, profilePicture};
        case "LOG_OUT":
            localStorage.removeItem("usuario");
            localStorage.removeItem("token");

            return {loggedIn: false, username: "", email: "", profilePic: ""}
        default: 
            return state;
    }
}

const AuthContextProvider = ({ children }) => {

  const [user, dispatchUser] = useReducer(userReducer, objUsuario, () => {
    let usuario = localStorage.getItem("usuario");

    return !usuario ? objUsuario : JSON.parse(usuario);
  });

  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
