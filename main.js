var gameContainer = document.querySelector('.game-container')
var classicMode = document.querySelector('.classic')
var wildMode = document.querySelector('.wild')
var gameModes = document.querySelector('.select-game-mode')
var subTitle = document.querySelector('.sub-title')
var playerCard = document.querySelector('.left')
var botCard = document.querySelector('.right')
var spritesContainer = document.querySelectorAll('.grid-container-sprites')
var currentGame;


gameContainer.addEventListener('click', handleEvent)
window.addEventListener('load', createGame())

function handleEvent(event) {
    var id = event.target.id
    if (id === 'squirtle' || id === 'bulbasaur' || id === 'charmander' || id === 'pikachu' || id === 'geodude'){
        switch (id) {
            case 'squirtle':
                currentGame.playerChoice = 'squirtle'
                break;

            case 'bulbasaur':
                currentGame.playerChoice = 'bulbasaur'
                break;

            case 'charmander':
                currentGame.playerChoice = 'charmander'
                break;
                
            case 'pikachu':
                currentGame.playerChoice = 'pikachu'
                break;

            case 'geodude':
                currentGame.playerChoice = 'geodude'
                break;
        }
        fightSequence()
        checkWin()
        setTimeout(resetGame, 3000)
        return
    }
    if (event.target.id === "change-game-mode") {
        if (currentGame.gameType === 'classic'){
            hide(classicMode)
            $(gameModes).slideDown()
        }
        else {
            hide(wildMode)
            $(gameModes).slideDown()
        }
        return
    }
    if (event.target.closest('div').id === 'classic') {
        currentGame.gameTypeID = 0
        show(classicMode)
        $(gameModes).slideUp()
        currentGame.gameType = 'classic'
        currentGame.gameChoices = ['squirtle','bulbasaur', 'charmander']
        botChoice(currentGame)
        subTitle.innerText = 'Choose Your Pokémon!'
        return
    } 
    if (event.target.closest('div').id === 'wild') {
        currentGame.gameTypeID = 1
        show(wildMode)
        $(gameModes).slideUp()
        currentGame.gameType = 'wild'
        currentGame.gameChoices = ['squirtle','bulbasaur', 'charmander', 'pikachu', 'geodude']
        botChoice(currentGame)
        subTitle.innerText = 'Choose Your Pokémon!'
        return
    }
}

function loseLives(battler) {
    // console.log(currentGame[battler].lives);
    currentGame[battler].lives -= 1
        if (currentGame[battler].lives === 0) {
            if (battler === "player") {
                console.log(`You lost to ${currentGame.bot.name}.`);
                currentGame.bot.wins += 1
                document.getElementById('bot-wins').innerHTML = `Wins: ${currentGame.bot.wins}`
            } 
            else {
                console.log(`You just beat ${currentGame.bot.name}`);
                currentGame.player.wins += 1
                document.getElementById('player-wins').innerHTML = `Wins: ${currentGame.player.wins}`
            }
        }
    console.log(`${battler} lives: ${currentGame[battler].lives}`);
}

function createPlayer() {
    var player = {
        name: 'Trainer',
        lives: 5,
        wins: 0,
    }
    playerCard.innerHTML = 
    `<div>
        <h3>${player.name}</h3>
        <img class="trainer-sprite" src="assets/trainer-sprite.png" alt="trainer sprite">
        <p id="player-wins">Wins: ${player.wins}</p>
    </div>`
    return player
}

function createBot() {
    var bot = {
        name: 'Jarvis',
        lives: 5,
        wins: 0,
    }
    botCard.innerHTML =
    `<div>
        <h3>${bot.name}</h3>
        <img class="trainer-sprite" src="assets/trainer-sprite-2.png" alt="trainer sprite">
        <p id="bot-wins">Wins: ${bot.wins}</p>
    </div>`
    return bot
}

function createGame(player, bot) {
    var player = createPlayer()
    var bot = createBot()
    var game = {
        player: player,
        bot: bot,
        gameType: '',
        gameChoices: [],
        playerChoice: '',
        botChoice: '',
    }
    currentGame = game
}

