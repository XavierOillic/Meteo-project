//On utilie plus "var" (trop instable et lourd), remplacé par "let".
// On utilise "const"

import configuration from "./conf.json" 

//Mise en place d'un mini site en LocalHost8080 pour pouvoir passer outre la police du Web et les CORS. Nous pouvons utiliser la fonction "fetch" ou "import".
//On importe le fichier conf.json pour pouvoir avoir n'importe quelle ville en y modifiant le nom de ville.
// le fichier json se comporte comme un Objet : on peut passer du JS au JSON et inversement grace à "parse" et "stringify".


const icones = {
	"113": "soleil",
	"116": "belles_eclaircies",
	"176": "pluies_eparses",	
	"227": "brouillards",	
	"266": "pluies",
	"299": "pluies_eparses",	
	"314": "pluies",	
	"329": "soleil_neige",	
	"353": "pluies_eparses",	
	"368": "soleil_neige",	
	"389": "pluies_orages",
	"179": "soleil_neige",	
	"230": "neiges",	
	"281": "pluies",	
	"302": "pluies_eparses",	
	"317": "pluies_verglacantes",	
	"332": "neiges",	
	"356": "pluies_eparses",
	"371": "soleil_neige",	
	"392": "soleil_neige",
	"119": "nuageux",	
	"182": "pluies_eparses",	
	"248": "brouillards",	
	"284": "pluies",	
	"305": "pluies_eparses",	
	"320": "pluies_verglacantes",	
	"335": "soleil_neige",	
	"359": "pluies_eparses",	
	"374": "soleil_neige",	
	"395": "orage_soleil_neige",
	"122": "nuageux",	
	"185": "pluies",	
	"260": "brouillards",	
	"293": "pluies_eparses",	
	"308": "pluies",		
	"323": "soleil_neige",	
	"338": "neiges",		
	"362": "pluie_neige_soleil",	
	"377": "soleil_neige",
	"143": "tres_nuageux",	
	"200": "orages_ensoleille",	
	"263": "pluies_eparses",	
	"296": "pluies",	
	"311": "pluies",	
	"326": "neiges",
	"350": "neiges",	
	"365": "pluie_neige-soleil",	
	"386": "orages_ensoleille",
} 
//Listing de toutes les icones proposées par WeatherApi (qu'on a récupéré sur le site) et leur correspondance avec mes dessins d'icones ==> "113":"soleil.png"; Quand la fonction appelera les icones Weatherapi, elle appelera en fait les miens----> ligne 97
//La constante (une Boite) "const" nommée "icones" = on lui met une valeur() ou plusieurs) qui peuvent étre égale à une "string".

const recuperation = async () => { // ici, une constante "recuperation", on lui ASSIGNE une fonction grace à "()=>{}" pour dire ce que l'on veut faire des données recuperees.
	const apiKey = configuration.apiKey // on va chercher l'APIKEY dans le fichier Conf.json
	const city = configuration.city //idem avec la ville, que je peux changer dans le fichier conf.
	const url =  `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=fr` //on stocke l'adresse url dans la constante url
	//fetch(url),on cherche l'adresse indiquée dans la constante "url". Toujours la meme url en l'occurence.
	const resultat = await fetch(url)//on fait en sorte qu'il stocke le resultat dans une variable pour l'afficher plus tard, "await" veut dire qu'on laisse le temps à l'explorateur d'aller chercher et afficher les infos.
	const resultatDecode = await resultat.json() //Json interprete les donnees du resultat brut pour en faire du joli
	return resultatDecode
} //voici une fonction, sans arguments (ce qu'il y a entre les ()), pour l'instant.


const afficheRecuperation = async () => {
	const meteo = await recuperation()
	
	const ville = configuration.city
	const classVille = document.querySelector(".ville")
		classVille.innerText = ville.toUpperCase()
	
	const temperature = meteo.current.temp_c //on nomme la constante: temperature qui va chercher dans la const meteo le fichier temp_c
	const classTemperature = document.querySelector(".temperature") // le QSelec permet de selectionner un element dans le fichier html, en l'occurence la Div Class "temperature"
		classTemperature.innerText = `${temperature} °C` // les `` nous permettent de faire une Concatenation de la temperature et du celcius.

	const humidite = meteo.current.humidity
	const classHumidite = document.querySelector(".humidite") //permet de selectionner un élément du fichier joli json et l'afficher dans la class dédiée.
		classHumidite.innerText = `${humidite} %`//grâce au INNERTEXT ou HTML, on insère à la place de ....

	const ressenti = meteo.current.feelslike_c
	const classRessenti = document.querySelector(".ressenti")
		classRessenti.innerText = `${ressenti} °C`

	const vent = meteo.current.wind_kph
	const classVent = document.querySelector(".vent")
		classVent.innerText = `${vent} Km/h`

const weatherIcon = meteo.current.condition.icon //on déclare/nomme "la boite" constante weatherIcon (j'ai choisi ce nom) et on lui dit qu'elle contient les données de l'adresse "current.condition.icon" de WeatherApi.

//for est une boucle	
for (const weatherCode in icones){
	if (weatherIcon.includes(weatherCode)){
		//console.log("bravo")
		//console.log(weatherCode)
		const iconPerso = icones[weatherCode] //on déclare une constante dans la condition
		const classCiel = document.querySelector(".ciel")
			classCiel.innerHTML =  `<img class="${iconPerso}" src="image/${iconPerso}.png" alt="${iconPerso}"/>`	
		}
	}
}
afficheRecuperation()

/**
Ces 4 paragraphes identiques vont chercher et afficher l'info (fonction afficheRecuperation, marquée par les () et les {} et le symbole => ). On preleve le text adéquate (document) et on l'affiche la ou il faut (innerText) et grace à la Class déclarée dans la page html, identifiée par le "." 
console.log(classTemperature)
------> il faut Appeller la fonction pour qu'elle puisse faire ce qu'on lui demande.
**/

/**Mise à jour horaire des données météo**/

setInterval(afficheRecuperation, 1800000);


//const cityText = prompt(' Choisissez votre ville ') //je crée le PopUp avec la demande de choix; je stocke dans cityText
			//console.log(cityText)// affiche bien le texte entré dans le champ de texte prompt
	//  document.querySelector(".temps").innerHTML = cityText ___fonctionne____on cherche dans l'HTML grâce qS, et on insère cityText à l'endroit désiré grace à inner.
//document.querySelector(".ville").innerHTML = cityText 

//document.querySelector va chercher dans le doc Html l'endroit precise entre ("")
//innerText ou innerHTML prend cete place avec l'element spécifié juste après lui dans le code.






/** FENETRE D'HORODATAGE

const horodatage = new Date()

const annee = horodatage.getFullYear()
const mois = ('0' + (horodatage.getMonth()+1)).slice(-2) 
const date = ('0' + horodatage.getDate()).slice(-2)
const heure = ('0' + horodatage.getHours()).slice(-2)
const minute = ('0' + horodatage.getMinutes()).slice(-2)

window.alert (`Le ${date} / ${mois} / ${annee}, ${heure} heures, ${minute} minutes.`);

FENETRE D'HORODATAGE**/










