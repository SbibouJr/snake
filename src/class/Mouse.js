import { SPRITES } from './ResourceManager';

class Mouse {
	constructor() {
		this._pos = {
			x: 0,
			y: 0,
		};
		this._activate = false;
		this._timeActivate = Date.now();
		this._timeAnim = Date.now();
		this._timeMove = Date.now();
		this._timeChangeDir = Date.now();
		this._nextChangeDir = (Math.floor((5000 - 1000) * Math.random()) + 1000);
		this._direction = 'right';
		this._moveSpeed = 450;
		this._anim = true;
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

	getDir() {
		return this._direction;
	}

	getTime() {
		return this._timeActivate;
	}

	setTime(time) {
		this._timeActivate = time;
	}

	draw(context, resourceManager) {
		let dir = 0;
		let anim = 0;
		const cpt = Date.now();

		if (cpt - this._timeAnim > this._moveSpeed) {
			this._anim = !this._anim;
			this._timeAnim = Date.now();
		}
		if (this._anim) {
			anim = 0;
		} else {
			anim = 32;
		}

		if (this._direction === 'right') {
			dir = 0;
		} else if (this._direction === 'left') {
			dir = 32;
		} else if (this._direction === 'up') {
			dir = 64;
		} else if (this._direction === 'down') {
			dir = 96;
		}

		context.drawImage(resourceManager.getSprite(SPRITES.MOUSE), dir, anim, 32, 32, this._pos.x, this._pos.y, 32, 32);
	}

	maj(walls) {
		const cpt = Date.now();

		if (this._activate && cpt - this._timeActivate > 10000) {
			this._timeActivate = Date.now();
			this._activate = false;
			this._pos.x = 0;
			this._pos.y = 0;
		} else if (!this._activate && cpt - this._timeActivate > 30000) {
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

			this._timeActivate = Date.now();
			this._activate = true;
		}

		if (this._activate) {
			if (cpt - this._timeChangeDir > this._nextChangeDir) {
				this.changeDir(walls);
				this._nextChangeDir = (Math.floor((5000 - 2000) * Math.random()) + 2000);
				this._timeChangeDir = Date.now();
			}
			if (cpt - this._timeMove > this._moveSpeed) {
				if (this._direction === 'up') {
					this._pos.y += 32;
				} else if (this._direction === 'down') {
					this._pos.y -= 32;
				} else if (this._direction === 'left') {
					this._pos.x -= 32;
				} else if (this._direction === 'right') {
					this._pos.x += 32;
				}
				this._timeMove = Date.now();
			}
		}
	}

	changeDir(walls) {
		let isFree = false;
		let newDir = 0;

		while (!isFree) {
			newDir = parseInt(Math.floor((4 - 0) * Math.random()) + 0, 10);
			isFree = true;
			for (let i = 0; i < walls.length; i += 1) {
				if (newDir === 0) {
					if (walls[i].getPosX() === this._pos.x && walls[i].getPosY() === this._pos.y - 32) {
						isFree = false;
						i = walls.length;
					}
				} else if (newDir === 1) {
					if (walls[i].getPosX() === this._pos.x && walls[i].getPosY() === this._pos.y + 32) {
						isFree = false;
						i = walls.length;
					}
				} else if (newDir === 2) {
					if (walls[i].getPosX() === this._pos.x - 32 && walls[i].getPosY() === this._pos.y) {
						isFree = false;
						i = walls.length;
					}
				} else if (newDir === 3) {
					if (walls[i].getPosX() === this._pos.x + 32 && walls[i].getPosY() === this._pos.y) {
						isFree = false;
						i = walls.length;
					}
				}
			}
		}

		switch (newDir) {
			case 0:
				this._direction = 'up';
				break;
			case 1:
				this._direction = 'down';
				break;
			case 2:
				this._direction = 'left';
				break;
			case 3:
				this._direction = 'right';
				break;
			default:
		}
	}
}

export default Mouse;
