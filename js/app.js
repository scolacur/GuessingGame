//GuessingGame.js
$(document).ready(function(){

//Cool but unnecessary animation for the panel
	$(".panel").hide().show("slow");

function newGame(){
	var answer = Math.floor((Math.random() * 100) + 1);
	console.log("answer: " + answer);
	var guesses = [];
	var guessesLeft = 5;
	var hintToggle = 1;
	var playing = true;
	var curGuess = 0;
	var curMessage = "";

	//Reset guesses left to 5.
	$('#remaining').text("Remaining Guesses: " + guessesLeft);

	//watch for click on the arrow
	$('form').on('click', 'button', function() {

		//Prevent page from reloading on button click
		event.preventDefault();

		if (playing) {

			//Store what's in the text field as current guess
			curGuess = +$('form').find('input').val();

			//make sure it's a number b/t 0-100
			if ((!isNaN(curGuess)) && (curGuess>=0) && (curGuess<=100)) { 

				//Add guess to array
				guesses.push(curGuess);
				console.log(guesses);

				//Decrease guessesLeft by 1
				if (playing) {
					guessesLeft--;
					$('#remaining').text("Remaining Guesses: " + guessesLeft);
				};			

				//See if they got the answer
				if (curGuess === answer) {
					curMessage = "You guessed the number! Great Job!";
					playing = false;
					setInterval(function(){
						$("#divToBlink").toggleClass("backgroundGreen");
					},500)
				}
				else { //if user does not guess the right answer

					curMessage = "You Guessed " + curGuess + ". ";
					var curDiff = Math.abs(answer - curGuess);

					if (curDiff < 5) { //they're very close
						curMessage+= "You're super hot fire! "

						if (curGuess < answer) {
							curMessage += "Guess a little bit higher. ";
						}
						else if (curGuess > answer) {
							curMessage += "Guess a little bit lower. ";
						};
					}
					else {

						if (guessesLeft < 4) { 
							var prevGuess = guesses[guesses.length-2];
							var prevDiff = Math.abs(answer - prevGuess);

							//if they're not within 5 but they're closer than the last guess
							if (prevDiff >= curDiff && prevGuess !=curGuess) {
								curMessage += "You're getting warmer! ";
							}
							else { //if they're farther than before
								curMessage += "You're getting colder! ";
							};
						}

						if (curGuess < answer) {
							curMessage += "Guess Higher. ";
						}
						else if (curGuess > answer) {
							curMessage += "Guess Lower. ";
						};
					}
					
					//check if they've guessed that number before
					for (var i=0; i<guesses.length-1; i++) {
						if (curGuess == guesses[i]) {
							console.log("jawn");
							curMessage = "You already guessed that number, silly! ";
						}
					}

					if (guessesLeft == 0) { //if they've run out of guesses
						curMessage = "Oh no, you've run out of guesses! Click the button to play again!";
						playing=false;
					}
				};



				//Make a new <li> with the current message in it
				var finalMessage = $('<li>' + curMessage + '</li>');
				finalMessage.prependTo($('#messagebank'));
			}
			else {
				alert("Please enter a number between 0 and 100.");
			};

			//Reset form
			$('form').find('input').val("");

		}; //end of if-playing loop

	});

		
		//watch for click on "Hint" Button
		$('#hint').on('click', function() {

			event.preventDefault();
			//toggle showing the answer and the hint
			if (hintToggle==1) {
				$(this).text("It's " + answer + ". Shhhh..");
				hintToggle=0;
			}
			else if (hintToggle==0) {
				$(this).text("Give Me A Hint");
				hintToggle=1;
			};

		});

		//watch for click on "Play Again" Button
		$('#playagain').on('click', function() {
			location.reload(); 
			//reloading the page is much simpler than resetting 
			//all the variables or calling a new instance of newGame()
		});


};

newGame();

});