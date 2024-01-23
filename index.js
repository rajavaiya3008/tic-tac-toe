const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();

function initGame(){
    currentPlayer = "x";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerHTML = "";
        box.style.pointerEvents = 'all';
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

}

function fillBox(index){
    if(boxes[index].innerHTML === ""){
        boxes[index].innerHTML = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentPlayer;

        swapTurn();

        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "x"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "x";
    }

    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let winner = "";
    winningPositions.forEach((position) => {
        if(gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "" &&
         (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            if(boxes[position[0]].innerHTML === "x"){
                winner = "x";
                gameInfo.innerHTML = `Winner Player - ${winner}`;
            }
            else{
                winner = "O";
                gameInfo.innerHTML = `Winner Player - ${winner}`;
            }

            
        }

        if(winner !== ""){
            newGameBtn.classList.add("active");
        }

        let checkCount = 0;
        gameGrid.forEach((index) => {
            if(gameGrid[index] !== ""){
                checkCount++;
            }
        });

        if(checkCount === 9){
            newGameBtn.classList.add("active");
        }
    
    })
}

newGameBtn.addEventListener("click",initGame);



boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        fillBox(index);
    });
})


