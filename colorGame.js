init();


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function generateSixColor(){
	var colorList = [];
	for(var i = 0; i < 6; i++){
		var color = "rgb(";
		for(var j = 0; j < 3; j++){
			var Limit = getRandomInt(0, 256);
			if(j > 0){
				color += " " + String(getRandomInt(0, 256));
			}
			else{
				color += String(getRandomInt(0, 256));
			}
			if(j < 2){
				color += ",";
			}
		}
		color += ")";
		colorList.push(color);
	}

	return colorList;
}

function assignColor(){
	var colorList = generateSixColor();
	var squareList = document.querySelectorAll(".square");
	var answerColor = getRandomInt(0, 6);
	squareList.forEach(function(square, index){
		square.style.backgroundColor = colorList[index];
	});
	return colorList[answerColor];
}

function assignSpecificColor(color){
	var squareList = document.querySelectorAll(".square");
	var answerColor = color;
	squareList.forEach(function(square){
		square.classList.remove("wrongChoice");
		square.textContent = "";
		square.style.backgroundColor = answerColor;
	});

}

function resetInterface(){
	var startButton = document.querySelector("#startButton");
	startButton.addEventListener("click", updateInterface);

	var squareList = document.querySelectorAll(".square");
	var display = document.querySelector("#RGBColor");
	var header = document.querySelector(".header");
	display.textContent = "RGB";
	header.style.backgroundColor = "";
	squareList.forEach(function(square, index){
		square.style.backgroundColor = "grey";
		square.classList.remove("wrongChoice");
		square.textContent = "";
	});
	var startButton = document.querySelector("#startButton");
	startButton.textContent = "Start";
	startButton.classList.remove("btn-danger");
	started = false;

}

function startInterface(){
	var answer = assignColor();
	var display = document.querySelector("#RGBColor");
	display.textContent = String(answer);
	var startButton = document.querySelector("#startButton");
	var header = document.querySelector(".header");
	startButton.textContent = "Reset";
	startButton.classList.add("btn-danger");
	started = true;

	//prepare for listening
	var squareList = document.querySelectorAll(".square");
	squareList.forEach(function(square, index){
		square.addEventListener("click", function(){
			if(started){
				if(this.style.backgroundColor == answer){
					header.style.backgroundColor = answer;
					assignSpecificColor(answer);
					display.textContent = "Correct!";
				}
				else{
					square.classList.add("wrongChoice");
					square.textContent = "Wrong";
				}
			}
			
		});
	});
}

function updateInterface(){
	if(started){
		resetInterface();
	}
	else{
		startInterface();
	}
}


function init(){
	resetInterface();
}





