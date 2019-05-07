import React, { useRef, useState } from "react"
import WebMercatorViewport from "viewport-mercator-project"
import { withParentSize } from "@vx/responsive"
import { bbox, clustersDbscan, center, featureCollection, point } from "@turf/turf"
import { groupBy, reduce } from "ramda"
import { combineLatest } from "rxjs"
import { map, startWith } from "rxjs/operators"
import { gql } from "apollo-boost"
import { graphql } from "react-apollo"
import { compose, mapPropsStream, branch, renderComponent, withProps, mapProps } from "recompose"
import Pin from "./Pin"

import MapGL, { Marker } from "react-map-gl"
import "./HeatMap.scss"

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const HEATMAP_SOURCE_ID = "bus-stops"

const getStopsQuery = graphql(
  gql`
    query Stops($city: String!) {
      stops(city: $city) {
        lat
        lon
        routes
      }
    }
  `,
  {
    options: props => ({
      variables: { city: props.city }
    })
  }
)

const renderMarker = ([longitude, latitude]) => {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <Pin />
    </Marker>
  )
}

const convertBusStopsDataToGeoJSON = data =>
  featureCollection(
    data.map(({ lat, lon }) => ({
      type: "Feature",
      properties: { connectedRoutes: 1 }, //TODO: experiment with routes
      geometry: { type: "Point", coordinates: [lon, lat] }
    }))
  )

const HeatMap = ({ data, initialViewport, center }) => {
  const [viewport, setViewport] = useState(initialViewport)

  const mapRef = useRef()

  const MAX_ZOOM_LEVEL = 15

  const getMap = () => (mapRef.current ? mapRef.current.getMap() : null)

  const onViewportChange = viewport => setViewport(viewport)

  const handleMapLoaded = async () => {
    const map = getMap()
    const geoJSON = data

    map.addSource(HEATMAP_SOURCE_ID, { type: "geojson", data: geoJSON })
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
    >
      {renderMarker(center)}
    </MapGL>
  )
}

const enhancer = compose(
  getStopsQuery,
  branch(({ data }) => data.loading, renderComponent(() => <h1>Loading...</h1>)),
  mapProps(({ data }) => ({ stops: data.stops })),
  mapPropsStream(props$ => {
    const data$ = props$.pipe(
      map(data => convertBusStopsDataToGeoJSON(data.stops)),

      map(data => clustersDbscan(data, 0.03, { mutate: true, minPoints: 2 })),
      map(data =>
        compose(
          featureCollection,
          ({ unclustered, ...clusters }) => [
            ...unclustered,
            ...reduce(
              (accum, cluster) => [
                ...accum,
                center(featureCollection(cluster.map(p => point(p.geometry.coordinates))))
              ],
              [],
              Object.values(clusters)
            ).map(point => {
              point.properties = { connectedRoutes: 1 }
              return point
            })
          ],
          groupBy(point => {
            if (point.properties.cluster !== undefined) {
              return point.properties.cluster
            } else {
              return "unclustered"
            }
          })
        )(data.features)
      ),
      startWith(null)
    )

    return combineLatest(props$, data$).pipe(map(([props, data]) => ({ ...props, data })))
  }),

  branch(({ data }) => !data, renderComponent(() => "Loading...")),
  withParentSize,
  withProps(({ data, parentHeight, parentWidth }) => {
    const [minX, minY, maxX, maxY] = bbox(data)
    const { longitude, latitude, zoom } = new WebMercatorViewport({
      width: parentWidth,
      height: parentHeight
    }).fitBounds([[minX, minY], [maxX, maxY]], { padding: 20 })

    return {
      initialViewport: { longitude, latitude, zoom },
      center: center(featureCollection(data.features.map(p => point(p.geometry.coordinates)))).geometry.coordinates
    }
  })
)

export default enhancer(HeatMap)
