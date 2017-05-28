var game = {
	terms: [
		'assist', 'body checking', 'cage', 'drop the gloves', 'empty net goal', 'faceoff', 'goaltender',
		'high stick', 'icing', 'line change', 'minor penalty', 'netminder', 'one-timer', 'penalty shot',
		'roughing', 'slapshot', 'top shelf', 'wrist shot', 'zamboni'
	],
	currenTerm:'',
	hiddenTerm: '',
	getNewTerm: function() {
		this.currentTerm = this.terms[Math.floor(Math.random() * this.terms.length)].toUpperCase();
		this.createHiddenTerm();
		return this.currentTerm;
	},
	createHiddenTerm: function() {
		// this.hiddenTerm = this.currentTerm.replace(/\s/g, '    ');
		this.hiddenTerm = this.currentTerm.replace(/[A-Z]/g, '_');
	},
	updateHiddenTerm: function(char) {
		// TODO: make this better
		for (var i = 0; i < this.currentTerm.length; i++) {
			if (this.currentTerm[i] === char) {
				var tempTerm = '';

				for (var j = 0; j < this.hiddenTerm.length; j++) {
					if (j === i) {
						tempTerm += char;
					} else {
						tempTerm += this.hiddenTerm[j];
					}
				}

				this.hiddenTerm = tempTerm;
			}
		}
	},
	guess: function(guessedChar) {
		const char = guessedChar.toUpperCase();
		if (this.currentTerm.indexOf(char) !== -1 && char !== ' ' && char !== '-' ) {
			this.guessedChars.correct.push(char);
			this.updateHiddenTerm(char);
			return true;
		} else {
			this.guessedChars.incorrect.push(char);
			return false;
		}
	},
	guessedChars: {
		correct: [],
		incorrect: [],
	},
	score: {
		wins: 0,
		losses: 0,
	},
}

game.getNewTerm().toUpperCase();

document.getElementById('current-word').innerHTML = game.hiddenTerm;

document.onkeyup = function(e) {
	if (game.guess(e.key)) {
		console.log('good guess');
		document.getElementById('current-word').innerHTML = game.hiddenTerm;
	} else {
		console.log('bad guess');
	}
}