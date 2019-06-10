var BunTutorial = function(game){
	//define variables
	var player;
	var flag;
	var flag2;
	var qText;
	var upText;
	var npcB;
	var sign;
	var npcjumps = 2;
};
BunTutorial.prototype = {
	preload: function(){
		//load level
		game.load.path = 'assets/img/';
		game.load.tilemap('tut', 'tutorial.json', null, Phaser.Tilemap.TILED_JSON);
	},
	create:function(){
		//background
		castle = game.add.tileSprite(0,0,1281, 721, 'bgRed');
		//tilemap setup
		this.map = game.add.tilemap('tut');
		this.map.addTilesetImage('floors', 'tilesheetf');
		this.map.setCollisionByExclusion([]);
		this.mapLayer = this.map.createLayer('Tile Layer 1');

		//prevent clipping
		game.physics.arcade.TILE_BIAS = 32;

		flag = false;
		flag2 = false;

		//npc bunbun
		npcB = game.add.sprite(1150, 400, 'key', 'npcBun3');
		npcB.animations.add("npc",[ 'npcBun3'], 10, true);
		npcB.animations.add("npcjump",[ 'npcBun4'], 10, true);
		game.physics.enable(npcB ,Phaser.Physics.ARCADE);
		npcB.scale.x *= -1;
		npcB.body.collideWorldBounds = true;
		npcB.body.gravity.y = 1000;

		this.timer = game.time.create(false);
        this.timer.loop(1000, this.jNPC, this);
        this.timer.start();

		//instruction sign
		sign = game.add.sprite(0,620, 'key', 'keyQ');
		sign.alpha = 0;

		//add the player
		player = new Player(game, 150, 250, 2, 0);
		game.add.existing(player);

	},
	update:function(){
		//collision
		game.physics.arcade.collide(player, this.mapLayer);
		game.physics.arcade.collide(npcB, this.mapLayer);

		if(npcB.body.blocked.down){
			npcB.animations.play('npc');
			npcjumps = 2;
		}

		//debug
		game.debug.bodyInfo(npcB, 32, 32);
		game.debug.body(player);

		//next lvl
		if(player.x > 1280) {
			game.state.start('Level1');
		}

		if(player.x > 750 && flag == false) {
			//play text
	        qText = game.add.text(player.x, player.y - 80, 'Q', { fontSize: '40px', fill: '#ffffff' });
	        qText.anchor.setTo(0.5);
	        game.add.tween(sign).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0);
			player.body.moves = false;
			flag = true;
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.Q) && flag == true && flag2 == false){
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
	},
	jNPC:function(){
		if(npcjumps > 0){
		npcB.body.velocity.y = -600;
		npcjumps--;
		npcB.animations.play('npcjump');
		}
	}
};
