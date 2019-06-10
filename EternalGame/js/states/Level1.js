var Level1 = function(game){
	//define variables
	var player;
	var npcB;
};
Level1.prototype = {
	preload: function(){
		console.log('lvl1');
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('Level1', 'Level1.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background img
		castle = game.add.tileSprite(0,0,1281, 721, 'bgRed');
		//setup tilemap
		this.map = game.add.tilemap('Level1');
		this.map.addTilesetImage('platforms', 'tilesheetp');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping pls
		game.physics.arcade.TILE_BIAS = 32;

		//instruction sign
		sign = game.add.sprite(0,620, 'key', 'keyQ');

		//add player
		player = new Player(game, 50, 450, 2, 0);
		game.add.existing(player);
		player.bunny = true;
	},
	update:function(){
		//collide with the map
		game.physics.arcade.collide(player, this.mapLayer);
		game.physics.arcade.collide(npcB, this.mapLayer);
		game.physics.arcade.collide(player.emitter, this.mapLayer);

		//debugging
		//game.debug.bodyInfo(player, 32, 32);
		game.debug.body(player);

		//move to the next level when you pass the right side of the screen
		if(player.x > 1280) {
			game.state.start('Level2');
		}
	}
};
