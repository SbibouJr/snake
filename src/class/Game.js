import { groundsList, wallsList } from '../config/levels';
import { STATE, KEY } from '../config/app';

import { SPRITES } from './ResourceManager';
import Snake from './Snake';
import Point from './Point';
import Bonus from './Bonus';
import Mouse from './Mouse';


/*
 *
 * Game class
 *
*/
class Game {
  /*
   *
   * Constructor
   *
  */
  constructor() {
    this._player = new Snake(3 * 32, 2 * 32, 'right');
    this._point = new Point();
    this._bonus = new Bonus();
    this._mouse = new Mouse();

    this._tactilEvent = {
      moveX: 0,
      moveY: 0,
    };
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
   * Draw Game
   *
  */
  draw(app) {
    if (app.getState() === STATE.GAME) {
      for (let i = 0; i < groundsList.length; i += 1) {
        app.getGameEngine()._contextElt.drawImage(app.getResourceManager().getSprite(SPRITES.GROUND), groundsList[i].getPosX(), groundsList[i].getPosY(), 32, 32);
      }

      if (this._point.isActivate()) {
        app.getGameEngine()._contextElt.fillStyle = this._point.getColor();
        app.getGameEngine()._contextElt.fillRect(this._point.getPosX(), this._point.getPosY(), 32, 32);
      }
      if (this._bonus.isActivate()) {
        app.getGameEngine()._contextElt.drawImage(app.getResourceManager().getSprite(SPRITES.BONUS), this._bonus.getPosX(), this._bonus.getPosY(), 32, 32);
      }

      if (this._mouse.isActivate()) {
        this._mouse.draw(app.getGameEngine()._contextElt, app.getResourceManager());
      }

      this._player.draw(app.getGameEngine()._contextElt, app.getResourceManager());

      for (let i = 0; i < wallsList[app.getDifficulty()].length; i += 1) {
        app.getGameEngine()._contextElt.drawImage(app.getResourceManager().getSprite(SPRITES.WALL), wallsList[app.getDifficulty()][i].getPosX(), wallsList[app.getDifficulty()][i].getPosY(), 32, 32);
      }
    }
  }

  /*
   *
   * Phisical Engine
   *
  */
  phisicalEngine(app) {
    if (app.getState() === STATE.GAME) {
      // ********* If the this._player exits the screen *********
      if (this._player.getPos(0).x < 0) {
        this._player.getPos(0).x = app.getGameEngine()._canvasElt.width - 32;
      } else if (this._player.getPos(0).x + 32 > app.getGameEngine()._canvasElt.width) {
        this._player.getPos(0).x = 0;
      } else if (this._player.getPos(0).y < 0) {
        this._player.getPos(0).y = app.getGameEngine()._canvasElt.height - 32;
      } else if (this._player.getPos(0).y + 32 > app.getGameEngine()._canvasElt.height) {
        this._player.getPos(0).y = 0;
      }

      // *************** Collision with him ***************
      for (let i = 1; i < this._player.getPos().length; i += 1) {
        if (this._player.getPos(0).x === this._player.getPos(i).x && this._player.getPos(0).y === this._player.getPos(i).y) {
          app.setState(STATE.GAME_OVER);
          app.getMenu().setPause(true);
        }
      }

      // *************** Collision with a wall ***************
      for (let i = 0; i < wallsList[app.getDifficulty()].length; i += 1) {
        // ********** MOUSE *********
        if (this._mouse.isActivate()) {
          switch (this._mouse.getDir()) {
            case 'up':
              if (this._mouse.getPosX() === wallsList[app.getDifficulty()][i].getPosX() && this._mouse.getPosY() + 32 === wallsList[app.getDifficulty()][i].getPosY()) {
                this._mouse.changeDir(wallsList);
              }
            break;
            case 'down':
              if (this._mouse.getPosX() === wallsList[app.getDifficulty()][i].getPosX() && this._mouse.getPosY() - 32 === wallsList[app.getDifficulty()][i].getPosY()) {
                this._mouse.changeDir(wallsList);
               }
            break;
            case 'right':
              if (this._mouse.getPosX() + 32 === wallsList[app.getDifficulty()][i].getPosX() && this._mouse.getPosY() === wallsList[app.getDifficulty()][i].getPosY()) {
                this._mouse.changeDir(wallsList);
               }
            break;
            case 'left':
              if (this._mouse.getPosX() - 32 === wallsList[app.getDifficulty()][i].getPosX() && this._mouse.getPosY() === wallsList[app.getDifficulty()][i].getPosY()) {
                this._mouse.changeDir(wallsList);
               }
            break;
            default:
          }
        }

        // ********** SNAKE *********
        if (this._player.getPos(0).x === wallsList[app.getDifficulty()][i].getPosX() && this._player.getPos(0).y === wallsList[app.getDifficulty()][i].getPosY()) {
          app.setState(STATE.GAME_OVER);
          app.getMenu().setPause(true);
        }
      }


      // *************** Collision with mouse ***************
      if (this._mouse.isActivate() && this._player.getPos(0).x === this._mouse.getPosX() && this._player.getPos(0).y === this._mouse.getPosY()) {
         this._mouse.setTime(this._mouse.getTime() - 20000);
         this._player.addMouse();
      }

      // *************** Collision with a point ***************
      if (this._point.isActivate() && this._player.getPos(0).x === this._point.getPosX() && this._player.getPos(0).y === this._point.getPosY()) {
        this._point.setTime(this._point.getTime() - 20000);
        this._player.addPoints(this._point.getColor());
        app.getMenu().activeBonus();
      }

      // *************** Collision with a bonus ***************
      if (this._bonus.isActivate() && this._player.getPos(0).x === this._bonus.getPosX() && this._player.getPos(0).y === this._bonus.getPosY()) {
        this._player.addBonus(this._bonus.getType());
        this._bonus.setTime(this._bonus.getTime() - 10000);
        app.getMenu().activeBonus(this._bonus.getType());
      }

      /* ********************** MAJ *********************** */
      if (!app.getMenu().isPause()) {
        this._player.maj();
        this._point.maj(wallsList[app.getDifficulty()]);
        this._bonus.maj(wallsList[app.getDifficulty()]);
        this._mouse.maj(wallsList[app.getDifficulty()]);
      }
    }
  }

  /*
   *
   * Get Player
   *
  */
  getPlayer() {
    return this._player;
  }

  /*
   *
   * Set Player
   *
  */
  setPlayer(player) {
    this._player = player;
  }

  /*
	 *
	 * Tactil Events
	 *
	*/
  _tactilEvents(app) {
    /* **** Start of touch ****** */
    app.getGameEngine()._consoleElt.addEventListener('touchstart', (e) => {
      e.preventDefault();

      const touches = e.changedTouches;

      if (app.getState() === STATE.GAME) {
        this._tactilEvent.moveX = touches[0].pageX;
        this._tactilEvent.moveY = touches[0].pageY;
        if (app.getMenu().isPause()) {
          app.getMenu().setPause(false);
        }
        app.getMenu().setKeyPressed(true);
      }
    }, false);


    /* ******* Moving the finger ******* */
    app.getGameEngine()._consoleElt.addEventListener('touchmove', (e) => {
      e.preventDefault();

      const touches = e.changedTouches;
      if (app.getState() === STATE.GAME) {
        if (touches[0].pageX < this._tactilEvent.moveX - 10) {
          if (this._player.getBonus() === 'reverse') {
            this._player.move('right');
          } else {
            this._player.move('left');
          }
          this._tactilEvent.moveX = touches[0].pageX;
          this._tactilEvent.moveY = touches[0].pageY;
        } else if (touches[0].pageX > this._tactilEvent.moveX + 0) {
          if (this._player.getBonus() === 'reverse') {
            this._player.move('left');
          } else {
            this._player.move('right');
          }
          this._tactilEvent.moveX = touches[0].pageX;
          this._tactilEvent.moveY = touches[0].pageY;
        } else if (touches[0].pageY < this._tactilEvent.moveY - 10) {
          if (this._player.getBonus() === 'reverse') {
            this._player.move('down');
          } else {
            this._player.move('up');
          }
          this._tactilEvent.moveX = touches[0].pageX;
          this._tactilEvent.moveY = touches[0].pageY;
        } else if (touches[0].pageY > this._tactilEvent.moveY + 10) {
          if (this._player.getBonus() === 'reverse') {
            this._player.move('up');
          } else {
            this._player.move('down');
          }
          this._tactilEvent.moveX = touches[0].pageX;
          this._tactilEvent.moveY = touches[0].pageY;
        }
      }
    }, true);


    /* ******** End of touch ********* */
    app.getGameEngine()._consoleElt.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (app.getState() === STATE.GAME) {
        app.getMenu().setKeyPressed(false);
        this._tactilEvent.moveX = 0;
        this._tactilEvent.moveY = 0;
      }
    }, true);
  }

  /*
	*
	* Keyboard Events
	*
	*/
  _keyboardEvents(app) {
    /* ******* Key down ********* */
    window.addEventListener('keydown', (e) => {
      if (app.getState() === STATE.GAME) {
        if (e.keyCode === KEY.ARROW_LEFT) {
          if (this._player.getBonus() === 'reverse') {
            this._player.move('right');
          } else {
            this._player.move('left');
          }
        } else if (e.keyCode === KEY.ARROW_RIGHT) {
          if (this._player.getBonus() === 'reverse') {
            this._player.move('left');
          } else {
            this._player.move('right');
          }
        } else if (e.keyCode === KEY.ARROW_TOP) {
          if (this._player.getBonus() === 'reverse') {
            this._player.move('down');
          } else {
            this._player.move('up');
          }
        } else if (e.keyCode === KEY.ARROW_BOTTOM) {
          if (this._player.getBonus() === 'reverse') {
            this._player.move('up');
          } else {
            this._player.move('down');
          }
        }
      }
    }, false);
  }
}

export default Game;
