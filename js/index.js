$(document).ready(function() {
  let count = 1;
  let currentIt = 0;
  let strict = false;
  let start = false;
  let flashArray = ["top-left", "top-right", "bottom-right", "bottom-left"];
  let sounds = ["sound1", "sound2", "sound3", "sound4"];
  let flashOrder = [];
  let breakInt = 0;

  // Start game if start button is clicked
  $(".start")
    .unbind("click")
    .click(function() {
      start = !start;
      if (start) {
        $(".lb1").text("Stop");
      } else {
        reset();
        clearInterval(breakInt);
        $(".lb1").text("Start");
        return;
      }

      // Reset count, currentIt, and flashOrder everytime the start button is clicked
      reset();

      // Start flash pattern
      clearInterval(breakInt);
      startFlash();
    });

  function reset() {
    count = 1;
    currentIt = 0;
    flashOrder = [];
    $(".led").text("Level " + count);
  }

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

    // Display all the flashes from previous levels
    else if (currentIt < flashOrder.length) {
      displayFlash(flashOrder[currentIt]);
    }

    // Add an additional flash for the current level. Create a flash for one of the four buttons,
    // remember the flash by pushing into array, then increase currentIt by one
    else {
      let randNum = Math.floor(Math.random() * 4);
      flashOrder.push(randNum);
      displayFlash(flashOrder[currentIt]);
    }

    currentIt += 1;
  }

  // Display flash and play sound of the button number that is passed in
  function displayFlash(btnNum) {
    var audio = document.querySelector("#" + sounds[btnNum]);
    audio.play();

    $("." + flashArray[btnNum]).addClass(flashArray[btnNum] + "-flash");
    setTimeout(function() {
      $("." + flashArray[btnNum]).removeClass(flashArray[btnNum] + "-flash");
    }, 500);
  }

  // Check whether the buttons are clicked in the correct order
  function checkFlashOrder() {
    $(".box")
      .unbind("click")
      .click(function(e) {
        let clickedBtn = e.target.classList[1];

        // Play sound
        var audio = document.querySelector(
          "#" + sounds[flashArray.indexOf(clickedBtn)]
        );
        audio.play();

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
              reset();
            } else {
              $(".led").text("Level" + count);
            }
          }, 900);
          clearInterval(breakInt);
          setTimeout(startFlash, 1000);
        }

        // If entire pattern was entered correctly, move on to next level
        if (currentIt === flashOrder.length) {
          count += 1;

          // If user passes level 20, display win message and reset the game
          if (count === 21) {
            $(".led").text("You Win!");
            setTimeout(reset, 1500);
          }

          currentIt = 0;
          setTimeout(() => $(".led").text("Level " + count), 600);
          startFlash();
        }
      });
  }

  // Change strict mode button label
  $(".strict").on("click", function() {
    strict = !strict;
    let strictText = strict ? "Easy" : "Strict";
    $(".lb2").text(strictText);
  });
});
