"use strict";

var app = {};

var playerPool = [];
var num = 1;
var teamAmount = null;

var $playerAdd = $("#player-add");
var $newPlayer = $("#new-player");
var $playerPoolList = $("#player-pool ul");
var $teamGeneratorBtn = $("button");
var $teams = $(".teams");
var $playersPerTeam = $("#team-amount");

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
        if (playerPool.length > 0) {
            teamAmount = $($playersPerTeam).val();
            $playersPerTeam.prop("disabled", true);
            if (!app["teamArray" + num]) {
                app["teamArray" + num] = [];
                app.assignPlayer(app["teamArray" + num]);
            } else if (app["teamArray" + num] && app["teamArray" + num].length < teamAmount) {
                app.assignPlayer(app["teamArray" + num]);
            } else {
                num++;
                app["teamArray" + num] = [];
                app.assignPlayer(app["teamArray" + num]);
            }
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
    app.populateTeams();
};

app.populateTeams = function () {
    $teams.empty();
    for (var i = 1; i < 101; i++) {
        if (app["teamArray" + i]) {
            (function () {
                var $teamArray = "team-array" + i;
                $teams.append("<div class=\"team-array " + $teamArray + "\"><h3>Team #" + i + "</h3><ul></ul></div>");
                app["teamArray" + i].forEach(function (player) {
                    $("." + $teamArray + " ul").append("\n                    <li>" + player + "</li>\n                ");
                });
            })();
        }
    }
};

$(app.init);