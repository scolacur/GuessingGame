//GuessingGame.js
$(document).ready(function(){

//Cool but unnecessary animation for the panel
	$(".panel").hide().show("slow");

function newGame(){
	var answer = Math.floor((Math.random() * 100) + 1);
	console.log("Answer: " + answer);

	var guesses = [];
	var guessesLeft = 5;
	var messageBank = [];

	//watch for click on the arrow
	$('form').on('click', 'button', function() {

		//store what's in the text field as current guess
		var curGuess = +$('form').find('input').val();

		//make sure it's a number b/t 0-100
		if ((!isNaN(curGuess)) && (curGuess>=0) && (curGuess<=100)) { 

			console.log("curGuess: " + curGuess);

			//Add guess to array
			guesses.push(curGuess);
			console.log("guesses: " + guesses);

			//Decrease guessesLeft by 1
			guessesLeft--;
			$('#remaining').text("Remaining Guesses: " + guessesLeft);
			console.log("Guesses left: " + guessesLeft);

			//See if they got the answer
			if (curGuess === answer) {
				alert("You win!");
				//Put this in curMessage?
				//Prompt: You Win! play again?
			}
			else { //if user does not guess the right answer

				var curMessage = ""; //This string will store all important info

				if (curGuess < answer) {
					curMessage += "Guess Higher";
				}
				else if (curGuess > answer) {
					curMessage += "Guess Lower";
				};

				if (guessesLeft >= 4) { //if they've only guessed once

				}	
				else if (guessesLeft == 0) { //if they've run out of guesses
					//Prompt or button: Game Over, play again?
				}
				//else, we need to see if they're closer than the previous guess
				else {
					var prevGuess = guesses[guesses.length-2];
					if (Math.abs(answer - prevGuess) > Math.abs(answer - curGuess)) {
						curMessage += "You're getting warmer";
					}
					else {
						curMessage += "You're getting colder";
					};
				};
			

			//Add curMessage to messageBank
			messageBank.push(curMessage);
			//Show messageBank on page
			console.log("messageBank: " + messageBank);
			
			};
		}
		else {
			alert("Please enter a number between 0 and 100.");
		};

		//Reset form
		$('form').find('input').val("");

	});
	//*************Do same when enter is pressed


	//watch for click on "Hint" Button
	$('#hint').on('click', function() {
		alert("Hint: The answer is " + answer);
		//maybe make this a message?
	});
	//watch for click on "Play Again" Button
	$('#playagain').on('click', function() {
		console.log("Play again!");
		//erase all messages
		//reset guess counter
		//newGame();
	});

	//The messageArray will need to bump older messages down
	//Format should be [Guess: x ------ Your getting [warmer/colder]---- Try a [higher/lower] number]
};

newGame();


/*
The user should have an input field where they can submit a guess.

After the user submits a guess, indicate whether their guess is 'hot' 
or 'cold'. Let the user know if they need to guess higher or lower.

Allow the user to guess only a certain amount of times. When they run 
out of guesses let them know the game is over.

Validate inputs that they are real numbers between 1-100.

Create a new game button that resets the game.

Store all of the guesses and create a way to check if the guess is a repeat.

Track the user's previous guess. Let them know if they are getting “hotter” 
or “colder” based on their previous guess.

Create a button that provides the answer (Give me a Hint).

Submit the guess by pressing enter or clicking the submit button.

***After a user guesses a number keep a visual list of Hot and Cold answers 
that the user can see.

***Change the background color, add an image, or do something creative when 
the user guesses the correct answer.

*/
});