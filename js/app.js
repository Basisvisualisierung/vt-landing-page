let baseurl = "https://basisvisualisierung.niedersachsen.de/services/"
let usageMap

setLastUpdate()
setupHeaderMap()
setupUsageMap()

// Sets up the map for the header view
function setupHeaderMap() {
    let map = new maplibregl.Map({
        container: "map",
        style: baseurl + "basiskarte/styles/vt-style-classic.json",
        center: [9.8, 52.4],
        zoom: 10,
        pitch: 0,
        interactive: false

    })
    map.on('load', () => {
        map.flyTo({
            center: [9.8008, 52.4074],
            zoom: 17,
            pitch: 60,
            speed: 0.2,
            curve: 1,
        })
    })
}


// Sets up the map for the usage section
function setupUsageMap() {
    usageMap = new maplibregl.Map({
        container: "usageMap",
        style: baseurl + "basiskarte/styles/vt-style-color.json",
        center: [9.8, 52.4],
        zoom: 12,
        minZoom: 7, //zoom out
        maxZoom: 20
    })
    usageMap.addControl(new maplibregl.FullscreenControl(), "top-left")
}

// Sets the date of the last data update in FAQ
// The vector tiles are created on first/second day of month with data from the previous month
function setLastUpdate() {
    const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
                        "Juli", "August", "September", "Oktober", "November", "Dezember"]

    const d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear();

    if (d.getDate() > 2) {
        month = month - 1
    } else {
        month = month - 2
    }

    if (month < 0) {
        month = month + 12
        year = year - 1;
    }
    document.getElementById("lastUpdateFaq").innerHTML = monthNames[month] + " " + year
    document.getElementById("lastUpdateBadge").innerHTML = "Datenaktualität: " + monthNames[month] + " " + year
}


// Displays or hides the contact or imprint section
function toggleFooterSection(id) {
    let container = document.getElementById(id)
    if (container.style.display === "block") {
        hideFooterSection(container)
    } else {
        if (id === "contact") {
            hideFooterSection(document.getElementById("imprint"))
        } else {
            hideFooterSection(document.getElementById("contact"))
        }
        showFooterSection(container)
    }
}

// Hides footer section
function hideFooterSection(container) {
    container.style.display = "none"
    document.getElementById(container.id + "-image").src = "../svg/chevron-down.svg"
}

// Shows footer section and scrolls it into view
function showFooterSection(container) {
    container.style.display = "block"
    document.getElementById(container.id + "-image").src = "../svg/chevron-up.svg"
    window.scrollTo({
        top: document.getElementById("footer").offsetTop - 70,
        behavior: "smooth"
    })
}

// Smooth scrolls to html element with given id
function scrollToID(id) {
    window.scrollTo({
        top: document.getElementById(id).offsetTop - 56,
        behavior: "smooth"
    })
}

// Changes the active style on the usage map
function changeBasemap(id) {
    if (id == 'osm-style-color' || id == 'osm-style-mix-gray-color') {
        usageMap.setStyle(baseurl + "osm-basiskarte/styles/" + id + ".json")
    }
    else {
        usageMap.setStyle(baseurl + "basiskarte/styles/" + id + ".json")
    }

}

// Copys the active style in the usage map to the clipboard
function copyURL(id) {
    let active = document.getElementsByClassName('nav-link map active').item(0)
    if (id) {
        if (id =='Tilejson') {
            copyToClipboard("https://basisvisualisierung.niedersachsen.de/services/basiskarte/v3/tiles/basiskarte.json")
        }else if (id =='Farbe') {
            copyToClipboard("https://basisvisualisierung.niedersachsen.de/services/basiskarte/styles/vt-style-color.json")
        }else {
            copyToClipboard("https://basisvisualisierung.niedersachsen.de/services/basiskarte/v3/tiles/{z}/{x}/{y}.pbf")
        }
        showToast(id + "-URL kopiert", "Die URL urde erfolgreich in die Zwischenablage kopiert")

    } else {
        if (active.id == 'osm-style-color' || active.id == 'osm-style-mix-gray-color') {
            copyToClipboard(baseurl + "osm-basiskarte/styles/" + active.id + ".json")
        } else {
            copyToClipboard(baseurl + "basiskarte/styles/" + active.id + ".json")
        }

        showToast(active.textContent + " kopiert", "Die URL des Styles wurde erfolgreich in die Zwischenablage kopiert")

    }


}

// Copys the active code example to the clipboard
function copyCode(name, codeId) {
    copyToClipboard(document.getElementById(codeId).textContent)
    showToast(name + " kopiert", "Der Quelltext wurde erfolgreich in die Zwischenablage kopiert")
}

// Helper function to copy text to clipboard
function copyToClipboard(content) {
    let elem = document.createElement('textarea')
    elem.value = content
    elem.setAttribute('readonly', '')
    elem.style = { position: 'absolute', left: '-9999px' }
    document.body.appendChild(elem)
    elem.select()
    document.execCommand('copy')
    document.body.removeChild(elem)
}

// Shows a message with given header and message text
function showToast(header, msg) {
    let toastHTMLElement = document.getElementById("myToast")
    let toastElement = new bootstrap.Toast(toastHTMLElement, {
        animation: true,
        delay: 10000
    })
    let toastBody = document.getElementById("toastBody")
    toastBody.textContent = msg
    document.getElementById("toastHeaderText").textContent = header
    toastElement.show()
}

var microbtns = document.querySelectorAll('button[data-bs-toggle="pill"]')
microbtns.forEach(mb => {
    mb.addEventListener('shown.bs.tab', function (event) {
        switch (event.target.id) {
            case "pills-example1-tab":
                document.getElementById("example1").innerHTML = '<vt-map map-height="100%"></vt-map>'
                break
            case "pills-example2-tab":
                document.getElementById("example2").innerHTML = `
                    <vt-map map-height="100%" zoom="8.3" lon="10" lat="52.2" map-style="light">
                        <vt-control type="navigation" position="top-left"></vt-control>
                        <vt-control type="fullscreen" position="top-right"></vt-control>
                        <vt-control type="scale" position="bottom-left"></vt-control>
                
                        <vt-marker lon="9.8" lat="52.0"></vt-marker>
                        <vt-marker lon="9.80205" lat="52.40729">
                            <vt-popup title="Landesvermessung und Geobasisinformation" text="Podbielskistraße 331, 30659 Hannover"></vt-popup>
                        </vt-marker>
                    </vt-map>
                `
                break
            case "pills-example3-tab":
                document.getElementById("example3").innerHTML = `<vt-map map-height="100%" map-click="mapClick" map-style="night"></vt-map>`
                break
            case "pills-example4-tab":
                document.getElementById("example4").innerHTML = `
                    <vt-map map-height="100%" map-style="light" zoom="7">
                        <vt-source type="geojson" src="./data/regionaldirektionen.min.geojson">
                            <vt-layer id="fill" type="fill" color="#ED6A61" opacity="0.1"></vt-layer>
                            <vt-layer id="outline" type="line" color="#ED6A61" opacity="0.8" line-width="4"></vt-layer>
                        </vt-source>
                    </vt-map>
                `
                break
        }
    })
})

