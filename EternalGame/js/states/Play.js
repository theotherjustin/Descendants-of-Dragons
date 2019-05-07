var Play = function(game){
	//define variables
	var castle;
	var player;
};
Play.prototype = {
	create:function(){
		//castle tilesprite
		castle = game.add.tileSprite(0,0,game.width, game.height, 'Castle');

		sign = game.add.sprite(0,620, 'key', 'sign');

		player = new Player(game, game.width/2, 400, 2, 1);
		game.add.existing(player);

		//platforms
		this.platformGroup = game.add.group();
		//spawn platform
		plat = game.add.sprite(game.width/2 - 50, 500, 'key', 'Platform');
		game.physics.enable(plat,Phaser.Physics.ARCADE);
		plat.body.immovable = true;
		this.platformGroup.add(plat);

		//add audio and begin looping background music
		this.run = game.add.audio('run');
    	this.run.play('', 0, 1, true);
		this.oofers = game.add.audio('oof');
		this.jump = game.add.audio('jump');
		this.lazor = game.add.audio('lazor');
	},
	update:function(){
		game.physics.arcade.collide(player, this.platformGroup);
	}
};