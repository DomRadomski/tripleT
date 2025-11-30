// Game Objects

const gameboard = (function() {
    
    // Board State
    // gameboard = ["", "", "", 
    //              "", "", "",
    //              "", "", ""];

    board = ["X", "O", "X",
             "O", "X", "O", 
             "X", "O", "X"];             

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

    // Read Whole Board
    const printBoard = () => console.log(board);

    return {getSquare, setSquare, printBoard}
})();


function createPlayer (name, shape) {
    
    const getName = () => name;
    const getShape = () => shape;

    let score = 0;

    const getScore = () => score;
    const increaseScore = () => score++;

    return {getName, getShape, getScore, increaseScore};

}


