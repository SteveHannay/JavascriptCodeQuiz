/* 
    Javascript for Challenge 06 
    Developer - Steve Hannay 
    First Created - 12th January 2024

    This code handles logic for the quiz
    Questions and Answers for the quiz are located in the javascript file questions.js

    

*/

// alert(javacriptQuestions[1].question)


// Define Variables

// create references to html elements (using element id's)
var divQuestions = document.querySelector("#questions")
var divQuestionTitle = document.querySelector("#question-title");
var divChoices = document.querySelector("#choices");

var btnStart = document.querySelector("#start");
var btnSubmit = document.querySelector("#submit");

// module variables
var questionIndex = 0


// Add Event Listeners f
btnStart.addEventListener("click", startQuiz)



// Start Quiz (triggered by "Start" button)
function startQuiz() {



    // reset variables and screen
    

    // Start Game Timer
    runGameTimer()

    // Hide Start Button and Display First Question
    displayNextQuestion()

    alert("END")
}



// Check User Answer (triggered by button click)
function checkAnswer() {
    // get user answer from button that was clicked
    // compare user answer with correct answer
    // update scores
    
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

    
// Utility functions :

// Display Next Question 
function displayNextQuestion(){

    // Clear any existing Question
    clearQuestion()

    // Get Next Questions to Display ----> this can later be randomised
    questionIndex = 1
    
    // Display Question Title
    divQuestionTitle.textContent = javacriptQuestions[questionIndex].question

    // Display Buttons for ALL possible Answers
    var possibleAnswers = javacriptQuestions[questionIndex].possibleAnswers  // get an array of all possible answers

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

// Clear Question
function clearQuestion() {
    divQuestionTitle.textContent = ""   // clear text from the "question title" div
    divChoices.innerHTML = ""           // remove buttons from the "choices" div
}

// Game Timer     
function runGameTimer(){
    // Countdown to zero from 
    // End Quiz is timer reaches zero
}


