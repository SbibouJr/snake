
window.addEventListener("load", function() {

	let canvasElt  = document.querySelector('#screen');
	let consoleElt  = document.querySelector('#console');
	let contextElt = canvasElt.getContext('2d');

	let initialWidth = canvasElt.offsetWidth;
	let initialHeight = canvasElt.offsetHeight;

	let resMgr = new ResourceManager();
	let player = new Snake(3*32,2*32,'right');
	let point = new Point();
	let bonus = new Bonus();
	let mouse = new Mouse();
	let menu = new Menu();
	let difficulty = "easy";

	let lstGround = [];
	for(let i = 0 ; i < 40; i++){
		for(let j = 0 ; j < 24; j++){
			lstGround.push(new Ground(i*32,j*32));
		}
	}

	let lstWall = {
		"easy": [],
		"normal": [],
		"hard":[]
	};
	for(let i = 0 ; i < 40; i++){
		for(let j = 0 ; j < 24; j++){
			if(i === 0 || i === 39){
				lstWall["normal"].push(new Wall(i*32,j*32));
			}
			else{
				if(j === 0 || j === 23){
					lstWall["normal"].push(new Wall(i*32,j*32));
				}
			}
		}
	}
	for(let i = 0 ; i < 40; i++){
		for(let j = 0 ; j < 24; j++){
			if(i === 0 || i === 39){
				lstWall["hard"].push(new Wall(i*32,j*32));
			}
			else{
				if(j === 0 || j === 23){
					lstWall["hard"].push(new Wall(i*32,j*32));
				}
				else if( i === 4 || i === 35){
					if(j > 3 && j <  10){
						lstWall["hard"].push(new Wall(i*32,j*32));
					}
					else if(j > 13  && j <  20){
						lstWall["hard"].push(new Wall(i*32,j*32));
					}
				}
				else if ( i > 4 && i < 11 || i > 28 && i < 35){
					if( j === 4 || j === 19){
						lstWall["hard"].push(new Wall(i*32,j*32));
					}
				}
				if(i === 9 || i === 30){
					if(j > 8 && j <  15){
						lstWall["hard"].push(new Wall(i*32,j*32));
					}
				}
				if(j === 8 || j === 15){
					if(i > 12 && i < 18){
						lstWall["hard"].push(new Wall(i*32,j*32));
					}
					if(i > 21 && i < 27){
						lstWall["hard"].push(new Wall(i*32,j*32));
					}					
				}

			}
		}
	}

	let moveX = 0;
	let moveY = 0; 

	/* ****************************************************
	***************** MAXIMIZE THE SCREEN *****************
	**************************************************** */
	if(document.body.clientWidth*(initialHeight / initialWidth) < document.body.clientHeight){
		canvasElt.style.width = "100%";
		canvasElt.style.height = "auto";
	}
	else{
		canvasElt.style.height = "100%";
		canvasElt.style.width = "auto";
	}

	function mainLoop() {

		/* ****************************************************
		******************* PHISICAL ENGINE *******************
		**************************************************** */
		if(menu.getPage() === 'game'){

			// ********* If the player exits the screen *********
			if(player.getPos(0).x < 0){
				player.getPos(0).x = canvasElt.width-32;
			}
			else if(player.getPos(0).x+32 > canvasElt.width){
				player.getPos(0).x = 0;
			}
			else if(player.getPos(0).y < 0){
				player.getPos(0).y = canvasElt.height - 32;
			}
			else if(player.getPos(0).y+32 > canvasElt.height){
				player.getPos(0).y = 0;
			}

			// *************** Collision with him ***************
			for(let i = 1;i < player.getPos().length;i++){
				if(player.getPos(0).x === player.getPos(i).x && player.getPos(0).y === player.getPos(i).y){
					menu.setPage('gameOver');
					menu.setPause(true);
				}
			}

			// *************** Collision with a wall ***************
			for(let i = 0; i < lstWall[difficulty].length;i++){
				// ********** MOUSE *********
				if(mouse.isActivate()){
					switch(mouse.getDir()){
						case "up":
							if(mouse.getPosX() === lstWall[difficulty][i].getPosX() && mouse.getPosY()+32 === lstWall[difficulty][i].getPosY()){
								mouse.changeDir(lstWall);
							}		
							break;
						case "down":
							if(mouse.getPosX() === lstWall[difficulty][i].getPosX() && mouse.getPosY()-32 === lstWall[difficulty][i].getPosY()){
								mouse.changeDir(lstWall);
							}		
							break;
						case "right":
							if(mouse.getPosX()+32 === lstWall[difficulty][i].getPosX() && mouse.getPosY() === lstWall[difficulty][i].getPosY()){
								mouse.changeDir(lstWall);
							}		
							break;
						case "left":
							if(mouse.getPosX()-32 === lstWall[difficulty][i].getPosX() && mouse.getPosY() === lstWall[difficulty][i].getPosY()){
								mouse.changeDir(lstWall);
							}								
							break;
					}
			
				}

				// ********** SNAKE *********
				if(player.getPos(0).x === lstWall[difficulty][i].getPosX() && player.getPos(0).y === lstWall[difficulty][i].getPosY()){
					menu.setPage('gameOver');
					menu.setPause(true);								  
				}
			}


			// *************** Collision with mouse ***************		
			if(mouse.isActivate() && player.getPos(0).x === mouse.getPosX() && player.getPos(0).y === mouse.getPosY() ){
				mouse.setTime( mouse.getTime() - 20000);
				player.addMouse();
			}

			// *************** Collision with a point ***************		
			if(point.isActivate() && player.getPos(0).x === point.getPosX() && player.getPos(0).y === point.getPosY() ){
				point.setTime( point.getTime() - 20000);
				player.addPoints(point.getColor());
				menu.activeBonus();
			}

			// *************** Collision with a bonus ***************
			if(bonus.isActivate() && player.getPos(0).x === bonus.getPosX() && player.getPos(0).y === bonus.getPosY() ){
				player.addBonus(bonus.getType());
				bonus.setTime( bonus.getTime() - 10000);
				menu.activeBonus(bonus.getType());
			}

			/* ********************** MAJ *********************** */
			if(!menu.isPause()){
				player.maj();
				point.maj(lstWall[difficulty]);
				bonus.maj(lstWall[difficulty]);
				mouse.maj(lstWall[difficulty]);
			}
		}

		/* ****************************************************
		******************* GRAPHIC ENGINE *******************
		**************************************************** */
		contextElt.save();
		contextElt.clearRect(0,0,canvasElt.width, canvasElt.height);

		/* ************* INTRO ************* */
		if(menu.getPage() === 'intro'){
			menu.drawIntro(canvasElt, contextElt, resMgr);
		}

		/* ************* PRE HOME ************** */
		else if(menu.getPage() === 'preHome'){
			menu.drawPreHome(canvasElt, contextElt, resMgr);
		}

		/* ************* HOME *************** */ 
		else if (menu.getPage() === 'home'){
			menu.drawHome(canvasElt, contextElt, resMgr);
		}	

		/* ************* CHOICE LEVEL *********** */
		else if(menu.getPage() === 'choiceLvl'){
			menu.drawChoiceLvl(canvasElt, contextElt, resMgr);
		}

		/* ************* HELP *************** */
		else if(menu.getPage() === 'help'){
			menu.drawHelp(canvasElt, contextElt, resMgr);
		}

		/* ************** GAME ************** */
		else if(menu.getPage() === 'game'){

			for(let i = 0; i < lstGround.length ;i++){
				contextElt.drawImage(resMgr.getSprite("ground"), lstGround[i].getPosX(), lstGround[i].getPosY(), 32, 32);
			}			

			if(point.isActivate()){
				contextElt.fillStyle = point.getColor();
				contextElt.fillRect(point.getPosX(), point.getPosY(), 32, 32);
			}
			if(bonus.isActivate()){
				contextElt.drawImage(resMgr.getSprite("bonus"), bonus.getPosX(), bonus.getPosY(), 32, 32);
			}

			if(mouse.isActivate()){
				mouse.draw(contextElt, resMgr);
			}

			player.draw(contextElt, resMgr);

			for(let i = 0; i < lstWall[difficulty].length ;i++){
				contextElt.drawImage(resMgr.getSprite("wall"), lstWall[difficulty][i].getPosX(), lstWall[difficulty][i].getPosY(), 32, 32);
			}
			menu.drawScore(contextElt, player.getScore(), player.getTextBonus());
			if(menu.isPause()){
				menu.drawPause(canvasElt, contextElt);
			}
		}
		/* ************ GAME OVER ************ */
		else if(menu.getPage("gameOver")){
			menu.drawGameOver(canvasElt, contextElt, player.getScore());
		}

		contextElt.restore();

		/* *********** MAIN LOOP ************** */
		window.requestAnimFrame(function() { mainLoop() });
	}


	/* ***********************************************
	********************* EVENTS *********************
	*********************************************** */

	/* ****************** START OF TACTIL ****************** */


	/* **** Start of touch ****** */
	consoleElt.addEventListener('touchstart', function(e){
		e.preventDefault();

		let touches = e.changedTouches;    

		if(menu.getPage() === 'home'){
			moveX = (touches[0].pageX - canvasElt.offsetLeft) * (initialWidth/canvasElt.offsetWidth) ;
			moveY = (touches[0].pageY - canvasElt.offsetTop) * (initialHeight/canvasElt.offsetHeight) ;
			if(moveX > 370 && moveX < 370+550 && moveY > 400 && moveY < 400+96){
				menu.setChoice(1);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 560 && moveY < 560+96){
				menu.setChoice(2);
			}
			else{
				menu.setChoice(0);
			}
		}
		else if(menu.getPage() === 'choiceLvl'){
			moveX = (touches[0].pageX - canvasElt.offsetLeft) * (initialWidth/canvasElt.offsetWidth) ;
			moveY = (touches[0].pageY - canvasElt.offsetTop) * (initialHeight/canvasElt.offsetHeight) ;
			if(moveX > 370 && moveX < 370+550 && moveY > 320 && moveY < 320+96){
				menu.setChoice(1);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 420 && moveY < 420+96){
				menu.setChoice(2);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 520 && moveY < 520+96){
				menu.setChoice(3);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 620 && moveY < 620+96){
				menu.setChoice(4);
			}
			else{
				menu.setChoice(0);
			}
		}
		else if(menu.getPage() === 'game'){
			moveX = touches[0].pageX;
			moveY = touches[0].pageY;
			if(menu.isPause()){
				menu.setPause(false);
			}
			menu.setKeyPressed(true);
		}
	}, false);


	/* ******* Moving the finger ******* */
	consoleElt.addEventListener('touchmove', function(e){
		e.preventDefault();

		let touches = e.changedTouches;
		if(menu.getPage() === 'home'){
			moveX = (touches[0].pageX - canvasElt.offsetLeft) * (initialWidth/canvasElt.offsetWidth) ;
			moveY = (touches[0].pageY - canvasElt.offsetTop) * (initialHeight/canvasElt.offsetHeight) ;
			if(moveX > 370 && moveX < 370+550 && moveY > 400 && moveY < 400+96){
				menu.setChoice(1);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 560 && moveY < 560+96){
				menu.setChoice(2);
			}
			else{
				menu.setChoice(0);
			}
		}
		else if(menu.getPage() === 'choiceLvl'){
			moveX = (touches[0].pageX - canvasElt.offsetLeft) * (initialWidth/canvasElt.offsetWidth) ;
			moveY = (touches[0].pageY - canvasElt.offsetTop) * (initialHeight/canvasElt.offsetHeight) ;
			if(moveX > 370 && moveX < 370+550 && moveY > 320 && moveY < 320+96){
				menu.setChoice(1);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 420 && moveY < 420+96){
				menu.setChoice(2);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 520 && moveY < 520+96){
				menu.setChoice(3);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 620 && moveY < 620+96){
				menu.setChoice(4);
			}
			else{
				menu.setChoice(0);
			}
		}
		else if(menu.getPage() === 'game'){
			if(touches[0].pageX < moveX-10){
				if(player.getBonus() === 'reverse'){ player.move('right'); }
				else{player.move('left');}
				moveX = touches[0].pageX;
				moveY = touches[0].pageY;
			}
			else if(touches[0].pageX > moveX+10){
				if(player.getBonus() === 'reverse'){ player.move('left'); }
        		else{ player.move('right'); }
				moveX = touches[0].pageX ;
				moveY = touches[0].pageY ;
			}
			else if(touches[0].pageY < moveY-10){
				if(player.getBonus() === 'reverse'){ player.move('down'); }
				else{ player.move('up'); }
				moveX = touches[0].pageX ;
				moveY = touches[0].pageY ;
			}
			else if (touches[0].pageY > moveY+10){
				if(player.getBonus() === 'reverse'){ player.move('up'); }
				else{ player.move('down'); }
				moveX = touches[0].pageX ;
				moveY = touches[0].pageY ;
			}
		}
	}, true);


	/* ******** End of touch ********* */
	consoleElt.addEventListener('touchend', function(e){
		e.preventDefault();
		let touches = e.changedTouches;
		if(menu.getPage() === 'preHome'){ 
			menu.setPage('home');
		}
		else if(menu.getPage() === "home"){
			moveX = (touches[0].pageX - canvasElt.offsetLeft) * (initialWidth/canvasElt.offsetWidth) ;
			moveY = (touches[0].pageY - canvasElt.offsetTop) * (initialHeight/canvasElt.offsetHeight) ;
			if(moveX > 370 && moveX < 370+550 && moveY > 400 && moveY < 400+96){
				menu.setPage('choiceLvl');
				menu.setChoice(0);
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 560 && moveY < 560+96){
				menu.setPage('help');
				menu.setChoice(0);
			}
			else{
				menu.setChoice(0);
			}
			
		}
		else if(menu.getPage() === "choiceLvl"){
			moveX = (touches[0].pageX - canvasElt.offsetLeft) * (initialWidth/canvasElt.offsetWidth) ;
			moveY = (touches[0].pageY - canvasElt.offsetTop) * (initialHeight/canvasElt.offsetHeight) ;
			if(moveX > 370 && moveX < 370+550 && moveY > 320 && moveY < 320+96){
				difficulty = "easy";
				menu.setPage('game');
				menu.setChoice(0);
				player = new Snake(3*32,2*32,'right');
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 420 && moveY < 420+96){
				difficulty = "normal";
				menu.setPage('game');
				menu.setChoice(0);
				player = new Snake(3*32,2*32,'right');
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 520 && moveY < 520+96){
				difficulty = "hard";
				menu.setPage('game');
				menu.setChoice(0);
				player = new Snake(3*32,2*32,'right');
			}
			else if(moveX > 370 && moveX < 370+550 && moveY > 620 && moveY < 620+96){
				menu.setPage('home');
				menu.setChoice(0);
			}
			else{
				menu.setChoice(0);
			}
		}
		else if(menu.getPage() === 'help'){
			menu.setPage("home");
			menu.setChoice(0);

		}
		else if(menu.getPage() === 'game'){
			menu.setKeyPressed(false);
			moveX = 0;
			moveY = 0; 
		}
		else if(menu.getPage() === "gameOver"){
			if(!menu.isKeyPressed()){
				menu.setPage("home");
			}else{
				menu.setKeyPressed(false);
			}
		}
	},true);
	/* *************************** END OF TACTIL ********************************* */


	/* ***************************** KEYBOARD ************************************ */

	/* ******* Key up ********** */
	window.addEventListener('keyup', function(e){

		if(e.keyCode === 13){

			if(menu.getPage() === 'preHome'){
				menu.setPage('home');
				menu.setChoice(1);
			}
			else if(menu.getPage() === 'home'){
				if(menu.getChoice() == 1){
					menu.setPage('choiceLvl');
					menu.setChoice(1);
				}
				else if(menu.getChoice() == 2){
					menu.setPage('help');
					menu.setChoice(1);
				}
			}
			else if(menu.getPage() === 'choiceLvl'){
				if(menu.getChoice() == 1){
					difficulty = "easy";
					menu.setChoice(1);
					menu.setPage('game');
					player = new Snake(3*32,2*32,'right');
				}
				else if(menu.getChoice() == 2){
					difficulty = "normal";
					menu.setChoice(1);
					menu.setPage('game');
					player = new Snake(3*32,2*32,'right');
				}
				else if(menu.getChoice() === 3){
					difficulty = "hard";
					menu.setChoice(1);
					menu.setPage('game');
					player = new Snake(3*32,2*32,'right');
				}
				else if(menu.getChoice() == 4){
					menu.setChoice(1);
					menu.setPage('home');
				}
			}
			else if(menu.getPage() === 'help'){
				menu.setPage('home');
				menu.setChoice(1);
			}
			else if(menu.getPage() === 'gameOver'){
				menu.setPage('home');
				menu.setChoice(1);
			}
		}
		else if(e.keyCode === 38){
			if(menu.getPage() === 'home' || menu.getPage() ==='choiceLvl' || menu.getPage() === 'help'){
				if(menu.getChoice() > 1){
					menu.setChoice(menu.getChoice()-1);
				}
			}
		}
		else if(e.keyCode === 40){
			if(menu.getPage() === 'home' || menu.getPage() ==='choiceLvl' || menu.getPage() === 'help'){
				menu.setChoice(menu.getChoice()+1);
			}
		}
		else if(menu.getPage() === "game"){
			if(menu.isPause()){
				menu.setPause(false);
			}
		}
	},false);


	/* ******* Key down ********* */
	window.addEventListener('keydown', function(e) {
		if(menu.getPage() === 'game'){

			if(e.keyCode === 37){
				if(player.getBonus() === 'reverse'){ player.move('right'); }
				else{player.move('left');}
			}
			else if(e.keyCode === 39){
				if(player.getBonus() === 'reverse'){ player.move('left'); }
				else{ player.move('right'); }
			}
			else if(e.keyCode === 38){
				if(player.getBonus() === 'reverse'){ player.move('down'); }
				else{ player.move('up'); }
			}
			else if (e.keyCode === 40){
				if(player.getBonus() === 'reverse'){ player.move('up'); }
				else{ player.move('down'); }
			}
		}
	}, false);


	// ********** Resize **********
	window.addEventListener("resize",function(e){

		if(document.body.clientWidth*(initialHeight / initialWidth) < document.body.clientHeight){
			canvasElt.style.width = "100%";
			canvasElt.style.height = "auto";
		}
		else{
			canvasElt.style.height = "100%";
			canvasElt.style.width = "auto";
		}
	});


	// ********** FullScreen **********
	document.getElementById("fullscreen").addEventListener('touchend', function(e){
		e.preventDefault();
		let touches = e.changedTouches;
		if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement){
			if(consoleElt.requestFullscreen) {
				consoleElt.requestFullscreen();
			}
			else if(consoleElt.mozRequestFullScreen) {
				consoleElt.mozRequestFullScreen();
			}
			else if(consoleElt.webkitRequestFullscreen) {
				consoleElt.webkitRequestFullscreen();
			}
		}
		else{
			if(document.cancelFullScreen) {
				document.cancelFullScreen();
			}
			else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}		
	}, true);

	document.getElementById("fullscreen").addEventListener("click",function(e){
		e.preventDefault();
		if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement){
			if(consoleElt.requestFullscreen) {
				consoleElt.requestFullscreen();
			}
			else if(consoleElt.mozRequestFullScreen) {
				consoleElt.mozRequestFullScreen();
			}
			else if(consoleElt.webkitRequestFullscreen) {
				consoleElt.webkitRequestFullscreen();
			}
		}
		else{
			if(document.cancelFullScreen) {
				document.cancelFullScreen();
			}
			else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	});

	mainLoop();
});