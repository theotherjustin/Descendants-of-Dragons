var Level1 = function(game){
	//define variables
	//var castle;
	var player;
};
Level1.prototype = {
	preload: function(){
		game.load.path = 'assets/img/';
		game.load.tilemap('Level1', 'Level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet1', 'DeepForestTileset2.png', 16, 16);
	},
	create:function(){
		//castle tilesprite
		castle = game.add.tileSprite(0,-200,1920, 1080, 'Castle');
		this.map = game.add.tilemap('Level1');
		this.map.addTilesetImage('DeepForestTileset2', 'tilesheet1');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Map Layout');
		//this.decoLayer = this.map.createLayer('Foliage');
		
		

		game.physics.arcade.TILE_BIAS = 32;

		sign = game.add.sprite(0,620, 'key', 'sign');

		player = new Player(game, 20, 500, 2, 1);
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
		// if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			// this.main.stop();
			// this.timer.stop();
			// game.state.start('Play');
		// }
		if(player.x > 1280) {
			game.state.start('Play');
		}
	}
};