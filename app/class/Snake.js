
function Snake(p_newX,p_newY,p_newDir){

	let _score = 0;
	let _textBonus = '';
	let _pos = [ {x:p_newX,y:p_newY},{x:p_newX-1*32,y:p_newY}, {x:p_newX-2*32,y:p_newY}];
	let _tail = 0;
	let _bonus = 'none';
	let _timeBonus = Date.now();
	let _timePoint = Date.now();
	let _dir = p_newDir;
	let _moveSpeed = 150;
	let _lastDir = p_newDir;  
	let _timeAnim = Date.now();


	/* *************************************************** 
	******************** GET POS *************************
	/* ************************************************ */
	this.getPos = function(p_i){
		if(p_i != undefined){
			if( p_i < _pos.length){
				return _pos[p_i];
			}
			else{
				console.log("Error: The index '"+ p_i +"'' does not exist");
			}
		}
		else{
			return _pos;
		}
	}


	/* *************************************************** 
	******************** GET SCORE ***********************
	/* ************************************************ */
	this.getScore = function(){
		return _score;
	}


	/* ****************************************************** 
	******************** GET TEXT BOUNS *********************
	/* *************************************************** */
	this.getTextBonus = function(){
		return _textBonus;
	}


	/* ******************************************** 
	******************** MOVE *********************
	/* ***************************************** */
	this.move = function(p_newDir){
		_dir = p_newDir;
	}


	/* ******************************************** 
	***************** ADD POINTS ******************
	/* ***************************************** */
	this.addPoints = function(p_clr){

		if(p_clr == 'blue'){
			_score += 50;
			_tail += 1;
			_textBonus = '+ 50 points';
			_timePoint = Date.now();
		}
		else if(p_clr == 'green'){
			_score += 75;
			_tail += 2;
			_textBonus = '+ 75 points';
			_timePoint = Date.now();
		}
		else if(p_clr == 'gold'){
			_score += 100;
			_tail += 3;
			_textBonus = '+ 100 points';
			_timePoint = Date.now();
		}
	}


	/* ******************************************** 
	***************** ADD BONUS *******************
	/* ***************************************** */
	this.addBonus = function(p_bns){
		if(p_bns == 'point'){
			_score += 200;
			_timeBonus = Date.now();
			_textBonus = ' *** + 200points ***';
		}
		else if(p_bns == 'reverse'){
			_bonus = p_bns;
			_timeBonus = Date.now();
			_textBonus = ' *** INVERSEMENT ***';
		}
	}
	this.getBonus = function(){
		return _bonus;
	}


	/* ******************************************** 
	***************** ADD MOUSE *******************
	/* ***************************************** */
	this.addMouse = function(){
		if(_pos.length > 3){
			_textBonus = ' *** Huuuum une souris ***';
			_pos.splice(_pos.length-1, _pos.length);
		}
	}


	/* ******************************************** 
	***************** DRAW SNAKE ******************
	/* ***************************************** */
	this.draw = function(p_ctx, p_resMgr){

		let reverse = 0;
		if(_bonus === 'reverse'){
			reverse = 32;
		}
		let head;
		if(_lastDir == 'right'){
			head = 32;
		}
		else if(_lastDir == 'left'){
			head = 64;
		}
		else if(_lastDir == 'down'){
			head = 96;
		}
		else if(_lastDir == 'up'){
			head = 128;
		}
		for(let i = 0; i < _pos.length ;i++){
			if(i == 0){
				p_ctx.drawImage(p_resMgr.getSprite("snake"), head, reverse, 32, 32, _pos[i].x, _pos[i].y, 32, 32);
			}
			else{
				p_ctx.drawImage(p_resMgr.getSprite("snake"), 0, reverse, 32, 32, _pos[i].x, _pos[i].y, 32, 32);
			}
		}
	}

	/* ******************************************** 
	********************* MAJ *********************
	/* ***************************************** */
	this.maj = function(){
		let tmp = Date.now();
		let tmpBonus = Date.now();
		if(tmpBonus-_timeBonus > 10000){
			_bonus = 'none';
		}
		if(tmpBonus-_timeBonus > 10000 && tmpBonus - _timePoint > 10000){
			_textBonus ='';
		}
		if(tmp-_timeAnim > _moveSpeed){
			if(_lastDir === 'left' && _dir != 'right') { 
				_lastDir = _dir;
			}
			else if(_lastDir === 'right' && _dir != 'left') { 
				_lastDir = _dir;
			}
			else if(_lastDir === 'down' && _dir != 'up') { 
				_lastDir = _dir;
			}
			else if(_lastDir === 'up' && _dir != 'down') { 
				_lastDir = _dir;
			}
			if(_tail > 0){
				_pos.push( { x:_pos[_pos.length-1].x, y:_pos[_pos.length-1].y} );
				_tail -= 1;
			}

			for(var i = _pos.length-1; i >= 0 ;i--){
				if(i == 0){
					if(_lastDir == 'left'){
						_pos[0].x -= 32;
					}
					if(_lastDir == 'right'){
						_pos[0].x += 32;
					}
					if(_lastDir == 'up'){
						_pos[0].y -= 32;
					}
					if(_lastDir == 'down'){
						_pos[0].y += 32;
					}
				}
				else{
					_pos[i].x = _pos[i-1].x;
					_pos[i].y = _pos[i-1].y;
				}
			}
			_timeAnim = Date.now();
		}
	}  
}
