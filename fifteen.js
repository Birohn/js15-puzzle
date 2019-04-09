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
	- Function that checks whether we can move a piece into the blank space
	- Any helper functions
	- Hover functionality
*/

// Global variables
var gameBlock;

window.onload = function () {

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
			"backgroundImage"    : "url('http://assets.stickpng.com/thumbs/593008c73919fe0ee3614dae.png')"
		});	
	}
};