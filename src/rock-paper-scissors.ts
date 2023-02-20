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

function getComputerChoice(): Choice {
    const choices = [Choice.Rock, Choice.Paper, Choice.Scissors]
    return choices[Math.floor(Math.random() * choices.length)]
}
