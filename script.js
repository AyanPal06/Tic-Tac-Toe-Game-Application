const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//function for initilizing the game
function initGame(){
    currentPlayer="X";
    //grid empty
    gameGrid=["","","","","","","","",""];
    //UI empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        
        //greenspot remove
        box.classList=`box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }

    //UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPosition.forEach((position)=>{

        ///winni0ng condition check
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="" ) &&(gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]) ){
                //check who is winner
                if(gameGrid[position[0]]==="X"){
                    answer="X";
                }
                else{
                    answer="0";
                }
                 //disable pointer event
                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                });

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });
    //if we have a winner
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is no winner
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });
    if(fillCount===9){
        gameInfo.innerText="Game Tied!";
        newGameBtn.classList.add("active");

    }
}

function handleclick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //// swap the turn
        swapTurn();
        /// check if anyone win
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
});

newGameBtn.addEventListener("click",initGame);


