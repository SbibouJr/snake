import snakeImg from '../assets/images/spriteSnake.png';
import mouseImg from '../assets/images/spriteSouris.png';
import wallImg from '../assets/images/mur.png';
import groundImg from '../assets/images/sol.png';
import bonusImg from '../assets/images/mystere.png';

import backgroundIntroImg from '../assets/images/marsattakStudioGame.png';
import backgroundHomeImg from '../assets/images/imgAccueil.png';
import backgroundHelpImg from '../assets/images/fondAides.png';

import buttonPlayImg from '../assets/images/jouer.png';
import buttonHelpImg from '../assets/images/aides.png';
import buttonEasyImg from '../assets/images/facile.png';
import buttonNormalImg from '../assets/images/normal.png';
import buttonHardImg from '../assets/images/difficile.png';
import buttonReturnImg from '../assets/images/retour.png';
import choiceImg from '../assets/images/choixAccueil.png';

function createImage(src) {
	const image = new Image();
	image.src = src;
	return image;
}

const SPRITES = {
	SNAKE: 'SNAKE',
	MOUSE: 'MOUSE',
	WALL: 'WALL',
	GROUND: 'GROUND',
	BONUS: 'BONUS',

	BACKGROUND_INTRO: 'BACKGROUND_INTRO',
	BACKGROUND_HOME: 'BACKGROUND_HOME',
	BACKGROUND_HELP: 'BACKGROUND_HELP',

	BUTTON_PLAY: 'BUTTON_PLAY',
	BUTTON_HELP: 'BUTTON_HELP',
	BUTTON_EASY: 'BUTTON_EASY',
	BUTTON_NORMAL: 'BUTTON_NORMAL',
	BUTTON_HARD: 'BUTTON_HARD',
	BUTTON_RETURN: 'BUTTON_RETURN',
	IMAGE_CHOICE: 'IMAGE_CHOICE',
};

class ResourceManager {
	constructor() {
		this._sprites = {
			[SPRITES.SNAKE]: createImage(snakeImg),
			[SPRITES.MOUSE]: createImage(mouseImg),
			[SPRITES.WALL]: createImage(wallImg),
			[SPRITES.GROUND]: createImage(groundImg),
			[SPRITES.BONUS]: createImage(bonusImg),

			[SPRITES.BACKGROUND_INTRO]: createImage(backgroundIntroImg),
			[SPRITES.BACKGROUND_HOME]: createImage(backgroundHomeImg),
			[SPRITES.BACKGROUND_HELP]: createImage(backgroundHelpImg),

			[SPRITES.BUTTON_PLAY]: createImage(buttonPlayImg),
			[SPRITES.BUTTON_HELP]: createImage(buttonHelpImg),
			[SPRITES.BUTTON_EASY]: createImage(buttonEasyImg),
			[SPRITES.BUTTON_NORMAL]: createImage(buttonNormalImg),
			[SPRITES.BUTTON_HARD]: createImage(buttonHardImg),
			[SPRITES.BUTTON_RETURN]: createImage(buttonReturnImg),
			[SPRITES.IMAGE_CHOICE]: createImage(choiceImg),
		};
	}

	getSprite(sprite) {
		if (!this._sprites[sprite]) {
			console.log(`Error: Resource ${sprite} not found !!!`); // eslint-disable-line no-console
			return new Image();
		}
		return this._sprites[sprite];
	}
}

export default ResourceManager;

export {
	SPRITES,
};
