let score=JSON.parse(localStorage.getItem('score')) ||{
  wins: 0,
  losses: 0,
  ties:0
};
updateScore();

function resetScore(){
  score = {
    wins: 0,
    losses: 0,
    ties:0
  };
  localStorage.removeItem('score');
  updateScore();
}

let autoPlaying=false
let intervlID;

// const pickPlayerMove = () => {
//   () => {
//     const player=pickComputerMove();
//     playGame(player)
//   }
// }

function autoPlay(){
  if(!autoPlaying){
    intervlID = setInterval(()=>{
      const player=pickComputerMove();
      playGame(player)
    },1000);
    autoPlaying=true;
    document.querySelector('.auto-play').innerHTML='Stop Playing';
  }
  else{

    clearInterval(intervlID);
    autoPlaying=false;
    document.querySelector('.auto-play').innerHTML='Auto Play';
  }
}

// document.querySelector('.auto-play').addEventListener('click',()=>{
//   autoPlay();
// })

document.querySelector('.rock')
  .addEventListener('click', () => {
    playGame('rock')
  })


document.querySelector('.paper')
  .addEventListener('click', () => {
    playGame('paper')
  })

document.querySelector('.scissor')
  .addEventListener('click', () => {
    playGame('scissor')
  })

document.body.addEventListener('keydown', (event) =>{
  if(event.key==='r'){
    playGame('rock');
  }
  else if(event.key==='p'){
    playGame('paper')
  }
  else if(event.key==='s'){
    playGame('scissor')
  }
  console.log(event.key);
})

function playGame(playerMove) {
  let computerMove = pickComputerMove();

  let result='';

  if(playerMove==='scissor'){
    if(computerMove==='rock'){
      result='You Lose'
    } else if (computerMove==='paper'){
      result='You win';
    } else if (computerMove==='scissor'){
      result='It\'s a tie';
    }

  } else if(playerMove==='paper'){
    if(computerMove==='rock'){
      result='You win';
    } else if(computerMove==='paper'){
      result='It\'s a tie';
    } else if(computerMove==='scissor'){
      result='You Lose';
    }

  } else if(playerMove==='rock'){
    if(computerMove==='rock'){
      result='It\'s a tie';
    } else if(computerMove==='paper'){
      result='You Lose';
    } else if(computerMove==='scissor'){
      result='You win';
    }
  }

  if(result === 'You win'){
    score.wins+=1;
  } else if (result === 'You Lose'){
    score.losses+=1;
  } else if (result === 'It\'s a tie'){
    score.ties+=1;
  }
  localStorage.setItem('score',JSON.stringify(score));
  updateScore();
  document.querySelector('.result').innerHTML=result;
  document.querySelector('.moves').innerHTML=`You <img class="icon" src="../images/${playerMove}.png" >. <img class="icon" src="../images/${computerMove}.png"> Computer`

}

function updateScore() {
document.querySelector('.counter').innerHTML= `Wins: ${score.wins}, Losses: ${score.losses}, Ties:${score.ties}`
}

function pickComputerMove(){
  const randomN=Math.random();
  let computerMove='';
  if(randomN>0 && randomN< (1/3)){
    computerMove='rock';
  } else if(randomN > (1/3) && randomN < 2/3){
    computerMove='paper';
  } else if(randomN >(2/3) && randomN < 1){
    computerMove='scissor';
  }
  return computerMove;
}