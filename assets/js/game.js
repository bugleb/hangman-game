var game = {
	terms: [
		'assist', 'body checking', 'cage', 'drop the gloves', 'empty net goal', 'faceoff', 'goaltender',
		'high stick', 'icing', 'line change', 'minor penalty', 'netminder', 'one-timer', 'penalty shot',
		'roughing', 'slapshot', 'top shelf', 'wrist shot', 'zamboni'
	],
	currenTerm: '',
	hiddenTerm: '',
	getNewTerm: function() {
		this.currentTerm = this.terms[Math.floor(Math.random() * this.terms.length)].toUpperCase();
		this.createHiddenTerm();
		return this.currentTerm;
	},
	createHiddenTerm: function() {
		this.hiddenTerm = this.currentTerm.replace(/[A-Z]/g, '_');
		document.getElementById('current-word').innerHTML = this.hiddenTerm;
	},
	updateHiddenTerm: function(char) {
		// TODO: make this better
		for (var i = 0; i < this.currentTerm.length; i++) {
			if (this.currentTerm[i] === char) {
				// Strings are immutable, build new temp string then swap
				// at the end
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
			this.updateHiddenTerm(char);
			return true;
		} else {
			return false;
		}
	},
	newGame: function() {
		console.debug('beginning new game');
		this.badGuesses = 0;
		this.guessedChars = [];
		this.getNewTerm();
	},
	win: function() {
		document.getElementById('wins').innerHTML = ++this.score.wins;
	},
	lose: function() {
		document.getElementById('losses').innerHTML = ++this.score.losses;
	},
	maxBadGuesses: 6,
	badGuesses: 0,
	guessedChars: [],
	score: {
		wins: 0,
		losses: 0,
	},
}

game.newGame();

document.onkeyup = function(e) {
	var gameOver = false;

	if (game.guessedChars.indexOf(e.key) === -1) {
		if (game.guess(e.key)) {
			console.log('good guess');
			document.getElementById('current-word').innerHTML = game.hiddenTerm;

			if (game.hiddenTerm === game.currentTerm) {
				game.win();
				gameOver = true;
			}
		} else {
			console.log('bad guess');
			if (++game.badGuesses === game.maxBadGuesses) {
				console.debug('game over');
				game.lose();
				gameOver = true;
			}
		}
	} else {
		console.log('already guessed: ', e.key);
	}

	game.guessedChars.push(e.key);
	console.log(game.guessedChars);

	if (gameOver) {
		game.newGame();
	}
}