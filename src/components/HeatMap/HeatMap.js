import React, { useRef, useState } from "react"
import WebMercatorViewport from "viewport-mercator-project"
import { withParentSize } from "@vx/responsive"
import { bbox } from "turf"
import { ajax } from "rxjs/ajax"
import { combineLatest } from "rxjs"
import { map, startWith } from "rxjs/operators"

import { compose, mapPropsStream, branch, renderComponent, withProps } from "recompose"
import MapGL from "react-map-gl"
import "./HeatMap.scss"

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const HEATMAP_SOURCE_ID = "bus-stops"

const convertBusStopsDataToGeoJSON = data => ({
  type: "FeatureCollection",
  features: data.map(({ lat, lon, routes }) => ({
    type: "Feature",
    properties: { connectedRoutes: 1 }, //TODO: experiment with routes
    geometry: { type: "Point", coordinates: [lon, lat] }
  }))
})

const HeatMap = ({ data, initialViewport }) => {
  const [viewport, setViewport] = useState(initialViewport)

  const mapRef = useRef()

  const MAX_ZOOM_LEVEL = 15

  const getMap = () => (mapRef.current ? mapRef.current.getMap() : null)

  const onViewportChange = viewport => setViewport(viewport)

  const handleMapLoaded = async event => {
    const map = getMap()
    const bristolStopsGeoJSON = data

    map.addSource(HEATMAP_SOURCE_ID, { type: "geojson", data: bristolStopsGeoJSON })
    map.addLayer({
      id: "heatmap-layer",
      source: HEATMAP_SOURCE_ID,

      type: "heatmap",
      paint: {
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": ["interpolate", ["linear"], ["get", "connectedRoutes"], 0, 0, MAX_ZOOM_LEVEL, 1],
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
        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, MAX_ZOOM_LEVEL, 20],
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 5, 1, MAX_ZOOM_LEVEL, 1]
      }
    })
  }

  return (
    <MapGL
      ref={mapRef}
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={onViewportChange}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onLoad={handleMapLoaded}
    />
  )
}

const enhancer = compose(
  mapPropsStream(props$ => {
    const data$ = ajax.getJSON("/data/bristol/bristolBusStops.json").pipe(
      map(data => convertBusStopsDataToGeoJSON(data)),
      startWith(null)
    )

    return combineLatest(props$, data$).pipe(map(([props, data]) => ({ ...props, data })))
  }),

  branch(({ data }) => !data, renderComponent(() => "Loading !!!!!!!!!!...")),

  withParentSize,
  withProps(({ data, parentHeight, parentWidth }) => {
    const [minX, minY, maxX, maxY] = bbox(data)
    const { longitude, latitude, zoom } = new WebMercatorViewport({
      width: parentWidth,
      height: parentHeight
    }).fitBounds([[minX, minY], [maxX, maxY]], { padding: 20 })

    return { initialViewport: { longitude, latitude, zoom } }
  })
)

export default enhancer(HeatMap)
