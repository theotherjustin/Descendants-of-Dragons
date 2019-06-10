var MonkeyTutorial = function(game){
	//define variables
	var player;
};
MonkeyTutorial.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('MonkeyTutorial', 'MonkeyTutorial.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background img
		castle = game.add.tileSprite(0,0,1281, 721, 'bgRed');
		//setup tilemap
		this.map = game.add.tilemap('MonkeyTutorial');
		this.map.addTilesetImage('platforms', 'tilesheetp');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping pls
		game.physics.arcade.TILE_BIAS = 32;

		//instruction sign
		sign1 = game.add.sprite(0,620, 'key', 'keyQ');
		sign2 = game.add.sprite(80,620, 'key', 'keyW');
		sign2.alpha = 0;
		game.add.tween(sign2).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0);
		//sign3 = game.add.sprite(160,620, 'key', 'keyE');


		//add player
		player = new Player(game, 50, 50, 2, 0);
		game.add.existing(player);
		player.bunny = true;
		player.monkey = true;

	},
	update:function(){
		//collide with the map
		game.physics.arcade.collide(player, this.mapLayer);
		game.physics.arcade.collide(player.emitter, this.mapLayer);

		//debugging
		//game.debug.bodyInfo(player, 32, 32);
		game.debug.body(player);

		//move to the next level when you pass the right side of the screen
		if(player.x > 1280) {
			game.state.start('Level5');
		}
	}
};
