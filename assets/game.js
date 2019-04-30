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
    var turnCounter = 1;
    var killCount = 0;

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

var renderMessage = function(message) {
    var gameMessageSet = $("#game-message");
    var newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage)

    if (message === "clearMessage") {
        gameMessageSet.text(" ")
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
                renderMessage()
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

    if (areaRender === "playerDamage") {
        $("#defender").empty();
        renderOne(charObj, "#defender", "defender")
    }

    if (areaRender === "enemyDamage") {
        $("#selected-character").empty();
        renderOne(charObj, "#selected-character", "")
    }

    if (areaRender === "enemyDefeated") {
        $("#defender").empty();
        var gameStateMessage = "You have defeated " + charObj.name + "Now you must defeat another on your journey to triumph."
        renderMessage(gameStateMessage);
    }

}

    var restartGame = function(inputEndGame) {
        var restart = $("<button>Restart</button>").click(function(){
            location.reload();
        })
        var gameState = $("<div id='restart'></div>").text(inputEndGame)

        $("body").append(gameState);
        $("body").append(restart)

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
    if ($("#defender").children().length !== 0) {
        var attackMessage = "You attacked " + currDefender.name + "for " + (currSelectedCharacter.attack * turnCounter) + " damage.";
        var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemeyAttackBack + " damage.";
        renderMessage("clearMessage")
    currDefender.health -= (currSelectedCharacter.attack * turnCounter)
        if (currDefender.health > 0) {
            renderCharacters(currDefender, "playerDamage");
            renderMessage(attackMessage)
            renderMessage(counterAttackMessage)
            currSelectedCharacter.health -= currDefender.enemeyAttackBack;
            renderCharacters(currSelectedCharacter, "enemyDamage")

            if(currSelectedCharacter.health <= 0) {
                renderMessage("clearMessage")
                renderMessage("You have been defeated. The gods will not grace your with life.")
                $("#attack-button").unbind("click"); 
            }
        }
        else {
            renderCharacters(currDefender, "enemyDefeated")
            killCount++;
            if (killCount >= 3) {
                renderMessage("clearMessage");
                restartGame("You have proved yourself to the gods.")
               
            }
        }

    }


    turnCounter++

})

})