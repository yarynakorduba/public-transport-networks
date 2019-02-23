export const getBristolLSpaceGraph = () =>
  fetch("http://127.0.0.1:5000/bristol/l-space")
    .then(response => response.json())
    .catch(e => console.error(e))
