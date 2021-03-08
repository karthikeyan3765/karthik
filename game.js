const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];
var answer="";

//Timer variables

var hour=0;
var seconds=0;
var minutes=0;
//var result=[hour,minutes,seconds];
var hr=hour;
var mi=minutes;
var sec=seconds;
var id=0;

// Calling Start() function
start(); 

//Timer Functions
function printmsg()
 {
	 document.getElementById("Timer").innerHTML= `<h1>${hour}H:${minutes}M:${seconds}S</h1>`; ;
	 seconds++;
	//result=[hour,seconds,minutes];
	 hr=hour;
     mi=minutes;
     sec=seconds;
	 if(seconds==60)
	 {
		 minutes++;
		 seconds=0;
		 //result=[hour,seconds,minutes];
		  hr=hour;
          mi=minutes;
          sec=seconds;
		 if(minutes==60)
		 {
			 hour++;
			 minutes=0;
		 //result=[hour,minutes,seconds];
		  hr=hour;
          mi=minutes;
          sec=seconds;
		 
		 }
	 }
 }
 function start()
 {
	id= window.setInterval(printmsg,1000);	 
 }
 function stopTime()
 {
	 //localStorage.setItem('mostRecentTime', JSON.stringify(result));  //store time 
	  localStorage.setItem('hrs',hr);
	  localStorage.setItem('mins',mi);
	  localStorage.setItem('secs',sec);
	 clearInterval(id);	 
 }
 
//Fetch the Question from Open Trivia Database	
	
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple'
    
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
            answer = loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 1;   // Set the value for credit point of every questions
const MAX_QUESTIONS = 10;   //Maximum Question you want ?

 function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

//Next Button Functions
function nextQuestion()
      {
	    getNewQuestion();
      }  

//Submit Button Function	  

function submit()
{
	getNewQuestion();
	stopTime();
	window.location="end.html";
}	

//Get the Question 

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		
        localStorage.setItem('mostRecentScore', score);
		document.getElementById("End-button").innerHTML=`<button class="btn btn-success">Submit</button>`;
		stopTime();                                                                                                                                                          
        //go to the end page
        return window.location.assign('/');
    }
    questionCounter++;
    progressText.innerText = `Q : ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

         classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
			selectedChoice.parentElement.classList.add(classToApply);
        }
        else
		{
			selectedChoice.parentElement.classList.add(classToApply);
		}
		
       setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        },1000);
		
		 
    });
});  

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
