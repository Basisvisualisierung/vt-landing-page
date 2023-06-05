import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import { fromLonLat } from "ol/proj"
import { apply } from "ol-mapbox-style"

// OpenLayers Map with defined view
const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([9.8, 52.4]),
    zoom: 11
  })
})

// Fetch Mapbox style document
fetch("https://basisvisualisierung.niedersachsen.de/services/basiskarte/styles/vt-style-color.json")
  .then(response => response.json())
  .then(style => {
    apply(map, style)
  })
