var OxTutorial = function(game){
	//define variables
	var player;
};
OxTutorial.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('level3', 'level3Final.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background
		castle = game.add.tileSprite(0,0,1281, 721, 'bgPurple');
		//tilemap setup
		this.map = game.add.tilemap('level3');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		//add the block
		block = game.add.sprite(150,400, 'key', 'block');
		game.physics.enable(block,Phaser.Physics.ARCADE);
		block.body.collideWorldBounds = true;
		block.scale.setTo(1.75, 1.75);
		block.body.gravity.y = 1000;
		block.body.drag.setTo(1000, 0);
		block.body.immovable = true;

		//instruction sign
		sign1 = game.add.sprite(0,620, 'key', 'keyQ');
		sign2 = game.add.sprite(80,620, 'key', 'keyW');
		sign3 = game.add.sprite(160,620, 'key', 'keyE');
		sign3.alpha = 0;
		game.add.tween(sign3).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0);

		//add the player
		player = new Player(game, 20, 550, 2, 0);
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

		//debug
		game.debug.bodyInfo(player, 32, 32);
		game.debug.body(player);

	//next lvl
	if(player.x > 1280) {
		game.state.start('Puzzle1');
	}
},
blockColl:function(){
		//make it so that only the ox moves the block
		if(player.SpiritType == 3){
			block.body.immovable = false;
		}else{
			block.body.immovable = true;
		}
	}
};
