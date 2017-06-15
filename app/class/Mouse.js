
function Mouse(){

	let _pos = { x:0, y:0 };
	let _activate = false;
	let _timeActivate = Date.now();
	let _timeAnim =  Date.now();
	let _timeMove =  Date.now();
	let _timeChangeDir =  Date.now();
	let _nextChangeDir = (Math.floor((5000-1000)*Math.random())+1000);
	let _dir = "right";
	let _moveSpeed = 450;
	let _anim = true;


	/*
	****************************************************
	******************* IS ACTIVATE ********************
	****************************************************
	*/
	this.isActivate = function(){
		return _activate;
	}


	/* *************************************************** 
	******************** GET POS *************************
	/* ************************************************ */
	this.getPosX = function(){
		return _pos.x;
	}
	this.getPosY = function(){
		return _pos.y;
	}


	/* *************************************************** 
	********************** GET DIR ***********************
	/* ************************************************ */
	this.getDir = function(){
		return _dir;
	}


	/* *************************************************** 
	******************** GET/SET TIME *********************
	/* ************************************************ */
	this.getTime = function(){
		return _timeActivate;
	}
	this.setTime = function(p_time){
		return _timeActivate = p_time;
	}


	/* ******************************************** 
	***************** DRAW MOUSE ******************
	/* ***************************************** */
	this.draw = function(p_ctx, p_resMgr){

		let dir = 0;
		let anim = 0;
		let cpt = Date.now();

		if(cpt - _timeAnim > _moveSpeed){
			_anim = !_anim;
			_timeAnim = Date.now();
		}
		if(_anim){
			anim = 0;
		}
		else{
			anim = 32;
		}

		if(_dir === "right"){
			dir = 0;
		}
		else if(_dir === "left"){
			dir = 32;
		}
		else if(_dir === "up"){
			dir = 64;
		}
		else if(_dir === "down"){
			dir = 96;
		}

		p_ctx.drawImage(p_resMgr.getSprite("mouse"), dir, anim, 32, 32, _pos.x, _pos.y, 32, 32);

	}


	/* ******************************************** 
	********************* MAJ *********************
	/* ***************************************** */
	this.maj = function(p_walls){

		let cpt = Date.now();

		if(_activate && cpt-_timeActivate > 10000){
			_timeActivate = Date.now();
			_activate = false;
			_pos.x = 0;
			_pos.y = 0;
		}
		else if(!_activate && cpt-_timeActivate > 30000){

			let isFree = false;
			let newX = 0;
			let newY = 0;

			while(!isFree){

				newX = (Math.floor((40-0)*Math.random())+0)*32;
				newY = (Math.floor((24-0)*Math.random())+0)*32;
				isFree = true;
				for(let i = 0 ; i < p_walls.length; i++){
					if(p_walls[i].getPosX() === newX && p_walls[i].getPosY() === newY){
						isFree = false;
						i = p_walls.length;
					}
				}
			}
			_pos.x = newX;
			_pos.y = newY;

			_timeActivate = Date.now();
			_activate = true;
		}

		if(_activate){
			if(cpt - _timeChangeDir > _nextChangeDir){
				this.changeDir(p_walls);
				_nextChangeDir = (Math.floor((5000-2000)*Math.random())+2000);
				_timeChangeDir = Date.now();
			}
			if(cpt - _timeMove > _moveSpeed){
				if(_dir === "up"){
					_pos.y += 32;
				}
				else if(_dir === "down"){
					_pos.y -= 32;
				}
				else if(_dir === "left"){
					_pos.x -= 32;
				}
				else if(_dir === "right"){
					_pos.x += 32;
				}
				_timeMove = Date.now();
			}
		}
	}


	/* ******************************************************************* 
	************************** CHANGE DIRECTION **************************
	/* **************************************************************** */
	this.changeDir = function(p_walls){

		let isFree = false;
		let newDir = 0;

		while(!isFree){

			newDir = parseInt(Math.floor((4-0)*Math.random())+0);
			isFree = true;
			for(let i = 0 ; i < p_walls.length; i++){
				if(newDir === 0){
					if(p_walls[i].getPosX() === _pos.x && p_walls[i].getPosY() === _pos.y-32){
						isFree = false;
						i = p_walls.length;
					}
				}
				else if(newDir === 1){
					if(p_walls[i].getPosX() === _pos.x && p_walls[i].getPosY() === _pos.y+32){
						isFree = false;
						i = p_walls.length;
					}
				}
				else if(newDir === 2){
					if(p_walls[i].getPosX() === _pos.x-32 && p_walls[i].getPosY() === _pos.y){
						isFree = false;
						i = p_walls.length;
					}
				}
				else if(newDir === 3){
					if(p_walls[i].getPosX() === _pos.x+32 && p_walls[i].getPosY() === _pos.y){
						isFree = false;
						i = p_walls.length;
					}
				}
			}

		}

		switch(newDir){
			case 0:
				_dir = "up";
				break;
			case 1:
				_dir = "down";
				break;
			case 2:
				_dir = "left";
				break;
			case 3:
				_dir = "right";
				break;
		}
	}
}
