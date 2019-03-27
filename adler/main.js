// alert("Hoi");


const div = document.getElementById("map"); //Ich definiere die Konstante div und das div element ist drinnen
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");
const breite3 = div.getAttribute("data-lat3");
const laenge3 = div.getAttribute("data-lng3");



//console.log("Breite1=",breite1,"Länge1=",laenge1,"Titel1=",titel1);

// Karte initialisieren
let karte = L.map("map"); //neue Konstante "karte", mit L. öffne ich die Leaflet Bibliothek
//console.log(map);
var markers = [
    L.marker([breite1, laenge1]),
    L.marker([breite2, laenge2])
]

var group = L.featureGroup(markers).addTo(karte);

setTimeout(function () {
    karte.fitBounds(group.getBounds());
}, 0);
//Auf Ausschnitt zoomen
/*karte.setView(
[breite3,laenge3],
12
);*/ //[] Liste aus einträgen & Zoomlevel (1=ganze Welt)

//OpenstreetMap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

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

const blick1 = {
    kunde: "Wilder Kaiser",
    standort: "Gruttenhütte",
    seehoehe: 1640,
    lat: 47.55564,
    lng: 12.31861
}; //JS Objekt, An schlüssel (karte) kann ich Wertepaare anhängen - Objekt ist alleinstehend, d.h. man kann auch Werte von außerhalb "wiederholen" 