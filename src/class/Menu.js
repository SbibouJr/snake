import { STATE, KEY } from '../config/app';
import { DIFFICULTY } from '../config/levels';
import { SPRITES } from './ResourceManager';
import Snake from './Snake';

/*
 * Menu class allows you to manage the
 * different interfaces (Menu, Info, Button)
 *
*/
class Menu {
	/*
	 *
	 * Constructor
	 *
	*/
	constructor() {
		this._tactilEvent = {
			moveX: 0,
			moveY: 0,
		};
		this._animIntro = Date.now();
		this._timeBonus = Date.now();
		this._bonus = false;
		this._alpha = 0;
		this._dirAlpha = false;
		this._pause = true;
		this._over = false;
		this._keyPressed = false;

		this._choice = 0;
		this._maxChoice = 0;
	}

	/*
	 *
	 * Initialization of Events
	 *
	*/
	initEvents(app) {
		this._tactilEvents(app);
		this._keyboardEvents(app);
	}

	/*
	 *
	 * Draw Menu
	 *
	*/
	draw(app) {
		if (app.getState() === STATE.INTRO) {
			this._drawIntro(app);
		} else if (app.getState() === STATE.BEFORE_HOME) {
			this._drawBeforeHome(app.getGameEngine(), app.getResourceManager());
		} else if (app.getState() === STATE.HOME) {
			this._drawHome(app.getGameEngine(), app.getResourceManager());
		} else if (app.getState() === STATE.CHOICE_OF_LEVEL) {
			this._drawChoiceLvl(app.getGameEngine(), app.getResourceManager());
		} else if (app.getState() === STATE.HELP) {
			this._drawHelp(app.getGameEngine(), app.getResourceManager());
		} else if (app.getState() === STATE.GAME_OVER) {
			this._drawGameOver(app.getGameEngine(), app.getGame().getPlayer().getScore());
		} else if (app.getState() === STATE.GAME) {
			if (this.isPause()) {
				this._drawPause(app.getGameEngine());
			}
			this._drawScore(app.getGameEngine(), app.getGame().getPlayer().getScore(), app.getGame().getPlayer().getTextBonus());
		}
	}

	/*
   *
   * Active Bonus
   *
  */
	activeBonus(bonus) {
		this._bonus = true;
		if (typeof bonus === 'undefined') {
			bonus = 'none';
		}
		if (bonus === 'reverse') {
			this._timeBonus = Date.now() + 7000;
		} else {
			this._timeBonus = Date.now();
		}
	}

	/*
   *
   * Set Key Pressed
   *
  */
	setKeyPressed(keyPressed) {
		this._keyPressed = keyPressed;
	}

	/*
   *
   * Is Key Pressed
   *
  */
	isKeyPressed() {
		return this._keyPressed;
	}

	/*
   *
   * Set Pause
   *
  */
	setPause(pause) {
		this._pause = pause;
	}

	/*
   *
   * Set Pause
   *
  */
	isPause() {
		return this._pause;
	}

	/*
   *
   * Set Game Over
   *
  */
	setGameOver(over) {
		this._over = over;
	}

	/*
   *
   * Set Game Over
   *
  */
	isGameOver() {
		return this._over;
	}

	/*
   *
   * Set Choice
   *
  */
	_setChoice(newChoix) {
		if (newChoix >= 0 && newChoix <= this._maxChoice) {
			this._choice = newChoix;
		}
	}

	/*
   *
   * Set Choice
   *
  */
	_getChoice() {
		return this._choice;
	}

	/*
   *
   * Draw Help
   *
  */
	_drawScore(gameEngine, score, bonus) {
		let text = '';
		if (this._bonus) {
			const cpt = Date.now();
			if (cpt - this._timeBonus < 3000) {
				text = bonus;
			} else {
				this._bonus = false;
			}
		}
		gameEngine.drawText(`Score : ${score}`, 20, 60, 'black', '60px', 1, 0, 0, 'black', 'bold Calibri,Geneva,Arial');
		gameEngine.drawText(text, 40, 120, 'red', '50px', 1, 0, 0, 'black', 'Calibri,Geneva,Arial');
	}

