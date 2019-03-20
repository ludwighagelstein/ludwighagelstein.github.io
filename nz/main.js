// alert("Hoi");


const div = document.getElementById("map"); //Ich definiere die Konstante div und das div element ist drinnen
const lat = div.getAttribute("data-lat");
const lng = div.getAttribute("data-lng");
const title = div.getAttribute("data-title");

//console.log("Breite=",lat,"Länge=",lng,"Titel=",title);

// Karte initialisieren
let map = L.map("map"); //neue Konstante "map", mit L. öffne ich die Leaflet Bibliothek
console.log(map);

