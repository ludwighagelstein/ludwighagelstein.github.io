let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    stamen_toner: L.tileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ['a', 'b', 'c'],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ['a', 'b', 'c'],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ['a', 'b', 'c'],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),
}

kartenLayer.osm.addTo(karte);

//Auswahlmenü hinzufügen
const layerControl = L.control.layers({
    "OpenStreetMap": kartenLayer.osm,
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Orthophoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap hiDPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

karte.setView(
    [47.267222, 11.392778], 10
);

//console.log(AWS);

//wenn Internetverbindung abbricht wird zB Script weitergealden (wird asynchron abgerufen)
async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations"); //darauf warten, dass der nächste aufruf abgeschlossen ist
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            //console.log("Layer: ", layer);
            const date = new Date(layer.feature.properties.date);
            //console.log("Datum: ", date);
            return `<h4> ${layer.feature.properties.name} </h4>
        Höhe: ${layer.feature.geometry.coordinates[2]} m<br>
        Temperatur (°C): ${layer.feature.properties.LT} °C <br>
        Datum: ${date.toLocaleDateString("de-AT")} <br> 
        Zeit: ${date.toLocaleTimeString("de-AT")} <br>
        Windgeschwindigkeit (Bft): ${layer.feature.properties.WG ? layer.feature.properties.WG + ' km/h': 'keine Daten'} <br>
        Relative Luftfeuchtigkeit (%): ${layer.feature.properties.RH ? layer.feature.properties.RH + '%': 'keine Daten'}
        <hr>
        <footer>Land Tirol - <a href=https://data.tiro.gv.at>data.tirol.at</a></footer>`;
        })
        .addTo(awsTirol);
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");


    const windLayer = L.featureGroup();
    const farbpalette_wind = [
        [3, "#00b900"],
        [4, "#10cd24"],
        [5, "#72d475"],
        [6, "#fed6d3"],
        [7, "#ffb6b3"],
        [8, "#ff9e9a"],
        [9, "#ff8281"],
        [10, "#ff6160"],
        [11, "#ff453c"],
        [12, "#ff200e"]
    ];
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            let colorwind;
            if (feature.properties.WR) {
                //let color = `color`;
                //const windspeed_bf = ((((feature.properties.WG/3.6)-0.07)/0.834)^2)^(1/3); //umrechung in beaufort
                //if (windspeed_bf > 4) {
                //    color = `red`
                //}

                for (let i = 0; i < farbpalette_wind.length; i++) {
                    const windspeed_bf = Math.round(Math.pow(((feature.properties.WG / 3.6) / 0.836), (2 / 3))); //umrechung in beaufort
                    //console.log('station=',feature.properties.name,'Farbwert = ', farbpalette_wind[i], 'Beaufort = ', windspeed_bf, 'Km/h = ', feature.properties.WG);
                    if (windspeed_bf < farbpalette_wind[i][0]) {
                        colorwind = farbpalette_wind[i][1];
                        break;
                    }
                }


                //console.log('Windspeed (Beafort):', windspeed_bf);
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color: ${colorwind}; transform: rotate(${feature.properties.WR-45}deg)" class="fas fa-location-arrow fa-2x"></i>`
                    })

                });

            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");

    //windLayer.addTo(karte);



    const temperatureLayer = L.featureGroup();
    const farbpalette_temp = [
        [-30, "#646664"],
        [-28, "#8c8a8c"],
        [-26, "#b4b2b4"],
        [-24, "#cccecc"],
        [-22, "#e4e6e4"],
        [-20, "#772d76"],
        [-18, "#b123b0"],
        [-16, "#d219d1"],
        [-14, "#f0f"],
        [-12, "#ff94ff"],
        [-10, "#3800d1"],
        [-8, "#325afe"],
        [-6, "#2695ff"],
        [-4, "#00cdff"],
        [-2, "#00fffe"],
        [0, "#007800"],
        [2, "#009d00"],
        [4, "#00bc02"],
        [6, "#00e200"],
        [8, "#0f0"],
        [10, "#fcff00"],
        [12, "#fdf200"],
        [14, "#fde100"],
        [16, "#ffd100"],
        [18, "#ffbd00"],
        [20, "#ffad00"],
        [22, "#ff9c00"],
        [24, "#ff7800"],
        [26, "red"],
        [28, "#f30102"],
        [30, "#d20000"],
        [32, "#c10000"],
        [34, "#b10000"],
        [36, "#a10000"],
        [38, "#900000"],
        [40, "#770100"],
        [42, "#5f0100"],
        [44, "#460101"],
        [46, "#2e0203"]
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            let colortemp;
            if (feature.properties.LT) {
                for (let i = 0; i < farbpalette_temp.length; i++) {
                    //console.log(farbpalette_temp[i], feature.properties.LT);
                    if (feature.properties.LT < farbpalette_temp[i][0]) {
                        colortemp = farbpalette_temp[i][1];
                        break;
                    }
                }


                // if (feature.properties.LT > 0) {
                //    color = `red`;
                //}
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperatureLabel" style="background-color:${colortemp}"> ${feature.properties.LT} </div>`
                    })

                });

            }
        }
    }).addTo(temperatureLayer);
    layerControl.addOverlay(temperatureLayer, "Temperatur (°C)");

    const humidLayer = L.featureGroup();
    const farbpalette_h = [
        [1, "#EEE"],
        [30, "#DDD"],
        [40, "#C6C9CE"],
        [50, "#BBB"],
        [60, "#AAC"],
        [70, "#9998DD"],
        [80, "#8788EE"],
        [90, "#7677E1"],
        [9999, "#7677E1"]
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            let colorh;
            if (feature.properties.RH) {
                for (let i = 0; i < farbpalette_h.length; i++) {

                    if (feature.properties.RH < farbpalette_h[i][0]) {
                        colorh = farbpalette_h[i][1];
                        //console.log('station=', feature.properties.name, 'Farbwert = ', colorh, 'Luftfeuchte = ', feature.properties.RH);
                        break;
                    }

                }

                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="humidLabel" style="background-color:${colorh}"> ${feature.properties.RH} </div>`
                    })

                });

            }
        }
    }).addTo(humidLayer);
    layerControl.addOverlay(humidLayer, "Relative Luftfeuchte (%)");



    temperatureLayer.addTo(karte);
}

loadStations();