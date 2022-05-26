import { createContext, useContext, useMemo, useState } from "react";

const defaultValue = {
  userData: undefined,
  setUserData: () => null,
  isAdmin: false,
  isLoggedIn: false,
};

const AuthContext = createContext(defaultValue);

const adminMails = ["zajanhandzic@gmail.com", ""];

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user_data")) || {}
  );

  const isLoggedIn = useMemo(
    () => userData?.user?.email !== undefined,
    [userData]
  );

  const isAdmin = useMemo(
    () => adminMails.find((x) => x === userData?.user?.email) != null,
    [userData]
  );

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isAdmin,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("AuthContext is not defined");

  return ctx;
};
