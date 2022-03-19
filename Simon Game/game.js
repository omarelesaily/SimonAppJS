var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function nextSequence() {
    userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  animatePress(userChosenColour);
  var clicked_index=userClickedPattern.length-1;
  checkAnswer(clicked_index);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  $(document).ready(function () {
  audio.play();
  });
}
function animatePress(currentColuor) {
  $("#" + currentColuor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColuor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
