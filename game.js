let gamePattern= [];
const buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

//variable to keep track of whether the game has started or not.
var gameStarted = false;

//keep track of levels
var gameLevel = 0;

//detect keypress to see if game has started.
$(document).keypress(function() {
  if (!gameStarted) {

    //update title for each level
    $("#level-title").text("Level " + gameLevel);
    nextSequence();
    gameStarted = true;
  }
});

//see if any of the buttons are clicked.
$(".btn").click(function() {

  //store the id of the button clicked.
  var userChosenColour = $(this).attr("id");

  //store the id's of buttons clicked by user.
  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    //
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      },200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
}
function nextSequence() {
  userClickedPattern = [];

  gameLevel++;
  //console.log(gameLevel);
  $("#level-title").text("Level " + gameLevel);
  let randomNumber = Math.floor(Math.random() * 4);
  //return randomNumber
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Animate the chosen button color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Play the sound of the selected color
  playSound(randomChosenColor);
}

//function to play the sound corresponding to the button pressed.
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to animate button press.
function animatePress(currentColor) {

  //change button background by utilizing pressed class from styles.css
  $("#" + currentColor).addClass("pressed");

  // use timeout to remove pressed class after 100ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  gameLevel = 0;
  gameStarted = false;
  gamePattern = [];
}
