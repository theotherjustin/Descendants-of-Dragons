var Player = function(game, x, y){ //Player prefab
	//override phaser.sprite
	Phaser.Sprite.call(this, game, x, y, 'key','GreenGem1');
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.body.gravity.y = 500;
	this.animations.add("GreenSpin",['GreenGem1','GreenGem2','GreenGem3','Greengem4'], 10, true);
	this.animations.add("RedSpin",['RedGem1','RedGem2','RedGem3','Redgem4'], 10, true);
	this.animations.add("BlueSpin",['BlueGem1','BlueGem2','BlueGem3','Bluegem4', 'BlueGem5', 'BlueGem6', 'BlueGem7', 'BlueGem8'], 10, true);
	this.animations.play('GreenSpin');
	var jumps = 2;
	var gemType = 1;
}
//tell phaser which constructor to use
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
		if(this.body.touching.down){
			//refresh double jump
			jumps = 2;
		}
		//check for input and #of jumps or if player is on a platform
		if(game.input.keyboard.justPressed(Phaser.Keyboard.UP) && (jumps > 0 || this.body.touching.down)){
			this.body.velocity.y = -600;
			//decrease jump counter
			jumps--;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.Q) && gemType != 1){
			this.animations.play('GreenSpin');
			gemType = 1;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.W) && gemType != 2){
			this.animations.play('RedSpin');
			gemType = 2;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && gemType != 3){
			this.animations.play('BlueSpin');
			gemType = 3;
		}
}