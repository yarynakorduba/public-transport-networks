export const getLSpaceGraphNodes = city =>
  fetch(`/data/${city}_l_space.json`)
    .then(response => response.json())
    .catch(e => console.error(e))
