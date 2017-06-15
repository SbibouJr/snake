
function Wall(p_newX, p_newY){

	let _pos = { x:p_newX , y:p_newY };


	/*
	*************************************************
	******************* POSITION ********************
	*************************************************
	*/
	this.getPosX = function(){
		return _pos.x;
	}
	this.getPosY = function(){
		return _pos.y;
	}
}