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
		respawning = false;
		castle = game.add.tileSprite(0,-200,1920, 1080, 'Castle');
		this.map = game.add.tilemap('level2');
		this.map.addTilesetImage('floors', 'tilesheet2f');
		this.map.addTilesetImage('platforms', 'tilesheet2p');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		this.pollutionGroup = game.add.group();
		var purp = game.add.sprite(706, 370, 'key', 'purp');
		game.physics.enable(purp, Phaser.Physics.ARCADE);
		purp.immovable = true;
		purp.body.moves = false;
		this.pollutionGroup.add(purp);

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
		if(player.respawning == false){
			game.physics.arcade.collide(player, this.pollutionGroup, this.pColl, null, this);
		}
		
		game.debug.bodyInfo(player, 32, 32);
        game.debug.body(player);

        if(player.x > 1280) {
			game.state.start('Level3');
		}
	},
	pColl:function(){
		player.respawning = true;
		game.add.tween(player).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
		game.time.events.add(Phaser.Timer.SECOND * 1, this.respawn, this);
	},
	respawn:function(){
		game.add.tween(player).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
		player.animations.currentAnim.speed = 10;
		player.x = 20;
		player.y = 550;
		player.respawn();
		player.respawning = false;

	}
};
