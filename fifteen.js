/*
	This is the JS file for the fifteen puzzle game. We will use window.onload() 
	instead of using $( document ).ready() JQuery function 
	because window.load() will load once our image has been loaded. 

	TODO:
	- Implement extra feature(s): 
		(1) Multiple backgrounds (DONE)
		(2) Game time with some music file
		(3) Animations and/or transitions
		(4) One more extra feature...
*/

// Global variables
var gameBlock;

var temp;

var imageArray = ['tomandjerry.png', 'mario.png', 'scooby.png', 'knd.png'];
var path = "./img/";
var imgStr;

// shuffle postions
var valX = "300px";
var valY = "300px";

//Background music variables
var backgroundSound= new Audio("audio/tetris-gameboy-02.mp3");


// image selector varaible
var select = document.getElementById("images");

// generate the board
window.onload = function () {
	
	// get a random image
	imgRandom(imageArray);

	// create the individual 15 div blocks
	for (var i = 0; i < 15; i++) {
		var block = document.createElement("div");
		block.innerHTML = "" + (i + 1);
		document.getElementById("gameBoard").appendChild(block);
	}
	
	// retrieve all of the div elements
	var gameBoard = document.getElementById("gameBoard");
	gameBlock = gameBoard.getElementsByTagName("div");

	// for each puzzle piece, we will apply the styles
	for (var i = 0; i < gameBlock.length; i++) {
		$( gameBlock[i] ).addClass( "gameBlock" );

		// compute the positions of the block from the top and left of the entrire screen
		// AND set each div to contain just a portion of our entire image
		$( gameBlock[i] ).css({
			"left" : "" + (i % 4 * 100) + "px" ,
			"top"  : "" + (parseInt(i / 4) * 100) + "px",
			"backgroundPosition" : "-" + (i % 4 * 100) + "px" + " " + "-" + (parseInt(i / 4) * 100) + "px",
			"backgroundImage"    : "url('" + imgStr + "')"
		});

		//onclick and hover functions
	 	$( gameBlock[i] ).mouseover(function() {
	 		checkPosition(parseInt(this.style.top), parseInt(this.style.left),this.innerHTML -1);
	 	});

	 	$( gameBlock[i] ).mouseout(function() {
	 		$( this ).css({
	 			"border" : "2px solid black",
	 			"color" : "#000000",
	 			"textDecoration" : "none"
	 		});
	 	});

		$( gameBlock[i] ).click(function() {
			movePosition(parseInt(this.style.top), parseInt(this.style.left),this.innerHTML -1);
		});	
	}

	//background audio play and loop
	backgroundSound.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	},false);
	backgroundSound.play();
	// shuffle functionality

	var shuffle = document.getElementById("shuffle"); 
	shuffle.onclick = function() 
	{
		for (var i=0; i<gameBlock.length; i++) 
		{
			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece
			
			if (rand == 0)
			{
				temp = moveup(valX, valY); 

				if ( temp != -1)
				{
					temp = gameBlock[i].style.top;
					gameBlock[i].style.top = valY;
					valY = temp;
					temp = gameBlock[i].style.left;
					gameBlock[i].style.left = valX;
					valX = temp;
				}
			}

			if (rand == 1)
			{
				temp = movedown(valX, valY);

				if ( temp != -1) 
				{
					temp = gameBlock[i].style.top;
					gameBlock[i].style.top = valY;
					valY = temp;
					temp = gameBlock[i].style.left;
					gameBlock[i].style.left = valX;
					valX = temp;
				}
			}

			if (rand == 2)
			{
				temp = moveleft(valX, valY);

				if ( temp != -1)
				{
					temp = gameBlock[i].style.top;
					gameBlock[i].style.top = valY;
					valY = temp;
					temp = gameBlock[i].style.left;
					gameBlock[i].style.left = valX;
					valX = temp;
				}
			}

			if (rand == 3)
			{
				temp = moveright(valX, valY);

				if (temp != -1)
				{
					temp = gameBlock[i].style.top;
					gameBlock[i].style.top = valY;
					valY = temp;
					temp = gameBlock[i].style.left;
					gameBlock[i].style.left = valX;
					valX = temp;
				}
			}
		}

	
	//start timer on load
	setInterval(timer, 1000);
	};
	// image selection 
	$( "#showValue" ).click(function() {
		imgStr = select.value;
		for (var i = 0; i < gameBlock.length; i++) {
			$( gameBlock[i] ).css({
				"backgroundPosition" : "-" + (i % 4 * 100) + "px" + " " + "-" + (parseInt(i / 4) * 100) + "px",
				"backgroundImage"    : "url('" + imgStr + "')"
			});
		}
	});
}

