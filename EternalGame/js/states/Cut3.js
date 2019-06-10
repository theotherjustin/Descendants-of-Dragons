var Cut3 = function(game) {
	var video;
};

Cut3.prototype = {
    create: function(){
		//console.log('cut3');
		video = game.add.video('cut3');
		video.addToWorld();
		video.play(false);

	},
	update: function(){
		game.time.events.add(23000, function () { game.state.start('OxTutorial')});
    }
};
