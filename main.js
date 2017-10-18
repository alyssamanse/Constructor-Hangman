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
		console.log("\x1b[31m%s\x1b[0m", "Sorry, no more guesses left!");

		// Player can end the game or they get another set of guesses and another try at the word
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "Do you want to end the game?"
			}
		]).then(function(response) {

			if (response.confirm) {
				console.log("Thanks for playing! Better luck next time...");
				return;
			} else {
				console.log("\nWant to try again, eh? Alright, here you go!");
				newWord.incorrectGuess = 0;
				playHangman();
			} 
		})

		return; 
	}

	// Prompt to guess letter with input validation
	inquirer.prompt([
		{
			name: "letter",
			type: "input",
			message: "Guess a letter! ",
			validate: function validateGuess(letter){
	        	if (letter.length > 1) {
	        		console.log("\n\x1b[31m%s\x1b[0m", "Enter just one letter..\n");
	        		return;
	        	} else if (!letter.match(/^[a-zA-Z]*$/)) {
	        		console.log("\n\x1b[31m%s\x1b[0m", "That's not a letter! Try again..\n");
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
			console.log("\n-----------------------------")
			console.log("\n\x1b[32m%s\x1b[0m", "You got it! The word was '" + newWord.toDisplay() + "'. Let's play again!\n");

			wordIndex = Math.floor(Math.random() * wordChoices.length);
			nextWord = new Word(wordChoices[wordIndex]);
			newWord = nextWord;
		}

		// If the word is not completed and guesses remain, prompt to guess again
		console.log("You have " + (maxGuesses - newWord.incorrectGuess) + " guesses remaining\n");
		playHangman();

		}
  );
}

// Starts game
playHangman();