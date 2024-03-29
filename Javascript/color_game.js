function init(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click",function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
			reset();
		});
	}

	for(var i = 0 ; i < squares.length; i++)
	{
		
		
		squares[i].addEventListener("click", function(){
			var clickedcolor = this.style.background;
			if(clickedcolor===pickedColor)
			{
				messageDisplay.textContent="Correct!";
				resetButton.textContent="Play Again?";
				correctColors(clickedcolor);
				h1.style.background = clickedcolor;
			}
			else
			{
				this.style.background="#151515";
				messageDisplay.textContent="Try Again.";
			}
		});
	}
	reset();
}






// alert("connected!");
var numOfSquares=6;
var color=[];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.getElementById('message');
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function(){
	reset();
});


function correctColors(color){
	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.background=color;
	}
}

function pickColor()
{
	var random = Math.floor(Math.random() * color.length);
	return color[random];
}

function generateRandomColor(num)
{
	arr=[];
	for (var i = 0; i < num; i++) {
	arr.push(randomColor());
	}
	return arr;
}


function randomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb("+r+", "+g+", "+b+")";
}

function reset(){
	color = generateRandomColor(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0 ; i < squares.length; i++)
{
	if(color[i])
{
	squares[i].style.display="block";
	squares[i].style.background=color[i];
}
else
{
	squares[i].style.display="none"; 
}
}
	h1.style.background = "#151515";
	resetButton.textContent="New Colors";
	messageDisplay.textContent="";
}