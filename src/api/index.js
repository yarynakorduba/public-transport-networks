export const getGraphSpaceData = (city: string, space: string): Promise<Array> =>
  fetch(
    `https://media.githubusercontent.com/media/yarynakorduba/public-transport-networks/master/public/data/${city}_${space}_space.json`
  )
    .then(response => response.json())
    .catch(e => console.error(e))

// ajax.getJSON("/data/cities.json")
// ajax.getJSON("/data/mainCitiesIndicators.json")
// json("/data/examplePathDistributionData.json")
// ajax.getJSON(`/data/${city}/${city}Stops.json`)
