import { primaryColor, darkColor, secondaryColor } from "../styles/colors";

export const ROUTE_ID_IS_REQUIRED = "The id is required for a new route";

export const COORDINATES_ARE_REQUIRED =
  "The coordinates latitude, longitude are required for a new route";

export const DRIVING = "DRIVING";

export const ROUTE_STROKE_WIDTH = 3;

export const ROUTE_STROKE_COLOR = type => {
  switch (type) {
    case "primary":
      return primaryColor;
    case "secondary":
      return darkColor;
    case "tertiary":
      return secondaryColor;
    default:
      return primaryColor;
  }
};
