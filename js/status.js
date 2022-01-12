let services = ["vt_basiskarte_tiles",
    "vt_basiskarte_classic",
    "vt_basiskarte_color",
    "vt_basiskarte_grayscale",
    "vt_basiskarte_light",
    "vt_basiskarte_night",
    "grundsteuer_styles",
    "opengeodata_styles",
    "ki_styles",
    "alkis_tiles",
    "fonts",
    "offline_test"]

let baseUrl = "https://67029deb.eu-de.apigw.appdomain.cloud/vt-status-api/get-http-status?service="

getStatus();
setInterval(function () {
    getStatus()
}, 60000);

getLatestStatusDbDoc()

// gets the status of every service, that ist listed in "services"
function getStatus() {
    let service;
    for (service of services) {
        sendRequest(service);
    }

}

// send the request and changes the html depending on the response
function sendRequest(service) {
    url = baseUrl + service;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE) {
            var status = xmlHttp.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                var response = JSON.parse(xmlHttp.responseText)
                var element = document.getElementById(service);
                var span_small_text = element.getElementsByClassName("small")[0];
                if (response.status == "online") {
                    span_small_text.textContent = "";
                    var span_status = element.getElementsByClassName("status")[0];
                    span_status.textContent = "Online"
                    span_status.classList.remove("failed")
                    span_status.classList.add("success")
                } else {
                    var span_status = element.getElementsByClassName("status")[0];
                    span_status.textContent = "Offline"
                    span_status.classList.remove("success")
                    span_status.classList.add("failed")
                }

                var tbodyRefSummary = document.getElementById(service + "-collapse").getElementsByTagName('tbody')[0];
                tbodyRefSummary.innerHTML = "";

                for (const [key, feature] of Object.entries(response.services[service])) {
                    var newRow = tbodyRefSummary.insertRow();
                    var row = '<th scope="row">' + key + '</th><td>' + feature.status_code + '</td><td><img src="../svg/check-circle.svg" </td>';
                    if (!(feature.status_code >= 200 && feature.status_code < 400)) {
                        var row = '<th scope="row">' + key + '</th><td>' + feature.status_code + '</td><td><img src="../svg/exclamation-circle.svg" </td>';
                        span_small_text.textContent = "Status-Code: " + feature.status_code;
                    }
                    newRow.innerHTML = row;
                }

            } else {
                var element = document.getElementById(service);
                var span_small = element.getElementsByClassName("small")[0];
                span_small.textContent = "Statusabfrage fehlgeschlagen";

            }
        }
    };
    xmlHttp.send();

}

function copyURL(id) {
    copyToClipboard(baseUrl + id)
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


function getLatestStatusDbDoc() {
    url = "https://67029deb.eu-de.apigw.appdomain.cloud/vt-status-api/get-latest-status-db-doc?name=" + services
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE) {
            var status = xmlHttp.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                var response = JSON.parse(xmlHttp.responseText);
                writeLatestMalfunctionToHTML(response.docs)                
            }
        }
    }
    xmlHttp.send();

    

}





function writeLatestMalfunctionToHTML(response_docs) {
    service_array = services
    for (const [key, feature] of Object.entries(response_docs)) {
        for (service of service_array) {
            if (service == feature.name) {
                timestamp = feature.timestamp
                var date  = new Date(timestamp)
                for (const [k1, f1] of Object.entries(feature.services)){
                    var service = k1;
                    for (const [k, f] of Object.entries(f1)){
                        var status_code = f.status_code
                    }

                }
                var el = document.getElementById("latest-malfunction-" + service);
                el.innerHTML = "<b>Letzte Störung am " + 
                date.getDate()+
                "."+(date.getMonth()+1)+
                "."+date.getFullYear()+
                " um  "+date.getHours()+
                ":"+date.getMinutes()+ 
                " Uhr </b><br />   Service: " + service + " <br /> Status-Code: " + status_code + ""
                const index = service_array.indexOf(service);
                if (index > -1) {
                    service_array.splice(index, 1);
                }
            }
        }
    }
    console.log(service_array)
    for (service of service_array) {
        var el = document.getElementById("latest-malfunction-" + service);
        el.innerHTML = "<b>Letzte Störung: Keine Störung in den letzten zwei Wochen</b>"
    }
}

