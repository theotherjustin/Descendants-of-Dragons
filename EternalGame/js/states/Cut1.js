var Cut1 = function(game) {
	var video;
};

Cut1.prototype = {
    create: function(){
		video = game.add.video('cut1');
		video.addToWorld();
		video.play(false);

	},
	update: function(){
		game.time.events.add(33000, function () { game.state.start('BunTutorial')});
    }
};
