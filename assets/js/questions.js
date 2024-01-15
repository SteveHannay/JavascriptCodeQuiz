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

// Questions are based on questions taken from https://www.interviewbit.com/javascript-mcq/

var javacriptQuestions = [
	{
		questionIndex: 0,
		question: "Javascript is an _______ language?",
		possibleAnswers: ['Object-Orientated', 'Object-Based', 'Procedural', 'None of the above'],
		correctAnswerIndex: 0
	},
	{
		questionIndex: 1,
		question: "Which of the following keywords is used to define a variable in Javascript?",
		possibleAnswers: ['var', 'let', 'Both of the above', 'None of the above'],
		correctAnswerIndex: 2
	},
	{
		questionIndex: 2,
		question: "Which of the following methods is used to access HTML elements using Javascript?",
		possibleAnswers: ['getElementById', 'getElementByClassName', 'Both of the above', 'None of the above'],
		correctAnswerIndex: 2
	},
	{
		questionIndex: 3,
		question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
		possibleAnswers: ['Throws an Error', 'Ignores the statements', 'Gives a warning', 'None of the above'],
		correctAnswerIndex: 1
	},
	{
		questionIndex: 4,
		question: "Which of the following methods can be used to display data in some form using Javascript?",
		possibleAnswers: ['document.write()', 'console.log()', 'window.alert()', 'All of the above'],
		correctAnswerIndex: 3
	}
];




