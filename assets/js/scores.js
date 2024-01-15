/* 
    Javascript for Challenge 06 
    Developer - Steve Hannay 
    First Created - 12th January 2024

    This code handles the logic for highscores.html
    Logic for the quiz is located in the javascript file logic.js

*/


// Define Variables and Event Handlers
var olHighScores = document.querySelector("#highscores")
var btnClearHighScores = document.querySelector("#clear")

btnClearHighScores.addEventListener("click", clearHighScoresList)


// Run Initial function
init()
function init(){

    // Populate the html ordered list of High Scores with data from the High Scores List stored in local storage

    // notes :
    // The High Scores List stored in local storage (as a string) is converted into an Array of Objects (highScoresList) 

    var strDisplayText = ""

    // Return the High Scores List array (containing scores from different games) from memory
    var highScoresList = JSON.parse(localStorage.getItem('highScoresList')) || []

    // Sort the array of objects
    sortedArray = highScoresList.sort((a, b) => {
        return a.score - b.score    // sort by score (ascending order)
    })
    sortedArray.reverse() // reverse the order so that highest scores appear at the top 

    // Clear any existing list elements in the html ordered list 
    olHighScores.innerHTML = ""

    // Add individual Scores from High Scores List to the html ordered list element
    sortedArray.forEach(function (gameScore) {

        // build a string to display in the list
        strDisplayText = "Score : " + gameScore.score + " out of " + gameScore.outof + 
            ",  Initials : " + gameScore.initials + ",  Date : " + gameScore.date

        // add line html element to the ordered list
        var li = document.createElement("li")
        li.textContent = strDisplayText
        olHighScores.appendChild(li)

        console.log(strDisplayText)
    })

}


// Clear the High Scores List from local storage, then refresh this webpage (triggered by "Clear Highscores" button click event)
function clearHighScoresList() {
    var emptyArray = []
    localStorage.setItem("highScoresList", JSON.stringify(emptyArray));
    olHighScores.innerHTML = ""
}



