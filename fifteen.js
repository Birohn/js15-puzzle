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
var valX;
var valY;

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

	var shuffle = document.getElementById("shuffle"); //initializes the shuffle button

	valX = "300px"; 
	valY = "300px";

	shuffle.onclick = function() //activates whenever the shuffle button is clicked

	{

		for (var i=0; i<300; i++) 

		{

			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece

			if (rand == 0)

			{

				var temp = up(valX, valY); 

				if ( temp != -1)

				{

					swap(temp);

				}

			}

			if (rand == 1)

			{

				var temp = down(valX, valY);

				if ( temp != -1) 

				{

					swap(temp);

				}

			}



			if (rand == 2)

			{

				var temp = left(valX, valY);

				if ( temp != -1)

				{

					swap(temp);

				}

			}


			if (rand == 3)

			{

				var temp = right(valX, valY);

				if (temp != -1)

				{

					swap(temp);

				}

			}

		}

	};

};


function swap (step) //moves the puzzle piece by switching position with an empty space
{

	var temp = gameBlock[step].style.top;

	gameBlock[step].style.top = valY;

	valY = temp;

	temp = gameBlock[step].style.left;

	gameBlock[step].style.left = valX;

	valX = temp;

}

function left(x, y) //calculates how far to the left a puzzlepiece should position

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);



	if (cordX > 0)

	{

		for (var i = 0; i < gameBlock.length; i++) 

		{

			if (parseInt(gameBlock[i].style.left) + 100 == cordX && parseInt(gameBlock[i].style.top) == cordY)

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



function right (x, y) //calculates how far to the right a puzzlepiece should position
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordX < 300)

	{

		for (var i =0; i<gameBlock.length; i++){

			if (parseInt(gameBlock[i].style.left) - 100 == cordX && parseInt(gameBlock[i].style.top) == cordY) 

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



function up(x, y) //calculates how far up a puzzlepiece should position
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY > 0)

	{

		for (var i=0; i<gameBlock.length; i++)

		{

			if (parseInt(gameBlock[i].style.top) + 100 == cordY && parseInt(gameBlock[i].style.left) == cordX) 

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



function down (x, y) //calculates how far down a puzzlepiece should position

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY < 300)

	{

		for (var i=0; i<gameBlock.length; i++)

		{

			if (parseInt(gameBlock[i].style.top) - 100 == cordY && parseInt(gameBlock[i].style.left) == cordX) 

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