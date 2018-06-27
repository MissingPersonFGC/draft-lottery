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
        // Create number for array ending
        // Check to see if the array ending in that number has been created
        // If it hasn't create the array, then grab a random player from the Player Pool.
        // Add that player to the new array.
        // If that array has been created, check to see if its length is < 3.
        // If it is, push that player to the existing array.
        // If it's 3, then increase the increment of the number, then create a new array with that number, and push the player to that array.
        let num = 1;
        if (!app[`teamArray${num}`]) {
            app[`teamArray${num}`] = [];
            const randomPlayer = playerPool[Math.floor(Math.random()*playerPool.length)];
            app[`teamArray${num}`].push(randomPlayer);
            console.log(randomPlayer);
        } else if (app[`teamArray${num}`] && app[`teamArray${num}`].length < 3) {
            const randomPlayer = playerPool[Math.floor(Math.random() * playerPool.length)];
            app[`teamArray${num}`].push(randomPlayer);
            console.log(randomPlayer);
        } else {
            num++;
            app[`teamArray${num}`] = [];
            const randomPlayer = playerPool[Math.floor(Math.random() * playerPool.length)];
            app[`teamArray${num}`].push(randomPlayer);
            console.log(randomPlayer);
        }
    });
}

$(app.init);