/*
	This is the JS file for the fifteen puzzle game. We will use window.onload() 
	instead of using $( document ).ready() JQuery function 
	because window.load() will load once our image has been loaded. 

	TODO:
	- Add shuffle function (on click)
	- Implement extra feature(s): 
		(1) Multiple backgrounds
		(2) Game time with some music file
		(3) Animations and/or transitions
		(4) One more extra feature...
	- Function that checks whether we can move a piece into the blank space
	- Any helper functions
	- Hover functionality
*/

// Global variables
var gameBlock;
var imageArray = ['tomandjerry.png', 'mario.png', 'scooby.png', 'knd.png'];
var path = "./img/";
var imgStr;

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
		
		gameBlock[i].onmouseover = function() {
			checkPosition(parseInt(this.style.top), parseInt(this.style.left),this.innerHTML -1);
	
	    }
		gameBlock[i].onmouseout = function() {
			this.style.border = "2px solid black";
			this.style.textDecoration="none";
	
	    }
		gameBlock[i].onclick = function() { 
			movePosition(parseInt(this.style.top), parseInt(this.style.left),this.innerHTML -1);
		
		}
		
	}
};

	
	

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
//uses helper functions above and move piece if true. Takes top , left, and array position of gamePiece.
function movePosition(x , y ,position) {
	if(checkRight(x, y)) {
		gameBlock[position].style.left = parseInt(gameBlock[position].style.left) + 100 +"px";
		return;
	}
	if(checkLeft(x, y)){
		gameBlock[position].style.left = parseInt(gameBlock[position].style.left) - 100 +"px";
		return;
	}
	if(checkTop(x, y)) {
		gameBlock[position].style.top = parseInt(gameBlock[position].style.top) -100 +"px";
		return;
	}
	if(checkBottom(x, y)) {
		gameBlock[position].style.top = parseInt(gameBlock[position].style.top) +100 +"px";
		return;
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
		gameBlock[position].style.border = "2px solid #006600";
		gameBlock[position].style.textDecoration="underline";
		gameBlock[position].style.textDecorationColor="#006600";
	}
}