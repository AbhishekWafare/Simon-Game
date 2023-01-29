var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

var highs;

// detect keypress to start the game

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});

// when user clicks something

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
}); 

// functions

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        console.log("success");
    
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    
    } else {
        console.log("Wrong");
        wronganswer();
        // highs = level-1;
        // alert(highs);
        startOver();
    }
}

function nextSequence(){
    // Generate a random pattern.

    userClickedPattern = [];   

    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

        
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
       
}

function playSound(name){
 
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function wronganswer(){
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    

    $("#level-title").text("Game over,"+ "Your score is: " + (level-1) + "  press any key to restart.");
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}