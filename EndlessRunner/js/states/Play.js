var Play = function(game){
	//define variables
	var castle;
};
Play.prototype = {
	create:function(){
		//castle tilesprite
		castle = game.add.tileSprite(0,0,game.width, game.height, 'Castle');

		sign = game.add.sprite(0,450, 'key', 'sign');

		var player = new Player(game, game.width/2, game.height/2);
		game.add.existing(player);

		//platforms
		this.platformGroup = game.add.group();
		//spawn platform
		plat = new sprite(620, 400, 'key', 'platform');
		this.platformGroup.add(plat);

		//add audio and begin looping background music
		this.run = game.add.audio('run');
    	this.run.play('', 0, 1, true);
		this.oofers = game.add.audio('oof');
		this.jump = game.add.audio('jump');
		this.lazor = game.add.audio('lazor');
	},
	update:function(){
		
	}
};