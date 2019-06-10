var Cut3 = function(game) {
	var video;
};

Cut1.prototype = {
    create: function(){
		video = game.add.video('cut3');
		video.addToWorld();
		video.play(false);

	},
	update: function(){
		game.time.events.add(23000, function () { game.state.start('OxTutorial')});
    }
};
