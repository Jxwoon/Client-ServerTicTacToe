var count = 0;
var isPlayingWithComputer = false;
var userOne, userTwo;
var userOneWinValue = 1, userTwoWinValue = -1;
var count = 0;
var gameOver = false;
// create a class object that is called State which holds
// the following down below
// board = all the individual tiles
// moveMade = 
var State = (function () {
    function State() {
        this.board = new Array(9);
        this.moveMade = -1;
        this.score = null;
        this.whichPlayerPlayed = 0;
        this.isCompleted = false;
    }
    return State;
}());
//initializing the variables for object currentState
var currentState = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    moveMade: 1,
    score: null,
    whichPlayerPlayed: 0,
    isCompleted: false
};
//prints the welcoming message
function startGame() {
    P1();
}
//Values are set if the user is going first
function P1() {
    if (!gameOver) {
        userOne = "X";
        userTwo = "O";
        currentState.whichPlayerPlayed = 0;
    }
}
//This is a move that the user is making
function Plays(square) {
    if (endGame(currentState) == false) {
        if (currentState.whichPlayerPlayed == userOneWinValue) {
            count++;
            currentState.whichPlayerPlayed = userTwoWinValue;
        }
        else if (currentState.whichPlayerPlayed == userTwoWinValue) {
            count++;
            currentState.whichPlayerPlayed = userOneWinValue;
        }
        else {
            count++;
            currentState.whichPlayerPlayed = userOneWinValue;
        }
        markBoard(currentState);
    }
    endGame(currentState);
}
// sets the message at the bottom of the screen 
function setMessage(msg) {
    document.getElementById("m").innerText = msg;
}
// get the id of the boxes in the tic tac toe
function getBox(number) {
    return document.getElementById(number).innerText;
}
//function that markes all the positions that are filled
function markBoard(state) {
    for (var i = 0; i < state.board.length; i++) {
        if (getBox(i + 1) == "X") {
            state.board[i] = 1;
        }
        else if (getBox(i + 1) == "O") {
            state.board[i] = -1;
        }
    }
}
// checks all the possiblilties if there are three of a kind in a row
function check(a, b, c) {
    var result = false;
    if (a == b && b == c) {
        if (a == userOneWinValue) {
            return userOneWinValue;
        }
        else if (a == userTwoWinValue) {
            return userTwoWinValue;
        }
    }
    return 0;
}
// calculates a score for state
function calculateScore(state) {
    var num = 0;
    num += check(state.board[0], state.board[1], state.board[2]);
    num += check(state.board[3], state.board[4], state.board[5]);
    num += check(state.board[6], state.board[7], state.board[8]);
    num += check(state.board[0], state.board[3], state.board[6]);
    num += check(state.board[1], state.board[4], state.board[7]);
    num += check(state.board[2], state.board[5], state.board[8]);
    num += check(state.board[0], state.board[4], state.board[8]);
    num += check(state.board[2], state.board[4], state.board[6]);
    if (num > 0) {
        return num;
    }
    else if (num < 0) {
        return num;
    }
    else {
        if (state.isCompleted == false) {
            return null;
        }
        else {
            return 0;
        }
    }
}
// Prints congratulatory statement if user wins or say there's no winner
function endGame(state) {
    markBoard(state);
    if (calculateScore(state) == userOneWinValue ||
        calculateScore(state) == userTwoWinValue ||
        count >= 9) {
        var finalScore = calculateScore(state);
        if (finalScore > 0) {
            setMessage("X Wins!");
        }
        else if (finalScore < 0) {
            setMessage("O Wins!");
        }
        else {
            setMessage("It's a tie!");
        }
        gameOver = true;
        return true;
    }
    return false;
}
//# sourceMappingURL=ttt.js.map