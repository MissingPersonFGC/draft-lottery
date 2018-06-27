const app = {};

const playerPool = [];

const $playerAdd = $(`#player-add`);
const $newPlayer = $(`#new-player`);
const $playerPoolList = $(`#player-pool ul`);
const $teamGeneratorBtn = $(`.team-generator button`);

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
        let num = 1;
        if (!app[`teamArray${num}`]) {
            app[`teamArray${num}`] = [];
            app.assignPlayer(app[`teamArray${num}`]);
        } else if (app[`teamArray${num}`] && app[`teamArray${num}`].length < 3) {
            app.assignPlayer(app[`teamArray${num}`]);
        } else {
            num++;
            app[`teamArray${num}`] = [];
            app.assignPlayer(app[`teamArray${num}`]);
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
}

$(app.init);