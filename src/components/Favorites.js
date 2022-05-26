import axios from "axios";
import styled from "styled-components";
import { useAuth } from "lib/contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { Favorite } from "./Favorite";
import { Layout } from "./Layout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 25px;
`;

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { userData } = useAuth();

  useEffect(() => {
    if (!shouldRefresh) return;

    axios
      .get(`http://localhost:4000/api/v1/favorites/${userData?.user?.email}`)
      .then((res) => setFavorites(res.data));
    setShouldRefresh(false);
  }, [userData?.user?.email, shouldRefresh]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/favorites/${userData?.user?.email}`)
      .then((res) => setFavorites(res.data));
  }, [userData?.user?.email]);

  return (
    <Layout>
      <Wrapper>
        {favorites.map((x, i) => (
          <Favorite
            key={`favorite-${i}`}
            favorite={x}
            email={userData?.user?.email}
            refresh={() => setShouldRefresh(true)}
          />
        ))}
      </Wrapper>
    </Layout>
  );
};
