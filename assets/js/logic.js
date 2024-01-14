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
var divQuestions = document.querySelector("#questions")
var divQuestionTitle = document.querySelector("#question-title");
var divChoices = document.querySelector("#choices");

var btnStart = document.querySelector("#start");
var btnSubmit = document.querySelector("#submit");

// module variables
var objQuestion = {}            // object containing the current question and its properties

var userAnswerIndex = 0         // index of user's Answer from the array of ALL Possible Answers for a Question (javacriptQuestions.possibleAnswers)

var askedIndexArray = []        // an array of questionIndex's of asked questions (to prevent the same question being asked)
var allQuestionsAsked = false   // flag for when user has answered all questions

var questionsAnswered = 0       // number of questions the user has answered
var correctAnswers = 0          // number of correct answers by the user


// Add Event Listeners 
btnStart.addEventListener("click", startQuiz)

divChoices.addEventListener("click", function(event) {
    
    // If the clicked element is a button
    var element = event.target;
    if (element.matches("button") === true) {

        // Get the userAnswerIndex from the "clicked" button (stored within the buttons data-index property) 
        userAnswerIndex = element.getAttribute("data-index");

        // Check the "user selected answer" (userAnswerIndex) against the "correct answer" (correctAnswerIndex)
        checkAnswer()
    }

})



// MAIN Logic
// ----------

// Start Quiz (triggered by "Start" button)
function startQuiz() {

    // reset variables and screen

    // Start Game Timer
    runGameTimer()

    // Hide Start Button and Display First Question
    displayNextQuestion()

}



// Check User Answer (triggered by a "answer" button clicked by the user)
function checkAnswer() {

    alert("CHECK ANSWER : user selected = " + userAnswerIndex + ", correct answer = " + correctAnswerIndex)

    // Check the "user selected answer" (userAnswerIndex) against the "correct answer" (correctAnswerIndex)

    // update game stats
    questionsAnswered ++

    if (userAnswerIndex == objQuestion.correctAnswerIndex){correctAnswers ++}
    
    console.log(correctAnswers + " out of " + questionsAnswered)
    
    // if user has answered all questions then
        // End Quiz
        // endQuiz()
    
    // if timer still running then 
        // display next question
        // displayNextQuestion()
    // else 
        //  End Quiz()
        // endQuiz

}


// End Quiz
function endQuiz() {

    // Clear Question Buttons
    // display score and give the user the ability to save their initials and their score

}

    
// Utility functions
// -----------------

// Display Next Question 
function displayNextQuestion(){

    // Clear any existing Question
    clearQuestion()

    // Get Next Questions to Display (sets the objQuestion object)
    getNextQuestion()
    
    // If All Qustions have already been asked
    if (allQuestionsAsked){

        alert("displayNextQuestion() - ALL QUESTIONS ANSWERED")
    }


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

    // Set Visibility of the "questions" div
    divQuestions.setAttribute("class","show")

}

// Get Next Question
function getNextQuestion(){

    // Randomly selects a question and sets the objQuestion object to hold the question
    // Sets allQuestionsAsked to true if all questions have been asked

    var nextQuestionFound = false 

    // set flag if all questions have already been asked
    if (askedIndexArray.length == javacriptQuestions.length){
        allQuestionsAsked = true
        alert("askedIndexArray.length = javacriptQuestions.length")
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

    // returns a boolean
    return nextQuestionFound
}

// Clear Question
function clearQuestion() {
    // reset variables used for managing a question
    questionIndex = 0
    correctAnswerIndex = 0
    userAnswerIndex = 0
    
    // reset screen
    divQuestionTitle.textContent = ""   // clear text from the "question title" div
    divChoices.innerHTML = ""           // remove buttons from the "choices" div
}

// Game Timer     
function runGameTimer(){
    // Countdown to zero from 
    // End Quiz is timer reaches zero
}


