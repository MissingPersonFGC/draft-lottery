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
        var num = 1;
        if (!app["teamArray" + num]) {
            app["teamArray" + num] = [];
            app.assignPlayer(app["teamArray" + num]);
        } else if (app["teamArray" + num] && app["teamArray" + num].length < 3) {
            app.assignPlayer(app["teamArray" + num]);
        } else {
            num++;
            app["teamArray" + num] = [];
            app.assignPlayer(app["teamArray" + num]);
        }
    });
};

app.removePlayerFromPool = function (player) {
    var playerIndex = playerPool.indexOf(player);
    playerPool.splice(playerIndex, 1);
    app.populatePlayerPool();
};

app.assignPlayer = function (team) {
    var randomPlayer = playerPool[Math.floor(Math.random() * playerPool.length)];
    team.push(randomPlayer);
    app.removePlayerFromPool(randomPlayer);
};

$(app.init);