var userClickedPattern = [];

var gamePattern = [];
var start = false;
var level = 1;

  $(document).keydown(function()
{
  if (!start)
 {
   $("#level-title").text("level "+ level );
   nextSequence();
   start = true;
 }

});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function()
    {
      nextSequence();
    },1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, press any key to Restart");

    setTimeout(function()
  {
    $("body").removeClass("game-over");
  },200);

    startOver();
  }
}






function nextSequence()
{
  userClickedPattern = [];
  $("#level-title").text("level "+ level );
  level++;

var Random = Math.floor(Math.random() * 4);

var buttonColors = ["red" , "blue" , "green" , "yellow"];

var randomChosenColor = buttonColors[Random];

gamePattern.push(randomChosenColor);

$("#"+ randomChosenColor).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);


}


function playSound(name)
{
  var Sound = new Audio( name + ".mp3")
  Sound.play();
}

$(".btn").on("tap", function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");

  setTimeout(function()
{
  $(".btn").removeClass("pressed")
}, 100);
}

function startOver()
{
  level = 1 ;
  gamePattern = [];
  start = false;
}
