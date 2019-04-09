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
	}
};

// random image generator
function imgRandom() {
    for (var i = 0; i < 4; i++) {
        var rand = imageArray[Math.floor(Math.random() * imageArray.length)];
        imgStr = "" + path + rand;
    }
}
