import { useEffect, useState } from "react";
import axios from "axios";

export const useEvents = (shouldRefresh = false) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/events")
      .then((res) => setEvents(res.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (!shouldRefresh) return;

    axios
      .get("http://localhost:4000/api/v1/events")
      .then((res) => setEvents(res.data))
      .catch(console.log);
  }, [shouldRefresh]);

  return { events, setEvents };
};
