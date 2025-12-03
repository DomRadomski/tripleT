// Game Objects

const gameboard = (function() {
    
    // Board State
    // gameboard = ["", "", "", 
    //              "", "", "",
    //              "", "", ""];

    board = ["", "", "",
             "", "", "", 
             "", "", ""];             

    // Read Square
    const getSquare = (squareNum) => {
        if (squareNum < 0 || squareNum > 8) {
            throw new Error(`getSquare: squareNum "${squareNum}" is out of range (0-8).`);
        }
        return board[squareNum];
    };

    // Write Square
    const setSquare = (squareNum, playerShape) => {
        if (squareNum < 0 || squareNum > 8) {
            throw new Error(`setSquare: squareNum "${squareNum}" is out of range (0-8).`);
        }
        board[squareNum] = playerShape;
    };

    // Reset Board
    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    };


    // Read Whole Board
    const printBoard = () => console.log(board);

    return {getSquare, setSquare, printBoard, resetBoard}
})();


function createPlayer (name, shape) {
    
    const getName = () => name;
    const getShape = () => shape;

    let score = 0;

    const getScore = () => score;
    const increaseScore = () => score++;

    return {getName, getShape, getScore, increaseScore};

}

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");


const gameController = (function (board, player1, player2) {

    const hasWon = (player) => {
        const shape = player.getShape();

        return (
            checkHorizontal(shape) ||
            checkVertical(shape) ||
            checkDiagonal(shape)
        );
    };

    const checkHorizontal = (shape) => {
        return (
            (board.getSquare(0) === shape && board.getSquare(1) === shape && board.getSquare(2) === shape) ||
            (board.getSquare(3) === shape && board.getSquare(4) === shape && board.getSquare(5) === shape) ||
            (board.getSquare(6) === shape && board.getSquare(7) === shape && board.getSquare(8) === shape)
        );
    };

    const checkVertical = (shape) => {
        return (
            (board.getSquare(0) === shape && board.getSquare(3) === shape && board.getSquare(6) === shape) ||
            (board.getSquare(1) === shape && board.getSquare(4) === shape && board.getSquare(7) === shape) ||
            (board.getSquare(2) === shape && board.getSquare(5) === shape && board.getSquare(8) === shape)
        );
    };

    const checkDiagonal = (shape) => {
        return (
            (board.getSquare(0) === shape && board.getSquare(4) === shape && board.getSquare(8) === shape) ||
            (board.getSquare(2) === shape && board.getSquare(4) === shape && board.getSquare(6) === shape)
        );
    };

    const hasFinished = () => {
        for (let i = 0; i < 9; i++) {
            const square = board.getSquare(i);
            if (!square) {   // empty string or undefined
                return false;
            }
        }
        return true;
    };


    let turn = 0;

    const playRound = (square) => {

        let player = getPlayer();
        // let square = prompt(`${player.getName()} which square would you like to choose?`);

        if (canPlaySquare(square)) {

            board.setSquare(square, player.getShape()); board.printBoard();

            if (hasWon(player)) { board.resetBoard(); player.increaseScore(); }
            
            else if (hasFinished()) {board.resetBoard();}
            turn++;

        } else {
            alert("You cannot play there!");
        }
    }

    const getPlayer = () => (turn % 2 === 0) ? player1 : player2;

    const canPlaySquare = (squarenum) => board.getSquare(squarenum) === "";

    return { playRound };

})(gameboard, player1, player2);


const domController = (function (board, game) {

    const grid = document.querySelector(".container");
    const squares = document.querySelectorAll(".square");
    const player1score = document.querySelector(".player1");
    const player2score = document.querySelector(".player2");

    const renderBoard = () => {
        
        for (let i = 0; i < 9; i++) {

            if (board.getSquare(i) === "X") {squares[i].innerHTML = `<i class="fa-solid fa-x"></i>`}
                else if (board.getSquare(i) === "O") {squares[i].innerHTML = `<i class="fa-regular fa-circle"></i>`}
                else {{squares[i].innerHTML = ``}}
        }
    }

    grid.addEventListener('click', (e) => {

        let square = Number(e.target.classList[1]);
        game.playRound(square);
        renderBoard();

        player1score.textContent = player1.getScore(); player2score.textContent = player2.getScore();
    })

    return({renderBoard})

})(gameboard, gameController);

