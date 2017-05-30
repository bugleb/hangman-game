var game = {
	terms: [
		'assist', 'body checking', 'cage', 'drop the gloves', 'empty net goal', 'faceoff', 'goaltender',
		'high stick', 'icing', 'line change', 'minor penalty', 'netminder', 'one-timer', 'penalty shot',
		'roughing', 'slapshot', 'top shelf', 'wrist shot', 'zamboni'
	],
	letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
	bodyParts: ['head', 'body', 'right-arm', 'left-arm', 'right-leg', 'left-leg'],
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
		document.getElementById(char).style.opacity = 0.2;
		if (this.currentTerm.indexOf(char) !== -1 && char !== ' ' && char !== '-' ) {
			this.updateHiddenTerm(char);
			return true;
		} else {
			return false;
		}
	},
	printLetters: function() {
		// Clear child nodes from 'letters'
		const lettersElement = document.getElementById('letters');
		while (lettersElement.firstChild) {
			lettersElement.removeChild(lettersElement.firstChild);
		}

		for (var i = 0; i < this.letters.length; i++) {
			const letter = document.createElement('span');
			letter.id = this.letters[i];
			letter.innerHTML = this.letters[i];
			lettersElement.appendChild(letter);
		}
	},
	newGame: function() {
		console.debug('beginning new game');
		this.badGuesses = 0;
		this.guessedChars = [];
		this.getNewTerm();
		this.printLetters();

		for (var i = 0; i < this.bodyParts.length; i++) {
			document.getElementById(this.bodyParts[i]).style.opacity = 0.0;
		}
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
	if (game.letters.indexOf(e.key.toUpperCase()) !== -1) {
		var gameOver = false;

		if (game.guessedChars.indexOf(e.key) === -1) {
			if (game.guess(e.key)) {
				document.getElementById('current-word').innerHTML = game.hiddenTerm;

				if (game.hiddenTerm === game.currentTerm) {
					game.win();
					gameOver = true;
				}
			} else {
				document.getElementById(game.bodyParts[game.badGuesses++]).style.opacity = 1.0;
				if (game.badGuesses === game.maxBadGuesses) {
					console.debug('game over');
					game.lose();
					gameOver = true;
				}
			}
		} else {
			console.debug('already guessed: ', e.key);
		}

		game.guessedChars.push(e.key);

		if (gameOver) {
			game.newGame();
		}
	}
}