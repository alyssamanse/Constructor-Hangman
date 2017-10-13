var inquirer = require("inquirer");
var Word = require("./word.js");
var Letter = require("./letter.js");

var wordChoices = ["CHARDONNAY", "RIESLING", "MERLOT", "CABERNET", "ZINFANDEL", "MALBEC", "SHIRAZ", "MOSCATO", "ROSE", "PROSECCO", "CHAMPAGNE", "TEMPRANILLO"];

// Keep track of user's remaining guesses
var guessesRemaining = 5;
var wordIndex = 0;

var wordToGuess = function() {
	var newWord = new Word(wordChoices[wordIndex]);
	wordIndex++;
	newWord.showBlanks();
	promptToGuess();
}

var promptToGuess = function() {

	inquirer.prompt([
	{
		name: "letterGuessed",
		message: "Guess a letter!"
	}

	]).then(function(response){


		// check that input is a single letter

		// check input against letters in word (array)

		// if input letter exists in array, replace blank with letter
		// response.correctGuess();

		// if input letter does not exist in array, decrease guesses
		// response.incorrectGuess();
		guessesRemaining--;
		console.log(guessesRemaining);

		// if there are no guesses remaining, end the game
		// if there are guesses left, prompt for another letter
		if (guessesRemaining === 0) {
			inquirer.prompt([
			{
				type: "confirm",
				name: "endGame",
				message: "Do you want to end the game?"
			}
			]).then(function(response){
				if (response.endGame) {
						// Show answer
				}
			})
		} else {
			promptToGuess();
		}
	})
}

wordToGuess();
// If no guesses remain, ask the user if they want to end the game