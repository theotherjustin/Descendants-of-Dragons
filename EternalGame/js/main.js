"use strict";
/*
Team 3
Justin Lee Hanette Le Victor Wang
https://github.com/theotherjustin/Eternal-Game
*/
// define globals
var game;
var Score;
/*

*/
// wait for browser to load 
window.onload = function() {  
    // define game
    game = new Phaser.Game(1280,720, Phaser.AUTO, '');
    // define states
    game.state.add('Load', Load);
    game.state.add('MainMenu', MainMenu);
	game.state.add('Level1', Level1);
    game.state.add('Level3', Level3);
    game.state.add('Level5', Level5);
    game.state.add('GameOver', GameOver);
    game.state.start('Load');
}