	/*
   *
   * Draw Pause
   *
  */
	_drawPause(gameEngine) {
		const font = 'bold Calibri,Geneva,Arial';
		const color = 'rgb(255,255,255)';
		gameEngine.drawText('appuyer sur une touche ', 80, gameEngine._canvasElt.height - 200, color, '80px', this._alpha < 0 ? 0 : this._alpha, 0, 0, 'black', font);
		gameEngine.drawText('ou toucher l\'ecran ', 500, gameEngine._canvasElt.height - 80, color, '80px', this._alpha < 0 ? 0 : this._alpha, 0, 0, 'black', font);
		if (this._dirAlpha) {
			if (this._alpha < 1) {
				this._alpha += 0.01;
			} else {
				this._alpha = 1;
				this._dirAlpha = false;
			}
		} else if (this._alpha > 0) {
				this._alpha -= 0.01;
		} else {
			this._alpha = 0;
			this._dirAlpha = true;
		}
	}

	/*
   *
   * Draw Game Over
   *
  */
	_drawGameOver(gameEngine, score) {
		gameEngine.drawText('GAME OVER', 290, 150, 'rgb(0,0,0)', '120px', 1, 0, 0, 'black', 'bold Arial');
		gameEngine.drawText(`Votre score : ${score}`, 425 - (score.toString().length * 25), 350, 'rgb(255,0,0)', '80px', 1, 0, 0, 'black', 'bold Arial');

		gameEngine.drawText('appuyer sur entrée ', 400, gameEngine._canvasElt.height - 140, 'rgb(0,0,0)', '60px', this._alpha < 0 ? 0 : this._alpha, 0, 0, 'black', 'bold Arial');
		gameEngine.drawText('ou toucher l\'ecran ', 410, gameEngine._canvasElt.height - 80, 'rgb(0,0,0)', '60px', this._alpha < 0 ? 0 : this._alpha, 0, 0, 'black', 'bold Arial');

		if (this._dirAlpha) {
			if (this._alpha < 1) {
				this._alpha += 0.01;
			} else {
				this._dirAlpha = false;
				this._alpha = 1;
			}
		} else if (this._alpha > 0) {
				this._alpha -= 0.01;
		} else {
			this._dirAlpha = true;
			this._alpha = 0;
		}
	}

	/*
   *
   * Draw Intro
   *
  */
	_drawIntro(app) {
		app.getGameEngine().drawImage(app.getResourceManager().getSprite(SPRITES.BACKGROUND_INTRO), 0, 0, app.getGameEngine()._canvasElt.width, app.getGameEngine()._canvasElt.height);
		app.getGameEngine().drawRect('rgb(0,0,0)', 0, 0, app.getGameEngine()._canvasElt.width, app.getGameEngine()._canvasElt.height, this._alpha < 0 ? 0 : this._alpha);

		const cpt = Date.now();
		if (cpt - this._animIntro > 1000) {
			if (this._alpha >= 1) {
				app.setState(STATE.BEFORE_HOME);
				this._alpha = 1;
			} else {
				this._alpha += 0.01;
			}
		}
	}

