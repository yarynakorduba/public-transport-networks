import React, { useEffect, useRef, useState, useMemo } from "react"
import WebMercatorViewport from "viewport-mercator-project"
import { withParentSize } from "@vx/responsive"
import { bbox } from "@turf/turf"
import { isEmpty, intersection, pipe, prop } from "ramda"
import { branch, compose, renderComponent, withProps } from "recompose"
import MapGL from "react-map-gl"
import TransportTypeSwitcher from "./TransportTypeSwitcher"
import Loader from "../Loader"
import { convertClusteredDataToFeatureCollection, getHeatMapColorConfig, preconfiguredClustersDbscan } from "./helpers"
import { convertBusStopsDataToGeoJSON } from "../../helpers"
import { gql } from "apollo-boost"
import { graphql } from "react-apollo"

import BEM from "../../helpers/BEM"
import "mapbox-gl/dist/mapbox-gl.css"
import "./HeatMap.scss"

const b = BEM("HeatMap")

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const HEATMAP_SOURCE_ID = "bus-stops"
const BOUNDARIES_SOURCE_ID = "boundaries"
const MAX_MAP_ZOOM_LEVEL = 15

const HeatMap = ({ stops, boundaries, initialMapViewport, stationTypes, city }) => {
  const [selectedStationTypes, setSelectedStationTypes] = useState(stationTypes)
  const [filteredStops, setFilteredStops] = useState(stops)

  useEffect(() => {
    setFilteredStops(stops.filter(({ stationType }) => !isEmpty(intersection(stationType, selectedStationTypes))))
  }, [selectedStationTypes, stops])

  const data = useMemo(
    () =>
      pipe(
        convertBusStopsDataToGeoJSON,
        preconfiguredClustersDbscan,
        prop("features"),
        convertClusteredDataToFeatureCollection
      )(filteredStops),
    [filteredStops]
  )

  const [viewport, setViewport] = useState(initialMapViewport)
  const mapRef = useRef()
  const getMap = () => (mapRef.current ? mapRef.current.getMap() : null)

  const onViewportChange = viewport => setViewport(viewport)

  useEffect(() => {
    const map = getMap()
    if (map.getSource(HEATMAP_SOURCE_ID)) {
      map.getSource(HEATMAP_SOURCE_ID).setData(data)
    }
  }, [data])

  const handleMapLoaded = async () => {
    const map = getMap()
    const geoJSON = data
    map.addSource(HEATMAP_SOURCE_ID, { type: "geojson", data: geoJSON })
    map.addSource(BOUNDARIES_SOURCE_ID, { type: "geojson", data: boundaries })
    map.addLayer({
      id: "heatmap-layer",
      source: HEATMAP_SOURCE_ID,
      type: "heatmap",
      paint: getHeatMapColorConfig(MAX_MAP_ZOOM_LEVEL)
    })
    map.addLayer({
      id: "boundaries-layer",
      source: BOUNDARIES_SOURCE_ID,
      type: "line",
      paint: {
        "line-width": 2,
        "line-color": "#d6ceca"
      }
    })
  }

  return (
    <span className={b()}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onLoad={handleMapLoaded}
      />
      <TransportTypeSwitcher
        city={city}
        handleSelect={setSelectedStationTypes}
        stationTypes={stationTypes}
        selectedTransportTypes={selectedStationTypes}
      />
    </span>
  )
}

const enhancer = compose(
  graphql(
    gql`
      query City($city: String!) {
        city(city: $city) {
          stationTypes
          stops {
            id
            stationType
            lat
            lon
            connections
          }
          boundaries {
            ... on GeoJSONPolygon {
              type
              coordinates
            }
            ... on GeoJSONMultiPolygon {
              type
              coordinates
            }
          }
        }
      }
    `,
    { options: ({ city }) => ({ variables: { city } }) }
  ),
  branch(({ data }) => data.loading, renderComponent(() => <Loader loading={true} />)),
  branch(({ data }) => data.error, renderComponent(() => <Loader loading={false} />)),

  withProps(({ data }) => ({ ...data.city })),

  withParentSize,
  withProps(({ stops, parentHeight, parentWidth }) => {
    const [minX, minY, maxX, maxY] = bbox(convertBusStopsDataToGeoJSON(stops))
    const { longitude, latitude, zoom } = new WebMercatorViewport({
      width: parentWidth,
      height: parentHeight
    }).fitBounds([[minX, minY], [maxX, maxY]], { padding: 20 })

    return { initialMapViewport: { longitude, latitude, zoom } }
  })
)

export default enhancer(HeatMap)
