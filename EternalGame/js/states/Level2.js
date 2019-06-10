var Level2 = function(game){
	//define variables
	var player;
};
Level2.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('level2', 'Level2.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background img
		castle = game.add.tileSprite(0,0,1281, 721, 'bgRed');
		//setup tilemap
		this.map = game.add.tilemap('level2');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.addTilesetImage('platforms', 'tilesheetp');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//create polution hazard
		this.pollutionGroup = game.add.group();
		var purp = game.add.sprite(710, 370, 'key', 'poll1');
		purp.animations.add("poll",['poll1', 'poll2'], 10, true);
		purp.animations.play('poll');
		game.physics.enable(purp, Phaser.Physics.ARCADE);
		//makes it stay there
		purp.immovable = true;
		purp.body.moves = false;
		this.pollutionGroup.add(purp);

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		//instruction sign
		sign = game.add.sprite(0,620, 'key', 'keyQ');

		//add the player
		player = new Player(game, 20, 550, 2, 0);
		game.add.existing(player);
		player.bunny = true;


	},
	update:function(){
		//collide with the map
		game.physics.arcade.collide(player, this.mapLayer);
		if(player.respawning == false){ //so the player only goes through respawn animation once
			//collide with the pollution
			game.physics.arcade.collide(player, this.pollutionGroup, this.pColl, null, this);
		}
		//debug
		game.debug.bodyInfo(player, 32, 32);
		game.debug.body(player);

        //to next level
        if(player.x > 1280) {
        	game.state.start('Cut2');
        }
    },
    pColl:function(){
		//lock player movement
		player.respawning = true;
		//fadeawy and wait
		game.add.tween(player).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
		game.time.events.add(Phaser.Timer.SECOND * 1, this.respawn, this);
	},
	respawn:function(){
		//respeed up
		player.animations.currentAnim.speed = 10;
		//reposition
		player.x = 20;
		player.y = 550;
		//for particle effect and fade in
		player.respawn();
		//renable movement
		player.respawning = false;

	}
};
