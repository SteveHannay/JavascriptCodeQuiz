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

var inputEnterInitails = document.querySelector("#initials")

var btnStart = document.querySelector("#start")
var btnSubmitHighScore = document.querySelector("#submit")

// create references to audio files
var audioCorrect = new Audio("./assets/sfx/correct.wav")
var audioIncorrect = new Audio("./assets/sfx/incorrect.wav")

// constants (change these values to customise the quiz)
const lengthOfGameInSeconds = 30    // sets Game Length used by the Game Timer
const timePenaltyInSeconds = 5      // sets the Time Penalty applied to the Game Timer following an incorrect answer

// module variables
var objQuestion = {}                // object containing the current question and its properties

var userAnswerIndex = 0             // index of user's Answer from the array of ALL Possible Answers for a Question (javacriptQuestions.possibleAnswers)

var askedIndexArray = []            // an array of questionIndex's of asked questions (to prevent the same question being asked)
var allQuestionsAsked = false       // flag for when user has answered all questions

var questionsAnswered = 0           // number of questions the user has answered
var correctAnswers = 0              // number of correct answers by the user

var gameTimerInterval = 0           // used for setting a timer interval for the Game Timer
var gameCounterSeconds = 0          // counter for the Game Timer

var answerAlreadySelected = false   // used to prevent retriggering of Answer buttons 

// add Event Listeners 
btnStart.addEventListener("click", startQuiz)

divChoices.addEventListener("click", function(event) {

    var element = event.target;      // If the clicked element is a button
    if (element.matches("button") === true) {

        // Get the userAnswerIndex from the "clicked" button (stored within the Answer buttons data-index property) 
        userAnswerIndex = element.getAttribute("data-index");
            
        // Check the "user answer" (userAnswerIndex) against the "correct answer" (correctAnswerIndex)
        checkAnswer()

    }
})

btnSubmitHighScore.addEventListener("click", addHighScore)


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

    // Hide the "start-screen" div 
    divStartScreen.setAttribute("class","hide")

    // Display the First Question
    displayNextQuestion()

}


// (2) Check User Answer (triggered by an "answer" button clicked by the user)
function checkAnswer() {

    // Check the users answer and display the next question (or end game)
    // note : the event handler for the "answer" buttons sets userAnswerIndex before calling this function

    var questionAnsweredCorrectly = false

    // Prevent retrigger of Answer buttons
    // note : this prevents the user from quickly clicking on Answer buttons to the same question multiple times
    if (answerAlreadySelected == false){
        // flag that an Answer has now been selected
        answerAlreadySelected = true
    } else {
        // do nothing if an Answer for this question has already been selected and processed
        console.log("button click after original user Answer button click")
        return
    }

    // increment Number of Questions the user has Answered
    questionsAnswered ++    

    // check user's answer against the correct answer and update the Number of Correct Answers
    if (userAnswerIndex == objQuestion.correctAnswerIndex){
        questionAnsweredCorrectly = true
        correctAnswers ++
    }  
    console.log(correctAnswers + " out of " + questionsAnswered) // debugging
    
    // If the answer was incorrect then subtract time from the clock
    if (questionAnsweredCorrectly === false) {
        applyGameTimerPenalty()
    }

    // Display Feedback ("correct" or "wrong" answer)
    if (questionAnsweredCorrectly) {
        divFeedback.textContent = "Correct!"
        audioCorrect.play()
    }
    else {
        divFeedback.textContent = "Wrong Answer! A " + timePenaltyInSeconds + " second time penalty has been applied"
        audioIncorrect.play()
    }

    // Show feedback div
    divFeedback.setAttribute("class","feedback")                
    
    // wait a a second for user to see feedback div 
    setTimeout(function() {                                     
        
        // hide feedback div
        divFeedback.setAttribute("class","feedback hide")    
        
        // Display next question (if any)
        displayNextQuestion()

        // if user has answered all questions then End Quiz
        if (allQuestionsAsked == true){
            // End Quiz
            endQuiz()
        }

        // flag that an answer has NOT been selected (so that the next answer can be taken)
        answerAlreadySelected = false

    }, 1500) // timer set to 1.5 second(s)

}