// random image generator
function imgRandom() {
    for (var i = 0; i < 4; i++) {
        var rand = imageArray[Math.floor(Math.random() * imageArray.length)];
        imgStr = "" + path + rand;
    }
}
//check for empty spaces for selected gamePiece
//takes top and left and checks left side. Returns 1 if true. Return 0 if false.
function checkLeft(x,y) {
	var isBlocked= false;
	for(var i = 0; i < gameBlock.length; i++){
		if( y == 0) {
			isBlocked = true;
			return 0;
		}
		if(parseInt(gameBlock[i].style.top)== x && parseInt(gameBlock[i].style.left) == y -100) {
			isBlocked = true;
			return 0;
		}
	}
	if( isBlocked == false) {
		return 1;
	}
	else {
		return 0;
	}
}
//takes top and left and checks right side. Returns 1 if true. Return 0 if false.
function checkRight(x,y) {
	var isBlocked = false;
	for(var i = 0; i < gameBlock.length; i++){
		if( y == 300) {
			isBlocked = true;
			return 0;
		}
		if(parseInt(gameBlock[i].style.top)== x && parseInt(gameBlock[i].style.left) == y +100) {
			isBlocked = true;
		}
	}
	if( isBlocked == false) {
		
		return 1;
	}
	else {
		return 0;
	}
}
//takes top and left and checks top side. Returns 1 if true. Return 0 if false.
function checkTop(x,y) {
	var isBlocked = false;
	for(var i = 0; i < gameBlock.length; i++){
		if( x == 0) {
			isBlocked = true;
			return 0;
		}
		if(parseInt(gameBlock[i].style.left)== y && parseInt(gameBlock[i].style.top) == x - 100) {
			isBlocked = true;
		}
	}
	if( isBlocked == false) {
		
		return 1;
	}
	else {
		return 0;
	}
}
//takes top and left and checks bottom side.Returns 1 if true. Return 0 if false.
function checkBottom(x,y) {
	var isBlocked = false;
	for(var i = 0; i < gameBlock.length; i++){
		if( x == 300) {
			isBlocked = true;
			return 0;
		}
		if(parseInt(gameBlock[i].style.left)== y && parseInt(gameBlock[i].style.top) == x + 100) {
			isBlocked = true;
		}
	}
	if( isBlocked == false) {
		
		return 1;
	}
	else {
		return 0;
	}
}
//keeps tracks of number of moves
var numMoves =0;
//uses helper functions above and move piece if true. Takes top , left, and array position of gamePiece.

