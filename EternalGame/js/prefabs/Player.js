"use strict";
var Player = function(game, x, y, jumps, SpiritType){ //Player prefab
	//override phaser.sprite
	Phaser.Sprite.call(this, game, x, y, 'key','Bunny');
	game.physics.enable(this,Phaser.Physics.ARCADE);

	this.body.gravity.y = 2000;
	this.animations.add("bun",['Bunny'], 10, true);
	this.animations.add("monka",['Monkey'], 10, true);
	this.animations.add("ox",['Ox'], 10, true);
	this.animations.play('bun');
	this.anchor.set(0.5);
	this.spawnX = x;
	this.spawnY = y;
	this.jumps = jumps;
	this.SpiritType = SpiritType;
	this.body.setCircle(22, 0, 12);
	this.body.maxVelocity.x = 500;
    this.body.maxVelocity.y = 1500;
    this.body.drag.setTo(2000, 0);


	this.jump = game.add.audio('jump');


}
//tell phaser which constructor to use
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

		if(this.body.blocked.down || this.body.touching.down){
			//refresh double jump
			this.jumps = 2;
		}
		//check for input and #of jumps or if player is on a platform
		if(game.input.keyboard.justPressed(Phaser.Keyboard.UP) && ( (this.jumps > 0 && this.SpiritType == 1) || this.body.blocked.down || this.body.touching.down) ){
			this.body.velocity.y = -900;	
			this.jumps--;		
			this.jump.play('',0, 0.3, false);
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.body.acceleration.x = -3000;
		}else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.body.acceleration.x = 3000;
		}else{
			this.body.acceleration.x = 0;
		}

		//WallSlide
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !player.body.blocked.down && player.body.blocked.right && this.SpiritType == 2){
			this.body.velocity.y = 0;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !player.body.blocked.down && player.body.blocked.left && this.SpiritType == 2){
			this.body.velocity.y = 0;
		}

		//Walljumping
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !player.body.blocked.down && player.body.blocked.right && this.SpiritType == 2){
			this.body.velocity.y = -650;
        	this.body.velocity.x = -600;
        	this.wallcount = 0;
		}


		//Walljumping
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !player.body.blocked.down && player.body.blocked.left && this.SpiritType == 2){
			this.body.velocity.y = -650;
        	this.body.velocity.x = 600;        	
        	this.wallcount = 0;
		}

		//Transformations
		if(game.input.keyboard.justPressed(Phaser.Keyboard.Q) && this.SpiritType != 1){
			this.animations.play('bun');
			this.body.setCircle(22, 0, 12);
			this.SpiritType = 1;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.W) && this.SpiritType != 2){
			this.animations.play('monka');
			this.body.setCircle(22, 12, 5);
			this.SpiritType = 2;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && this.SpiritType != 3){
			this.animations.play('ox');
			this.body.setCircle(22, 9, 3);
			this.SpiritType = 3;
		}

		if(this.y > 800){
		var emitter = game.add.emitter(this.x,this.y -90, 50);
		emitter.makeParticles('bubble');
		emitter.setYSpeed(-650, -900);
		emitter.setAlpha(0.25, 1);
		emitter.start(false, 5000, 1, 90);

		this.alpha = 0;
		this.x = this.spawnX;
		this.y = this.spawnY - 30;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		game.time.events.add(Phaser.Timer.SECOND * 1, this.respawn, this);
		}
}

Player.prototype.respawn = function(){
		var emitter = game.add.emitter(this.spawnX + 10, 0, 90);
		emitter.makeParticles('bubble');
		emitter.setYSpeed(350, 700);
		emitter.setAlpha(0.25, 1);
		emitter.start(false, 2000, 1, 50);
		game.add.tween(emitter).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
		game.add.tween(this).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
	
}
