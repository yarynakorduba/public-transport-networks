export const getGraphSpaceData = (city, space) =>
  fetch(`/data/${city}_${space}_space.json`)
    .then(response => response.json())
    .catch(e => console.error(e))
