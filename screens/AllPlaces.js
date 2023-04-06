import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

function AllPlaces() {
  const [loadPlaces, setLoadPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadAllPlaces() {
      const places = await fetchPlaces();
      setLoadPlaces(places);
    }

    if (isFocused) {
      loadAllPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadPlaces} />;
}

export default AllPlaces;
