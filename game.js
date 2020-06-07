
//Keep track of the Level
var level = 0;

//Trigger the keypress function only once
var started = false;

//Storage arrays
userClickedPattern = [];
gamePattern = [];
buttonColors = ["red", "blue", "green", "yellow"]


//When any of the buttons is pressed
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

//What will next sequence be?
function nextSequence() {


  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 3) + 1;
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);


}


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart!");
      startOver();

  }
}

//Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = 0;
}
