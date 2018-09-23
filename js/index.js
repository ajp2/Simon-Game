$(document).ready(function() {
	
	let count = 1;
	let currentIt = 0;
	let strict = false;
	let flashArray = ["top-left", "top-right", "bottom-right", "bottom-left"];
	let flashOrder = [];
	let breakInt = 0;

	// Start game if start button is clicked
	$(".start")
	  .unbind("click")
	  .click(function() {
	    // Reset count, currentIt, and flashOrder everytime the start button is clicked
	    count = 1;
	    currentIt = 0;
	    flashOrder = [];

	    // If user passes level 20, they win
	    if (count === 21) {
	      $(".led").text("You Win!");
	    }

	    // When game is started, display the initial level
	    $(".led").text("Level " + count);

	    // Start flash pattern
	    clearInterval(breakInt);
	    startFlash();
  });

	function startFlash() {
	  // Start the pattern by calling the flash function
	  breakInt = setInterval(controlFlash, 1000);
	}

	// Controls the pattern flashing
	function controlFlash() {
	  // If the entire pattern has been displayed, stop the interval and reset currentIt
	  if (currentIt === count) {
	    clearInterval(breakInt);
	    currentIt = 0;
	    checkFlashOrder();
	    return;
	  }

	  if (currentIt < flashOrder.length) {
	    displayFlash(flashOrder[currentIt]);
	  } else {
	    // Create a flash for one of the four buttons, remember the flash by pushing
	    // into array, then increase currentIt by one
	    let randNum = Math.floor(Math.random() * 4);
	    flashOrder.push(randNum);
	    displayFlash(flashOrder[currentIt]);
	  }

	  currentIt += 1;
	}

	// Display flash of the button number that is passed in
	function displayFlash(btnNum) {
	  $("." + flashArray[btnNum]).addClass(flashArray[btnNum] + "-flash");
	  setTimeout(function() {
	    $("." + flashArray[btnNum]).removeClass(flashArray[btnNum] + "-flash");
	  }, 500);
	}

	function checkFlashOrder() {
	  // One of the four buttons are clicked
	  $(".box")
	    .unbind("click")
	    .click(function(e) {
	      let clickedBtn = e.target.classList[1];

	      // Display the flash, and if the correct button was clicked, move on to
	      // the next one
	      displayFlash(flashArray.indexOf(clickedBtn));
	      if (clickedBtn === flashArray[flashOrder[currentIt]]) {
	        currentIt += 1;

	        // Otherwise, display the error message, and restart the same level
	        // If in strict mode, restart the game
	      } else {
	        currentIt = 0;
	        $(".led").text("Incorrect!");
	        setTimeout(function() {
	        	if (strict) {
	      			count = 1;
	      			flashOrder = [];
	      		}
	          $(".led").text("Level " + count);
	        }, 900);
	        clearInterval(breakInt);
	        setTimeout(startFlash, 1000);
	      }

	      if (currentIt === flashOrder.length) {
	        count += 1;
	        currentIt = 0;
	        setTimeout(() => $(".led").text("Level " + count), 600);
	        startFlash();
	      }
    });
	}

	$(".strict").on("click", function() {
		strict = !strict;
		let strictText = strict ? "Easy" : "Strict";
		$(".lb2").text(strictText);
	})

})

