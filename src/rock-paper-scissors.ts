enum Outcome {
    Win = 1, Draw = 0, Lose = -1
}

enum Choice {
    Rock = "Rock", Paper = "Paper", Scissors = "Scissors"
}

function getValueOfChoice(choice: Choice) {
    switch (choice) {
        case Choice.Paper:
            return 1
        case Choice.Rock:
            return 2
        case Choice.Scissors:
            return 3
    }
}

function getOutcomeOfRound(playerChoice: Choice, computerChoice: Choice) {
    if (playerChoice == computerChoice) return Outcome.Draw
    if ((getValueOfChoice(playerChoice) - getValueOfChoice(computerChoice)) == -1) return Outcome.Win
    return Outcome.Lose
}

function getDeclarationOfRound(playerChoice: Choice, computerChoice: Choice) {
    switch (getOutcomeOfRound(playerChoice, computerChoice)) {
        case Outcome.Draw:
            return "You draw!" + " You both chose " + playerChoice.toString().toLowerCase() + "!"
        case Outcome.Win:
            return "You win! " + playerChoice.toString() + " beats " + computerChoice.toString().toLowerCase() + "!"
        case Outcome.Lose:
            return "You lose! " + playerChoice.toString() + " loses to " + computerChoice.toString().toLowerCase() + "!"
    }
}

type Game = Outcome[]

function getOutcomeOfGame(game: Game) {
    const sum = game.reduce((previousValue, currentValue) => previousValue + currentValue.valueOf())
    if (sum > 0) return Outcome.Win
    if (sum < 0) return Outcome.Lose
    return Outcome.Draw
}

type Stats = {
    wins: Number
    losses: Number
    draws: Number
}

function getStats(game: Game): Stats {
    return {
        wins: game.filter(outcome => outcome == Outcome.Win).length,
        losses: game.filter(outcome => outcome == Outcome.Lose).length,
        draws: game.filter(outcome => outcome == Outcome.Draw).length
    }
}

function statsToString(stats: Stats): String {
    return "Wins: " + stats.wins + "\n" + "Losses: " + stats.wins + "\n" + "Draws: " + stats.draws
}

function getDeclarationOfGame(game: Game): String {
    const outcome = getOutcomeOfGame(game)
    const stats = getStats(game)
    switch (outcome) {
        case Outcome.Draw:
            return "The game is a draw!" + "\n" + statsToString(stats)
        case Outcome.Win:
            return "You won the game!" + "\n" + statsToString(stats)
        case Outcome.Lose:
            return "You lost the game!" + "\n" + statsToString(stats)
    }
}

function getChoice(): Choice {
    const choice = prompt("Enter rock, paper or scissors: ")
    switch (choice.trim().toLowerCase()) {
        case "rock":
            return Choice.Rock
        case "paper":
            return Choice.Paper
        case "scissors":
            return Choice.Scissors
        default:
            throw new Error("Not a choice!")
    }
}

function getComputerChoice(): Choice {
    const choices = [Choice.Rock, Choice.Paper, Choice.Scissors]
    return choices[Math.floor(Math.random() * choices.length)]
}

function playGame(numberOfRounds) {
    function go(game: Game, n: number) {
        if (n == 0) {
            alert(getDeclarationOfGame(game))
        } else {
            const playerChoice = getChoice()
            const computerChoice = getComputerChoice()
            alert(getDeclarationOfRound(playerChoice, computerChoice))
            go(game.concat(getOutcomeOfRound(playerChoice, computerChoice)), n - 1)
        }
    }

    go(Array(), numberOfRounds)
}

playGame(5)