
function ResourceManager(){

	let _sprites = {
		"snake": new Image(),
		"mouse": new Image(),
		"wall": new Image(),
		"ground": new Image(),
		"bonus": new Image(),

		"backgroundIntro": new Image(),
		"backgroundHome": new Image(),
		"backgroundHelp": new Image(),

		"buttonPlay": new Image(),
		"buttonHelp": new Image(),
		"buttonEasy": new Image(),
		"buttonNormal": new Image(),
		"buttonHard": new Image(),
		"buttonReturn": new Image(),
		"imgChoice": new Image()
	};

	_sprites["snake"].src = 'app/res/images/spriteSnake.png';
	_sprites["mouse"].src = 'app/res/images/spriteSouris.png';
	_sprites["wall"].src = "app/res/images/mur.png";
	_sprites["ground"].src = "app/res/images/sol.png";
	_sprites["bonus"].src = "app/res/images/mystere.png";

  	_sprites["backgroundIntro"].src = 'res/images/marsattakStudioGame.png';
	_sprites["backgroundHome"].src = 'app/res/images/imgAccueil.png';
	_sprites["backgroundHelp"].src = 'app/res/images/fondAides.png';

	_sprites["buttonPlay"].src ='app/res/images/jouer.png' ;
	_sprites["buttonHelp"].src = 'app/res/images/aides.png';
	_sprites["buttonEasy"].src = 'app/res/images/facile.png';
	_sprites["buttonNormal"].src = 'app/res/images/normal.png';
	_sprites["buttonHard"].src = 'app/res/images/difficile.png';
	_sprites["buttonReturn"].src = 'app/res/images/retour.png';
	_sprites["imgChoice"].src = 'app/res/images/choixAccueil.png';


	this.getSprite = function(p_sprite){
		if(!_sprites.hasOwnProperty(p_sprite)){
			console.log("Error: Resource '" + p_sprite + "' not found !!!");
			return new Image();
		}
		else{
			return _sprites[p_sprite];
		}
	}
}