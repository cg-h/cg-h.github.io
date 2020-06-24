import CardPlayer from '../js/CardPlayer.js';
import ChestGrid from './ChestGrid.js';
import { scenePreload, sceneUpdate } from './utils.js';

export default class ChestScene extends Phaser.Scene {

    constructor() {
        super('ChestScene');
    }

    init(data) {
        this.rows = data.rows;
        this.playerIndex = data.playerIndex;
        this.health = data.health;
        this.maxHealth = data.maxHealth;
        this.armor = data.armor;
        this.originalX = data.originalX;
    }

    preload() {
        scenePreload(this);
    }

    create() {
        this.grid = new ChestGrid({ scene: this, columns: 3, rows: this.rows});
        
        this.player = new CardPlayer({
            scene: this,
            name: 'Player',
            x: this.game.config.width / 2,
            y: this.game.config.height - 200,
            card: 'playercard',
            image: 'player' + this.playerIndex,
            health: this.health,
            maxHealth: this.maxHealth,
            armor: this.armor,
            depth: 1,
            ondragend: (pointer, gameObject) => {
                this.player.x = this.player.originalX;
                this.player.y = this.player.originalY;
                if (this.highlighted) {
                    this.player.originalX = this.player.x = this.highlighted.x;
                    this.highlighted.selected = true;
                    switch (this.highlighted.cardtype) {
                        case 'heal':
                            this.player.health = Math.min(this.player.health + this.highlighted.value, this.player.maxHealth);
                            this.grid.fadeFrontRow();
                            break;
                        case 'armor':
                            this.player.armor = this.highlighted.value;
                            this.grid.fadeFrontRow();
                            break;
                        case 'return':
                            this.grid.fadeFrontRow();
                            this.scene.start('MainSceneAlt', { 
                                playerIndex: this.playerIndex,
                                health: this.player.health,
                                maxHealth: this.player.maxHealth,
                                armor: this.player.armor,
                                originalX: this.originalX
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