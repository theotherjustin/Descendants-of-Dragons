var Level2 = function(game){
	//define variables
	//var castle;
	var player;
};
Level2.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('level2', 'level2.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet2f', 'floors.png', 16, 16);
		game.load.spritesheet('tilesheet2p', 'platforms.png', 16, 16);
	},
	create:function(){
		//forest tilesprite
		castle = game.add.tileSprite(0,-200,1920, 1080, 'Castle');
		this.map = game.add.tilemap('level2');
		this.map.addTilesetImage('floors', 'tilesheet2f');
		this.map.addTilesetImage('platforms', 'tilesheet2p');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		this.pollutionLayer = this.map.createLayer('Pollution');


		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;
		//instruction sign
		sign = game.add.sprite(0,620, 'key', 'sign');

		//add the player
		player = new Player(game, 20, 550, 2, 1);
		game.add.existing(player);

	},
	update:function(){

		game.physics.arcade.collide(player, this.mapLayer);
		game.physics.arcade.collide(player, this.pollutionLayer, this.pColl, null, this);

		game.debug.bodyInfo(player, 32, 32);
        game.debug.body(player);

        if(player.x > 1280) {
			game.state.start('Level3');
		}
	},
	pColl:function(){
		game.add.tween(player).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
		game.time.events.add(Phaser.Timer.SECOND, player.respawn(), this);

	}
};