function checkWin() {
    switch (currentGame.playerChoice) {
        case 'charmander':
            if(currentGame.botChoice === 'squirtle' || currentGame.botChoice === 'geodude') {
                // Player lose
                loseLives("player")
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You lose this round.`
                // Bot + 1 win
                // Announce loss
                // Reset game
                return
            }
            if(currentGame.botChoice === 'bulbasaur' || currentGame.botChoice === 'pikachu') {
                // Player win
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You win this round!`
                // Player +1 win
                loseLives("bot")
                // Announce win
                // Reset game
                return
            }
            if(currentGame.botChoice === 'charmander') {
                // draw
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. It's a draw.`
                // Announce draw
                // Reset game
                return
            }
            break;

        case 'squirtle':
            if(currentGame.botChoice === 'squirtle') {
                // draw
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. It's a draw.`
                // Announce draw
                // Reset game
                return
            }
            if(currentGame.botChoice === 'bulbasaur' || currentGame.botChoice === 'pikachu') {
                // Player lose
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You lose this round.`
                // Bot + 1 win
                loseLives("player")
                // Announce loss
                // Reset game
                return
            }
            if(currentGame.botChoice === 'charmander' || currentGame.botChoice === 'geodude') {
                // Player win
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You win this round!`
                // Player +1 win
                loseLives("bot")
                // Announce win
                // Reset game
                return
            } 
            break;

        case 'bulbasaur':
            if(currentGame.botChoice === 'squirtle' || currentGame.botChoice === 'geodude') {
                // Player win
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You win this round!`
                // Player +1 win
                loseLives("bot")
                // Announce win
                // Reset game
                return
            }
            if(currentGame.botChoice === 'bulbasaur') {
                // draw
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. It's a draw`
                // Announce draw
                // Reset game
                return
            }
            if(currentGame.botChoice === 'charmander' || currentGame.botChoice === 'pikachu') {
                // Player lose
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You lose this round`
                // Bot + 1 win
                loseLives("player")
                // Announce loss
                // Reset game
                return
            } 
            break;

        case 'pikachu':
            if(currentGame.botChoice === 'charmander' || currentGame.botChoice === 'geodude') {
                // Player lose
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You lose this round.`
                // Bot + 1 win
                loseLives("player")
                // Announce loss
                // Reset game
                return
            }
            if(currentGame.botChoice === 'bulbasaur' || currentGame.botChoice === 'squirtle') {
                // Player win
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You win this round!`
                // Player +1 win
                loseLives("bot")
                // Announce win
                // Reset game
                return
            }
            if(currentGame.botChoice === 'pikachu') {
                // draw
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. It's a draw.`
                // Announce draw
                // Reset game
                return
            }
            break;

        case 'geodude':
            if(currentGame.botChoice === 'squirtle' || currentGame.botChoice === 'bulbasaur') {
                // Player lose
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You lose this round.`
                // Bot + 1 win
                loseLives("player")
                // Announce loss
                // Reset game
                return
            }
            if(currentGame.botChoice === 'charmander' || currentGame.botChoice === 'pikachu') {
                // Player win
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You win this round!`
                // Player +1 win
                loseLives("bot")
                // Announce win
                // Reset game
                return
            }
            if(currentGame.botChoice === 'geodude') {
                // draw
                subTitle.innerText = `You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. It's a draw.`
                // Announce draw
                // Reset game
                return
            }
            break;

        default:
            break;
    }
}

function resetGame() {
    botChoice(currentGame)
    subTitle.innerText = 'Choose Your Pokémon!'
    spritesContainer[currentGame.gameTypeID].classList.remove('battle-sequence')
    spritesContainer[currentGame.gameTypeID].innerHTML = ""
    for (var i = 0; i < currentGame.gameChoices.length; i++) {
        spritesContainer[currentGame.gameTypeID].innerHTML += `<img id="${currentGame.gameChoices[i]}" src="assets/${currentGame.gameChoices[i]}.png" alt="${currentGame.gameChoices[i]} sprite"></img>`
    }
    spritesContainer[currentGame.gameTypeID].innerHTML += `<button id="change-game-mode">Change Game</button>`
    document.getElementById('geodude').classList.add('grid-col-start')
}

function botChoice(game) {
    var choices = game.gameChoices;
    var randomIndex = Math.floor(Math.random() * choices.length);
    game.botChoice = choices[randomIndex]
}

function fightSequence() {
    spritesContainer[currentGame.gameTypeID].classList.add('battle-sequence')
    spritesContainer[currentGame.gameTypeID].innerHTML = ""
    spritesContainer[currentGame.gameTypeID].innerHTML = `
        <img id="${currentGame.playerChoice}" src="assets/${currentGame.playerChoice}.png" alt="${currentGame.playerChoice} sprite">
        <img id="${currentGame.botChoice}" src="assets/${currentGame.botChoice}.png" alt="${currentGame.botChoice} sprite">
    `
}

function hide(element) {
    element.classList.add('hidden')
}

function show(element) {
    element.classList.remove('hidden')
}