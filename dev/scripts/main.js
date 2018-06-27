const app = {};

const playerPool = [];

const $playerAdd = $(`#player-add`);
const $newPlayer = $(`#new-player`);
const $playerPoolList = $(`#player-pool ul`);

app.init = () => {
    app.getNewPlayer();
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

$(app.init);