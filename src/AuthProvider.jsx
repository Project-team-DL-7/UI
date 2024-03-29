import { useQuery } from "react-query";
import { MeContext } from "./contexts/MeContext";
import { getMe } from "./services/meApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError, refetch } = useQuery("me", () => getMe(), {
    retry: false,
  });

  console.log(location.pathname);

  useEffect(() => {
    if (
      isLoading === false &&
      data === null &&
      !["/login", "/login/", "/register", "/register/"].includes(
        location.pathname
      )
    ) {
      navigate("/login");
    }
  }, [data, location.pathname]);

  const isLoggedIn = data !== null;

  if (isLoading) {
    return <p></p>;
  }

  return (
    <MeContext.Provider value={{ ...data, isLoggedIn, refetch }}>
      {children}
    </MeContext.Provider>
  );
};
