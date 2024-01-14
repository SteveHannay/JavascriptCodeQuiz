/* 
    Javascript for Challenge 06 
    Developer - Steve Hannay 
    First Created - 12th January 2024

    This code handles the storage of Questions and Answers to be used by the quiz
    Logic for the quiz is located in the javascript file logic.js

*/


// Array of Objects containing "Javascript Questions" to ask the user

// notes : 
// "questionIndex" is a unique identifier for each question (index starts at 0)
// "question" is the actual question that the user is to be asked 
// "possibleAnswers" is an array of possible answers for the user to select from
// "correctAnswerIndex" references the correct answer within the possibleAnswers array (index starts at 0)

var javacriptQuestions = [
	{
		questionIndex: 0,
		question: "QUESTION 0?",
		possibleAnswers: ['answer a', 'answer b', 'answer c'],
		correctAnswerIndex: 1
	},
	{
		questionIndex: 1,
		question: "QUESTION 1?",
		possibleAnswers: ['answer a', 'answer b', 'answer c', 'answer d', 'answer e'],
		correctAnswerIndex: 2
	},
	{
		questionIndex: 2,
		question: "QUESTION 2?",
		possibleAnswers: ['answer a', 'answer b', 'answer c', 'answer d'],
		correctAnswerIndex: 2
	}
];




