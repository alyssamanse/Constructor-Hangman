// Add option to restart game
// Change color for correct and incorrect
	// red: "\x1b[30m%s\x1b[0m", "string"
	// green: "\x1b[32m%s\x1b[0m", "string"
	// or npm install colors w/ .color-name after string
// Push to github

var Word = require("./word.js");
var Letter = require("./letter.js");
var inquirer = require("inquirer");

// Word bank with index to choose random word from list
var wordChoices = ["CHARDONNAY", "RIESLING", "MERLOT", "CABERNET", "ZINFANDEL", "MALBEC", "SHIRAZ", "MOSCATO", "ROSE", "PROSECCO", "CHAMPAGNE", "TEMPRANILLO"];
var wordIndex = Math.floor(Math.random() * wordChoices.length);

var newWord = new Word(wordChoices[wordIndex]);
var maxGuesses = 5;

function playHangman(){

	// Displays word to guess as a string of blanks and letters
	console.log(newWord.toDisplay() + "\n");

	// Game ends (loss) if no more guesses remain
	if (newWord.incorrectGuess >= maxGuesses){
		console.log("Sorry, no more guesses left!");

		// inquirer.prompt

		return; 
	}

	// Prompt to guess letter
	inquirer.prompt([
		{
			name: "letter",
			type: "input",
			message: "Guess a letter! ",
			validate: function validateGuess(letter){
	        	if (letter.length > 1) {
	        		console.log("\nEnter just one letter please.");
	        		return;
	        	} else if (!letter.match(/^[a-zA-Z]*$/)) {
	        		console.log("\nThat's not a letter! Try again..");
	        		return;
	        	} else {
	        		return true;
	        	}
			}
		}
	]).then(function(letterInput){ 

		// Changes input to capital letter
		var letter = letterInput.letter.toUpperCase(); 

		// Check for input letter in word and change display
		newWord.searchLetter(letter);
		newWord.toDisplay();

		// If the entire word is completed and guesses remain, game ends  (win)
		if(newWord.isWordComplete()){ 
			console.log("You got it! The word was '" + newWord.toDisplay() + "'.\n");
			return;
		}

		// If the word is not completed and guesses remain, prompt to guess again
		console.log("\n-----------------\n");
		console.log("You have " + (maxGuesses - newWord.incorrectGuess) + " guesses remaining\n");
		playHangman();

		}
  );
}

playHangman();