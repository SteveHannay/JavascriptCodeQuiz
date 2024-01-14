/* 
    Javascript for Challenge 06 
    Developer - Steve Hannay 
    First Created - 12th January 2024

    This code handles logic for the quiz
    Questions and Answers for the quiz are located in the javascript file questions.js

*/


// Define Variables and Event Listeners
// ------------------------------------

// create references to html elements (using element id's)
var divStartScreen = document.querySelector("#start-screen")
var divQuestions = document.querySelector("#questions")
var divQuestionTitle = document.querySelector("#question-title")
var divChoices = document.querySelector("#choices")
var divFeedback = document.querySelector("#feedback")
var divEndScreen = document.querySelector("#end-screen")

var spanTime = document.querySelector("#time")
var spanFinalScore = document.querySelector("#final-score")

var btnStart = document.querySelector("#start")
var btnSubmit = document.querySelector("#submit")

// create references to audio files
var audioCorrect = new Audio("./assets/sfx/correct.wav")
var audioIncorrect = new Audio("./assets/sfx/incorrect.wav")

// module variables
var objQuestion = {}            // object containing the current question and its properties

var userAnswerIndex = 0         // index of user's Answer from the array of ALL Possible Answers for a Question (javacriptQuestions.possibleAnswers)

var askedIndexArray = []        // an array of questionIndex's of asked questions (to prevent the same question being asked)
var allQuestionsAsked = false   // flag for when user has answered all questions

var questionsAnswered = 0       // number of questions the user has answered
var correctAnswers = 0          // number of correct answers by the user

var gameTimerInterval = 0       // used for a 30 second game timer


// add Event Listeners 
btnStart.addEventListener("click", startQuiz)

divChoices.addEventListener("click", function(event) {
    // If the clicked element is a button
    var element = event.target;
    if (element.matches("button") === true) {
        // Get the userAnswerIndex from the "clicked" button (stored within the buttons data-index property) 
        userAnswerIndex = element.getAttribute("data-index");
        // Check the "user answer" (userAnswerIndex) against the "correct answer" (correctAnswerIndex)
        checkAnswer()
    }
})



// MAIN Logic
// ----------

// (1) Start Quiz (triggered by "Start" button)
function startQuiz() {

    // reset variables and screen
    askedIndexArray = []        
    allQuestionsAsked = false   
    questionsAnswered = 0       
    correctAnswers = 0          
    clearQuestion()

    // Start Game Timer
    runGameTimer()

    // Set Visibility of the "start-screen" div to "hide"
    divStartScreen.setAttribute("class","hide")

    // Display First Question
    displayNextQuestion()

}


// (2) Check User Answer (triggered by an "answer" button clicked by the user)
function checkAnswer() {

    // Check the users answer and display the next question (or end game)
    // note : the event handler for the "answer" buttons sets userAnswerIndex before calling this function

    var questionAnsweredCorrectly = false

    // increment number of questions the user has answered
    questionsAnswered ++    

    // check users answer against the correct answer and update the number of correct answers
    if (userAnswerIndex == objQuestion.correctAnswerIndex){
        questionAnsweredCorrectly = true
        correctAnswers ++
    }  
    console.log(correctAnswers + " out of " + questionsAnswered)
    
    // Display Feedback ("correct" or "wrong" answer)
    if (questionAnsweredCorrectly) {
        divFeedback.textContent = "Correct!"
        audioCorrect.play()
    }
    else {
        divFeedback.textContent = "Wrong Answer!"
        audioIncorrect.play()
    }

    divFeedback.setAttribute("class","feedback")                // display feedback div
    
    setTimeout(function() {                                     // wait a a second for user to see feedback
        
        // hide feedback div
        divFeedback.setAttribute("class","feedback hide")       

        // Display next question (if any)
        displayNextQuestion()

        // if user has answered all questions then End Quiz
        if (allQuestionsAsked == true){
            // End Quiz
            endQuiz()
        }
    
    }, 1000) // timer set to 1 second
  
}


// (3) End Quiz (called when all questions have been answered or the timer runs out)
function endQuiz() {

    // Stop Game Timer and Clear any currently displayed Question
    stopGameTimer() 
    clearQuestion()

    // Display "end-screen" div
    divEndScreen.setAttribute("class","show")

    // Display the Final Score 
    spanFinalScore.textContent = correctAnswers + " (out of " + questionsAnswered + " questions answered)"

    //alert("END QUIZ")
}

    

// Utility functions
// -----------------

// Display Next Question 
function displayNextQuestion(){

    // Clear any currently displayed Question
    clearQuestion()

    // Get Next Question to Display 
    // - sets the objQuestion object to the next Question to ask user (if there is an unasked question)
    // - sets allQuestionsAsked to true if all questions have already been asked
    getNextQuestion()
    
    // If NOT All Qustions have already been asked
    if (allQuestionsAsked == false){

        // Display Question

        // Display Question Title
        divQuestionTitle.textContent = objQuestion.question

        // Display Buttons for ALL possible Answers
        var possibleAnswers = objQuestion.possibleAnswers  // get an array of all possible answers

        for (var i = 0; i < possibleAnswers.length; i++) {
        
            var selectedPossibleAnswer = possibleAnswers[i]
            var button = document.createElement("button")

            button.textContent = selectedPossibleAnswer
            button.setAttribute("data-index", i)  // set the data-index to the the possition of the selected Possible Answer 
            divChoices.appendChild(button)
        }

        // Set Visibility of the "questions" div to "show"
        divQuestions.setAttribute("class","show")

    }

}

// Get Next Question
function getNextQuestion(){

    // Randomly selects a question and sets the objQuestion object to hold the question
    // Sets allQuestionsAsked to true if all questions have been asked

    var nextQuestionFound = false 

    // set flag if all questions have already been asked
    if (askedIndexArray.length == javacriptQuestions.length){
        allQuestionsAsked = true
    }

    // repeat while next question not yet found and all questions have not been asked 
    while (nextQuestionFound == false && allQuestionsAsked == false) {
        
        // select a question at random
        objQuestion = javacriptQuestions[(Math.floor(Math.random() * javacriptQuestions.length))]
        
        // if the question has not been asked before
        if (askedIndexArray.indexOf(objQuestion.questionIndex) == -1) {

            // select the question and add its questionIndex to the array of asked questions
            askedIndexArray.push(objQuestion.questionIndex)
            nextQuestionFound = true
        }
    }

}

// Clear Question
function clearQuestion() {

    // reset variables used for managing a question
    objQuestion = {}
    userAnswerIndex = 0
    
    // reset screen
    divQuestionTitle.textContent = ""   // clear text from the "question title" div
    divChoices.innerHTML = ""           // remove buttons from the "choices" div
}


// Game Timer     
function runGameTimer() {

    counter = 30 // set counter for 30 seconds 
      
    gameTimerInterval = setInterval(() => {

        // display the number of seconds left 
        spanTime.textContent = counter + " seconds left"

        // decrement timer 
        counter--;
        
        // check for end of countdown
        if (counter < 0 ) {
        
            // timer reached zero - stop timer and End Quiz
            stopGameTimer()      
            endQuiz()
        }

    }, 1000); // timer runs in seconds

  }

  function stopGameTimer() {
    clearInterval(gameTimerInterval) // stop timer   
  }

