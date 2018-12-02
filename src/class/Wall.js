class Wall {
	constructor(x, y) {
		this._pos = {
			x,
			y,
		};
	}

	getPosX() {
		return this._pos.x;
	}

	getPosY() {
		return this._pos.y;
	}
}

export default Wall;
