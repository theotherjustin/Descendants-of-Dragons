var Cut2 = function(game) {
	var video;
};

Cut2.prototype = {
    create: function(){
		//console.log('cut2');
		video = game.add.video('cut2');
		video.addToWorld();
		video.play(false);

	},
	update: function(){
		game.time.events.add(27000, function () { game.state.start('MonkeyTutorial')});
    }
};
