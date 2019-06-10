var Level7 = function(game){
	//define variables
	var player;
};
Level7.prototype = {
	preload: function(){
		//load level
		console.log('lvl7');
		game.load.path = 'assets/img/';
		game.load.tilemap('level7', 'level7.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background
		castle = game.add.tileSprite(0,0,1281, 721, 'bgPurple');
		//tilemap setup
		this.map = game.add.tilemap('level7');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.addTilesetImage('platforms', 'tilesheetp');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		//add the block
		block = game.add.sprite(330,130, 'key', 'block');
		game.physics.enable(block,Phaser.Physics.ARCADE);
		block.body.collideWorldBounds = true;
		block.scale.setTo(1, 1);
		block.body.gravity.y = 500;
		block.body.drag.setTo(10, 0);
		block.body.immovable = true;

		//create polution hazard
		this.pollutionGroup = game.add.group();
		var purp = game.add.sprite(750, 690, 'key', 'poll1');
		purp.animations.add("poll",['poll1', 'poll2'], 10, true);
		purp.animations.play('poll');
		purp.scale.setTo(2, 1);
		game.physics.enable(purp, Phaser.Physics.ARCADE);
		//makes it stay there
		purp.immovable = true;
		purp.body.moves = false;
		this.pollutionGroup.add(purp);
		
	
		pollblock = game.add.sprite(590, 20, 'key', 'rectpoll');
		game.physics.enable(pollblock,Phaser.Physics.ARCADE);
		pollblock.anchor.setTo(0.5, 0.5);
		pollblock.angle += 90;
		pollblock.body.collideWorldBounds = false;
		pollblock.body.setSize(35, 153, 50, 0);
		pollblock.scale.setTo(2, 1);
		pollblock.body.moves = false;
		this.pollutionGroup.add(pollblock);

		pollblock2 = game.add.sprite(780, 380, 'key', 'rectpoll');
		game.physics.enable(pollblock2,Phaser.Physics.ARCADE);
		pollblock2.anchor.setTo(0.5, 0.5);
		pollblock2.body.collideWorldBounds = false;
		pollblock2.scale.setTo(2, 0.25);
		pollblock2.immovable = true;
		pollblock2.body.moves = false;
		this.pollutionGroup.add(pollblock2);

		//add the player
		player = new Player(game, 50, 550, 2, 0);
		game.add.existing(player);
		player.bunny = true;
		player.monkey = true;
		player.ox = true;

		//instruction sign 
		sign1 = game.add.sprite(0,620, 'key', 'keyQ');
		sign2 = game.add.sprite(80,620, 'key', 'keyW');
		sign3 = game.add.sprite(160,620, 'key', 'keyE');

	},
	update:function(){
		if(player.x < 250 && player.y > 550){
			sign1.alpha = 0.3;
			sign2.alpha = 0.3;
			sign3.alpha = 0.3;
		}else if(sign1.alpha != 1){
			sign1.alpha = 1;
			sign2.alpha = 1;
			sign3.alpha = 1;
		}
		//collision
		game.physics.arcade.collide(player, this.mapLayer);
		game.physics.arcade.collide(block, this.mapLayer);
		game.physics.arcade.collide(block, this.pollutionGroup, this.slow, null, this);
		game.physics.arcade.collide(this.pollutionGroup, this.mapLayer);
		game.physics.arcade.collide(player, block, this.blockColl, null, this);
		if(player.respawning == false){ //so the player only goes through respawn animation once
			//collide with the pollution
			game.physics.arcade.collide(player, this.pollutionGroup, this.pColl, null, this);
		}

		//debug
		game.debug.bodyInfo(player, 32, 32);
		game.debug.body(block);

		//move to the next level when you pass the right side of the screen
		if(player.x > 1280) {
			game.state.start('Level8');
		}

	},
	slow:function(){
		block.body.drag.setTo(500,0);
		block.immovable = true;
		block.body.gravity.y = 0;
		if(block.body.velocity.x == 0){
			block.body.moves = false;
		}
	},
	blockColl:function(){
		//make it so that only the ox moves the block
		if(player.SpiritType == 3){
			block.body.immovable = false;
		}else{
			block.body.immovable = true;
		}
	},
	pColl:function(){
		//lock player movement
		player.respawning = true;
		block.x = 330;
		block.y = 130;
		block.body.velocity.x = 0;
		block.body.velocity.y = 0;
		//fadeawy and wait
		game.add.tween(player).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
		game.time.events.add(Phaser.Timer.SECOND * 1, this.respawn, this);
	},
	respawn:function(){
		//respeed up
		player.animations.currentAnim.speed = 10;
		//reposition
		player.x = player.spawnX;
		player.y = player.spawnY - 30;
		block.body.moves = true;
		block.body.gravity.y = 500;
		block.body.drag.setTo(10, 0);
		block.body.immovable = false;
		//for particle effect and fade in
		player.respawn();
		//renable movement
		player.respawning = false;

	}
};
