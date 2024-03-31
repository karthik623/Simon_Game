
var buttonColours=["red","blue","green","yellow"]
var gamePattern=[]
var userClickedPattern=[]
var level=0
var started=false

$(document).on('keypress',function() {
    if(!started)
    {
        $("#level-title").text("Level " +level)
        nextSequence();
        started=true
    }
})


function nextSequence(){
    userClickedPattern=[]

    level++
    $("#level-title").text("Level " +level)
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeIn('100').fadeOut('100').fadeIn('100');
    playSound(randomChosenColour)
    
}

$(".btn").on('click',function() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
    console.log(userClickedPattern.length-1)
 })
 
 function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play()
 }


function animatePress(currentColour){
     $("#"+currentColour).addClass("pressed")
     setTimeout(function (){
        $("#"+currentColour).removeClass("pressed")
     },100)
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function (){
                nextSequence()
            },1000)
        }
    } else{
        console.log("Failure")
        var audio = new Audio("sounds/wrong.mp3");
        audio.play()
        $("body").addClass("game-over")
        setTimeout(function (){
            $("body").removeClass("game-over")
         },200)
        
         $("#level-title").text("Game Over, Press Any Key to Restart")
         startOver()
    }
}


function startOver(){
    level=0
    gamePattern=[]
    started=false
}
    

