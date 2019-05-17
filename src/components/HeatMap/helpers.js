import { featureCollection } from "@turf/turf"

export const convertBusStopsDataToGeoJSON = data =>
  featureCollection(
    data.map(({ lat, lon }) => ({
      type: "Feature",
      properties: { connectedRoutes: 1 }, //TODO: experiment with routes
      geometry: { type: "Point", coordinates: [lon, lat] }
    }))
  )

export const getHeatMapColorConfig = maxZoomLevel => ({
  // Increase the heatmap weight based on frequency and property magnitude
  "heatmap-weight": ["interpolate", ["linear"], ["get", "connectedRoutes"], 0, 0, maxZoomLevel, 1],
  // Increase the heatmap color weight weight by zoom level
  // heatmap-intensity is a multiplier on top of heatmap-weight
  "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 1, 15],
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(33,102,172,0)",
    0.2,
    "rgb(103,169,207)",
    0.4,
    "rgb(209,229,240)",
    0.6,
    "rgb(253,219,199)",
    0.8,
    "rgb(239,138,98)",
    1,
    "rgb(178,24,43)"
  ],
  // Adjust the heatmap radius by zoom level
  "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, maxZoomLevel, 20],
  // Transition from heatmap to circle layer by zoom level
  "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 5, 1, maxZoomLevel, 1]
})
