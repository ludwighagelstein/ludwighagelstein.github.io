// alert("Hoi");


const div = document.getElementById("map"); //Ich definiere die Konstante div und das div element ist drinnen
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

//console.log("Breite=",lat,"Länge=",lng,"Titel=",title);

// Karte initialisieren
let karte = L.map("map"); //neue Konstante "karte", mit L. öffne ich die Leaflet Bibliothek
//console.log(map);

//Auf Ausschnitt zoomen
karte.setView(
[breite,laenge],
13
);  //[] Liste aus einträgen & Zoomlevel (1=ganze Welt)

//Maps einbauen

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
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
    "OpenStreetMap" : kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

//Fullscreen
karte.addControl(new L.Control.Fullscreen());

//Positionsmarker einfügen
let pin = L.marker(
    [breite,laenge]
).addTo(karte);

// Popup zum Pin hängen
pin.bindPopup(titel).openPopup(); //In die Klammern könnte man wieder ganz normal HTML Markup reinschreiben

//Koordinaten in Adresszeile einfügen
var hash = new L.Hash(karte);

//Koordinaten bei Maus hinzufügen
var coords = new L.Control.Coordinates(); // you can send options to the constructor if you want to, otherwise default values are used

coords.addTo(karte);

karte.on('click', function(e) {
	coords.setCoordinates(e);
});

console.log(coords);