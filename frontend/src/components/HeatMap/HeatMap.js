import React, { useEffect, useRef, useState } from "react"
import WebMercatorViewport from "viewport-mercator-project"
import { withParentSize } from "@vx/responsive"
import { bbox, clustersDbscan, center, featureCollection, point } from "@turf/turf"
import { groupBy, reduce, filter, isEmpty, intersection, equals, append } from "ramda"
import { combineLatest } from "rxjs"
import { map, startWith } from "rxjs/operators"
import { compose, mapPropsStream, withProps, withStateHandlers } from "recompose"
import MapGL from "react-map-gl"
import TransportTypeSwitcher from "./TransportTypeSwitcher"
import { getHeatMapColorConfig } from "./helpers"
import BEM from "../../helpers/BEM"
import { convertBusStopsDataToGeoJSON } from "../../helpers/index"
import { withStationTypes, withStops } from "../HOC"

import "./HeatMap.scss"

const b = BEM("HeatMap")

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
const HEATMAP_SOURCE_ID = "bus-stops"
const MAX_MAP_ZOOM_LEVEL = 15

const HeatMap = ({ data, initialViewport, handleSelect, selectedStationTypes, stationTypes, city }) => {
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
    map.addLayer({
      id: "heatmap-layer",
      source: HEATMAP_SOURCE_ID,
      type: "heatmap",
      paint: getHeatMapColorConfig(MAX_MAP_ZOOM_LEVEL)
    })
  }

  return (
    <span className={b()}>
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
  withStops,
  withStationTypes,
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
      map(data => clustersDbscan(data, 0.03, { mutate: true, minPoints: 2 })),
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
