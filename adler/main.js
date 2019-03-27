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
var markers = [
    L.marker([breite1, laenge1]),
    L.marker([breite2, laenge2])
]

var group = L.featureGroup(markers).addTo(karte);

/*setTimeout(function () {
    karte.fitBounds(group.getBounds());
}, 0);*/

/*karte.setView(function () {
    karte.fitBounds(group.getBounds());
}, 12
);*/

//Auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
); //[] Liste aus einträgen & Zoomlevel (1=ganze Welt)

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


const adlerblicke = [{
        kunde: "Wilder Kaiser",
        standort: "Gruttenhütte",
        seehoehe: 1640,
        lat: 47.55564,
        lng: 12.31861
    },
    {
        kunde: "Bergbahn Scheffau ",
        standort: "Brandstadl",
        seehoehe: 1640,
        lat: 47.4912,
        lng: 12.248
    },
    {
        kunde: "Lechtal Tourismus ",
        standort: "Sonnalm Jöchelspitze",
        seehoehe: 1786,
        lat: 47.27528,
        lng: 10.36505
    }
]; //JS Objekt, An schlüssel (karte) kann ich Wertepaare anhängen - Objekt ist alleinstehend, d.h. man kann auch Werte von außerhalb "wiederholen" 

for (let blick of adlerblicke) { //let kann überschireben weren!
    let blickpin = L.marker( 
        [blick.lat, blick.lng]
    ).addTo(karte);
    blickpin.bindPopup(
        `<h1> ${blick.standort}</h1>
            <p> ${blick.seehoehe}</p>
            <em> ${blick.kunde}</em>`
    )
    console.log(blick); //ausgeben, was jeweil in  der Variable blick steht (Die existiert nur innerhalb des loops!)
} //Für jedes von diesen Elementen in adlerblicke soll 1 Pin an der Stelle lat und lng für diese variable blick gesetzt werden