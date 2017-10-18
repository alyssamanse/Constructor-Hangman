// require letter.js to bring into method for Word constructor
var Letter = require("./letter.js");

function Word(word) {
	this.word = word;
	this.letters = [];
	this.guessedLetters = [];
	this.incorrectGuess = 0;

	for (var i = 0; i < this.word.length; i++) {
		this.letters.push(new Letter(this.word[i]));
	}
}

// Checks to see if the entire word has been guessed correctly
Word.prototype.isWordComplete = function() {

	for (var i = 0; i < this.letters.length; i++) {
		if (!this.letters[i].showLetter) {
			return false;
		}
	}

	return true;
}

// Checks the letters array for a match and records the guess
Word.prototype.searchLetter = function(letter) {
	if (this.guessedLetters.indexOf(letter) > -1) {
		console.log("\nYou've already guessed '" + letter + "'!")
		return;
	}

	// Records guess
	this.guessedLetters.push(letter);

	// If letter is guessed correctly, change showLetter to true to render letter
	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].letter === letter) {
			this.letters[i].showLetter = true;

			// this is running
			console.log("\x1b[32m%s\x1b[0m", "Correct!");
		}
	}

	// Checks if the guessed letter is in the word and if not, records the incorrect guess
	if (this.word.indexOf(letter) > -1) {
		var letterIndex = this.word.indexOf(letter);
		if (!this.letters[letterIndex].showLetter) {
			return;
		}
	} else {
		this.incorrectGuess++;

		// this is running
		console.log("console log before incorrect color string is running..");
		// this is NOT running
		console.log("\x1b[30m%s\x1b[0m", "Incorrect..");
		return;
	}
}

// Checks showLetter variable to render either letter or blank space
Word.prototype.toDisplay = function() {
	var string = "";
	for (var i = 0; i < this.letters.length; i++) {
		string += this.letters[i].render();
	}
	return string;
}

module.exports = Word;