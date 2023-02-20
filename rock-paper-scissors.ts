enum Outcome {
    Win, Draw, Lose
}

enum Choice {
    Paper, Rock, Scissors
}

function choiceCompare(playerChoice: Choice, computerChoice: Choice) {
    if (playerChoice === computerChoice)
        return Outcome.Draw
    else if (playerChoice.valueOf() - computerChoice.valueOf() == -1) {
        return Outcome.Win
    } else return Outcome.Lose
}