// (3) End Quiz (called when all questions have been answered or the timer runs out)
function endQuiz() {

    // Stop Game Timer and Clear any currently displayed Question
    stopGameTimer() 
    clearQuestion()

    // Hide the "questions" div
    divQuestions.setAttribute("class","hide")

    // Display "end-screen" div
    divEndScreen.setAttribute("class","show")

    // Display the Final Score 
    spanFinalScore.textContent = correctAnswers + " (out of " + questionsAnswered + " questions answered)"

    // Display Feedback if User Ran Out of Time (Countdown Completed)
    if (gameCounterSeconds < 1) {

        // Show feedback div
        divFeedback.textContent = "Your time is up (the Timer reached zero)"
        divFeedback.setAttribute("class","feedback")                
        
        // wait a a second for user to see feedback div 
        setTimeout(function() {                                     
            
        // hide feedback div
        divFeedback.setAttribute("class","feedback hide")    
            
        }, 4000) // timer set to 4 seconds        
            
    }
    
}


// (4) Save score to High Scores List
function addHighScore(){

    // Get the users initials
    var userInitials = inputEnterInitails.value.trim().toUpperCase() // initials are trimmer and converted to upper case
    if (userInitials == "") {
        alert("Please enter your initials")
        return
    }

    // Create an object for containing This Game's score
    var thisGamesScore = {
        score: correctAnswers,
        outof: questionsAnswered,
        initials: userInitials,
        date: new Date().toLocaleDateString('en-GB')
    };

    // Return the High Scores List array (containing scores from different games) from memory
    var highScoresList = JSON.parse(localStorage.getItem('highScoresList')) || [];

    // Add This Game's score (object) to the High Scores List array
    //highScoresList.push([thisGamesScore])
    highScoresList.push(thisGamesScore)

    // Update the High Scores List array by writing it to memory (as a string) for later recall
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));

    // Navigate to the High Scores Page
    window.location.href = "highscores.html"

}



// Utility functions
// -----------------

// Display Next Question 
function displayNextQuestion(){

    // Clear any currently displayed Question
    clearQuestion()

    // If the timer has expired, do not show the next question
    if (gameCounterSeconds < 1) {return}

    // Get Next Question to Display 
    // - sets the objQuestion object to the next Question to ask user (if there is an unasked question)
    // - sets allQuestionsAsked to true if all questions have already been asked
    getNextQuestion()
    
    // If NOT All Qustions have already been asked
    if (allQuestionsAsked == false){

        // Display new Question

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

// Clear the current Question
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

    gameCounterSeconds = lengthOfGameInSeconds     // initialise counter
      
    gameTimerInterval = setInterval(() => {

        // Decrement timer 
        gameCounterSeconds--

        // Display the number of seconds left 
        if (gameCounterSeconds > 0){
            spanTime.textContent = gameCounterSeconds 
        } else {
            spanTime.textContent = 0 // if gameCounterSeconds has a minus value (due to a time penalty) display a 0
        }
        
        // Check for end of countdown
        if (gameCounterSeconds < 1 ) {
        
            // Timer reached zero - Stop Timer and End Quiz
            console.log("Game Timer reached " + gameCounterSeconds)
            stopGameTimer()      
            endQuiz()
        }

    }, 1000);   // timer runs in second intervals (1000 miliseconds)

}

function stopGameTimer() {
    clearInterval(gameTimerInterval) // stop timer   
}

function applyGameTimerPenalty() {
    
    var counterBeforePenalty = gameCounterSeconds

    // Apply a Time Penalty in seconds (for a wrong answer)
    gameCounterSeconds = gameCounterSeconds - timePenaltyInSeconds  
    
    // Display the number of seconds left
    if (gameCounterSeconds > 0){
        spanTime.textContent = gameCounterSeconds 
    }
    else {
        spanTime.textContent = 0 // if gameCounterSeconds has a minus value (due to a time penalty) display 0
    }

    console.log(timePenaltyInSeconds + " second Penalty applied " + 
        "(from " + counterBeforePenalty + " to " + gameCounterSeconds + " seconds)") // debugging
}

