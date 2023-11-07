var gameContainer = document.querySelector('.game-container')
var classicMode = document.querySelector('.classic')
var wildMode = document.querySelector('.wild')
var gameModes = document.querySelector('.select-game-mode')
var subTitle = document.querySelector('.sub-title')
var currentGame;

gameContainer.addEventListener('click', handleEvent)
window.addEventListener('load', createGame())

function handleEvent(event) {
    var id = event.target.id
    if (id === 'squirtle' || id === 'bulbasaur' || id === 'charmander'){
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
        }
        checkWin()
        return
    }
    if(event.target.closest('div').id === 'classic') {
        console.log('classic mode');
        show(classicMode)
        hide(gameModes)
        currentGame.gameType = 'classic'
        subTitle.innerText = 'Choose Your Pokémon!'
        return
    } 
    if(event.target.closest('div').id === 'wild') {
        console.log('wild mode');
        show(wildMode)
        hide(gameModes)
        currentGame.gameType = 'wild'
        subTitle.innerText = 'Choose Your Pokémon!'
        return
    }
}

function createPlayer() {
    var player = {
        name: 'Trainer',
        token: '🤓',
        wins: 0,
    }
    return player
}

function createBot() {
    var bot = {
        name: 'Jarvis',
        token: '🤖',
        wins: 0,
    }
    return bot
}

function createGame(player, bot) {
    var player = createPlayer()
    var bot = createBot()
    var game = {
        player: player,
        bot: bot,
        gameType: '',
        playerChoice: '',
        botChoice: '',
    }
    currentGame = game
}

function checkWin() {
    console.log("heyo");
    switch (currentGame.playerChoice) {
        case 'charmander':
            if(currentGame.botChoice === 'squirtle') {
                // Player lose
                // Bot + 1 win
                // Announce loss
                // Reset game
            }
            if(currentGame.botChoice === 'bulbasaur') {
                // Player win
                // Player +1 win
                // Announce win
                // Reset game
            }
            if(currentGame.botChoice === 'charmander') {
                // draw
                // Announce draw
                // Reset game
            } 
            break;

        case 'squirtle':
            if(currentGame.botChoice === 'squirtle') {
                // draw
                // Announce draw
                // Reset game
            }
            if(currentGame.botChoice === 'bulbasaur') {
                // Player lose
                // Bot + 1 win
                // Announce loss
                // Reset game
            }
            if(currentGame.botChoice === 'charmander') {
                // Player win
                // Player +1 win
                // Announce win
                // Reset game
            } 
            break;

        case 'bulbasaur':
            if(currentGame.botChoice === 'squirtle') {
                // Player win
                // Player +1 win
                // Announce win
                // Reset game
            }
            if(currentGame.botChoice === 'bulbasaur') {
                // draw
                // Announce draw
                // Reset game
            }
            if(currentGame.botChoice === 'charmander') {
                // Player lose
                // Bot + 1 win
                // Announce loss
                // Reset game
            } 
            break;
        default:
            break;
    }
}

function resetGame() {

}

function hide(element) {
    element.classList.add('hidden')
}

function show(element) {
    element.classList.remove('hidden')
}