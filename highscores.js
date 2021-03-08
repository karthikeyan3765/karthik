const highScoresList = document.getElementById('highScoresList');
//const finaTime=document.getElementById('finalTime');
const scores= document.getElementById('scores');
const time= document.getElementById('Time');
const hrs= localStorage.getItem('hrs');

const mins= localStorage.getItem('mins');

const secs= localStorage.getItem('secs');


const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


highScoresList.innerHTML = highScores
  .map(score => {
    //return `<li class="high-score">${score.name} - ${score.score}</li>`;
	return `<h3>${score.name}</h3>`;
  })
  .join("");
  
 scores.innerHTML=highScores
 .map(score => {
	 return `<h3>${score.score}</h3>`;
 })
 .join("");
  
 // time.innerHTML= `<h3>${hrs}H:${mins}M:${secs}S</h3>`;