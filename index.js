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

    const playRound = () => {

        let player = getPlayer();
        let square = prompt(`${player.getName()} which square would you like to choose?`);

        if (canPlaySquare(square)) {

            board.setSquare(square, player.getShape()); board.printBoard();

            if (hasWon(player)) { board.resetBoard(); player.increaseScore(); alert(`${player.getName()} has won. ${player1.getName()}: ${player1.getScore()}, ${player2.getName()}: ${player2.getScore()}`);}
            
            else if (hasFinished()) {board.resetBoard(); alert("The game has ended in a draw, board reset");}
            turn++;

        } else {
            alert("You cannot play there!");
        }
    }

    const getPlayer = () => (turn % 2 === 0) ? player1 : player2;

    const canPlaySquare = (squarenum) => board.getSquare(squarenum) === "";

    return { playRound };

})(gameboard, player1, player2);

