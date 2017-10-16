// Used for each letter in the current word

function Letter(letter) {

	this.letter = letter;
	this.showLetter = false;
	
};

Letter.prototype.toDisplay = function() {
	if (this.showLetter) {
		return this.letter;
	} else {
		return "_ ";
	}
}

module.exports = Letter;