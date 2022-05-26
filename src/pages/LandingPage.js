import { useState } from "react";

import EventsContainer from "components/EventsContainer";
import { Layout } from "components/Layout";
import SearchBar from "components/searchBar";

export const LandingPage = () => {
  const [filter, setFilter] = useState("");
  return (
    <Layout>
      <SearchBar value={filter} onChange={(e) => setFilter(e.target.value)} />
      <EventsContainer filter={filter} />
    </Layout>
  );
};
