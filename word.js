// require letter.js to bring into method for Word constructor
var Letter = require("./letter.js");

// Current word that user is trying to guess
/* function Word(word) {
	var self = this;
	self.word = word;
	self.letters = [];
	self.length = self.word.length;
	self.guessedLetters = [];

	for (var i = 0; i < self.length; i++) {
		self.letters.push(new Letter(self.word[i]).letter);
	}
};

Word.prototype.wordGuessed = function() {
	for (var i = 0; i < this.letters.length; i++) {
		if (!this.letters[i].showLetter) {
			return false;
		} else {
			return true;
		}
	}
}

Word.prototype.letterSearch = function(letter) {

	for (var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].letter.indexOf(letter) > -1) {
			return console.log("You've already guessed " + letter + "! Try again.");
		}
	}
}

Word.prototype.wordDisplay = function() {
	var displayWord;
	for (var i = 0; i < this.letters.length; i++) {
		console.log(this.letters[i]);
		displayWord += this.letters[i].toDisplay();
	}
	console.log("Display: " + displayWord);
} */

function Word(word) {
	this.word = word;
	this.letters = [];
	this.guessedLetters = "";

	for (var i =0; i < this.word.length; i++) {
		this.letters.push(new Letter(this.word[i]));
	}
}

Word.prototype.isWordComplete = function() {
	for (var i = 0; i < this.letters.length; i++) {
		if (!this.letters[i].showLetter) {
			return false;
		}
		return true;
	}
}

Word.prototype.searchLetter = function(letter) {
	if(this.guessedLetters.indexOf(letter) > -1) {
		return console.log("Duplicate letter")
	}

	this.guessedLetters += letter;

	for(var i = 0; i < this.letters.length; i++) {
		if (this.letters[i].letter === letter) {
			this.letters[i].show = true;
		}
	}
}

Word.prototype.toString = function() {
	var output = "";
	for (var i = 0; i < this.letters.length; i++) {
		output += this.letters[i].toDisplay();
	}
	return output;
}

module.exports = Word;