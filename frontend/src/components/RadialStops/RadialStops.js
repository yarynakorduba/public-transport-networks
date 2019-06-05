import React, { useRef, useState } from "react"
import MapGL, { Marker } from "react-map-gl"
import BEM from "../../helpers/BEM"
import "mapbox-gl/dist/mapbox-gl.css"
import "./RadialStops.scss"

const b = BEM("RadialStops")

const MAPBOX_TOKEN = "pk.eyJ1IjoiZmFtZHJ1bSIsImEiOiJjanRndm0zcHEwb2loNDRwZGE1enByYjM5In0.afWOyr4JpxpO3CnPVbccTg"

const RadialStops = () => {
  var initialViewport = {longitude: 24.031607, latitude: 49.841289, zoom: 15, bearing: 19.20, pitch: 45.50}
  const [viewport, setViewport] = useState(initialViewport)

  const onViewportChange = viewport => setViewport(viewport)


  const mapRef = useRef()
  const getMap = () => (mapRef.current ? mapRef.current.getMap() : null)

  const handleMapLoaded = async () => {
    const map = getMap()
    var labelLayerId;

    map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          "interpolate", ["linear"], ["zoom"],
          14, 0,
          14.05, ["get", "height"]
        ],
        'fill-extrusion-base': [
          "interpolate", ["linear"], ["zoom"],
          14, 0,
          14.05, ["get", "min_height"]
        ],
        'fill-extrusion-opacity': .6
      }
    }, labelLayerId);
  }

  const markerCoords = [[49.845770, 24.027878], [49.842879, 24.035439], [49.839797, 24.032723], [49.840309, 24.028347]]

  return (
    <span className={b()}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/famdrum/cjwgr6my308z41co7ob9okmx0"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={onViewportChange}
        onLoad={handleMapLoaded}>

        {markerCoords.map((coords, i)=>(
          <Marker key={i} latitude={coords[0]} longitude={coords[1]}>
            <img className={b("marker-icon")} src={"img/management/pin.svg"}/>
          </Marker>
        ))}

      </MapGL>
    </span>
  )
}

export default RadialStops
