"use strict";
var respawn;
var Player = function(game, x, y, jumps, SpiritType){ //Player prefab
	//override phaser.sprite
	Phaser.Sprite.call(this, game, x, y, 'playerKey','bun3');
	//physics
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.body.gravity.y = 2000;
	this.body.maxVelocity.x = 500;
	this.body.maxVelocity.y = 1500;
	this.body.drag.setTo(2000, 0);
	//animations
	this.animations.add("spirit",['spirit1', 'spirit2', 'spirit3', 'spirit4', 'spirit5'], 10, true);
	this.animations.add("bun",['bun3'], 10, true);
	this.animations.add("bunRun",['bun3', 'bun4', 'bun5', 'bun6', 'bun1', 'bun2'], 10, true);
	this.animations.add("mon",['mon7'], 10, true);
	this.animations.add("monRun",['mon3','mon4','mon5','mon6','mon7'], 10, true);
	this.animations.add("monClimb",['mon2'], 10, true);
	this.animations.add("ox",['ox2'], 10, true);
	this.animations.add("oxRun",['ox2', 'ox3', 'ox4', 'ox5', 'ox6', 'ox1'], 10, true);
	this.animations.play('spirit');
	this.anchor.set(0.5, 0.5);
	//variables
	this.spawnX = x;
	this.spawnY = y;
	this.jumps = jumps;
	this.respawning = false;
	this.wallcling = false;
	this.SpiritType = SpiritType;
	//reset to bunny's hitbox size
	///this.body.setSize(90, 80, 10, 0);
	this.body.setCircle(20, 0, 60);
	//sounds
	this.jump = game.add.audio('Jump');
	this.swap = game.add.audio('Swap');
	this.death = game.add.audio('Death');
	respawn = game.add.audio('Respawn');


}
//tell phaser which constructor to use
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	//Animations
	//this.body.syncBounds = true;
	if(this.body.velocity.x > 0){
		if (this.scale.x < 0){
			this.scale.x *= -1;
		}
		if(this.SpiritType == 1){
			this.animations.play('bunRun');
		}
		if(this.SpiritType == 2){
			this.wallcling = false;
				this.animations.play('monRun');
		}
		if(this.SpiritType == 3){
			this.animations.play('oxRun');
		}
	}
	if(this.body.velocity.x < 0){
		if (this.scale.x > 0){
			this.scale.x *= -1;
		}
		if(this.SpiritType == 1){

			this.animations.play('bunRun');
		}

		if(this.SpiritType == 2){
			this.animations.play('monRun');
		}

		if(this.SpiritType == 3){
			this.animations.play('oxRun');
		}
	}
	//idle
	if(this.body.velocity.x == 0){
		if(this.SpiritType == 1){

			this.animations.play('bun');
		}
		if(this.SpiritType == 2){
			this.animations.play('mon');
		}
		if(this.SpiritType == 3){
			this.animations.play('ox');
		}
	}

	//refresh double jump
	if(this.body.blocked.down || this.body.touching.down){
		this.jumps = 2;
	}

	//check for input and #of jumps or if player is on a platform
	if(game.input.keyboard.justPressed(Phaser.Keyboard.UP) && ( (this.jumps > 0 && this.SpiritType == 1) || this.body.blocked.down || this.body.touching.down) ){
		this.body.velocity.y = -900;
		this.jumps--;
		this.jump.play('',0, 6, false);
	}

	//left right movement
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		//slow movement (mainly when dying in the pollution)
		if(this.respawning == true){
			this.animations.currentAnim.speed = 5;
			this.body.velocity.x = -20;
		}else{
			this.body.acceleration.x = -2000;
		}
	}else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			//slow movement (mainly when dying in the pollution)
			if(this.respawning == true){
				this.animations.currentAnim.speed = 5;
				this.body.velocity.x = 20;
			}else{
				this.body.acceleration.x = 2000;
			}
		}else{ //slow down if theres no input
			this.body.acceleration.x = 0;
		}

	//WallSlide
	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !player.body.blocked.down && player.body.blocked.right && this.SpiritType == 2){
		this.body.velocity.y = 0;
		if (this.scale.x < 0){
			this.scale.x *= -1;
		}
		//this.body.setSize(30, 100, 0, 0);
		//this.wallcling = true;
		this.animations.play('monClimb');
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !player.body.blocked.down && player.body.blocked.left && this.SpiritType == 2){
		this.body.velocity.y = 0;
		if (this.scale.x > 0){
			this.scale.x *= -1;
		}
		//this.wallcling = true;
		this.animations.play('monClimb');
	}

	//Walljumping
	if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !player.body.blocked.down && player.body.blocked.right && this.SpiritType == 2){
		this.body.velocity.y = -650;
		this.body.velocity.x = -600;
		this.wallcount = 0;
		this.jump.play('',0, 2.5, false);
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !player.body.blocked.down && player.body.blocked.left && this.SpiritType == 2){
		this.body.velocity.y = -650;
		this.body.velocity.x = 600;
		this.wallcount = 0;
		this.jump.play('',0, 2.5, false);
	}

	//Transformations
	if(game.input.keyboard.justPressed(Phaser.Keyboard.Q) && this.SpiritType != 1){
		this.animations.play('bun');
		this.body.syncBounds = false;
		this.body.setCircle(40, 0 , 0);
		this.SpiritType = 1;
		this.swap.play('',0, 1.5, false);
	}
	if(game.input.keyboard.justPressed(Phaser.Keyboard.W) && this.SpiritType != 2){
		//console.log('lost');
		this.animations.play('mon');
		this.body.setSize(90, 80, 0, 0);
		this.body.syncBounds = true;
		this.SpiritType = 2;
		this.swap.play('',0, 1.5, false);
	}
	if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && this.SpiritType != 3){
		this.animations.play('ox');
		this.body.syncBounds = false;
		this.body.setSize(120, 80, 10, 0);
		this.SpiritType = 3;
		this.swap.play('',0, 1.5, false);
	}

		//Falling down
		if(this.y > 800){
			this.death.play('', 0, 1.5, false);
			var emitter = game.add.emitter(this.x,this.y -90, 50);
			emitter.makeParticles('bubble');
			emitter.setYSpeed(-650, -900);
			emitter.setAlpha(0.25, 1);
			emitter.start(false, 5000, 1, 90);

			//hide sprite and put it at spawn
			this.alpha = 0;
			this.x = this.spawnX;
			this.y = this.spawnY - 30;
			this.body.velocity.x = 0;
			this.body.velocity.y = 0;
			//lock movement
			this.respawning = true;
			game.time.events.add(Phaser.Timer.SECOND * 1, this.respawn, this);
		}
	}

//fade in + particles
Player.prototype.respawn = function(){
	respawn.play('', 0, 1.5, false);
	var emitter = game.add.emitter(this.spawnX + 10, -20, 90);
	emitter.makeParticles('bubble');
	emitter.setYSpeed(350, 700);
	emitter.setAlpha(0.25, 1);
	emitter.start(false, 2000, 1, 50);
		//game.add.tween(emitter).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
		game.add.tween(this).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0);
		this.respawning = false;

	}
