Snake.display = (function() {
	var dom = Snake.dom,
		$ = dom.$,
		canvas,
		ctx,
		rows,
		columns,
		plansza,
		width,
		height,
		wymiarKratki,
		x, y,
		firstRun = true,
		firstRedraw = true;
		
//ctx.arc(x, y, radius, startAngle, endAngle, ccw)
	
	function redraw() {
		canvas = $(".snake")[0];
		ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.arc(Snake.program.getGlowaX() * wymiarKratki + 0.5 * wymiarKratki,
				Snake.program.getGlowaY() * wymiarKratki + 0.5 * wymiarKratki, 
				0.25 * wymiarKratki, 0, 2*Math.PI, false);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
		
		//namalowanie szyi
		ctx.arc(getSnake()[0].x * wymiarKratki + 0.5 * wymiarKratki,
				getSnake()[0].y * wymiarKratki + 0.5 * wymiarKratki, 
				0.25 * wymiarKratki, 0, 2*Math.PI, false);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
		
		//usuniecie starego ogona		
		ctx.clearRect(getOgonOldX() * wymiarKratki, getOgonOldY() * wymiarKratki,
				wymiarKratki, wymiarKratki);
	}
	
	function applesCanvasRedraw(x, y) {
		canvas = $(".apples")[0];
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.arc(Snake.program.getAppleX() * wymiarKratki + 0.5 * wymiarKratki,
				Snake.program.getAppleY() * wymiarKratki + 0.5 * wymiarKratki, 
				0.25 * wymiarKratki, 0, 2*Math.PI, false);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
	}
	
	function drawEmptyBoard() {
		canvas = $(".board")[0];
		ctx = canvas.getContext("2d");
		
		for (x = 0; x < columns; x++) {
			for (y = 0; y < rows; y++) {
				ctx.beginPath();
				ctx.arc(x * wymiarKratki + 0.5 * wymiarKratki, y * wymiarKratki + 0.5 * wymiarKratki, 
						0.25 * wymiarKratki, 0, 2*Math.PI, false);
				ctx.lineWidth = 2;
				switch (Snake.program.getKratka(x, y)) {
				case -1:
					ctx.strokeStyle = "black";
					break;
				case 0:
					ctx.strokeStyle = "grey";
					break;
				default:
					ctx.strokeStyle = "grey";
					break;
				}
				
				ctx.stroke();
			}
		}
	}
	
	function updatePoints() {
		var pointsElement = $("#points")[0];
		pointsElement.innerHTML = "Points: " + Snake.program.getPoints();
	}
	
	function loadBoardCanvas() {
		var boardElement = $("#Snake")[0];
		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		dom.addClass(canvas, "board");
		canvas.width = width;
		canvas.height = height;
		boardElement.appendChild(canvas);
	}
	
	function loadSnakeCanvas() {
		var boardElement = $("#Snake")[0];
		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		dom.addClass(canvas, "snake");
		canvas.width = width;
		canvas.height = height;
		boardElement.appendChild(canvas);
	}
	
	function clearSnakeCanvas() {
		canvas = $(".snake")[0];
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0,
				canvas.width, canvas.height);
	}
	
	function loadApplesCanvas() {
		var boardElement = $("#Snake")[0];
		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		dom.addClass(canvas, "apples");
		canvas.width = width;
		canvas.height = height;
		boardElement.appendChild(canvas);
	}
	
	function setup() {
		
		settings = Snake.settings;
		rows = settings.rows;
		columns = settings.columns;
		plansza = Snake.program.plansza;
		width = settings.width;
		height = settings.height;
		wymiarKratki = width / columns;
		getSnake = Snake.program.getSnake;
		getOgonOldX = Snake.program.getOgonOldX;
		getOgonOldY = Snake.program.getOgonOldY;
		
		loadBoardCanvas();
		loadApplesCanvas();
		loadSnakeCanvas();
		drawEmptyBoard();
		updatePoints();
	}
	
	function initialize() {
		if (firstRun) setup();
		firstRun = false;
	}
	
	function reInitialize() {
		clearSnakeCanvas();
		updatePoints();		
	}
	
	return {
		initialize : initialize,
		reInitialize : reInitialize,
		redraw : redraw,
		applesCanvasRedraw : applesCanvasRedraw,
		updatePoints : updatePoints
	};
	
})();