import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SearchBar from "../../molecules/SearchBar";
import ExtendedSearchBar from "../../molecules/ExtendedSearchBar";
import PlacePredictions from "../../molecules/PlacePredictions";

const Toolbar = ({ unFocused, mapView, onSelection }) => {
  const [toggled, setToggled] = useState(false);
  const { autocompletePredictions:{ predictions, type } } = useSelector(({ places }) => places);

  useEffect(() => {
    if (unFocused) setToggled(false);
  }, [unFocused]);

  return (
    <React.Fragment>
      {!toggled && <SearchBar onPress={() => setToggled(true)} mapView={mapView}/>}

      {toggled && <ExtendedSearchBar setToggled={setToggled} />}

      {toggled && (
        <PlacePredictions
          style={_style.placePredictions}
          predictions={predictions}
          type={type}
          toggleSearchBar={setToggled}
          mapView={mapView}
          onSelection={onSelection}
        />
      )}
    </React.Fragment>
  );
};

const _style = {
  placePredictions: {
    marginTop: 20
  }
};

Toolbar.defaultProps = {
  style: null,
  onSelection: () => null
};

Toolbar.propTypes = {
  style: PropTypes.instanceOf(Object),
  unFocused: PropTypes.bool.isRequired,
  mapView: PropTypes.instanceOf(Object).isRequired,
  onSelection: PropTypes.func,
};

export default Toolbar;
