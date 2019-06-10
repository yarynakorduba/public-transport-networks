import React, { useEffect, useRef, useState } from "react"
import WebMercatorViewport from "viewport-mercator-project"
import { withParentSize } from "@vx/responsive"
import { bbox, clustersDbscan, center, featureCollection, point } from "@turf/turf"
import { groupBy, reduce, filter, isEmpty, intersection, equals, append } from "ramda"
import { combineLatest } from "rxjs"
import { map, startWith } from "rxjs/operators"
import { branch, compose, mapPropsStream, renderComponent, withProps, withStateHandlers } from "recompose"
import MapGL from "react-map-gl"
import TransportTypeSwitcher from "./TransportTypeSwitcher"
import { getHeatMapColorConfig } from "./helpers"
import BEM from "../../helpers/BEM"
import { convertBusStopsDataToGeoJSON } from "../../helpers/index"
import { gql } from "apollo-boost"
import { graphql } from "react-apollo"
import "mapbox-gl/dist/mapbox-gl.css"
import "./HeatMap.scss"

const b = BEM("HeatMap")

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const HEATMAP_SOURCE_ID = "bus-stops"
const BOUNDARIES_SOURCE_ID = "boundaries"
const MAX_MAP_ZOOM_LEVEL = 15

const getStopsQuery = graphql(
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
  {
    options: props => ({
      variables: { city: props.city }
    })
  }
)

const HeatMap = ({ data, boundaries, initialViewport, handleSelect, selectedStationTypes, stationTypes, city }) => {
  const [viewport, setViewport] = useState(initialViewport)
  const mapRef = useRef()
  const getMap = () => (mapRef.current ? mapRef.current.getMap() : null)

  const onViewportChange = viewport => setViewport(viewport)

  useEffect(() => {
    const map = getMap()
    if (map.getSource(HEATMAP_SOURCE_ID)) {
      map.getSource(HEATMAP_SOURCE_ID).setData(data)
    }
  })

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
        "line-color": "deepskyblue"
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
        handleSelect={handleSelect}
        stationTypes={stationTypes}
        selectedTransportTypes={selectedStationTypes}
      />
    </span>
  )
}

const enhancer = compose(
  getStopsQuery,
  branch(({ data }) => data.loading, renderComponent(() => "Loading...")),
  branch(({ data }) => data.error, renderComponent(() => "Something went wrong. We didn`t manage to load the data.")),
  withProps(({ city, data }) => ({ city, ...data.city })),
  withParentSize,
  withProps(({ stops, parentHeight, parentWidth }) => {
    const [minX, minY, maxX, maxY] = bbox(convertBusStopsDataToGeoJSON(stops))
    const { longitude, latitude, zoom } = new WebMercatorViewport({
      width: parentWidth,
      height: parentHeight
    }).fitBounds([[minX, minY], [maxX, maxY]], { padding: 20 })
    return {
      initialViewport: { longitude, latitude, zoom }
    }
  }),
  withStateHandlers(
    ({ stationTypes }) => ({
      selectedStationTypes: stationTypes ? stationTypes : []
    }),
    {
      handleSelect: ({ selectedStationTypes }) => (transportType, isSelected) => ({
        selectedStationTypes: isSelected
          ? append(transportType, selectedStationTypes)
          : filter(n => !equals(transportType, n), selectedStationTypes)
      })
    }
  ),
  withProps(({ stops, stationTypes, selectedStationTypes }) => ({
    stops: !isEmpty(selectedStationTypes)
      ? filter(n => !isEmpty(intersection(n.stationType, selectedStationTypes)), stops)
      : []
  })),
  mapPropsStream(props$ => {
    const data$ = props$.pipe(
      map(({ stops }) => convertBusStopsDataToGeoJSON(stops)),
      map(data => clustersDbscan(data, 0.04, { mutate: true, minPoints: 2 })),
      map(({ features }) =>
        compose(
          featureCollection,
          ({ unclustered, ...clusters }) =>
            unclustered
              ? [
                  ...unclustered,
                  ...reduce(
                    (accum, cluster) => [
                      ...accum,
                      center(featureCollection(cluster.map(p => point(p.geometry.coordinates))))
                    ],
                    [],
                    Object.values(clusters)
                  ).map(point => ({ ...point, properties: { connectedRoutes: 1 } }))
                ]
              : [],
          groupBy(point => (point.properties.cluster ? point.properties.cluster : "unclustered"))
        )(features)
      ),
      startWith(null)
    )
    return combineLatest(props$, data$).pipe(map(([props, data]) => ({ ...props, data })))
  })
)

export default enhancer(HeatMap)
