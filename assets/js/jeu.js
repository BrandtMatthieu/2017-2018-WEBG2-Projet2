var numeroQuestion, // question actuelle
    maxQuestions, // nombre max de questions
    score, //score actuel
    aRepondu, //a déjà choisis une réponse
    parametre, // la région passée en paramètres
    allRegions, //  toutes les régions possibles
    paysDejaPoses, // liste des pays déjà posés par nom
    paysAPoser, // liste des pays à poser en nom
    paysAPoserObj, // liste des pays à poser en, objet
    paysSurImage; // pays sur l'image
document.getElementsByTagName("body")[0].addEventListener("load", main());

function main() {
	numeroQuestion = 0;
	maxQuestions = 10;
	score = 0;
	parametre = getParametre();
	paysDejaPoses = [];
    paysAPoser = [];
    paysAPoserObj = [];
	clickButtons();
	listePaysPossibles();
	afficherScore();
	afficherRegion();
	question();
}

function listePaysPossibles() {
	for (var i = 0; i < countries.length; i++) {
        if ((!paysAPoser.includes(countries[i].name)) && countries[i].region == parametre) {
            paysAPoser.push(countries[i].name);
            paysAPoserObj.push(countries[i]);
		}
	}
}

function question() {
	aRepondu = false;
	var reponsesPossibles = [];
	var pays;
    numeroQuestion++;
    
	afficherQuestion();
    afficherProgres();

    document.title = "Question n°"+numeroQuestion+" | Jeu des drapeaux | Projet 2 | G44422";

	pays = Math.round(Math.random() * (paysAPoserObj.length - 1));
	paysDejaPoses.push(paysAPoser[pays]);
	paysSurImage = paysAPoser[pays];
	document.getElementsByTagName("img")[0].src = "./assets/img/drapeaux/" + paysAPoserObj[pays].flag;
	reponsesPossibles.push(paysAPoser[pays]);
	console.log(paysSurImage);
	for (var i = 0; i < 3; i++) {
		do {
			pays = Math.round(Math.random() * (paysAPoser.length - 1));
		} while (reponsesPossibles.includes(paysAPoser[pays]));
		reponsesPossibles.push(paysAPoser[pays]);
	}
	for (var i = 1; i < 5; i++) {
		var pays = Math.round(Math.random() * (reponsesPossibles.length - 1));
		document.getElementById("bouton" + i).innerText = reponsesPossibles[pays];
		reponsesPossibles.splice(pays, 1);
	}
	/*
	paysAPoser.splice(pays,1);
	paysAPoserObj.splice(pays,1);
	*/
}

function verification(idButton) {
	var boutonSelectionne = document.getElementById(idButton);
	if (!aRepondu) { //Vérifier que le bouton n'a pas déjà été cliqué
		aRepondu = true;
		if (paysSurImage == document.getElementById(idButton).innerText) { //Bonne réponse
			boutonSelectionne.style.color = "#FFFFFF";
			boutonSelectionne.style.backgroundColor = "#35901C";
			boutonSelectionne.innerText = boutonSelectionne.innerText + " ✔";
			score++;
			afficherScore();
			var audio = new Audio('./assets/mp3/right_answer.mp3');
			audio.play();
		} else { //Mauvaise réponse
			boutonSelectionne.style.color = "#FFFFFF";
			boutonSelectionne.style.backgroundColor = "#A70202";
			boutonSelectionne.innerText = boutonSelectionne.innerText + " ✘";
			var audio = new Audio('./assets/mp3/wrong_answer.mp3');
			audio.play();
		}
		setTimeout(function() {
			if (numeroQuestion < maxQuestions) { //Encore des questions
				resetColors();
				question();
			} else { // Fin
				numeroQuestion++;
				afficherProgres();
				resultats();
			}
		}, 1000);
	}
}

function getParametre() {
	allRegions = []; // Liste des régions détectées dans pays.js
	for (var i = 0; i < countries.length; i++) { // Pour chaque région 
		if (!allRegions.includes(countries[i].region)) { // Si la région n'est pas encore présente dans la liste
			allRegions.push(countries[i].region); // Ajoute la région à la liste
		}
	}

	var url_string = window.location.href;
	var url = new URL(url_string);
	var parameter = url.searchParams.get("region");
	while (!allRegions.includes(parameter)) {
		if (parameter == "" || parameter == null) {
			if (confirm("Aucune région n'a été spécifiée.\nLa region de l'Europe de l'Ouest sera utilisée par défaut.")) {
				parameter = "Europe-Ouest";
			} else {
				window.location = "index.html";
			}
		} else if (!allRegions.includes(parameter)) {
			if (confirm("Paramètre inconnu.\nLa region de l'Europe de l'Ouest sera utilisée par défaut.")) {
				parameter = "Europe-Ouest";
			} else {
				window.location = "index.html";
			}
		}
	}
	return parameter;
}

function afficherScore() {
	document.getElementById("score").innerText = "Votre score : " + score;
}

function afficherQuestion() {
	document.getElementById("question").innerText = numeroQuestion + '/' + maxQuestions;
}

function afficherRegion() {
	for (var i = 0; i < regions.length; i++) {
		if (regions[i].tag == parametre) {
			document.getElementById("region").innerText = "Jouons avec la région : " + regions[i].nom;
			break;
		}
	}
}

function afficherProgres() {
	document.getElementById("progress").style.width = (((numeroQuestion - 1) / maxQuestions) * 100) + "%";
}

function clickButtons() {
	for (var i = 0; i < document.getElementsByTagName("button").length; i++) {
		document.getElementsByTagName("button")[i].onclick = function() {
			verification(this.id);
		};
	}
}

function resetColors() {
	for (var i = 1; i < 5; i++) {
		var bouton = document.getElementById("bouton" + i);
		bouton.style.backgroundColor = "#FFFFFF";
		bouton.style.color = "#E22C3B";
		bouton.innerText = "";
	}
}

function resultats() {
	document.getElementById("progress").remove();
	document.getElementsByTagName("main")[0].innerHTML = "<h1>Jeu terminé. Merci d'avoir joué</h1><h1>Votre réultat :</h1><h1>" + score + '/' + maxQuestions + '</h1><button class="bold gray high">Rejouer</button>';
	buttonEvents();
	buttonReplay();
}

function buttonReplay() {
	document.getElementsByTagName("button")[0].onclick = function() {
		window.location.href = "index.html";
	}
}