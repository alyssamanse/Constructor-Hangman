var wordChoices = ["CHARDONNAY", "RIESLING", "MERLOT", "CABERNET", "ZINFANDEL", "MALBEC", "SHIRAZ", "MOSCATO", "ROSE", "PROSECCO", "CHAMPAGNE", "TEMPRANILLO"];
var wordIndex = Math.floor(Math.random() * wordChoices.length);
var wordToGuess = wordChoices[wordIndex];

module.exports.wordToGuess = wordToGuess;