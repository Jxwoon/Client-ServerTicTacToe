var IdOne = "";
var IdTwo = "";
var UserOne = "";
var UserTwo = "";
var UserOneReady = false;
var UserTwoReady = false;
var whoPlayed = "";
var userOneWinValue = 1;
var userTwoWinValue = -1;

$(document).ready(function () {
    //enables the connection with the server
    var connection = new WebSocketManager.Connection("ws://localhost:5000/TicTacToe");
    connection.enableLogging = true;
    $('#GameOver').hide();
    connection.connectionMethods.onConnected = () => {

    }

    connection.connectionMethods.onDisconnected = () => {

    }

    // This allows user to input their username and wait for the other player
    connection.clientMethods["Username"] = (socketId, message) => {
        alert("message sent");
        if (IdOne.length == 0) {
            IdOne = socketId;

        }
        if (IdOne != socketId) {
            IdTwo = socketId;
        }
        var Player = IdOne;
        if (socketId == IdOne) {
            if (UserOne.length == 0) {
                UserOne = message;
                UserOneReady = true;
                $('#one').html(UserOne + " - X");
            }
        } else {
            if (UserTwo.length == 0) {
                UserTwo = message;
                UserTwoReady = true;
                $('#two').html(UserTwo + " - O");

            }
        }
        if (!UserOneReady || !UserTwoReady) {
            $('#m').html("Awaiting For Another Player");
        }
        if (UserOneReady && UserTwoReady) {
            $('#start').hide();
            $('#m').html("X's will be starting . . .");
        }
    }


    // Allows users to submit to press the enter key with their names
    var $messagecontent = $('#message-content');
    $messagecontent.keyup(function (e) {
        if (e.keyCode == 13) {
            var message = $messagecontent.val().trim();
            if (message.length == 0) {
                return false;
            }
            connection.invoke("EnterUsername", connection.connectionId, message);

            $messagecontent.val('');
        }

    });
    // Main control of how Tic Tac Toe is played
    // Sends information between the server and client
    connection.clientMethods["Game"] = (socketId, square) => {

        if (document.getElementById(square).innerText != "") {
            setMessage("That's an invalid move");
            return;
        }
        if (socketId != whoPlayed) {
            var message = $('m').html();
            if (!gameOver) {
                if (socketId == IdOne) {

                    $('#' + square).html("X");
                    $('#m').html("O's Turn");
                    whoPlayed = IdOne;

                } else if (socketId == IdTwo) {
                    $('#' + square).html("O");
                    $('#m').html("X's Turn");
                    whoPlayed = IdTwo;
                }
            }
        }
        Plays(square);
        if (gameOver) {
            $('#GameOver').show();
        }
    }

    // Below are each square in the tic tac toe board
    // invoking the client- server to be played
    var $1 = $('#1');
    $1.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "1");
        }
    });

    var $2 = $('#2');
    $2.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "2");
        }
    });

    var $3 = $('#3');
    $3.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "3");
        }
    });

    var $4 = $('#4');
    $4.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "4");
        }
    });

    var $5 = $('#5');
    $5.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "5");
        }
    });

    var $6 = $('#6');
    $6.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "6");
        }
    });

    var $7 = $('#7');
    $7.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "7");
        }
    });

    var $8 = $('#8');
    $8.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "8");
        }
    });

    var $9 = $('#9');
    $9.on("click", function (e) {
        if (connection.connectionId != whoPlayed) {
            connection.invoke("PlayingGame", connection.connectionId, "9");
        }
    });


    connection.start();

});