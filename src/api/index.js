export const getLSpaceGraphNodes = city =>
  fetch(`/data/${city}_l_space_nodes.json`)
    .then(response => response.json())
    .catch(e => console.error(e))
