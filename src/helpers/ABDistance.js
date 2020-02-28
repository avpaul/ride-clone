export default (A, B) =>
  Math.sqrt((A.latitude - B.latitude) ** 2 + (A.longitude - B.longitude) ** 2);
