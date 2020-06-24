import CardPlayer from '../js/CardPlayer.js';
import Grid from './Grid.js';
import {AddButtonRestart} from './ButtonRestart.js';
import { scenePreload, sceneUpdate } from './utils.js';
import { PLAYERNUM } from './constants.js';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super('MainScene');
    }

    preload() {
        scenePreload(this);
    }

    create() {
        this.grid = new Grid({ scene: this, columns: 3, rows: 3});
        
        var playerIndex = Math.floor(Math.random() * PLAYERNUM).toString();
        this.player = new CardPlayer({
            scene: this,
            name: 'Player',
            x: this.game.config.width / 2,
            y: this.game.config.height - 200,
            card: 'playercard',
            image: 'player' + playerIndex,
            health: 12,
            maxHealth: 12,
            armor: 0,
            depth: 1,
            ondragend: (pointer, gameObject) => {
                this.player.x = this.player.originalX;
                this.player.y = this.player.originalY;
                if (this.highlighted) {
                    this.player.originalX = this.player.x = this.highlighted.x;
                    this.highlighted.selected = true;
                    switch (this.highlighted.cardtype) {
                        case 'attack':
                            this.player.attack(this.highlighted.value);
                            if (this.player.dead) {
                                if (this instanceof CardPlayer) {
                                    this.highlighted.dead = true;
                                    this.highlighted.deadAnimation();
                                }
                                AddButtonRestart(this);
                            } else {
                                this.grid.fadeFrontRow();
                            }
                            break;
                        case 'heal':
                            this.player.health = Math.min(this.player.health + this.highlighted.value, this.player.maxHealth);
                            this.grid.fadeFrontRow();
                            break;
                        case 'armor':
                            this.player.armor = this.highlighted.value;
                            this.grid.fadeFrontRow();
                            break;
                        case 'normalchest':
                            this.grid.fadeFrontRow();
                            this.scene.start('ChestScene', { 
                                rows: 1,
                                playerIndex: playerIndex,
                                health: this.player.health,
                                maxHealth: this.player.maxHealth,
                                armor: this.player.armor,
                                originalX: this.player.originalX
                            });
                            break;
                    }
                }
            }
        });
    }

    update(time, delta) {
        sceneUpdate(this);
    }
}