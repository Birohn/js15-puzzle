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
var valX = "300px";
var valY = "300px";
var temp;

window.onload = function () {
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
			"backgroundImage"    : "url('http://assets.stickpng.com/thumbs/593008c73919fe0ee3614dae.png')"
		});	
	}

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
	};
};

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