import { useState, useEffect } from "react";
import { TRIPS } from "./trips/registry.js";
import TripList from "./trips/TripList.jsx";

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash.startsWith("trip/")) {
    return { page: "trip", tripId: hash.slice(5) };
  }
  return { page: "list" };
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route.page === "trip") {
    const trip = TRIPS.find((t) => t.id === route.tripId);
    if (trip) {
      const TripComponent = trip.component;
      return <TripComponent />;
    }
    window.location.hash = "#/";
    return null;
  }

  return <TripList trips={TRIPS} />;
}
