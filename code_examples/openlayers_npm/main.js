import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import { fromLonLat } from "ol/proj"
import { apply } from "ol-mapbox-style"

const styleUrl = "https://staging.basisvisualisierung.niedersachsen.de/services/basiskarte/styles/vt-style-color.json"

// Hannover
const center = [9.8, 52.4]

// OpenLayers Map with defined view
const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat(center),
    zoom: 15
  })
})

// Fetch Mapbox style document
fetch(styleUrl)
  .then(response => response.json())
  .then(data => {
    const style = data
    style.layers.forEach(l => {
      delete l.layout?.["symbol-spacing"]
    })
    return style
  })
  .then(style => {
    // Apply style (data, style layers) to OpenLayers Map
    // Note: pbf fonts are not supported, missing web-fonts are requested from google by default
    apply(map, style)
  })
