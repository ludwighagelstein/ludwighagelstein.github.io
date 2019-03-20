// alert("Hoi");


const div = document.getElementById("map"); //Ich definiere die Konstante div und das div element ist drinnen
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const title = div.getAttribute("data-title");

//console.log("Breite=",lat,"Länge=",lng,"Titel=",title);

// Karte initialisieren
let karte = L.map("map"); //neue Konstante "karte", mit L. öffne ich die Leaflet Bibliothek
//console.log(map);

//Auf Ausschnitt zoomen
karte.setView(
[breite,laenge],
13
);  //[] Liste aus einträgen & Zoomlevel (1=ganze Welt)

//OpenstreetMap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);