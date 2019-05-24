var Level5 = function(game){
	//define variables
	//var castle;
	var player;
};
Level5.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('level5', 'level5.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet5', 'DeepForestTileset2.png', 16, 16);
	},
	create:function(){
		//forest tilesprite
		castle = game.add.tileSprite(0,-200,1920, 1080, 'Castle');
		this.map = game.add.tilemap('level5');
		this.map.addTilesetImage('deep_forest', 'tilesheet5');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		this.decoLayer = this.map.createLayer('Foliage');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

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
			game.debug.bodyInfo(player, 32, 32);
        game.debug.body(player);
	}
};