function movePosition(x , y ,position) {
	if(isInTransit == true) {
		return;
	}
	if(checkRight(x, y)) {
		//gameBlock[position].style.left = parseInt(gameBlock[position].style.left) + 100 +"px";
		animationRight(position);
		document.getElementById("numMovesLabel").innerHTML=++numMoves;
		return;
	}
	if(checkLeft(x, y)){
		//gameBlock[position].style.left = parseInt(gameBlock[position].style.left) - 100 +"px";
		animationLeft(position);
		document.getElementById("numMovesLabel").innerHTML=++numMoves;
		return;
	}
	if(checkTop(x, y)) {
		//gameBlock[position].style.top = parseInt(gameBlock[position].style.top) -100 +"px";
		animationUp(position);
		document.getElementById("numMovesLabel").innerHTML=++numMoves;
		return;
	}
	if(checkBottom(x, y)) {
		//gameBlock[position].style.top = parseInt(gameBlock[position].style.top) +100 +"px";
		animationDown(position);
		document.getElementById("numMovesLabel").innerHTML=++numMoves;
		return;
	}
}
var isInTransit= false;
//animation functions for movement of gamePieces into their new positions
function animationUp(position) {
	var currentPosition = 0;
	var frameByFrame= setInterval(frame, 10);
	function frame() {
		if(currentPosition ==25) {
			isInTransit= false;
			clearInterval(frameByFrame);
		}
		else {
			isInTransit= true;
			currentPosition++;
			gameBlock[position].style.top = parseInt(gameBlock[position].style.top) - 4 +"px";
		}
	}
	
}
function animationDown(position) {
	var currentPosition = 0;
	var frameByFrame= setInterval(frame, 10);
	function frame() {
		if(currentPosition ==25) {
			isInTransit= false;
			clearInterval(frameByFrame);
		}
		else {
			isInTransit= true;
			currentPosition++;
			gameBlock[position].style.top = parseInt(gameBlock[position].style.top) + 4 +"px";
		}
	}
	
}
function animationLeft(position) {
	var currentPosition = 0;
	var frameByFrame= setInterval(frame, 10);
	function frame() {
		if(currentPosition ==25) {
			isInTransit= false;
			clearInterval(frameByFrame);
		}
		else {
			isInTransit= true;
			currentPosition++;
			gameBlock[position].style.left = parseInt(gameBlock[position].style.left) - 4 +"px";
		}
	}
	
}
function animationRight(position) {
	var currentPosition = 0;
	var frameByFrame= setInterval(frame, 10);
	function frame() {
		if(currentPosition ==25) {
			isInTransit= false;
			clearInterval(frameByFrame);
		}
		else {
			isInTransit= true;
			currentPosition++;
			gameBlock[position].style.left = parseInt(gameBlock[position].style.left) + 4 +"px";
		}
	}
	
}
//underline and highlight pieces that are moveable. Takes top, left , and array position of gamePiece.
function checkPosition(x , y , position) {
	var isBlocked = true;
	if(checkRight(x, y)) {
		isBlocked= false;
	}
	else if(checkLeft(x, y)){
		isBlocked= false;
	}
	else if(checkTop(x, y)) {
		isBlocked= false;
		
	}
	else if(checkBottom(x, y)) {
		isBlocked= false;	
	}
	if(isBlocked == false) {
		
		$( gameBlock[position] ).css({
			"border-color" : "red",
			"text-decoration" : "underline",
			"color" : "#006600"
		});
	}
}
//timer functions
var minutes = document.getElementById("minutesLabel");
var seconds =document.getElementById("secondsLabel");
var timeCount = 0;
function timer() {
	++timeCount;
	seconds.innerHTML=formatTime(timeCount % 60);
	minutes.innerHTML=formatTime(parseInt(timeCount / 60));
	
}
function formatTime(time) {
	let formatString = time +"";
	if(formatString.length< 2)
		return "0" + formatString;
	else
		return formatString;
	
}

// shuffle helper functions

function moveleft(x, y) 

{
	var X = parseInt(x);
	var Y = parseInt(y);

	if (X > 0)
	{
		for (var i = 0; i < gameBlock.length; i++) 
		{
			if (parseInt(gameBlock[i].style.left) == X && parseInt(gameBlock[i].style.top) == Y)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}



function moveright (x, y) 
{
	var X = parseInt(x);
	var Y = parseInt(y);

	if (X < gameBlock.length)
	{
		for (var i =0; i<gameBlock.length; i++){

			if (parseInt(gameBlock[i].style.left) == X && parseInt(gameBlock[i].style.top) == Y) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}



function moveup(x, y) 
{
	var X = parseInt(x);
	var Y = parseInt(y);

	if (Y > 0)
	{
		for (var i=0; i<gameBlock.length; i++)
		{
			if (parseInt(gameBlock[i].style.top) == Y && parseInt(gameBlock[i].style.left) == X) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}



function movedown (x, y) 

{
	var X = parseInt(x);
	var Y = parseInt(y);

	if (Y < gameBlock.length)
	{
		for (var i=0; i<gameBlock.length; i++)
		{
			if (parseInt(gameBlock[i].style.top) == Y && parseInt(gameBlock[i].style.left) == X) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}


function endGame()

{
	var msg = "You win!";
	var ifTrue = true;

	for (var i = 0; i < gameBlock.length; i++) //for each puzzle piece 
	{

		var top = parseInt(gamePiece[i].style.top);

		var left = parseInt(gamePiece[i].style.left);


		if (left != (i%4*100) || top != parseInt(i/4)*100) //checks if each piece matches its left and top position

		{

			ifTrue = false;

			break;

			document.getElementById("formsg").innerHTML = msg;

		}

	}

	return ifTrue;

}

