/* * * * * * * * * * * * * * * * * * * *
 *  You may look. You may not touch.   *
 * Pepega License (C) Pepega Paradise. *
 * * * * * * * * * * * * * * * * * * * */

//Constants
const _DEBUG = true;

//Logging function
function log(logString){
    if (_DEBUG)
        console.log(logString);
}
//Game time function
function getTime()
{
	return new Date();
}

//Log script loaded
log("Script loaded");

//Variables
var gameSave = "";
var gameTime = getTime();

//Animation variables
var fps  = 25,
frame = 0,
lastFrame = -1,
lastTime = -1;

//Animation loop
function animloop(time)
{
	if(time != lastTime)//don't draw same time twice
	{
		var delta = (time - lastTime);//delta time
		frame = Math.round((time / 1000) * fps);//total frame counter

		if (lastFrame < frame){//don't draw same frame twice
			//TODO: Draw
            document.getElementById("console").innerHTML = frame;

			//update last frame
			lastFrame = frame;
		}
	}
	//Update last time
	lastTime = time;
	
	//Continue animation
	requestAnimationFrame(animloop);	
}

//Hook onLoad
window.onload = function(){
    log("Window loaded");


    //Bind button functions
    document.getElementById("saveButton").onclick = function(){
        log("Save button pressed...");
    };

    document.getElementById("startButton").onclick = function(){
        log("Start button pressed...");
    };

    //Set time in timebox
    document.getElementById("timebox").innerHTML = gameTime.getHours() + ":" + gameTime.getMinutes();

    //Load game save
    if(localStorage.getItem("save") == null)
    {
        log("No game save found...");
        log("Creating save data...");

        log("Saving data...");
        localStorage.setItem("save", "save game");
    }
    else
        log("Save found...");

    log("Loading data...")
    gameSave = localStorage.getItem("save");

    //Begin Animation loop
    log("Beginning animation loop...")
    animloop(0);
}