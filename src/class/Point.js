class Point {
	constructor() {
		this._color = 'blue';
		this._pos = {
			x: 0,
			y: 0,
		};
		this._activate = false;
		this._timeActivate = Date.now();
	}

	isActivate() {
		return this._activate;
	}

	getPosX() {
		return this._pos.x;
	}

	getPosY() {
		return this._pos.y;
	}

	getColor() {
		return this._color;
	}

	getTime() {
		return this._timeActivate;
	}

	setTime(time) {
		this._timeActivate = time;
	}

	maj(walls) {
		const cpt = Date.now();
		if (this._activate && cpt - this._timeActivate > 20000) {
			this._timeActivate = Date.now();
			this._activate = false;
			this._color = 'blue';
			this._pos.x = 0;
			this._pos.y = 0;
		} else if (!this._activate && cpt - this._timeActivate > 3000) {
			let isFree = false;
			let newX = 0;
			let newY = 0;
			while (!isFree) {
				newX = (Math.floor((40 - 0) * Math.random()) + 0) * 32;
				newY = (Math.floor((24 - 0) * Math.random()) + 0) * 32;
				isFree = true;
				for (let i = 0; i < walls.length; i += 1) {
					if (walls[i].getPosX() === newX && walls[i].getPosY() === newY) {
						isFree = false;
						i = walls.length;
					}
				}
			}
			this._pos.x = newX;
			this._pos.y = newY;

			const alt = (Math.floor((100 - 0) * Math.random()) + 0);

			if (alt <= 45) {
				this._color = 'blue';
			} else if (alt <= 75) {
				this._color = 'green';
			} else {
				this._color = 'gold';
			}
			this._timeActivate = Date.now();
			this._activate = true;
		}
	}
}

export default Point;
