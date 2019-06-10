"use strict";
/*
Team 3
Justin Lee Hanette Le Victor Wang
https://github.com/theotherjustin/Eternal-Game
*/
// define globals
var game;
/*

*/
// wait for browser to load
window.onload = function() {
    // define game
    game = new Phaser.Game(1280,720, Phaser.AUTO, 'myGame');
    // define states
    game.state.add('Load', Load);
    game.state.add('MainMenu', MainMenu);
    game.state.add('Cut1', Cut1);
    game.state.add('BunTutorial', BunTutorial);
    game.state.add('MonkeyTutorial', MonkeyTutorial);
	game.state.add('Level1', Level1);
	game.state.add('Level2', Level2);
    game.state.add('OxTutorial', OxTutorial);
    game.state.add('Level5', Level5);
    game.state.add('Level7', Level7);
    game.state.add('Level8', Level8);
    game.state.add('GameOver', GameOver);
    game.state.start('Load');
}
