import { createContext, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const persistValue = localStorage.getItem('persist')
  const [persist, setPersist] = useState( persistValue == "true" || false)
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;