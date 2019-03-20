// alert("Hoi");


const div = document.getElementById("map"); //Ich definiere die Konstante div und das div element ist drinnen
const lat = div.getAttribute("data-lat");
const lng = div.getAttribute("data-lng");
const title = div.getAttribute("data-title");
alert(lat);
alert(lng);
alert(title);