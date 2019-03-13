export const getGraphSpaceData = (city:string, space:string): Promise<Array> =>
  fetch(`/data/${city}_${space}_space.json`)
    .then(response => response.json())
    .catch(e => console.error(e))
