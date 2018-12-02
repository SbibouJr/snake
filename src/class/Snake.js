import { SPRITES } from './ResourceManager';

class Snake {
	constructor(x, y, direction) {
		this._score = 0;
		this._textBonus = '';
		this._pos = [
			{
				x,
				y,
			},
			{
				x: x - (1 * 32),
				y,
			},
			{
				x: x - (2 * 32),
				y,
			},
		];
		this._tail = 0;
		this._bonus = 'none';
		this._timeBonus = Date.now();
		this._timePoint = Date.now();
		this._direction = direction;
		this._moveSpeed = 150;
		this._lastDir = direction;
		this._timeAnim = Date.now();
	}

	getPos(index) {
		if (index !== undefined) {
			if (index >= this._pos.length) {
				console.log(`Error: The index ${index} does not exist`); // eslint-disable-line no-console
			} else {
				return this._pos[index];
			}
		}
		return this._pos;
	}

	getScore() {
		return this._score;
	}

	getTextBonus() {
		return this._textBonus;
	}

	move(newDirection) {
		this._direction = newDirection;
	}

	addPoints(color) {
		if (color === 'blue') {
			this._score += 50;
			this._tail += 1;
			this._textBonus = '+ 50 points';
			this._timePoint = Date.now();
		} else if (color === 'green') {
			this._score += 75;
			this._tail += 2;
			this._textBonus = '+ 75 points';
			this._timePoint = Date.now();
		} else if (color === 'gold') {
			this._score += 100;
			this._tail += 3;
			this._textBonus = '+ 100 points';
			this._timePoint = Date.now();
		}
	}

	addBonus(bonus) {
		if (bonus === 'point') {
			this._score += 200;
			this._timeBonus = Date.now();
			this._textBonus = ' *** + 200points ***';
		} else if (bonus === 'reverse') {
			this._bonus = bonus;
			this._timeBonus = Date.now();
			this._textBonus = ' *** INVERSEMENT ***';
		}
	}

	getBonus() {
		return this._bonus;
	}

	addMouse() {
		if (this._pos.length > 3) {
			this._textBonus = ' *** Huuuum une souris ***';
			this._pos.splice(this._pos.length - 1, this._pos.length);
		}
	}

	draw(gameEngine, resourceManager) {
		let reverse = 0;
		if (this._bonus === 'reverse') {
			reverse = 32;
		}
		let head;
		if (this._lastDir === 'right') {
			head = 32;
		} else if (this._lastDir === 'left') {
			head = 64;
		} else if (this._lastDir === 'down') {
			head = 96;
		} else if (this._lastDir === 'up') {
			head = 128;
		}
		for (let i = 0; i < this._pos.length; i += 1) {
			if (i === 0) {
				gameEngine.drawImage(resourceManager.getSprite(SPRITES.SNAKE), head, reverse, 32, 32, this._pos[i].x, this._pos[i].y, 32, 32);
			} else {
				gameEngine.drawImage(resourceManager.getSprite(SPRITES.SNAKE), 0, reverse, 32, 32, this._pos[i].x, this._pos[i].y, 32, 32);
			}
		}
	}

	maj() {
		const tmp = Date.now();
		const tmpBonus = Date.now();
		if (tmpBonus - this._timeBonus > 10000) {
			this._bonus = 'none';
		}
		if (tmpBonus - this._timeBonus > 10000 && tmpBonus - this._timePoint > 10000) {
			this._textBonus = '';
		}
		if (tmp - this._timeAnim > this._moveSpeed) {
			if (this._lastDir === 'left' && this._direction !== 'right') {
				this._lastDir = this._direction;
			} else if (this._lastDir === 'right' && this._direction !== 'left') {
				this._lastDir = this._direction;
			} else if (this._lastDir === 'down' && this._direction !== 'up') {
				this._lastDir = this._direction;
			} else if (this._lastDir === 'up' && this._direction !== 'down') {
				this._lastDir = this._direction;
			}
			if (this._tail > 0) {
				this._pos.push(
					{
						x: this._pos[this._pos.length - 1].x,
						y: this._pos[this._pos.length - 1].y,
					},
				);
				this._tail -= 1;
			}

			for (let i = this._pos.length - 1; i >= 0; i -= 1) {
				if (i === 0) {
					if (this._lastDir === 'left') {
						this._pos[0].x -= 32;
					}
					if (this._lastDir === 'right') {
						this._pos[0].x += 32;
					}
					if (this._lastDir === 'up') {
						this._pos[0].y -= 32;
					}
					if (this._lastDir === 'down') {
						this._pos[0].y += 32;
					}
				} else {
					this._pos[i].x = this._pos[i - 1].x;
					this._pos[i].y = this._pos[i - 1].y;
				}
			}
			this._timeAnim = Date.now();
		}
	}
}

export default Snake;
