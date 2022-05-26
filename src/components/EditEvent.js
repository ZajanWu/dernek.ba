import axios from "axios";
import React, { useRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  outline: 1px solid black;
  border: none;
  padding: 5px;
  width: 150px;
`;

export const EditEvent = ({ event, onCancel, onSave }) => {
  const { name, location, date, time, type } = event;

  const nameRef = useRef();
  const locationRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const typeRef = useRef();

  const onSubmit = async () => {
    const body = {
      name: nameRef.current.value,
      location: locationRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
      type: typeRef.current.value,
    };

    axios
      .post(`http://localhost:4000/api/v1/event/${event.id}`, body)
      .then(() => {
        onSave();
        onCancel();
      })
      .catch(console.log);
  };

  return (
    <div
      style={{ outline: ".5px solid yellow", width: 210, height: 268 }}
      className="max-w-xs rounded overflow-hidden shadow-lg mx-4 my-4"
    >
      <div className="px-6 py-4 text-center ">
        <StyledInput
          ref={nameRef}
          defaultValue={name}
          className="font-bold font-mono text-black-500 text-xl mb-2"
        />
        <StyledInput ref={locationRef} defaultValue={location} />
        <StyledInput ref={dateRef} defaultValue={date} />
        <StyledInput ref={timeRef} defaultValue={time} />
        <StyledInput ref={typeRef} defaultValue={type} />
        <div style={{ display: "flex", marginTop: 15 }}>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
