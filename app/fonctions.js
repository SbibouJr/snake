/* ******************* FONCTIONS GLOBAL *********************** */

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame       || // La forme standardisée
	window.webkitRequestAnimationFrame || // Pour Chrome et Safari
	window.mozRequestAnimationFrame    || // Pour Firefox
	window.oRequestAnimationFrame      || // Pour Opera
	window.msRequestAnimationFrame     || // Pour Internet Explorer
	function(callback){                   // Pour les mauvais
		window.setTimeout(callback, 1000 / 60);
	};
})();

if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}