import axios from "axios";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px;
  height: 50px;
`;

export const Favorite = ({ favorite, email, refresh }) => {
  const removeFavorite = () => {
    axios
      .delete(`http://localhost:4000/api/v1/favorites/${email}/${favorite.id}`)
      .then(() => refresh())
      .catch(console.log);
  };

  return (
    <Wrapper>
      <div>{favorite.name}</div>
      <div>{favorite.location}</div>
      <div>{favorite.date}</div>
      <div>{favorite.type}</div>
      <div>{favorite.time}</div>
      <button
        style={{ height: 50 }}
        className="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
        onClick={removeFavorite}
      >
        Remove
      </button>
    </Wrapper>
  );
};
