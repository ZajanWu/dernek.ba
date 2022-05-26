import axios from "axios";
import { useAuth } from "lib/contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import Event from "./event";
import { useEvents } from "./useEvents";

const StyledInput = styled.input`
  outline: 1px solid black;
  border: none;
  padding: 5px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  width: 80%;
  margin: 0 auto;
`;

Modal.setAppElement("#root");

function EventsContainer({ filter }) {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { events } = useEvents(shouldRefresh);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAuth();

  const nameRef = useRef();
  const locationRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const typeRef = useRef();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onSubmit = async () => {
    const body = {
      name: nameRef.current.value,
      location: locationRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
      type: typeRef.current.value,
    };

    axios
      .post(`http://localhost:4000/api/v1/events`, body)
      .then(() => {
        setShouldRefresh(true);
        closeModal();
      })
      .catch(console.log);
  };

  useEffect(() => {
    if (!setShouldRefresh) return;

    setShouldRefresh(false);
  }, [shouldRefresh]);

  const filteredEvents = events.filter(
    (x) =>
      x.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      filter.toLocaleLowerCase() === x.type.toLocaleLowerCase()
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginInline: 25,
        }}
      >
        {isAdmin && (
          <button
            className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
            onClick={openModal}
          >
            Add event
          </button>
        )}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {filteredEvents.map((x, i) => (
          <Event
            key={`event-item-${i}`}
            event={x}
            refresh={() => setShouldRefresh(true)}
          />
        ))}
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <ModalWrapper>
            <StyledInput ref={nameRef} placeholder="Name" />
            <StyledInput ref={locationRef} placeholder="Location" />
            <StyledInput ref={dateRef} placeholder="Date" />
            <StyledInput ref={timeRef} placeholder="Time" />
            <StyledInput ref={typeRef} placeholder="Type" />
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
                onClick={onSubmit}
              >
                Add event
              </button>
            </div>
          </ModalWrapper>
        </Modal>
      </div>
    </div>
  );
}

export default EventsContainer;
