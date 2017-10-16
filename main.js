var inquirer = require("inquirer");
var Word = require("./word.js");
var wordToGuess = require("./game.js")


var letterGuessed;
var maxGuesses;

function newGame() {
	var newWord = new Word(wordToGuess);
	maxGuesses = 15;
	wordIndex++;
	
	playGame(newWord);
}


function playGame(word){
	if (word.guessedLetters.length >= maxGuesses){
		console.log('You have no more guesses. WOMP WOMP.');
	return; //Game over
}
inquirer.prompt([
	{
	name: 'letter',
	type: 'text',
	message: 'Enter a letter:',
	}
]).then(function(letterInput){ //Game control
		word.searchLetter(letterInput); //Check

		if(word.isWordComplete()){ 
			console.log('Yes! It was ' + word.toString() + '!');
			return; //Winner
		}

		console.log('-------------------\n'); //If we are here the game did not end. Next guess.
		console.log('You have ' + (maxGuesses - word.guessedLetters.length) + ' guesses left.')
		playGame(); //Recursive call
	}
)};
	

newGame(); //Start Game

/* // Keep track of user's remaining guesses
var guessesRemaining = 5;
var wordIndex = 0;
var newWord;

var wordToGuess = function() {
	newWord = new Word(wordChoices[wordIndex]);
	wordIndex++;
	newWord.wordDisplay();
	promptToGuess(newWord.word);
}

var promptToGuess = function(word) {

	inquirer.prompt([
	{
		name: "letterGuessed",
		message: "Guess a letter!"
	}

	]).then(function(response){

		// check that input is a single letter

		// check input against letters in word 

		// if input letter exists in array, replace blank with letter and prompt again
		newWord.letterSearch(response);

		// if input letter does not exist in array, decrease guesses, check remaining guesses
		// if guesses remain, prompt again

		

		// if there are no guesses remaining, end the game and start over with new word
	})
}

wordToGuess();
// If no guesses remain, ask the user if they want to end the game */