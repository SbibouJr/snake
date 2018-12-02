import GameEngine from 'sbjr-game-framwork';

import ResourceManager from './ResourceManager';
import Menu from './Menu';
import Game from './Game';

import { STATE } from '../config/app';
import { DIFFICULTY } from '../config/levels';

class App {
  constructor() {
    this._state = STATE.INTRO;
    this._difficulty = DIFFICULTY.EASY;
    this._gameEngine = new GameEngine();
    this._resourceManager = new ResourceManager();
    this._menu = new Menu();
    this._game = new Game();

    this.INITIAL_WIDTH = this._gameEngine._canvasElt.offsetWidth;
    this.INITIAL_HEIGHT = this._gameEngine._canvasElt.offsetHeight;
  }

  /*
   *
   * Phisical Engine
   *
  */
  _phisicalEngine() {
    this.getGame().phisicalEngine(this);
  }

  /*
   *
   * Graphic Engine
   *
  */
  _graphicEngine() {
    this.getGame().draw(this);
    this.getMenu().draw(this);
  }

  /*
   *
   * Initialization of Events
   *
  */
  _initEvents() {
    this._menu.initEvents(this);
    this._game.initEvents(this);
  }

  getResourceManager() {
    return this._resourceManager;
  }

  getGameEngine() {
    return this._gameEngine;
  }

  getGame() {
    return this._game;
  }

  getMenu() {
    return this._menu;
  }

  setState(newState) {
    this._state = newState;
  }

  getState() {
    return this._state;
  }

  setDifficulty(newDifficulty) {
    this._difficulty = newDifficulty;
  }

  getDifficulty() {
    return this._difficulty;
  }

  loop() {
    this._phisicalEngine();
    this._graphicEngine();
  }

  run() {
    this._initEvents();
    this._gameEngine.loop(this.loop.bind(this));
    this._gameEngine.run();
  }
}

export default App;
