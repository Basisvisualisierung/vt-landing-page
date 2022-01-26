let baseUrl = "https://basisvisualisierung.niedersachsen.de/status-api/"

sendRequest(true);
setInterval(function () {
    sendRequest(false)
}, 60000);

// send the request and changes the html depending on the response
function sendRequest(initial) {
    const accordion = document.querySelector("#services-accordion")
    fetch(baseUrl + "health-check?service=all").then(handleErrors).then(res => res.json()).then(services => {
        fetch(baseUrl + "get-outages").then(handleErrors).then(res => res.json()).then(outages_resp => {
            initial && setAccordion(accordion, false)
            services.services.forEach(service => {
                const item = initial ? document.querySelector("#service-template").content.cloneNode(true) : document.querySelector("#" + service.name + "-item")
                const outages = outages_resp.docs.filter(o => o.name === service.name)
                initial && setDescriptions(item, service)
                setStatus(item, service)
                setLastOutage(item, outages)
                setParts(item, service)
                initial && accordion.appendChild(item)
            })
        }).catch(_ => {
            setAccordion(accordion, true)
        })
    }).catch(_ => {
        setAccordion(accordion, true)
    })
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

function setAccordion(accordion, showError) {
    if (showError) {
        accordion.innerHTML = "Fehler beim Statusabruf"
    } else {
        accordion.innerHTML = ""
        accordion.classList.remove("d-flex")
        accordion.classList.remove("justify-content-center")
    }
}

function setStatus(item, service) {
    const statusDescription = item.querySelector(".service-status")
    statusDescription.textContent = service.status && service.status[0].toUpperCase() + service.status.slice(1)
    statusDescription.classList.remove("success")
    statusDescription.classList.remove("failed")
    statusDescription.classList.add(service.status === "online" ? "success" : "failed")
}

function setDescriptions(item, service) {
    const itemBody = item.querySelector(".accordion-collapse")
    const itemToggle = item.querySelector(".accordion-button")
    item.querySelector(".urlBtn").setAttribute("onclick", "copyURL('" + service.name + "')")
    item.querySelector("div").id = service.name + "-item"
    item.querySelector(".service-name").textContent = service.name
    item.querySelector(".accordion-header").id = service.name + "-header"
    item.querySelector(".service-url").textContent = baseUrl + "health-check?service=" + service.name
    itemBody.id = service.name + "-collapse"
    itemBody.setAttribute("aria-labelledby", service.name + "-header")
    itemBody.setAttribute("data-bs-parent", "#services-accordion")
    itemToggle.setAttribute("data-bs-target", "#" + service.name + "-collapse")
    itemToggle.setAttribute("aria-controls", service.name + "-collapse")
}

function setParts(item, service) {
    const table = item.querySelector("tbody")
    table.innerHTML = ""
    service.parts.forEach(part => {
        const row = document.createElement("tr")
        row.setAttribute("scope", "row")
        const name = document.createElement("td")
        name.textContent = part.name
        row.appendChild(name)
        const status = document.createElement("td")
        status.textContent = part.status_code
        row.appendChild(status)
        row.appendChild(document.createElement("td"))
        table.appendChild(row)
    })
}

function setLastOutage(item, outages) {
    if (outages.length > 0) {
        const latest = outages.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)[0]
        const date = new Date(latest.timestamp)
        item.querySelector(".last-outage").innerHTML =
            "<b>Letzte Störung am " + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() +
            " um " + date.getHours() + ":" + date.getMinutes() + " Uhr</b><br/>Services: " +
            latest.parts.map(part => part.name).join(", ") + "<br/>Status-Codes: " + latest.parts.map(part => part.status_code).join(", ")
    }
}

function copyURL(id) {
    copyToClipboard(baseUrl + "health-check?service=" + id)
    showToast(id + " kopiert", "Die URL der Status-API wurde erfolgreich in die Zwischenablage kopiert")
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