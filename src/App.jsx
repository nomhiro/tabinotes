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

  let content;
  let pageTitle = "旅のしおり";

  if (route.page === "trip") {
    const trip = TRIPS.find((t) => t.id === route.tripId);
    if (trip) {
      const TripComponent = trip.component;
      content = <TripComponent />;
      pageTitle = trip.title;
    } else {
      window.location.hash = "#/";
      return null;
    }
  } else {
    content = <TripList trips={TRIPS} />;
  }

  return (
    <>
      <div aria-live="polite" aria-atomic="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap" }}>
        {pageTitle}を表示中
      </div>
      {content}
    </>
  );
}
