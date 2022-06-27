/* Interaktive Karte Skript*/

let innsbruck = {
    lat: 47.267222,
    lng: 11.392778,
    zoom: 9
};

// WMTS Hintergrundlayer der eGrundkarte Tirol definieren
const eGrundkarteTirol = {
    sommer: L.tileLayer(
        "http://wmts.kartetirol.at/gdi_summer/{z}/{x}/{y}.png", {
            attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
        }
    ),
    ortho: L.tileLayer(
        "http://wmts.kartetirol.at/gdi_ortho/{z}/{x}/{y}.png", {
            attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`
        }
    ),
    nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/gdi_nomenklatur/{z}/{x}/{y}.png", {
            attribution: `Datenquelle: <a href="https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol">eGrundkarte Tirol</a>`,
            pane: "overlayPane",
        }
    )
}

// eGrundkarte Tirol Sommer als Startlayer
let startLayer = eGrundkarteTirol.sommer;

// Karte initialisieren
let map = L.map("map", {
    center: [innsbruck.lat, innsbruck.lng],
    zoom: innsbruck.zoom,
    layers: [
        startLayer
    ],
});

// Layer control mit WMTS Hintergründen
let layerControl = L.control.layers({
    "eGrundkarte Tirol Sommer": startLayer,
    "eGrundkarte Tirol Orthofoto": eGrundkarteTirol.ortho,
    "eGrundkarte Tirol Orthofoto mit Beschriftung": L.layerGroup([
        eGrundkarteTirol.ortho,
        eGrundkarteTirol.nomenklatur,
    ])
},

// Fullscreen control
L.control.fullscreen().addTo(map);

// Maßstab hinzufügen
L.control.scale({
    imperial: false,
}).addTo(map);

// Minimap
let miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("OpenStreetMap.Mapnik"), {
        toggleDisplay: true
    }
).addTo(map)

// Radrouten_Tirol geojson einbauen und anzeigen

async function loadRadrouten_Tirol(url) {
    let response = await fetch(url);
    let geojson = await response.json ();
    //console.log('Geojson Radrouten_Tirol: ', geojson);
    L.geoJSON(geojson, {
        style: function(feature) {
            //console.log(feature.properties.OBJEKT)

            let colors = {
                "leicht": "#0074D9",
                "mittelschwierig": "#FF4136",
                "schwierig": "#111111"
            };

            if (feature.properties.OBJEKT == "RADW_L" || feature.properties.OBJEKT == "RAD_M" || feature.properties.OBJEKT == "RAD_S") {
                return {
                    color: `${colors[feature.properties.SCHWIERIGKEITSGRAD]}`,
                weight: 3,
                }
            }

            else if (feature.properties.OBJEKT == "MTB_L" || feature.properties.OBJEKT == "MTB_M" || feature.properties.OBJEKT == "MTB_S") {
                return {
                    color: `${colors[feature.properties.SCHWIERIGKEITSGRAD]}`,
                weight: 3,
                dashArray: [10,6],
                }
            }

            else {
                return {
                    color: `${colors[feature.properties.SCHWIERIGKEITSGRAD]}`,
                weight: 4,
                dashArray: [2,10]
                }
            }
        }
    }).bindPopup(function (layer) {
        return `
        <strong>${layer.feature.properties.ROUTENNAME}</strong><hr>
        ${layer.feature.properties.ROUTEN_TYP}<br>
        Fahrzeit: ${layer.feature.properties.FAHRZEIT}
        `
    }).addTo(map)
}
<<<<<<< HEAD
loadRadrouten_Tirol("data/Radrouten_Tirol.geojson");

// GPX Track Layer beim Laden anzeigen
overlays.gpx.addTo(map);

// GPX Track Layer implementieren
let gpxTrack = new L.GPX("data/hk.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'icons/start.png',
        endIconUrl: 'icons/finish.png',
        shadowUrl: null,
        iconSize: [32, 37],
        iconAnchor: [16, 37],
        popupAnchor: [0, -37]
    },
}).addTo(overlays.gpx);

// nach dem Laden ...
  gpxTrack.on("loaded", function(evt) {
// Ausschnitt auf den GPX-Track setzen
    map.fitBounds(evt.target.getBounds());
});

let elevationControl = L.control.elevation({
    time: false,
    elevationDiv: "#profile",
    theme: 'bike-tirol',
    height: 200,
}).addTo(map);
gpxTrack.on("addline", function(evt) {
    elevationControl.addData(evt.line);
});
=======
loadRadrouten_Tirol("data/Radrouten_Tirol.geojson");
>>>>>>> c10ce03bb07de875693c9a66eabd0681f9ac5138
