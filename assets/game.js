$(document).ready(function(){
    $("#restart-section").hide();
    $("#availible-to-attack-section").hide();
    var characters = {
        "Nasha, King in Valley of the Mists": {
            name: "Nasha, King in Valley of the Mists",
            health: 100,
            attack: 7,
            imageUrl: "./assets/images/monster15.jpg",
            enemeyAttackBack: 8
        },

        "Keter, Emination of the Crown": {
            name: "Keter, Emination of the Crown",
            health: 130,
            attack: 5,
            imageUrl: "./assets/images/monster14.jpg",
            enemeyAttackBack: 10
        },

        "Binah, Emination of Knowledge": {
            name: "Binah, Emination of Knowledge",
            health: 150,
            attack: 8,
            imageUrl: "./assets/images/monster10.jpg",
            enemeyAttackBack: 5
        },

        "Chesed, Emination of Empathy": {
            name: "Chesed, Emination of Empathy",
            health: 120,
            attack: 9,
            imageUrl: "./assets/images/monster9.jpg",
            enemeyAttackBack: 30
        },

        "Makkuth, Emination of the Kingdom": {
            name: "Makkuth, Emination of the Kingdom",
            health: 170,
            attack: 7,
            imageUrl: "./assets/images/monster7.jpg",
            enemeyAttackBack: 15
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
    var charHealth =  $("<div class='character-health'>").text("HP: " + character.health)
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
        $("#characters-section").empty()
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
        $("#restart-section").show();
        var restart = $("<button>Restart</button>").click(function(){
            location.reload();
        })
        var gameState = $("<div id='restart'></div>").text(inputEndGame)

        $("#restart-section").append(gameState);
        $("#restart-section").append(restart)

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
         $("#availible-to-attack-section").show();

         renderCharacters(currSelectedCharacter, "#selected-character");
         renderCharacters(combatants, "#availible-to-attack-section");
    }
})

$("#attack-button").on("click", function(){
    if ($("#defender").children().length !== 0) {
        var attackMessage = "You attacked " + currDefender.name + "for " + (currSelectedCharacter.attack * turnCounter) + " damage.";
        var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemeyAttackBack + " damage.";
        renderMessage("clearMessage")
    currDefender.health -= currSelectedCharacter.attack * turnCounter
        if (currDefender.health > 0) {
            renderCharacters(currDefender, "playerDamage");
            renderMessage(attackMessage)
            renderMessage(counterAttackMessage)
            currSelectedCharacter.health -= currDefender.enemeyAttackBack;
            renderCharacters(currSelectedCharacter, "enemyDamage")

            if(currSelectedCharacter.health <= 0) {
                renderMessage("clearMessage")
                renderMessage("You have been defeated. The gods will not let you keep your life.")
                $("#attack-button").unbind("click"); 
            }
        }
        else {
            renderCharacters(currDefender, "enemyDefeated")
            killCount++;
            if (killCount >= combatants.length) {
                renderMessage("clearMessage");
                restartGame("You have proved yourself to the gods.")
               
            }
        }

    }
    turnCounter++

})

})