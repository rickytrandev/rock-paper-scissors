var gameContainer = document.querySelector('.game-container')
var classicMode = document.querySelector('.classic')
var wildMode = document.querySelector('.wild')
var gameModes = document.querySelector('.select-game-mode')
var subTitle = document.querySelector('.sub-title')
var currentGame;

gameContainer.addEventListener('click', handleEvent)
window.addEventListener('load', createGame())

function handleEvent(event) {
    // if (event.target.id) {
        
    // }
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
        checkWin()
        return
    }
    if(event.target.closest('div').id === 'classic') {
        console.log('classic mode');
        show(classicMode)
        hide(gameModes)
        currentGame.gameType = 'classic'
        currentGame.gameChoices = ['squirtle','bulbasaur', 'charmander']
        botChoice(currentGame)
        subTitle.innerText = 'Choose Your Pokémon!'
        return
    } 
    if(event.target.closest('div').id === 'wild') {
        console.log('wild mode');
        show(wildMode)
        hide(gameModes)
        currentGame.gameType = 'wild'
        currentGame.gameChoices = ['squirtle','bulbasaur', 'charmander', 'pikachu', 'geodude']
        botChoice(currentGame)
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
        gameChoices: [],
        playerChoice: '',
        botChoice: '',
    }
    currentGame = game
}

function checkWin() {
    switch (currentGame.playerChoice) {
        case 'charmander':
            if(currentGame.botChoice === 'squirtle') {
                // Player lose
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You lose this battle.`)
                // Bot + 1 win
                currentGame.bot.wins += 1
                // Announce loss
                // Reset game
                resetGame()
                return
            }
            if(currentGame.botChoice === 'bulbasaur') {
                // Player win
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You win this battle!`)
                // Player +1 win
                currentGame.player.wins += 1
                // Announce win
                // Reset game
                resetGame()
                return
            }
            if(currentGame.botChoice === 'charmander') {
                // draw
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. It's a draw.`)
                // Announce draw
                // Reset game
                resetGame()
                return
            } 
            break;

        case 'squirtle':
            if(currentGame.botChoice === 'squirtle') {
                // draw
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. It's a draw.`)
                // Announce draw
                // Reset game
                resetGame()
                return
            }
            if(currentGame.botChoice === 'bulbasaur') {
                // Player lose
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You lose this battle.`)
                // Bot + 1 win
                currentGame.bot.wins += 1
                // Announce loss
                // Reset game
                resetGame()
                return
            }
            if(currentGame.botChoice === 'charmander') {
                // Player win
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You win this battle!`)
                // Player +1 win
                currentGame.player.wins += 1
                // Announce win
                // Reset game
                resetGame()
                return
            } 
            break;

        case 'bulbasaur':
            if(currentGame.botChoice === 'squirtle') {
                // Player win
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You win this battle!`)
                // Player +1 win
                currentGame.player.wins += 1
                // Announce win
                // Reset game
                resetGame()
                return
            }
            if(currentGame.botChoice === 'bulbasaur') {
                // draw
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. It's a draw`)

                // Announce draw
                // Reset game
                resetGame()
                return
            }
            if(currentGame.botChoice === 'charmander') {
                // Player lose
                alert(`You chose ${currentGame.playerChoice}, Jarvis chose ${currentGame.botChoice}. You lose this battle`)
                // Bot + 1 win
                currentGame.bot.wins += 1
                // Announce loss
                // Reset game
                resetGame()
                return
            } 
            break;
        default:
            break;
    }
}

function resetGame() {
    botChoice(currentGame)
}

function botChoice(game) {
    var choices = game.gameChoices;
    var randomIndex = Math.floor(Math.random() * choices.length);
    game.botChoice = choices[randomIndex]
    console.log(game);
}

function hide(element) {
    element.classList.add('hidden')
}

function show(element) {
    element.classList.remove('hidden')
}