	/*
   *
   * Draw Before Home
   *
  */
	_drawBeforeHome(gameEngine, resourceManager) {
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BACKGROUND_HOME), 0, 0, gameEngine._canvasElt.width, gameEngine._canvasElt.height);

		gameEngine.drawText(
			'appuyer sur entrée ou toucher',
			80, gameEngine._canvasElt.height - 200,
			'rgb(0,0,0)', '80px',
			this._alpha < 0 ? 0 : this._alpha,
			0, 0, 'black',
			'bold Calibri,Geneva,Arial',
		);
		gameEngine.drawText('l\'ecran pour jouer ...', 300, gameEngine._canvasElt.height - 80, 'rgb(0,0,0)', '80px', this._alpha < 0 ? 0 : this._alpha, 0, 0, 'black', 'bold Calibri,Geneva,Arial');
		if (this._dirAlpha) {
			if (this._alpha < 1) {
				this._alpha += 0.01;
			} else {
				this._dirAlpha = false;
				this._alpha = 1;
			}
		} else if (this._alpha > 0) {
			this._alpha -= 0.01;
		} else {
			this._dirAlpha = true;
			this._alpha = 0;
		}
	}

	/*
   *
   * Draw Home
   *
  */
	_drawHome(gameEngine, resourceManager) {
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BACKGROUND_HOME), 0, 0, gameEngine._canvasElt.width, gameEngine._canvasElt.height);
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BUTTON_PLAY), 370, 400);
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BUTTON_HELP), 370, 560);
		if (this._choice === 1) {
			gameEngine.drawImage(resourceManager.getSprite(SPRITES.IMAGE_CHOICE), 370 - resourceManager.getSprite(SPRITES.IMAGE_CHOICE).width, 400);
		} else if (this._choice === 2) {
			gameEngine.drawImage(resourceManager.getSprite(SPRITES.IMAGE_CHOICE), 370 - resourceManager.getSprite(SPRITES.IMAGE_CHOICE).width, 560);
		}
	}

	/*
   *
   * Draw Choice of the Level
   *
  */
	_drawChoiceLvl(gameEngine, resourceManager) {
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BACKGROUND_HOME), 0, 0, gameEngine._canvasElt.width, gameEngine._canvasElt.height);
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BUTTON_EASY), 370, 320);
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BUTTON_NORMAL), 370, 420);
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BUTTON_HARD), 370, 520);
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BUTTON_RETURN), 370, 620);
		if (this._choice === 1) {
			gameEngine.drawImage(resourceManager.getSprite(SPRITES.IMAGE_CHOICE), 370 - resourceManager.getSprite(SPRITES.IMAGE_CHOICE).width, 320);
		} else if (this._choice === 2) {
			gameEngine.drawImage(resourceManager.getSprite(SPRITES.IMAGE_CHOICE), 370 - resourceManager.getSprite(SPRITES.IMAGE_CHOICE).width, 420);
		} else if (this._choice === 3) {
			gameEngine.drawImage(resourceManager.getSprite(SPRITES.IMAGE_CHOICE), 370 - resourceManager.getSprite(SPRITES.IMAGE_CHOICE).width, 520);
		} else if (this._choice === 4) {
			gameEngine.drawImage(resourceManager.getSprite(SPRITES.IMAGE_CHOICE), 370 - resourceManager.getSprite(SPRITES.IMAGE_CHOICE).width, 620);
		}
	}

	/*
   *
   * Draw Help
   *
  */
	_drawHelp(gameEngine, resourceManager) { // eslint-disable-line class-methods-use-this
		gameEngine.drawImage(resourceManager.getSprite(SPRITES.BACKGROUND_HELP), 0, 0, gameEngine._canvasElt.width, gameEngine._canvasElt.height);
	}

	/*
	 *
	 * Tactil Events
	 *
	*/
	_tactilEvents(app) {
		/*
		 *
		 * Touch Start / Move
		 *
		*/
		const touchMove = (e) => {
			e.preventDefault();
			const touches = e.changedTouches;

			if (app.getState() === STATE.HOME) {
				this._tactilEvent.moveX = (touches[0].pageX - app.getGameEngine()._canvasElt.offsetLeft) * (app.INITIAL_WIDTH / app.getGameEngine()._canvasElt.offsetWidth);
				this._tactilEvent.moveY = (touches[0].pageY - app.getGameEngine()._canvasElt.offsetTop) * (app.INITIAL_HEIGHT / app.getGameEngine()._canvasElt.offsetHeight);
				if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 400 && this._tactilEvent.moveY < 400 + 96
				) {
					this._setChoice(1);
				} else if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 560 && this._tactilEvent.moveY < 560 + 96
				) {
					this._setChoice(2);
				} else {
					this._setChoice(0);
				}
			} else if (app.getState() === STATE.CHOICE_OF_LEVEL) {
				this._tactilEvent.moveX = (touches[0].pageX - app.getGameEngine()._canvasElt.offsetLeft) * (app.INITIAL_WIDTH / app.getGameEngine()._canvasElt.offsetWidth);
				this._tactilEvent.moveY = (touches[0].pageY - app.getGameEngine()._canvasElt.offsetTop) * (app.INITIAL_HEIGHT / app.getGameEngine()._canvasElt.offsetHeight);
				if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 320 && this._tactilEvent.moveY < 320 + 96
				) {
					this._setChoice(1);
				} else if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 420 && this._tactilEvent.moveY < 420 + 96
				) {
					this._setChoice(2);
				} else if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 520 && this._tactilEvent.moveY < 520 + 96
				) {
					this._setChoice(3);
				} else if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 620 && this._tactilEvent.moveY < 620 + 96
				) {
					this._setChoice(4);
				} else {
					this._setChoice(0);
				}
			}
		};

		/*
		 *
		 * Touch End
		 *
		*/
		const touchEnd = (e) => {
			e.preventDefault();
			const touches = e.changedTouches;
			if (app.getState() === STATE.BEFORE_HOME) {
				app.setState(STATE.HOME);
				this._maxChoice = 2;
			} else if (app.getState() === STATE.HOME) {
				this._tactilEvent.moveX = (touches[0].pageX - app.getGameEngine()._canvasElt.offsetLeft) * (app.INITIAL_WIDTH / app.getGameEngine()._canvasElt.offsetWidth);
				this._tactilEvent.moveY = (touches[0].pageY - app.getGameEngine()._canvasElt.offsetTop) * (app.INITIAL_HEIGHT / app.getGameEngine()._canvasElt.offsetHeight);
				if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 400 && this._tactilEvent.moveY < 400 + 96
				) {
					app.setState(STATE.CHOICE_OF_LEVEL);
					this._maxChoice = 4;
					this._setChoice(0);
				} else if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 560 && this._tactilEvent.moveY < 560 + 96
				) {
					app.setState(STATE.HELP);
					this._maxChoice = 0;
					this._setChoice(0);
				} else {
					this._setChoice(0);
				}
			} else if (app.getState() === STATE.CHOICE_OF_LEVEL) {
				this._tactilEvent.moveX = (touches[0].pageX - app.getGameEngine()._canvasElt.offsetLeft) * (app.INITIAL_WIDTH / app.getGameEngine()._canvasElt.offsetWidth);
				this._tactilEvent.moveY = (touches[0].pageY - app.getGameEngine()._canvasElt.offsetTop) * (app.INITIAL_HEIGHT / app.getGameEngine()._canvasElt.offsetHeight);
				if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 320 && this._tactilEvent.moveY < 320 + 96
				) {
					app.setDifficulty(DIFFICULTY.EASY);
					app.setState(STATE.GAME);
					this._maxChoice = 0;
					this._setChoice(0);
					app.getGame().setPlayer(new Snake(3 * 32, 2 * 32, 'right'));
				} else if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 420 && this._tactilEvent.moveY < 420 + 96
				) {
					app.setDifficulty(DIFFICULTY.NORMAL);
					app.setState(STATE.GAME);
					this._maxChoice = 0;
					this._setChoice(0);
					app.getGame().setPlayer(new Snake(3 * 32, 2 * 32, 'right'));
				} else if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 520 && this._tactilEvent.moveY < 520 + 96
				) {
					app.setDifficulty(DIFFICULTY.HARD);
					app.setState(STATE.GAME);
					this._maxChoice = 0;
					this._setChoice(0);
					app.getGame().setPlayer(new Snake(3 * 32, 2 * 32, 'right'));
				} else if (
					this._tactilEvent.moveX > 370 && this._tactilEvent.moveX < 370 + 550
					&& this._tactilEvent.moveY > 620 && this._tactilEvent.moveY < 620 + 96
				) {
					app.setState(STATE.HOME);
					this._maxChoice = 2;
					this._setChoice(0);
				} else {
					this._setChoice(0);
				}
			} else if (app.getState() === STATE.HELP) {
				app.setState(STATE.HOME);
				this._maxChoice = 2;
				this._setChoice(0);
			} else if (app.getState() === STATE.GAME) {
				this.setKeyPressed(false);
				this._tactilEvent.moveX = 0;
				this._tactilEvent.moveY = 0;
			} else if (app.getState() === STATE.GAME_OVER) {
				if (!this.isKeyPressed()) {
					app.setState(STATE.HOME);
					this._maxChoice = 2;
				} else {
					this.setKeyPressed(false);
				}
			}
		};
		app.getGameEngine()._consoleElt.addEventListener('touchstart', touchMove, false);
		app.getGameEngine()._consoleElt.addEventListener('touchmove', touchMove, false);
		app.getGameEngine()._consoleElt.addEventListener('touchend', touchEnd, true);
	}

	/*
	*
	* Keyboard Events
	*
	*/
	_keyboardEvents(app) {
		window.addEventListener('keyup', (e) => {
			if (app.getState() === STATE.GAME) {
				if (this.isPause()) {
					this.setPause(false);
				}
			}
			if (e.keyCode === KEY.ENTER) {
				if (app.getState() === STATE.BEFORE_HOME) {
					app.setState(STATE.HOME);
					this._maxChoice = 2;
					this._setChoice(1);
				} else if (app.getState() === STATE.HOME) {
					if (this._getChoice() === 1) {
						app.setState(STATE.CHOICE_OF_LEVEL);
						this._maxChoice = 4;
						this._setChoice(1);
					} else if (this._getChoice() === 2) {
						app.setState(STATE.HELP);
						this._maxChoice = 0;
						this._setChoice(1);
					}
				} else if (app.getState() === STATE.CHOICE_OF_LEVEL) {
					if (this._getChoice() === 1) {
						app.setState(STATE.GAME);
						this._setChoice(1);
						this._maxChoice = 0;
						app.setDifficulty(DIFFICULTY.EASY);
						app.getGame().setPlayer(new Snake(3 * 32, 2 * 32, 'right'));
					} else if (this._getChoice() === 2) {
						app.setState(STATE.GAME);
						this._setChoice(1);
						this._maxChoice = 0;
						app.setDifficulty(DIFFICULTY.NORMAL);
						app.getGame().setPlayer(new Snake(3 * 32, 2 * 32, 'right'));
					} else if (this._getChoice() === 3) {
						app.setState(STATE.GAME);
						this._setChoice(1);
						this._maxChoice = 0;
						app.setDifficulty(DIFFICULTY.HARD);
						app.getGame().setPlayer(new Snake(3 * 32, 2 * 32, 'right'));
					} else if (this._getChoice() === 4) {
						this._maxChoice = 2;
						this._setChoice(1);
						app.setState(STATE.HOME);
					}
				} else if (app.getState() === STATE.HELP) {
					app.setState(STATE.HOME);
					this._maxChoice = 2;
					this._setChoice(1);
				} else if (app.getState() === STATE.GAME_OVER) {
					app.setState(STATE.HOME);
					this._maxChoice = 2;
					this._setChoice(1);
				}
			} else if (e.keyCode === KEY.ARROW_TOP) {
				if (app.getState() === STATE.HOME || app.getState() === STATE.CHOICE_OF_LEVEL || app.getState() === STATE.HELP) {
					if (this._getChoice() > 1) {
						this._setChoice(this._getChoice() - 1);
					}
				}
			} else if (e.keyCode === KEY.ARROW_BOTTOM) {
				if (app.getState() === STATE.HOME || app.getState() === STATE.CHOICE_OF_LEVEL || app.getState() === STATE.HELP) {
					this._setChoice(this._getChoice() + 1);
				}
			}
		}, false);
	}
}

export default Menu;
