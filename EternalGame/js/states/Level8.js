var Level8 = function(game){
	//define variables
	var player;
};
Level8.prototype = {
	preload: function(){
		console.log('lvl8');
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('level8', 'level8.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background
		castle = game.add.tileSprite(0,0,1281, 721, 'bgPurple');
		//tilemap setup
		this.map = game.add.tilemap('level8');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.addTilesetImage('platforms', 'tilesheetp');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		//add the block
		block = game.add.sprite(460,120, 'key', 'block');
		game.physics.enable(block,Phaser.Physics.ARCADE);
		block.body.collideWorldBounds = true;
		block.scale.setTo(2, 0.75);
		block.body.gravity.y = 2000;
		block.body.drag.setTo(10, 0);
		block.body.immovable = true;

		//create polution hazard
		this.pollutionGroup = game.add.group();
		var purp = game.add.sprite(610, 650, 'key', 'poll1');
		purp.animations.add("poll",['poll1', 'poll2'], 10, true);
		purp.animations.play('poll');
		purp.scale.setTo(3, 1);
		game.physics.enable(purp, Phaser.Physics.ARCADE);
		//makes it stay there
		purp.immovable = true;
		purp.body.moves = false;
		this.pollutionGroup.add(purp);

		//instruction sign
		sign1 = game.add.sprite(0,620, 'key', 'keyQ');
		sign2 = game.add.sprite(80,620, 'key', 'keyW');
		sign3 = game.add.sprite(160,620, 'key', 'keyE');

		//add the player
		player = new Player(game, 50, 550, 2, 0);
		game.add.existing(player);
		player.bunny = true;
		player.monkey = true;
		player.ox = true;

	},
	update:function(){
		//collision
		game.physics.arcade.collide(player, this.mapLayer);
		game.physics.arcade.collide(block, this.mapLayer);
		game.physics.arcade.collide(player, block, this.blockColl, null, this);
		if(player.respawning == false){ //so the player only goes through respawn animation once
			//collide with the pollution
			game.physics.arcade.collide(player, this.pollutionGroup, this.pColl, null, this);
		}

		//debug
		game.debug.bodyInfo(player, 32, 32);
		game.debug.body(player);

		//move to the next level when you pass the right side of the screen
		if(player.x > 1280) {
			game.state.start('Level1');
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
		block.x =460;
		block.y =120;
		block.body.velocity.x = 0;
		block.body.velocity.y = 0;
		//for particle effect and fade in
		player.respawn();
		//renable movement
		player.respawning = false;

	}
};
