document.getElementsByTagName("body")[0].addEventListener("load", main()); // On attend que la page ait chargé

function main() {
    playButton();
    selectRegion();
}

function selectRegion() {
    var allRegions = []; // Liste des régions détectées dans pays.js
    var option, attribute, select;
    select = document.getElementsByTagName("select")[0]; // Trouve le DOM select
    for(var i =0;i<countries.length;i++) { // Pour chaque région 
        if (!allRegions.includes(countries[i].region)) { // Si la région n'est pas encore présente dans la liste
            allRegions.push(countries[i].region); // Ajoute la région à la liste
            option = document.createElement("option"); // Créé un DOM option
            for(var j = 0;j<regions.length;j++) { // Pour tous les noms dans regions.js
                if(regions[j].tag==countries[i].region) { // Si le tag correpond à la région trouvée
                    attribute = document.createAttribute("value"); // Créé un attribut "valeur"
                    attribute.value = countries[i].region; // Ajoute la dernière région détectée dans l'option
                    option.innerText = regions[j].nom;  // Ajoute le texte trouvé dans regions.js dans l'option
                    option.setAttributeNode(attribute); // Ajoute l'attribut à l'option
                    break;
                }
            }
            select.appendChild(option); // On ajoute la nouvelle option au select
        }
    }
}

function playButton() { // Fait en sorte que le bouton mène quelque part
    document.getElementsByTagName("button")[0].onclick = function() { // Ajoute la propriété onclick
        document.location.href='jeu.html?region='+document.getElementsByTagName('select')[0].value; // Fonction que doit effectuer le bouton quand cliqué
    };
}