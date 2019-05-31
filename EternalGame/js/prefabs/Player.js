'use strict';
var Player = function(game, x, y, jumps, gemType){ //Player prefab
	//override phaser.sprite
	Phaser.Sprite.call(this, game, x, y, 'key','GreenGem1');
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.body.gravity.y = 1500;
	this.animations.add("GreenSpin",['GreenGem1','GreenGem2','GreenGem3','Greengem4'], 10, true);
	this.animations.add("RedSpin",['RedGem1','RedGem2','RedGem3','Redgem4'], 10, true);
	this.animations.add("BlueSpin",['BlueGem1','BlueGem2','BlueGem3','Bluegem4', 'BlueGem5', 'BlueGem6', 'BlueGem7', 'BlueGem8'], 10, true);
	this.animations.play('GreenSpin');
	this.jumps = jumps;
	this.gemType = gemType;

	// ##### = stuff to help with wallcling, still figuring it out
	//this.walljumping = false;
	//this.wallcount = 0;
	this.jump = game.add.audio('jump');
	this.body.drag.setTo(1200, 0);
	//this.body.maxVelocity.x = 400;

}
//tell phaser which constructor to use
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
		//#####
		/*this.wallcount = this.wallcount + 1;
		if(this.wallcount >= 50){
			this.walljumping = false;
		}*/
		if(this.body.blocked.down){
			//refresh double jump
			this.jumps = 2;
		}
		//check for input and #of jumps or if player is on a platform
		if(game.input.keyboard.justPressed(Phaser.Keyboard.UP) && ((this.jumps > 0 && this.gemType == 1) || this.body.blocked.down)){
			this.body.velocity.y = -800;
			//decrease jump counter
			this.jump.play('',0, 0.3, false);
			this.jumps--;
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.body.velocity.x = -400;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			this.body.velocity.x = 400;
		}

		//#####
		/*if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !this.body.blocked.down){
			this.body.velocity.x += -30;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !this.body.blocked.down){
			this.body.velocity.x += 30;
		}*/

		//Walljumping
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !player.body.blocked.down && player.body.blocked.right && this.gemType == 2){
			this.body.velocity.y = -650;
        	this.body.velocity.x = -600;
        	this.walljumping = true;
        	this.wallcount = 0;
		}


		//Walljumping
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !player.body.blocked.down && player.body.blocked.right && this.gemType == 2){
			this.body.velocity.y = -650;
        	this.body.velocity.x = -600;
        	this.walljumping = true;
        	this.wallcount = 0;
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !player.body.blocked.down && player.body.blocked.left && this.gemType == 2){
			this.body.velocity.y = -650;
        	this.body.velocity.x = 600;
        	this.walljumping = true;
        	this.wallcount = 0;
		}

		//#####
		/*
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !player.body.blocked.down && player.body.blocked.right && this.gemType == 2){
			this.body.velocity.y = 0;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !player.body.blocked.down && player.body.blocked.left && this.gemType == 2){
			this.body.velocity.y = 0;
		}*/

		//Transformations
		if(game.input.keyboard.justPressed(Phaser.Keyboard.Q) && this.gemType != 1){
			this.animations.play('GreenSpin');
			this.gemType = 1;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.W) && this.gemType != 2){
			this.animations.play('RedSpin');
			this.gemType = 2;
		}

		if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && this.gemType != 3){
			this.animations.play('BlueSpin');
			this.gemType = 3;
		}

		if(this.y > 800){
			this.x = 20;
			this.y = 480;
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
		}
}