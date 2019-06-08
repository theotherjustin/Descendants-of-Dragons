var Level3 = function(game){
	//define variables
	var player;
};
Level3.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('level3', 'level3Final.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet3', 'floors.png', 16, 16);
	},
	create:function(){
		//beckground
		castle = game.add.tileSprite(0,-200,1920, 1080, 'Castle');
		//tilemap setup
		this.map = game.add.tilemap('level3');
		this.map.addTilesetImage('floors', 'tilesheet3');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		//add the block
		block = game.add.sprite(100,400, 'key', 'block');
		game.physics.enable(block,Phaser.Physics.ARCADE);
		block.body.collideWorldBounds = true;
		block.scale.setTo(2, 2);
		block.body.gravity.y = 1000;
		block.body.drag.setTo(1000, 0);
		block.body.immovable = true;

		//instruction sign
		sign = game.add.sprite(0,620, 'key', 'sign');

		//add the player
		player = new Player(game, 20, 550, 2, 1);
		game.add.existing(player);

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
		game.state.start('Level5');
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
