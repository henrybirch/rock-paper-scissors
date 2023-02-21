enum Outcome {
    Win = "Win", Draw = "Draw", Lose = "Lose"
}

enum Choice {
    Rock = "Rock", Paper = "Paper", Scissors = "Scissors"
}

function getValueOfChoice(choice: Choice): number {
    switch (choice) {
        case Choice.Paper:
            return 1
        case Choice.Rock:
            return 2
        case Choice.Scissors:
            return 3
    }
}

function getValueOfOutcome(outcome: Outcome): number {
    switch (outcome) {
        case Outcome.Win:
            return 1
        case Outcome.Draw:
            return 0
        case Outcome.Lose:
            return -1
    }
}

function getOutcomeOfRound(playerChoice: Choice, computerChoice: Choice) {
    if (playerChoice == computerChoice) return Outcome.Draw
    if ((getValueOfChoice(playerChoice) - getValueOfChoice(computerChoice)) == -1) return Outcome.Win
    return Outcome.Lose
}

type Game = Outcome[]

function getOutcomeOfGame(game: Game) {
    const gameValue = game.map(getValueOfOutcome).reduce((previousValue, currentValue) => previousValue + currentValue)
    if (gameValue > 0) return Outcome.Win
    if (gameValue < 0) return Outcome.Lose
    return Outcome.Draw
}

type Stats = {
    wins: number
    losses: number
    draws: number
}

function getStats(game: Game): Stats {
    return {
        wins: game.filter(outcome => outcome == Outcome.Win).length,
        losses: game.filter(outcome => outcome == Outcome.Lose).length,
        draws: game.filter(outcome => outcome == Outcome.Draw).length
    }
}

function getComputerChoice(): Choice {
    const choices = [Choice.Rock, Choice.Paper, Choice.Scissors]
    return choices[Math.floor(Math.random() * choices.length)]
}

console.log(JSON.stringify([Outcome.Draw, Outcome.Draw, Outcome.Win]))
console.log(getOutcomeOfGame([Outcome.Draw, Outcome.Win]))

function setStats(stats: Stats) {
    localStorage.setItem("stats", JSON.stringify(stats))
}

function setGame(game: Game) {
    localStorage.setItem("game", JSON.stringify(game))
}

function startGame() {
    setStats({wins: 0, draws: 0, losses: 0})
}

function getStatsForGame(): Stats {
    return JSON.parse(localStorage.getItem("stats"))
}

function getGame(): Game {
    return JSON.parse(localStorage.getItem("game"))
}

function updateGame(choice: Choice) {
    const computerChoice = getComputerChoice()
    const outcome = getOutcomeOfRound(choice, computerChoice)

    const game = getGame().concat(outcome)
    setGame(game)
    setStats(getStats(game))
    setStatsInUi()
}

function endGame() {
}

function playRound(choice: Choice) {
    if (localStorage.getItem("game") == null) {
        startGame(choice)
        return
    }
    updateGame(choice)

    const currentGame: Game = JSON.parse(localStorage.getItem("game"))
    if (currentGame.length == 5) {
        endGame()
    }
}

function setStatsInUi() {
    const wins = document.querySelector(".wins.number")
    const draws = document.querySelector(".draws.number")
    const losses = document.querySelector(".losses.number")

    const stats = getStatsForGame()
    wins.textContent = stats.wins.toString()
    draws.textContent = stats.draws.toString()
    losses.textContent = stats.losses.toString()
}
