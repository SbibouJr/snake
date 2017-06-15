
function Point(){

	let _color = 'blue';
	let _pos = { x:0 , y:0 };
	let _activate = false;
	let _timeActivate = Date.now();


	/*
	****************************************************
	******************* IS ACTIVATE ********************
	****************************************************
	*/
	this.isActivate = function(){
		return _activate;
	}


	/*
	******************************************************
	********************** GET POS ***********************
	******************************************************
	*/
	this.getPosX = function(){
		return _pos.x;
	}
	this.getPosY = function(){
		return _pos.y;
	}

	
	/*
	****************************************************
	******************** GET COLOR *********************
	****************************************************
	*/
	this.getColor = function(){
		return _color;
	}


	/*
	******************************************************
	******************** GET/SET TIME *********************
	******************************************************
	*/
	this.getTime = function(){
		return _timeActivate;
	}
	this.setTime = function(p_time){
		_timeActivate = p_time;
	}


	/*
	********************************************
	******************* MAJ ********************
	********************************************
	*/
	this.maj = function(p_walls){

		let cpt = Date.now();
		if(_activate && cpt-_timeActivate > 20000){
			_timeActivate = Date.now();
			_activate = false;
			_color = 'blue';
			_pos.x = 0;
			_pos.y = 0;
		}
		else if(!_activate && cpt-_timeActivate > 3000){
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

			let alt = (Math.floor((100-0)*Math.random())+0);

			if( alt <= 45 ){
				_color = 'blue';
			}
			else if(alt <= 75){
				_color = 'green';
			}
			else{
				_color = 'gold';
			}
			_timeActivate = Date.now();
			_activate = true;
		}
	}
}