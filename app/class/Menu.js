
function Menu(){

	let _state = 'intro';
	let _animIntro = Date.now();
	let _timeBonus = Date.now();
	let _bonus = false;
	let _alpha = 0;
	let _dirAlpha = false;
	let _pause  = true;
	let _over = false;
	let _keyPressed = false;

	let _choice = 0;
	let _maxChoice = 0;


	/* *********************************************** 
	***************** GET/SET PAUSE ******************
	/* ******************************************** */
	this.setKeyPressed = function(p_keyPressed){
		_keyPressed = p_keyPressed;
	}
	this.isKeyPressed = function(){
		return _keyPressed;	
	}


	/* ***********************************************
	***************** GET/SET PAUSE ******************
	/* ******************************************** */
	this.setPause = function(p_pause){
		_pause = p_pause;
	}
	this.isPause = function(){
		return _pause;	
	}


	/* ************************************************** 
	***************** GET/SET GAMEOVER ******************
	/* *********************************************** */
	this.setGameOver = function(p_over){
		_over = p_over;
	}
	this.isGameOver = function(){
		return _over;	
	}


	/* *********************************************** 
	***************** GET/SET PAGE *******************
	/* ******************************************** */
	this.setPage = function(p_newPage){
		_state = p_newPage;
		if(_state === 'home'){
			_maxChoice = 2;
		}
		else if(_state === 'choiceLvl'){
			_maxChoice = 4;
		}
		else{
			_maxChoice = 0;
		}
	}
	this.getPage = function(){
		return _state;	
	}


	/* ************************************************ 
	***************** GET/SET CHOICE ******************
	/* ********************************************* */
	this.setChoice = function(p_newChoix){
		if(p_newChoix >= 0 && p_newChoix <= _maxChoice){
			_choice = p_newChoix;
		}
	}
	this.getChoice = function(){
		return _choice;	
	}


	/* *********************************************** 
	***************** DRAW SCORE *********************
	/* ******************************************** */
	this.drawScore = function(p_ctx, p_scr, p_bns){
		p_ctx.font = 'bold 60px Calibri,Geneva,Arial';
		p_ctx.fillStyle = 'black';
		let text = '';
		if(_bonus){
			let cpt = Date.now();
			if(cpt - _timeBonus < 3000){
				text = p_bns;
			}
			else{
				_bonus = false;
			}
		}
		p_ctx.fillText('Score : '+ p_scr,20, 60);
		p_ctx.font = '50px Calibri,Geneva,Arial';
		p_ctx.fillStyle = 'red';
		p_ctx.fillText(text , 40, 120);
	}


	/* ******************************************** 
	***************** DRAW PAUSE ******************
	/* ***************************************** */
	this.drawPause = function(p_cvs, p_ctx){

		// -- MESSAGE PREJEU --
		p_ctx.font = 'bold 80px Calibri,Geneva,Arial';
		p_ctx.fillStyle = 'rgba(255,255,255,'+_alpha+')';
		p_ctx.fillText('appuyer sur une touche ', 80, p_cvs.height-200);
		p_ctx.fillText('ou toucher l\'ecran ',500, p_cvs.height-80);
		if(_dirAlpha){
			if(_alpha < 1){
				_alpha += 0.05;
			}
			else{
				_dirAlpha = false;
				_alpha = 1;
			}
		}
		else{
			if(_alpha > 0){
				_alpha -= 0.05;
			}
			else{
				_dirAlpha = true;
				_alpha = 0;
			}
		}
	}


	/* ***************************************************** 
	******************** DRAW GAMEOVER *********************
	/* ************************************************** */
	this.drawGameOver = function(p_cvs, p_ctx, p_score){

		p_ctx.font = 'bold 120px Arial';
		p_ctx.fillStyle = 'rgba(0,0,0)';
		p_ctx.fillText('GAME OVER', 290, 150);

		p_ctx.font = 'bold 80px Arial';
		p_ctx.fillStyle = 'rgb(255,0,0)';
		p_ctx.fillText('Votre score : ' + p_score,425-(p_score.toString().length * 25), 350);

		p_ctx.fillStyle = 'rgba(0,0,0,'+_alpha+')';
		p_ctx.font = 'bold 60px Arial';
		p_ctx.fillText('appuyer sur entrée ', 400, p_cvs.height-140);
		p_ctx.fillText('ou toucher l\'ecran ',410, p_cvs.height-80);
		if(_dirAlpha){
			if(_alpha < 1){
				_alpha += 0.01;
			}
			else{
				_dirAlpha = false;
				_alpha = 1;
			}
		}
		else{
			if(_alpha > 0){
				_alpha -= 0.01;
			}
			else{
				_dirAlpha = true;
				_alpha = 0;
			}
		}
	}
	

	/* ************************************************** 
	******************** DRAW INTRO *********************
	/* *********************************************** */
	this.drawIntro = function (p_cvs, p_ctx, p_resMgr){
		p_ctx.drawImage(p_resMgr.getSprite("backgroundIntro"),0,0,p_cvs.width,p_cvs.height);
		p_ctx.fillStyle = 'rgba(0,0,0,'  + _alpha + ')';
		p_ctx.fillRect(0,0,p_cvs.width,p_cvs.height);
	
		let cpt = Date.now();
		if(cpt - _animIntro > 1000){
			if(_alpha >= 1){
				_state = 'preHome';
				_alpha = 1;
			}
			else{
				_alpha += 0.01;
			}
		}
	}


	/* ******************************************************* 
	******************** DRAW PREHOME ************************
	/* **************************************************** */
	this.drawPreHome = function(p_cvs, p_ctx, p_resMgr){

		p_ctx.drawImage(p_resMgr.getSprite("backgroundHome"),0,0,p_cvs.width,p_cvs.height);

		// -- MESSAGE PREACCUEIL --
		p_ctx.font = 'bold 80px Calibri,Geneva,Arial';
		p_ctx.fillStyle = 'rgba(0,0,0,'+_alpha+')';
		p_ctx.fillText('appuyer sur entrée ou toucher', 80, p_cvs.height-200);
		p_ctx.fillText('l\'ecran pour jouer ...',300, p_cvs.height-80);
		if(_dirAlpha){
			if(_alpha < 1){
				_alpha += 0.01;
			}
			else{
				_dirAlpha = false;
				_alpha = 1;
			}
		}
		else{
			if(_alpha > 0){
				_alpha -= 0.01;
			}
			else{
				_dirAlpha = true;
				_alpha = 0;
			}
		}
	}


	/* ************************************************** 
	******************** DRAW HOME ********************** 
	/* *********************************************** */
	this.drawHome = function(p_cvs, p_ctx, p_resMgr){
		p_ctx.drawImage(p_resMgr.getSprite("backgroundHome"),0,0,p_cvs.width,p_cvs.height);
		p_ctx.drawImage(p_resMgr.getSprite("buttonPlay"),370,400);
		p_ctx.drawImage(p_resMgr.getSprite("buttonHelp"),370,560);
		if(_choice == 1){
			p_ctx.drawImage(p_resMgr.getSprite("imgChoice"),370-p_resMgr.getSprite("imgChoice").width,400);
		}
		else if(_choice == 2){
			p_ctx.drawImage(p_resMgr.getSprite("imgChoice"),370-p_resMgr.getSprite("imgChoice").width,560);
		}
	}


	/* ****************************************************** 
	******************** DRAW CHOICELVL *********************
	/* *************************************************** */
	this.drawChoiceLvl = function(p_cvs, p_ctx, p_resMgr){
		p_ctx.drawImage(p_resMgr.getSprite("backgroundHome"),0,0,p_cvs.width,p_cvs.height);
		p_ctx.drawImage(p_resMgr.getSprite("buttonEasy"),370,320);
		p_ctx.drawImage(p_resMgr.getSprite("buttonNormal"),370,420);
		p_ctx.drawImage(p_resMgr.getSprite("buttonHard"),370,520);
		p_ctx.drawImage(p_resMgr.getSprite("buttonReturn"),370,620);
		if(_choice == 1){
			p_ctx.drawImage(p_resMgr.getSprite("imgChoice"),370-p_resMgr.getSprite("imgChoice").width,320);
		}
		else if(_choice == 2){
			p_ctx.drawImage(p_resMgr.getSprite("imgChoice"),370-p_resMgr.getSprite("imgChoice").width,420);
		}
		else if(_choice == 3){
			p_ctx.drawImage(p_resMgr.getSprite("imgChoice"),370-p_resMgr.getSprite("imgChoice").width,520);
		}
		else if(_choice == 4){
			p_ctx.drawImage(p_resMgr.getSprite("imgChoice"),370-p_resMgr.getSprite("imgChoice").width,620);
		}
	}


	/* ************************************************** 
	******************** DRAW HELP **********************
	/* *********************************************** */
	this.drawHelp = function(p_cvs, p_ctx, p_resMgr){
		p_ctx.drawImage(p_resMgr.getSprite("backgroundHelp"),0,0,p_cvs.width,p_cvs.height);
	}


	/* ********************************************** 
	***************** ACTIVE BONUS ******************
	/* ******************************************* */
	this.activeBonus = function(p_bns){
		_bonus = true;
		if(typeof p_bns == 'undefined'){
			p_bns = 'none';
		}
		if(p_bns == 'reverse'){
			_timeBonus = Date.now()+7000;
		}
		else{
			_timeBonus = Date.now();
		}
	}
}
