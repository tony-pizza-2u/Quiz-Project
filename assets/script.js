let questions = [
    {
        question: "What is the fastest breed of dog in the world?",
        answer: "Greyhound",
        choices: ["Rat Terrier", "Jack Russell", "Lhasa Apso", "Greyhound"]
    },

    {
        question: "What breed holds the Guinness World Record for farthest dock jump?",
        answer: "Whippet",
        choices: ["Border Collie", "Whippet","Husky", "Australian Shepard"]
    },

    {
        question: "Which breed is known for their sense of smell?",
        answer: "Bloodhound",
        choices: ["Bloodhound","Chihuahua", "Pug", "Chinese Crested"]
    },

    {
        question: "Which breed was bred to attack badgers in their den?",
        answer: "Dachshund",
        choices: ["Jack Russell", "Belgian Malinois", "Doberman Pinscher","Dachshund"]
    },

    {
        question: "According to the AKC, which breed has been the most popular household dog in America since 1991?",
        answer: "Labrador Retriever",
        choices: ["Poodle","Labrador Retriever","Golden Retriever","Bischon Frise"]
    }

];

var MAX_SECONDS = 60;

var currentQuestion = 0;
var secondsRemaining = 0;
var score = 0;


var startButton = document.getElementById("startButton");

var timerArea = document.getElementById("timerArea");


var questionText = document.getElementById("questionText");

var answerOption1 = document.getElementById("answerOption1");
var answerOption2 = document.getElementById("answerOption2");
var answerOption3 = document.getElementById("answerOption3");
var answerOption4 = document.getElementById("answerOption4");

var scoreCountArea = document.getElementById("scoreCountArea");

var nameText = document.getElementById("nameText");

var saveScoreButton = document.getElementById("saveScoreButton");

startButton.addEventListener("click", startGame);

function timer(){
    timerId = setInterval(() => {
      if(MAX_SECONDS>0){
        MAX_SECONDS-=1
        timerArea.innerText=MAX_SECONDS
      }  
    }, 1000);
}

function startGame() {
    timer()

    startButton.disabled = true;

    $("#scoreArea").hide();
    $("#questionArea").show();

    score = 0;

    secondsRemaining = MAX_SECONDS;

    timerArea.textContent = secondsRemaining;

    displayQuestion();
}

function displayQuestion() {

    var question = questions[currentQuestion];

    questionText.textContent = question.question;

    answerOption1.textContent = question.choices[0];
    answerOption2.textContent = question.choices[1];
    answerOption3.textContent = question.choices[2];
    answerOption4.textContent = question.choices[3];
}

function checkAnswer(event) {
    if(event.target.textContent === questions[currentQuestion].answer){
        console.log("CORRECT!")

    } else {
        console.log("WRONG!");
        MAX_SECONDS-=5
    }
    currentQuestion++
    if (currentQuestion>=questions.length){
        document.getElementById("answerOptionArea").style.display=("none")
        clearInterval(timerId)
        var initials=prompt("Enter Your Initials")
        var highScores=JSON.parse(localStorage.getItem("scores"))||[]
        highScores.push({initials,MAX_SECONDS})
        localStorage.setItem("scores",JSON.stringify(highScores))
        window.location.reload()
        return
    }
    displayQuestion()
}
answerOption1.addEventListener("click", checkAnswer);
answerOption2.addEventListener("click", checkAnswer);
answerOption3.addEventListener("click", checkAnswer);
answerOption4.addEventListener("click", checkAnswer);
