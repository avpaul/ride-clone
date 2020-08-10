import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SearchBar from "../../molecules/SearchBar";
import ExtendedSearchBar from "../../molecules/ExtendedSearchBar";
import PlacePredictions from "../../molecules/PlacePredictions";
import Loader from "../../atoms/Loader";
import PointRoutes from "../../atoms/PointRoutes";
import RouteSchedule from "../../molecules/RouteSchedule";

const Toolbar = ({ unFocused, mapView, onSelection }) => {
  const [toggled, setToggled] = useState(false);
  const {
    autocompletePredictions: { predictions, type },
  } = useSelector(({ places }) => places);

  const { message: loaderMessage, loading: loaderLoading } = useSelector(
    ({ loader }) => loader
  );

  useEffect(() => {
    if (unFocused) setToggled(false);
  }, [unFocused]);

  const { destinationRoute } = useSelector(({ guide }) => guide);

  return (
    <React.Fragment>
      <SearchBar
        onPress={() => setToggled(true)}
        mapView={mapView}
        setToggled={setToggled}
      />

      {loaderLoading && (
        <Loader style={_style.loader} message={loaderMessage} />
      )}

      {/* Shows the list of routes passing by a bus stop */}
      {false && <PointRoutes style={_style.point_routes} />}

      {false && <ExtendedSearchBar setToggled={setToggled} />}

      {true && (
        <PlacePredictions
          style={_style.placePredictions}
          predictions={predictions}
          type={type}
          toggleSearchBar={setToggled}
          mapView={mapView}
          onSelection={onSelection}
        />
      )}

      {destinationRoute?.id && <RouteSchedule route={destinationRoute} />}
    </React.Fragment>
  );
};

const _style = {
  placePredictions: {
    position: "absolute",
    width: "100%",
    left: "2.5%",
    top: 65,
  },
  loader: {
    position: "absolute",
    width: "100%",
    left: "2.5%",
    top: 65,
  },
  point_routes: {
    marginTop: 10,
  },
};

Toolbar.defaultProps = {
  style: null,
  onSelection: () => null,
};

Toolbar.propTypes = {
  style: PropTypes.instanceOf(Object),
  unFocused: PropTypes.bool.isRequired,
  mapView: PropTypes.instanceOf(Object).isRequired,
  onSelection: PropTypes.func,
};

export default Toolbar;
