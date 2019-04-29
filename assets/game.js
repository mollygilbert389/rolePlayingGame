$(document).ready(function(){
    var characters = {
        "Sea Monster": {
            name: "Sea Monster",
            health: 120,
            attack: 8,
            imageUrl: "./assets/images/monster1.jpg",
            enemeyAttackBack: 15
        },

        "Earth Monster": {
            name: "Earth Monster",
            health: 100,
            attack: 14,
            imageUrl: "./assets/images/monster3.jpg",
            enemeyAttackBack: 5
        },

        "Wind Monster": {
            name: "Wind Monster",
            health: 150,
            attack: 8,
            imageUrl: "./assets/images/monster4.jpg",
            enemeyAttackBack: 5
        },

        "Rock Monster": {
            name: "Rock Monster",
            health: 180,
            attack: 7,
            imageUrl: "./assets/images/monster5.jpg",
        }
    };

    var currSelectedCharacter;
    var combatants = [];
    var currDefender;
    var turnCounter = 

console.log(characters)

var renderOne = function(character, renderArea, charStatus) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>")
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth =  $("<div class='character-health'>").text(character.health)
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv); 

    if (charStatus === "enemy") {
        $(charDiv).addClass("enemy");
    }
    else if (charStatus === "defender") {
        currDefender = character;
        $(charDiv).addClass("target-enemy");
    }
} 

var renderCharacters = function(charObj, areaRender) {
    if (areaRender === "#characters-section") {
        $(areaRender).empty();
        for (var key in charObj) {
            if(charObj.hasOwnProperty(key)) {
                renderOne(charObj[key], areaRender); 
            }
        }
    }

    if (areaRender === "#selected-character") {
        renderOne(charObj, areaRender)
    }
    if (areaRender === "#availible-to-attack-section") {
        for (var i = 0; i < charObj.length; i++) {
            renderOne(charObj[i], areaRender, "enemy")
        }

        $(document).on("click", ".enemy", function(){
            var name = ($(this).attr("data-name"))

            if ($("#defender").children().length === 0) {
                renderCharacters(name, "#defender");
                $(this).hide();
            }
        })
    }
    if (areaRender === "#defender") {
        $(areaRender).empty();
        for (var i = 0; i < combatants.length; i++) {
            if (combatants[i].name === charObj) {
                renderOne(combatants[i], areaRender, "defender");
            }
        }
    }

}

renderCharacters(characters, "#characters-section")

$(document).on("click", ".character", function(){
    var name = $(this).attr("data-name");
    console.log(name)
    if (!currSelectedCharacter) {
        currSelectedCharacter = characters[name]
         for (var key in characters) {
             if (key !== name) {
                 combatants.push(characters[key])
             }
         }

         console.log(combatants)
         $("#characters-section").hide();

         renderCharacters(currSelectedCharacter, "#selected-character");
         renderCharacters(combatants, "#availible-to-attack-section");
    }
})

$("#attack-button").on("click", function(){
    if ($)
    turnCounter++

})

})