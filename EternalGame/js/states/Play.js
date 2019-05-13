var Play = function(game){
	//define variables
	//var castle;
	var player;
};
Play.prototype = {
	preload: function(){
		game.load.path = 'assets/img/';
		game.load.tilemap('level5', 'level5.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet5', 'DeepForestTileset2.png', 16, 16);
	},
	create:function(){
		//castle tilesprite
		castle = game.add.tileSprite(0,-200,1920, 1080, 'Castle');
		this.map = game.add.tilemap('level5');
		this.map.addTilesetImage('deep_forest', 'tilesheet5');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		this.decoLayer = this.map.createLayer('Foliage');

		game.physics.arcade.TILE_BIAS = 32;

		sign = game.add.sprite(0,620, 'key', 'sign');

		player = new Player(game, 20, 480, 2, 1);
		game.add.existing(player);

		/*platforms
		this.platformGroup = game.add.group();
		//spawn platform
		plat = game.add.sprite(game.width/2 - 50, 500, 'key', 'Platform');
		game.physics.enable(plat,Phaser.Physics.ARCADE);
		plat.body.immovable = true;
		this.platformGroup.add(plat);
		*/
		//add audio and begin looping background music
		//this.run = game.add.audio('run');
    	//this.run.play('', 0, 1, true);
		this.oofers = game.add.audio('oof');
		
		this.lazor = game.add.audio('lazor');
	},
	update:function(){
		//game.physics.arcade.collide(player, this.platformGroup);
		game.physics.arcade.collide(player, this.mapLayer);
	}
};