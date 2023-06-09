export default {
  places: {
    autocompletePredictions: {},
  },
  location: {},
  map: {},
  search: {
    origin: null,
    destination: null,
  },
  guide: {
    destinationRoute: {},
  },
  loader: {
    message: null,
    loading: false,
  },
  routes: {
    pointRoutes: { loading: false, data: [], error: null },
    selectedPointRoute: null,
  },
  vehicles: {
    data: [],
    loading: false,
    error: null,
  },
  toast: {
    show: false,
    message: null,
  },
};
