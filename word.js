
// Current word that user is trying to guess
module.exports = function Word(word) {
	this.word = word;
	this.blankSpaceCount = word.length;
	console.log("Word: " + this.word); 
	console.log("Blank Space Count: " + this.blankSpaceCount);

	this.splitWord = function() {
		console.log(this.word.split(""));

	}
	this.showBlanks = function() {
		// replace letters with blanks
	}
	this.correctGuess = function() {
		console.log("CORRECT");
	};
	this.incorrectGuess = function() {
		console.log("INCORRECT");
	};
};