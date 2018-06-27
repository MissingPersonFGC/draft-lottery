"use strict";

var app = {};

var playerPool = [];

var $playerAdd = $("#player-add");
var $newPlayer = $("#new-player");
var $playerPoolList = $("#player-pool ul");

app.init = function () {
    app.getNewPlayer();
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

$(app.init);