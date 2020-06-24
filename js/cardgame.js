import MainScene from './MainScene.js';
import ChestScene from './ChestScene.js';
import MainSceneAlt from './MainSceneAlt.js';

const config = {
    width: 1280,
    height: 1024,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent: 'phaser-game',
    scene: [MainScene, ChestScene, MainSceneAlt]
}

new Phaser.Game(config);