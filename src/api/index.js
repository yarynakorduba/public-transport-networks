export const getBristolLSpaceGraphNodes = city =>
  fetch(`/data/${city}_l_space_nodes.json`)
    .then(response => response.json())
    .catch(e => console.error(e))

export const getLSpaceGraphEdges = city =>
  fetch(`/data/${city}_l_space_edges.json`)
    .then(response => response.json())
    .catch(e => console.error(e))

export const getBristolLSpaceGraph = city => Promise.all([getBristolLSpaceGraphNodes(city), getLSpaceGraphEdges(city)])
