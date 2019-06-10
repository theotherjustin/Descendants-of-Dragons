var MainMenu = function(game) {
	var playText;
};

MainMenu.prototype = {
    create: function(){
		game.bgMusic = game.add.audio('OpeningLoop', 0.5, true);  //background music
		game.bgMusic.play('', 0, 2, true);
		game.add.sprite(0, 0, 'mainBack'); //menu background
        //stylized title text
        var titleText = game.add.text(game.world.centerX, 80, 'Descendants of Dragons', { font:'Akronim' ,fontSize: '90px'});
        titleText.anchor.setTo(0.5);
        var grd = titleText.context.createLinearGradient(0, 0, 0, titleText.canvas.height);
        grd.addColorStop(0, '#ffffff');
        grd.addColorStop(1, '#00ffff');
        titleText.fill = grd;

        //basic instuctions
        var insText = game.add.text(game.world.centerX, 180, 'Arrow keys to move!', { fontSize: '22px', fill: '#ffffff' });
        //add stroke to make text more readable
        insText.stroke = '#000000';
        insText.strokeThickness = 6;
        insText.anchor.setTo(0.5);

        var insText2 = game.add.text(game.world.centerX, 220, 'Double jump as the Bunny, wall slide & jump as the Monkey, push boulders as the Ox', { fontSize: '22px', fill: '#ffffff' });
        //add stroke to make text more readable
        insText2.stroke = '#000000';
        insText2.strokeThickness = 6;
        insText2.anchor.setTo(0.5);


        //sign showing QWE controls
		sign1 = game.add.sprite(game.world.centerX-160, 370, 'key', 'keyQ');
		sign2 = game.add.sprite(game.world.centerX, 370, 'key', 'keyW');
		sign3 = game.add.sprite(game.world.centerX+160, 370, 'key', 'keyE');
		sign1.anchor.setTo(0.5);
		sign2.anchor.setTo(0.5);
        sign3.anchor.setTo(0.5);
		sign1.scale.setTo(1.5,1.5);
		sign2.scale.setTo(1.5,1.5);
		sign3.scale.setTo(1.5,1.5);
        //play text
        playText = game.add.text(game.world.centerX, 580, 'Press SPACEBAR to Start!', { font: 'Dancing Script' ,fontSize: '60px', fill: '#ffffff'});
        playText.stroke = '#000000';
        playText.strokeThickness = 6;
        playText.anchor.setTo(0.5);

        //timer used to make play text flash
        this.timer = game.time.create(false);
        this.timer.loop(500, this.blink, this);
        this.timer.start();

    },
	blink: function(){ //flashing
		playText.visible = !playText.visible;
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//this.main.stop();
			this.timer.stop();
			game.state.start('Cut1');
		}
	}

};
