var GameOver = function(game) {};
GameOver.prototype = {
	init: function(Score){ 
   },
	create: function(){
		//styleized game over text
		var overText = game.add.text(game.world.centerX, 50, 'Game Over', { fontSize: '60px'});
		overText.anchor.setTo(0.5);
		var grd = overText.context.createLinearGradient(0, 0, 0, overText.canvas.height);
    	grd.addColorStop(0, '#dda556');   
    	grd.addColorStop(1, '#ff1919');
    	overText.fill = grd;

    	//display score

    	//play again
    	var playText = game.add.text(game.world.centerX, 350, 'Press SPACEBAR to Play Again!', { fontSize: '50px', fill: '#FFFF' });
    	playText.anchor.setTo(0.5);
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Play');
		}
	}
	
};