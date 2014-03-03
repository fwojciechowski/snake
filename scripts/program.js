Snake.program = (function() {
    var rows,
        columns,
        speed,
        dom = Snake.dom,
        $ = dom.$,
        plansza,
        kierunek,
        xGlowa, yGlowa,
        xOgonOld, yOgonOld,
        startX, startY,
        aSnake,
        snakeLength,
        xApple, yApple,
        isPlaying = false,
        gameHalter,
        points,
        pointRate;
    
    function initialize() {
    	settings = Snake.settings;
    	rows = settings.rows;
    	columns = settings.columns;
    	speed = settings.speed;
    	input = Snake.input;
    	readyKeyboard();
    	pointRate = settings.pointRate;
    	reInitialize();
    	
    }
    
    function readyKeyboard() {
    	input.initialize();
    	
    	input.bind("moveUp", moveUp);
    	input.bind("moveDown", moveDown);
    	input.bind("moveLeft", moveLeft);
    	input.bind("moveRight", moveRight);
    	input.bind("gameControl", gameControl);
    }
    
    function getKratka(x, y) {
    	return plansza[x][y];
    }
    
    function setKratka(x, y, war) {
    	plansza[x][y] = war;
    }
    
    function getGlowaX() {
    	return xGlowa;
    }
    
    function getGlowaY() {
    	return yGlowa;
    }
    
    function getPoints() {
    	return points;
    }
    
    function getAppleX() {
    	return xApple;
    }
    
    function getAppleY() {
    	return yApple;
    }
    
    function setApple(x, y) {
    	xApple = x;
    	yApple = y;
    }
    
    function getSnake() {
    	return aSnake;
    }
    
    function getOgonOldX() {
    	return xOgonOld;
    }
    
    function getOgonOldY() {
    	return yOgonOld;
    }
    
    function getPunktZdobyty() {
    	return punktZdobyty;
    }
    
    function losujKierunek() {
    	switch (Math.floor(Math.random() * 4)) {
    		case 0:
    			console.log("Wylosowano N!");
    			return "N";
    		case 1:
    			console.log("Wylosowano W!");
    			return "W";
    		case 2:
    			console.log("Wylosowano S!");
    			return "S";
    		case 3: 
    			console.log("Wylosowano E!");
    			return "E";
    		default:
    			break;
    	}
    		
    }
    
    function czyPoprawnyRuch(x, y) {
    	
    	switch (kierunek) {
    	case "E":
    		if (getKratka(x+1, y) == 0) {
    			return true;
    		}
    		else return false;
    	case "S":
    		if (getKratka(x, y+1) == 0) {
    			return true;
    		}
    		else return false;
    	case "W":
    		if (getKratka(x-1, y) == 0) {
    			return true;
    		}
    		else return false;
    	case "N":
    		if (getKratka(x, y-1) == 0) {
    			return true;
    		}
    		else return false;
    	
    	}
    	
    	
    }
    
    function ruch() {
    	var wykonany = false;
    	var xGlowaOld = xGlowa;
    	var yGlowaOld = yGlowa;
    	
    	while (!wykonany) {
    	switch (kierunek) {
    	case "E":
    		if (czyPoprawnyRuch(xGlowa, yGlowa)) {
    			setKratka(xGlowa + 1, yGlowa, 1);
    			xGlowa++;
    			wykonany = true;
      		}
      		else {
      			gameControl();
      			return;
      			}      			
    		break;
    	case "S":
    		if (czyPoprawnyRuch(xGlowa, yGlowa)) {
    			setKratka(xGlowa, yGlowa + 1, 1);
    			yGlowa++;
    			wykonany = true;
      		}
    		else {
    			gameControl();
      			return;
      			}      			
    		break;
    	case "W":
    		if (czyPoprawnyRuch(xGlowa, yGlowa)) {
    			setKratka(xGlowa - 1, yGlowa, 1);
    			xGlowa--;
    			wykonany = true;    			
      		}
    		else {
    			gameControl();
      			return;
      			}      			
    		break;
    	case "N":
    		if (czyPoprawnyRuch(xGlowa, yGlowa)) {
    			setKratka(xGlowa, yGlowa - 1, 1);
    			yGlowa--;
    			wykonany = true;
      		}
    		else {
    			gameControl();
      			return;
      			}      			
    		break;
    	default:
    		break;
    	
    	}
    	}
    	
    	//ogon w matrycy zyskuje wartosc 0, bo zaraz sie przesunie
    	setKratka(
    			aSnake[snakeLength - 2].x,
    			aSnake[snakeLength - 2].y,
    			0
    	);
    	
    	xOgonOld = aSnake[snakeLength - 2].x;
    	yOgonOld = aSnake[snakeLength - 2].y;
    	
    	//przesuniecie wspolrzednych poszczegolnych czesci weza
    	for (var i = snakeLength - 2; i > 0; i-- ) {
    		aSnake[i].x = aSnake[i-1].x;
    		aSnake[i].y = aSnake[i-1].y
    	}
    	//szyja przejmuje stare wspolrzedne glowy
    	aSnake[0].x = xGlowaOld;
    	aSnake[0].y = yGlowaOld;
    	
    	// aktualizacja polozenia weza w macierzy
    	// ! Funkcja niepotrzebnie pozerajaca zasoby:
    	// ! wykonany ruch wymaga jedynie aktualizacji polozenia
    	// ! glowy, szyi i ogona.
    	/*
    	for (var i = 0; i < snakeLength - 2; i++) {
    		setKratka(
    			getSnake()[i].x,
    			getSnake()[i].y,
    			1
    		);
    	}
    	*/
    	//aktualizacja szyi
    	setKratka(
    			xGlowaOld,
    			yGlowaOld,
    			1
    		);
    	//zdobywanie punktu - wydluzenie weza bedzie widoczne
    	//dopiero w kolejnym ruchu
    	if (xGlowa == xApple && yGlowa == yApple) {
    		zdobyciePunktu();
    	}
    }
    
    function zdobyciePunktu() {
    	punktZdobyty = true;
    	points += pointRate;
    	Snake.display.updatePoints();
    	newApple();
    	
    	var ogonDubelX = aSnake[snakeLength - 2].x;
    	var ogonDubelY = aSnake[snakeLength - 2].y;
    	aSnake.push({x : ogonDubelX, y : ogonDubelY});
    	snakeLength++;
    }
    
    function newApple() {
    	var isAppleOk = false;
    	var xa, ya;
    	
    	
    	//wylosowanie miejsca na nowe i set nowego
    	while(!isAppleOk) {
    		xa = Math.floor(Math.random() * (columns - 2));
    		ya = Math.floor(Math.random() * (rows - 2));
    		
    		if (!getKratka(xa, ya)) {
    			setApple(xa, ya);
    			isAppleOk = true;
    		}
    	}
    	//redraw
    	Snake.display.applesCanvasRedraw();
    }
    
    function moveUp() {
    	if (kierunek == "S") return;
    	kierunek = "N";
    }
    
    function moveLeft() {
    	if (kierunek == "E") return;
    	kierunek = "W";
    }
    
    function moveDown() {
    	if (kierunek == "N") return;
    	kierunek = "S";
    }
    
    function moveRight() {
    	if (kierunek == "W") return;
    	kierunek = "E";
    }
    
    function gameControl() {
    	if (!isPlaying) {
    		console.log("Start!");
    		newApple();
        	startGame();
        	isPlaying = true;
    	}
    	else {
    		console.log("Stop!");
    		stopGame();
    		isPlaying = false;
    	}
    	
    }
    
    function startGame() {
    	dom.addClass($("#start-screen")[0], "hidden");
    	reInitialize();
    	Snake.display.reInitialize();
    	gameHalter = setInterval(function() {
    		ruch();
    		Snake.display.redraw();
    		}, 
    		Math.floor(1000/speed));
    		
    }
    
    function stopGame() {
    	dom.removeClass($("#start-screen")[0], "hidden")
    	
    	clearInterval(gameHalter);
    }
    
    //wypelnia tablice zerami i glowa
    function createBoard() {
    	var x, y;
    	plansza = [];
    	
    	for (x = 0; x < columns; x++) {
    		plansza[x] = [];
    		for (y = 0; y < rows; y++) {
    			if (x == 0 || x == columns - 1 || y == 0 || y == rows - 1) 
    				plansza[x][y] = -1;
    			else plansza[x][y] = 0;
    		}
    	}
    	plansza[xGlowa][yGlowa] = 1;
    	plansza[aSnake[0].x][aSnake[0].y] = 1;
    }
    
    // funkcja debugujaca do sprawdzania poprawnosci macierzy z dzialaniem
    // modulu display
    function printBoard() {
        var str = "";
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < columns; x++) {
                str += plansza[x][y] + " ";
            }
            str += "\r\n";
        }
        console.log(str);
    }
    
    function reInitialize() {
    	points = 0;
    	xGlowa = 3;
    	yGlowa = 1;
    	aSnake = [{x : xGlowa - 1, y : yGlowa}, {x : xGlowa - 2, y : yGlowa}];
    	snakeLength = aSnake.length + 1;
    	kierunek = "E";
    	createBoard();
    	
    }


    
    return {
        initialize : initialize,
    	printBoard : printBoard,
    	getKratka : getKratka,
    	getGlowaX : getGlowaX,
    	getGlowaY : getGlowaY,
    	getOgonOldX : getOgonOldX,
    	getOgonOldY : getOgonOldY,
    	getAppleX : getAppleX,
    	getAppleY : getAppleY,
    	getPoints : getPoints,
    	getSnake : getSnake
    };
})();