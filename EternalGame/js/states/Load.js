var Load = function(game) {};
Load.prototype = {
	preload: function(){
		//load all the assets
		game.load.atlas('key', 'assets/img/spritesheet.png', 'assets/img/sprites.json');
		game.load.atlas('playerKey', 'assets/img/playersheet.png', 'assets/img/playersheet.json');
		game.load.image('bgRed', 'assets/img/Background-01.png');
		game.load.image('bgPurple', 'assets/img/Background-02.png');
		game.load.image('mainBack', 'assets/img/MainMenu.png');
		game.load.image('bubble', 'assets/img/bbl.png');
		game.load.audio('Death', 'assets/audio/Death Sound.mp3');
		game.load.audio('OpeningLoop', 'assets/audio/OpeningLoop.mp3');
		game.load.audio('MidLoop', 'assets/audio/MidLoop.mp3');
		game.load.audio('FinalLoop', 'assets/audio/FinalLoop.mp3');
        game.load.audio('Jump', 'assets/audio/Jump.mp3');
        game.load.audio('Respawn', 'assets/audio/Respawn Sound.mp3');
        game.load.audio('Swap', 'assets/audio/Swap.mp3');
        game.load.spritesheet('tilesheetf', 'assets/img/floors.png', 16, 16);
		game.load.spritesheet('tilesheetp', 'assets/img/platforms.png', 16, 16);
		game.load.video('cut4', 'assets/video/cut4.mp4');
		game.load.video('cut3', 'assets/video/cut3.mp4');
		game.load.video('cut2', 'assets/video/cut2.mp4');
		game.load.video('cut1', 'assets/video/cut1.mp4');
	},
	create: function(){
		//display loading..
        var sText = game.add.text(400, 200, 'Loading...', { font: 'Dancing Script', fontSize: '32px', fill: '#FFFF' });
    },
    update: function(){
    	//game.scale.pageAlignHorizontally = true;
		//game.scale.pageAlignVertically = true;
		//game.scale.refresh();
    	//move to mainmenu
		if (game.cache.isSoundDecoded('OpeningLoop')) {
			game.state.start('MainMenu');
		}
    }

};
