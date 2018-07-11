const app = {};

const playerPool = [];
let num = 1;
let teamAmount = null;

const $playerAdd = $(`#player-add`);
const $newPlayer = $(`#new-player`);
const $playerPoolList = $(`#player-pool ul`);
const $teamGeneratorBtn = $(`button`);
const $teams = $(`.teams`);
const $playersPerTeam = $(`#team-amount`);

app.init = () => {
    app.getNewPlayer();
    app.createTeamArray();
}

app.getNewPlayer = () => {
    $playerAdd.on(`submit`, (e) => {
        e.preventDefault();
        const newPlayer = $newPlayer.val();
        app.pushNewPlayer(newPlayer);
    });
}

app.pushNewPlayer = (player) => {
    playerPool.push(player);
    $newPlayer.val(``);
    app.populatePlayerPool();
}

app.populatePlayerPool = () => {
    $playerPoolList.empty();
    playerPool.forEach((player) => {
        $playerPoolList.append(`
            <li>${player}</li>
        `);
    });
}

app.createTeamArray = () => {
    $teamGeneratorBtn.on(`click`, (e) => {
        e.preventDefault();
        if (playerPool.length > 0) {
            teamAmount = $($playersPerTeam).val();
            $playersPerTeam.prop(`disabled`, true);
            if (!app[`teamArray${num}`]) {
                app[`teamArray${num}`] = [];
                app.assignPlayer(app[`teamArray${num}`]);
            } else if (app[`teamArray${num}`] && app[`teamArray${num}`].length < teamAmount) {
                app.assignPlayer(app[`teamArray${num}`]);
            } else {
                num++;
                app[`teamArray${num}`] = [];
                app.assignPlayer(app[`teamArray${num}`]);
            }
        }
    });
}

app.removePlayerFromPool = (player) => {
    const playerIndex = playerPool.indexOf(player);
    playerPool.splice(playerIndex, 1);
    app.populatePlayerPool();
}

app.assignPlayer = (team) => {
    const randomPlayer = playerPool[Math.floor(Math.random() * playerPool.length)];
    team.push(randomPlayer);
    app.removePlayerFromPool(randomPlayer);
    app.populateTeams();
}

app.populateTeams = () => {
    $teams.empty();
    for (let i = 1; i < 101; i++) {
        if (app[`teamArray${i}`]) {
            const $teamArray = `team-array${i}`;
            $teams.append(`<div class="team-array ${$teamArray}"><h3>Team #${i}</h3><ul></ul></div>`);
            app[`teamArray${i}`].forEach((player) => {
                $(`.${$teamArray} ul`).append(`
                    <li>${player}</li>
                `);
            });
        }
    }
}

$(app.init);