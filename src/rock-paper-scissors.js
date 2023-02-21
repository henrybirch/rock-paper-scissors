var Outcome;
(function (Outcome) {
    Outcome["Win"] = "Win";
    Outcome["Draw"] = "Draw";
    Outcome["Lose"] = "Lose";
})(Outcome || (Outcome = {}));
var Choice;
(function (Choice) {
    Choice["Rock"] = "Rock";
    Choice["Paper"] = "Paper";
    Choice["Scissors"] = "Scissors";
})(Choice || (Choice = {}));
function getValueOfChoice(choice) {
    switch (choice) {
        case Choice.Paper:
            return 1;
        case Choice.Rock:
            return 2;
        case Choice.Scissors:
            return 3;
    }
}
function getValueOfOutcome(outcome) {
    switch (outcome) {
        case Outcome.Win:
            return 1;
        case Outcome.Draw:
            return 0;
        case Outcome.Lose:
            return -1;
    }
}
function getOutcomeOfRound(playerChoice, computerChoice) {
    if (playerChoice == computerChoice)
        return Outcome.Draw;
    if ((getValueOfChoice(playerChoice) - getValueOfChoice(computerChoice)) == -1)
        return Outcome.Win;
    return Outcome.Lose;
}
function getOutcomeOfGame(game) {
    const gameValue = game.map(getValueOfOutcome).reduce((previousValue, currentValue) => previousValue + currentValue);
    if (gameValue > 0)
        return Outcome.Win;
    if (gameValue < 0)
        return Outcome.Lose;
    return Outcome.Draw;
}
function getStats(game) {
    return {
        wins: game.filter(outcome => outcome == Outcome.Win).length,
        losses: game.filter(outcome => outcome == Outcome.Lose).length,
        draws: game.filter(outcome => outcome == Outcome.Draw).length
    };
}
function getComputerChoice() {
    const choices = [Choice.Rock, Choice.Paper, Choice.Scissors];
    return choices[Math.floor(Math.random() * choices.length)];
}
function setStats(stats) {
    localStorage.setItem("stats", JSON.stringify(stats));
}
function setGame(game) {
    localStorage.setItem("game", JSON.stringify(game));
}
function startGame() {
    setGame([]);
    setStats({ wins: 0, draws: 0, losses: 0 });
}
function getStatsForGame() {
    return JSON.parse(localStorage.getItem("stats"));
}
function getGame() {
    return JSON.parse(localStorage.getItem("game"));
}
function updateGame(choice) {
    const computerChoice = getComputerChoice();
    const outcome = getOutcomeOfRound(choice, computerChoice);
    const game = getGame().concat(outcome);
    setGame(game);
    setStats(getStats(game));
    setStatsInUi();
}
function endGame() {
    const title = document.getElementById("popup-title");
    const outcome = getOutcomeOfGame(getGame());
    if (outcome == Outcome.Win) {
        title.textContent = "Win!";
    }
    else if (outcome == Outcome.Draw) {
        title.textContent = "Draw!";
    }
    else {
        title.textContent = "Loss!";
    }
    const description = document.getElementById("popup-text");
    const stats = getStatsForGame();
    description.textContent = `Wins: ${stats.wins}\nDraws: ${stats.draws}\nLosses: ${stats.losses}`;
}
function togglePopup() {
    document.getElementById("popup").classList.toggle("active");
    setStatsInUi();
}
function playRound(choice) {
    updateGame(choice);
    if (getGame().length == 5) {
        endGame();
        togglePopup();
        startGame();
    }
}
function setStatsInUi() {
    const wins = document.querySelector(".wins.stat-number");
    const draws = document.querySelector(".draws.stat-number");
    const losses = document.querySelector(".losses.stat-number");
    const stats = getStatsForGame();
    wins.textContent = stats.wins.toString();
    draws.textContent = stats.draws.toString();
    losses.textContent = stats.losses.toString();
}
function setEventListenersForChoices() {
    const rock = document.querySelector(".rock-button");
    const paper = document.querySelector(".paper-button");
    const scissors = document.querySelector(".scissors-button");
    rock.addEventListener("click", (e) => playRound(Choice.Rock));
    paper.addEventListener("click", (e) => playRound(Choice.Paper));
    scissors.addEventListener("click", (e) => playRound(Choice.Scissors));
}
startGame();
setStatsInUi();
setEventListenersForChoices();
//# sourceMappingURL=rock-paper-scissors.js.map