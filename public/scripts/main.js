"use strict";

var app = {};

var playerPool = [];

var $playerAdd = $("#player-add");
var $newPlayer = $("#new-player");
var $playerPoolList = $("#player-pool ul");
var $teamGeneratorBtn = $(".team-generator button");

app.init = function () {
    app.getNewPlayer();
    app.createTeamArray();
};

app.getNewPlayer = function () {
    $playerAdd.on("submit", function (e) {
        e.preventDefault();
        var newPlayer = $newPlayer.val();
        app.pushNewPlayer(newPlayer);
    });
};

app.pushNewPlayer = function (player) {
    playerPool.push(player);
    $newPlayer.val("");
    app.populatePlayerPool();
};

app.populatePlayerPool = function () {
    $playerPoolList.empty();
    playerPool.forEach(function (player) {
        $playerPoolList.append("\n            <li>" + player + "</li>\n        ");
    });
};

app.createTeamArray = function () {
    $teamGeneratorBtn.on("click", function (e) {
        e.preventDefault();
        // Create number for array ending
        // Check to see if the array ending in that number has been created
        // If it hasn't create the array, then grab a random player from the Player Pool.
        // Add that player to the new array.
        // If that array has been created, check to see if its length is < 3.
        // If it is, push that player to the existing array.
        // If it's 3, then increase the increment of the number, then create a new array with that number, and push the player to that array.
        var num = 1;
        if (!app["teamArray" + num]) {
            app["teamArray" + num] = [];
            var randomPlayer = playerPool[Math.floor(Math.random() * playerPool.length)];
            app["teamArray" + num].push(randomPlayer);
            console.log(randomPlayer);
        } else if (app["teamArray" + num] && app["teamArray" + num].length < 3) {
            var _randomPlayer = playerPool[Math.floor(Math.random() * playerPool.length)];
            app["teamArray" + num].push(_randomPlayer);
            console.log(_randomPlayer);
        } else {
            num++;
            app["teamArray" + num] = [];
            var _randomPlayer2 = playerPool[Math.floor(Math.random() * playerPool.length)];
            app["teamArray" + num].push(_randomPlayer2);
            console.log(_randomPlayer2);
        }
    });
};

$(app.init);