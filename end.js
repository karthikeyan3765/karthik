const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const finalTime= document.getElementById('finalTime');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const hrs= localStorage.getItem('hrs');

const mins= localStorage.getItem('mins');

const secs= localStorage.getItem('secs');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 3;   //Set the value for Max High Score

finalScore.innerText = mostRecentScore;

finalTime.innerHTML = hrs +' Hr : '+ mins +' Min : '+secs +' Sec' ;

Check_Pass_Fail(mostRecentScore); //Call the function

function Check_Pass_Fail(num)
{
	if(num < 1)
{
	document.getElementById("im").innerHTML= "<img src='los.png\' width=\'300px\' height=\'250px\'>";	
}
else
{ 
	document.getElementById("im").innerHTML= "<img src='win.png\'width=\'300px\' height=\'250px\'>";
}

}

username.addEventListener('keyup', () => {  
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
	
    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(50);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};
