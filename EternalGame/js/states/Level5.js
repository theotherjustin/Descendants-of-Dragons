var Level5 = function(game){
	//define variables
	var player;
};
Level5.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('level5', 'level5Final.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background img
		castle = game.add.tileSprite(0,0,1281, 721, 'bgPurple');
		//setup tilemap
		this.map = game.add.tilemap('level5');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.addTilesetImage('platforms', 'tilesheetp');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		//instruction sign
		sign1 = game.add.sprite(0,620, 'key', 'keyQ');
		sign2 = game.add.sprite(80,620, 'key', 'keyW');
		sign3 = game.add.sprite(160,620, 'key', 'keyE');

		//add the player
		player = new Player(game, 20, 550, 2, 0);
		game.add.existing(player);

	},
	update:function(){
		//collision
		game.physics.arcade.collide(player, this.mapLayer);

		//debug
		game.debug.bodyInfo(player, 32, 32);
		game.debug.body(player);

				//next lvl
		if(player.x > 1280) {
		game.state.start('Level8');
		}

	}
};
