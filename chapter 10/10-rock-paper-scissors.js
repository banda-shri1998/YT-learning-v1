let score=JSON.parse(localStorage.getItem('score')) ||{
    wins: 0,
    losses: 0,
    ties:0
  };

  function resetScore(){
    score = {
      wins: 0,
      losses: 0,
      ties:0
    };
    localStorage.removeItem('score');
    updateScore()
  }

function playGame(playerMove) {
  let computerMove = pickComputerMove();

  let result=''

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
  document.querySelector('.moves').innerHTML=`You <img class="icon" src="./images/${playerMove}.png" >. <img class="icon" src="./images/${computerMove}.png"> Computer`
  
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