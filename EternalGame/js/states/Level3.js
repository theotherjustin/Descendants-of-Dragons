var Level3 = function(game){
	//define variables
	//var castle;
	var player;
};
Level3.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('level3', 'level3.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet3', 'DeepForestTileset2.png', 16, 16);
	},
	create:function(){
		//forest tilesprite
		castle = game.add.tileSprite(0,-200,1920, 1080, 'Castle');
		this.map = game.add.tilemap('level3');
		this.map.addTilesetImage('DeepForestTileset2', 'tilesheet3');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		block = game.add.sprite(100,400, 'key', 'Block');
		game.physics.enable(block,Phaser.Physics.ARCADE);
		block.scale.setTo(2, 2);
		block.body.gravity.y = 1000;
		block.body.drag.setTo(1000, 0);
		block.body.immovable = true;
		//instruction sign
		sign = game.add.sprite(0,620, 'key', 'sign');

		//add the player
		player = new Player(game, 20, 550, 2, 1);
		game.add.existing(player);

		//this.oofers = game.add.audio('oof');
		
		//this.lazor = game.add.audio('lazor');
	},
	update:function(){
		//game.physics.arcade.collide(player, this.platformGroup);
		game.physics.arcade.collide(player, this.mapLayer);
		game.physics.arcade.collide(block, this.mapLayer);
		game.physics.arcade.collide(player, block, this.blockColl, null, this);

		game.debug.bodyInfo(player, 32, 32);
        game.debug.body(player);

        if(player.x > 1280) {
			game.state.start('Level5');
		}
	},
	blockColl:function(){
		if(player.SpiritType == 3){
			block.body.immovable = false;
		}else{
			block.body.immovable = true;
		}
	}
};