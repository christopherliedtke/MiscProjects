(function() {
    var newGameButton = $("#start");
    var allCheckers = $(".board .checker");
    var currentPlayer = "red";
    var chooseCol = $(".choose .row div");
    var message = $("#message");
    var winnerMessage;
    var countRedWins = 0;
    var countGoldWins = 0;

    // Make move on click
    chooseCol.on("click", function(e) {
        if (message.html() == winnerMessage) {
            return;
        }

        message.html("");

        // Get clicked column on .choose
        var clickedCol;
        for (var i = 0; i < chooseCol.length; i++) {
            if (chooseCol[i] == e.target) {
                clickedCol = i;
            }
        }

        // Get target column on .board through clicked column on .choose
        var targetCol = $(".board .col").eq(clickedCol);
        // Get checkers in target column on .board
        var checkersInCol = targetCol.children().children();

        // Add current players class to target in column
        for (var j = checkersInCol.length - 1; j >= 0; j--) {
            if (!checkersInCol.eq(j).hasClass("red") && !checkersInCol.eq(j).hasClass("gold")) {
                checkersInCol.eq(j).addClass(currentPlayer);
                break;
            }
        }

        // Abort if column is filled already
        if (j === -1) {
            message.html("This column is filled already. Choose another one, please!");
            return;
        }

        // Get checkers in target row on .board
        var checkersInRow = $(".row" + j).children();

        var colOfAddedChecker = clickedCol;
        var rowOfAddedChecker = j;

        var diagonalArrayOne = getDiagonalArrOne(colOfAddedChecker, rowOfAddedChecker);
        var diagonalArrayTwo = getDiagonalArrTwo(colOfAddedChecker, rowOfAddedChecker);

        // console.log(diagonalStartOne, diagonalStartTwo);

        // Check for victory and anounce
        if (checkForVictory(checkersInCol) || checkForVictory(checkersInRow) || diagonalVictory(diagonalArrayOne) || diagonalVictory(diagonalArrayTwo)) {
            //    Show victory message
            winnerMessage = "The Winner is " + currentPlayer.toLocaleUpperCase() + "!";
            message.html(winnerMessage);

            if (currentPlayer === "red") {
                countRedWins++;
                $(".header .red").html(countRedWins);
            } else {
                countGoldWins++;
                $(".header .gold").html(countGoldWins);
            }

            newGameButton.removeClass("d-none");
            return;
        }

        if (checkForDraw()) {
            message.html("This is a draw!");
            newGameButton.removeClass("d-none");
            return;
        }

        switchPlayer();
    });

    // Check for draw
    function checkForDraw() {
        for (var s = 0; s < allCheckers.length; s++) {
            if (!allCheckers.eq(s).hasClass("red") && !allCheckers.eq(s).hasClass("gold")) {
                return;
            }
        }

        return true;
    }

    // Define victory function
    function checkForVictory(slots) {
        var count = 0;

        for (var k = 0; k < slots.length; k++) {
            if (slots.eq(k).hasClass(currentPlayer)) {
                count++;

                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    // Define diagonal victory function
    function diagonalVictory(slots) {
        var count = 0;

        for (var l = 0; l < slots.length; l++) {
            if (slots[l].classList.contains(currentPlayer)) {
                count++;

                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    // Make diagonal array 1
    function getDiagonalArrOne(col, row) {
        while (col != 0 && row != 0) {
            col--;
            row--;
        }

        var diagonalStart = col * 6 + row;
        var diagonalArr = [];

        while (col != 7 && row != 6) {
            diagonalArr.push(allCheckers.eq(diagonalStart)[0]);
            col++;
            row++;
            diagonalStart += 7;
        }

        return diagonalArr;
    }

    // Make diagonal array 2
    function getDiagonalArrTwo(col, row) {
        while (col != 0 && row != 5) {
            col--;
            row++;
        }

        var diagonalStart = col * 6 + row;
        var diagonalArr = [];

        while (col != 7 && row != -1) {
            diagonalArr.push(allCheckers.eq(diagonalStart)[0]);
            col++;
            row--;
            diagonalStart += 5;
        }

        return diagonalArr;
    }

    // Define switchPlayer function
    function switchPlayer() {
        $(".choose .checker").removeClass(currentPlayer);
        currentPlayer === "red" ? (currentPlayer = "gold") : (currentPlayer = "red");
        $(".choose .checker").addClass(currentPlayer);
    }

    // Start new game
    newGameButton.click(function() {
        allCheckers.removeClass("red");
        allCheckers.removeClass("gold");
        newGameButton.addClass("d-none");
        message.html("");
        switchPlayer();
    });

    $(document).ready(function() {
        chooseCol.addClass("animated");
    });
})();
