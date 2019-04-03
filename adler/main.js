// alert("Hoi");


const div = document.getElementById("map"); //Ich definiere die Konstante div und das div element ist drinnen, const kann nicht neue zuweisung bekommen!!
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");



//console.log("Breite1=",breite1,"Länge1=",laenge1,"Titel1=",titel1);

// Karte initialisieren
let karte = L.map("map"); //neue Konstante "karte", mit L. öffne ich die Leaflet Bibliothek
//console.log(map);


/*Auf Ausschnitt zoomen #wird unten besser gemacht!
karte.setView(
    [47.2, 11.2],
    8
); //[] Liste aus einträgen & Zoomlevel (1=ganze Welt)*/

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
        stamen_toner: L.tileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",{
            subdomains: ['a','b','c'],
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        stamen_terrain: L.tileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",{
            subdomains: ['a','b','c'],
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        stamen_watercolor: L.tileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",{
            subdomains: ['a','b','c'],
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        }),
    }

kartenLayer.osm.addTo(karte);

//Auswahlmenü hinzufügen
L.control.layers({
    "Geoland Basemap" : kartenLayer.geolandbasemap,
    "Geoland Basemap Grau" : kartenLayer.bmapgrau,
    "OpenStreetMap" : kartenLayer.osm,
    "Geoland Basemap Overlay" : kartenLayer.bmapoverlay,
    "Orthophoto" : kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap hiDPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);



//Positionsmarker1 einfügen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);

//Positionsmarker2 einfügen
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

// Popup 1 & 2 zum Pin hängen
pin1.bindPopup(titel1).openPopup(); //In die Klammern könnte man wieder ganz normal HTML Markup reinschreiben
pin2.bindPopup(titel2).openPopup();

let blickeGruppe = L.featureGroup().addTo(karte);

for (let blick of ADLERBLICKE) { //let kann überschireben weren!
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1> ${blick.standort}</h1>
            <p> ${blick.seehoehe}</p>
            <em> ${blick.kunde}</em>`
    )
    //console.log(blick); //ausgeben, was jeweil in  der Variable blick steht (Die existiert nur innerhalb des loops!)
    //console.log(ADLERBLICKE);
} //Für jedes von diesen Elementen in adlerblicke soll 1 Pin an der Stelle lat und lng für diese variable blick gesetzt werden

console.log(blickeGruppe.getBounds());
karte.fitBounds(blickeGruppe.getBounds()); // Setzt den map Extent genau auf die ausweitung von den Markern
karte.addControl(new L.Control.Fullscreen());