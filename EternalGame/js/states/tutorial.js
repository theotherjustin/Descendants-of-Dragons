var tutorial = function(game){
	//define variables
	var player;
	var flag;
	var flag2;
	var qText;
	var upText;
};
tutorial.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('tut', 'tutorial.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background
		castle = game.add.tileSprite(0,0,1281, 721, 'Castle');
		//tilemap setup
		this.map = game.add.tilemap('tut');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		flag = false;
		flag2 = false;
		//add the block
		/*
		block = game.add.sprite(150,400, 'key', 'block');
		game.physics.enable(block,Phaser.Physics.ARCADE);
		block.body.collideWorldBounds = true;
		block.scale.setTo(1.75, 1.75);
		block.body.gravity.y = 1000;
		block.body.drag.setTo(1000, 0);
		block.body.immovable = true;
		*/
		//instruction sign
		sign = game.add.sprite(0,620, 'key', 'sign');

		//add the player
		player = new Player(game, 150, 250, 2, 1);
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
		game.state.start('Level1');
	}

	if(player.x > 750 && flag == false) {
		//play text
        qText = game.add.text(player.x, player.y - 80, 'Q', { fontSize: '40px', fill: '#ffffff' });
        qText.anchor.setTo(0.5);
		player.body.moves = false;
		//player.animations.stop(null, true);
		flag = true;
	}
	if(game.input.keyboard.justPressed(Phaser.Keyboard.Q) && flag == true){
		player.body.velocity.x = 0;;
		qText.visible = false;
		upText = game.add.text(player.x, player.y - 80, 'UP', { fontSize: '40px', fill: '#ffffff' });
        upText.anchor.setTo(0.5);
        flag2 = true;
	}

	if(game.input.keyboard.justPressed(Phaser.Keyboard.UP) && player.SpiritType == 1 && flag == true && flag2 == true){
		upText.visible = false;
		player.body.moves = true;
		player.animations.play('bunRun');
	}
}
};
