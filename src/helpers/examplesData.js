export const exampleLSpaceData = {
  "1": { id: "1", label: "1", connections: ["2"], lat: "362379", lon: "180909" },
  "2": { id: "2", label: "2", connections: ["1", "3"], lat: "362379", lon: "180909" },
  "3": { id: "3", label: "3", connections: ["2", "4", "6", "7"], lat: "362379", lon: "180909" },
  "4": { id: "4", label: "4", connections: ["3", "5"], lat: "362379", lon: "180909" },
  "5": { id: "5", label: "5", connections: ["4"], lat: "362379", lon: "180909" },
  "6": { id: "6", label: "K", connections: ["3"], lat: "362379", lon: "180909" },
  "7": { id: "7", label: "L", connections: ["3", "8"], lat: "362379", lon: "180909" },
  "8": { id: "8", label: "M", connections: ["7", "9"], lat: "362379", lon: "180909" },
  "9": { id: "9", label: "N", connections: ["8"], lat: "362379", lon: "180909" }
}

export const examplePSpaceData = {
  "1": { id: "1", label: "1", connections: ["2", "3", "4", "5"], lat: "362379", lon: "180909" },
  "2": { id: "2", label: "2", connections: ["1", "3", "4", "5"], lat: "362379", lon: "180909" },
  "3": { id: "3", label: "3", connections: ["1", "2", "4", "6", "7", "8", "9"], lat: "362379", lon: "180909" },
  "4": { id: "4", label: "4", connections: ["3", "5", "1", "2"], lat: "362379", lon: "180909" },
  "5": { id: "5", label: "5", connections: ["4", "1", "2", "3"], lat: "362379", lon: "180909" },
  "6": { id: "6", label: "K", connections: ["3", "7", "8", "9"], lat: "362379", lon: "180909" },
  "7": { id: "7", label: "L", connections: ["3", "9", "8", "6"], lat: "362379", lon: "180909" },
  "8": { id: "8", label: "M", connections: ["7", "9", "3", "6"], lat: "362379", lon: "180909" },
  "9": { id: "9", label: "N", connections: ["8", "7", "3", "6"], lat: "362379", lon: "180909" }
}

export const exampleCSpaceData = {
  "1": { id: "1", label: "Route 1", connections: ["2"], lat: "362379", lon: "180909" },
  "2": { id: "2", label: "Route 2", connections: ["1"], lat: "362379", lon: "180909" }
}