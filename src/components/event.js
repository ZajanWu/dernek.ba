import { useState } from "react";

import { useAuth } from "lib/contexts/AuthContext";
import { EditEvent } from "./EditEvent";
import axios from "axios";

function Event({ event, refresh }) {
  const { name, location, date, time, type } = event;
  const { userData, isAdmin } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit && isAdmin)
    return (
      <EditEvent
        event={event}
        onCancel={() => setIsEdit(false)}
        onSave={() => {
          refresh();
          alert(`Event '${event.name}' edited`);
        }}
      />
    );

  const addToFavorite = () => {
    axios
      .post(
        `http://localhost:4000/api/v1/favorites/${userData?.user?.email}`,
        event
      )
      .then(() => {
        refresh();
        alert(`Added event '${event.name}' to favorites`);
      })
      .catch(console.log);
  };

  const deleteEvent = () => {
    axios
      .delete(`http://localhost:4000/api/v1/event/${event.id}`)
      .then(() => {
        refresh();
        alert(`Deleted event '${event.name}'`);
      })
      .catch(console.log);
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg mx-4 my-4">
      <div className="px-6 py-4 text-center ">
        <div className="font-bold font-mono text-black-500 text-xl mb-2">
          {name}
        </div>
        <p className="text-grey-700 text-base mb-2">
          {location}
          <br />
          {date}
          <br />
          {time}
          <br />
          {type}
        </p>
        {userData?.user?.email && (
          <button
            type="button"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
            onClick={addToFavorite}
          >
            Add to favorite
          </button>
        )}
        {isAdmin && (
          <div style={{ display: "flex" }}>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
              onClick={deleteEvent}
            >
              Delete
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-1 focus:ring-yellow-300 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition ease-in"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Event;
