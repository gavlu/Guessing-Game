$(document).ready(function() {
	var answer = Math.floor(Math.random()*100);
	$circle = $('#hotCold');
	$result = $('#hotCold > div');
	$guesses = $('#guesses');
	var guessArr = [];
	var guessCount = 5;

	var pushGuess = function (x) {guessArr.push(x); guessCount--;}

	var highOrLow = function () {
		if ($userGuess > answer) {
			$result.append(" Guess Lower");
		} else if ($userGuess < answer) {
			$result.append(" Guess Higher");
		}
	}

	//Check if guess is in the guessArr
	var isDuplicate = function (y) {
		return (guessArr.indexOf(y) != -1);
	}

	//Main answer checking
	var updateAnswer = function() {
		$userGuess = $("input[name=userGuess]").val(); //Get value from input field.
		var p = Math.abs($userGuess - answer); //Use absolute value to see how far away guess is.
		if(isNaN($userGuess)) {
			$result.text("Not a Number");
		}
		else if (isDuplicate($userGuess)) {
			$result.text("Guessed Already");
		}
		else if ($userGuess < 0 || $userGuess > 100) {
			$result.text("Not a valid guess.");
		} 
	    else if ($userGuess) {
	    	pushGuess($userGuess);
			if ($userGuess == answer) {
				$result.text("Congratulations!");
				$circle.css('background-color', '#00c211');
			} else if (p<=5) {
				$result.text("Very Hot.");
				highOrLow();
				$circle.css('background-color', '#ff3a18');
			} else if (p<=10) {
				$result.text("Hot,");
				highOrLow();
				$circle.css('background-color', '#ff5a3d');
			} else if (p<=15) {
				$result.text("Warm,");
				highOrLow();
				$circle.css('background-color', '#ff7e67');
			} else if (p<=25) {
				$result.text("Cold,");
				highOrLow();
				$circle.css('background-color', '#71c2fb');
			} else if (p>25){
				$result.text("Ice Cold,");
				highOrLow();
				$circle.css('background-color', '#3f70ff');
			}
		} else {
			$result.text("Not a Number, Try Again")
		}
	};

	$("#hint").click(function() {
		$result.text("Answer: " + answer);
	})
	
	$("#reset").click(function() {
		answer = Math.floor(Math.random()*100);
		guessArr = [];
		guessCount = 5;
		$result.text("Guess?");
		$circle.css('background-color', 'grey');
	});

	$("#submit").click(function() {
		updateAnswer();
		$guesses.text(guessCount);
		$("input[name=userGuess]").val("");
		$("#guesses").text("Guesses left: " + guessCount);
		$("#guessArray").text("Guesses: " + guessArr);
		if (guessArr.length == 5) {$result.text("Game Over")};
	});

	$("input").keypress(function(e) {
		var key = e.keyCode || e.which;
		if(key == 13) {
			updateAnswer();
		}
	});
});