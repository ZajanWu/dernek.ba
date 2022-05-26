import React, { useEffect } from "react";
import styled from "styled-components";

import { Layout } from "components/Layout";
import { useAuth } from "lib/contexts/AuthContext";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "lib/constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

export const LogoutPage = () => {
  const { userData, setUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user_data");
    setUserData(null);

    // eslint-disable-next-line
  }, []);

  const routeHome = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  if (userData) return <Layout>Logging out...</Layout>;

  return (
    <Layout>
      <Wrapper>
        <div style={{ fontSize: 24 }}>You have been logged out</div>
        <button
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
          onClick={routeHome}
        >
          Go to home page
        </button>
      </Wrapper>
    </Layout>
  );
};
