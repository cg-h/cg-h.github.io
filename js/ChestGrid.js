import Grid from "./Grid.js";
import CardGrid from './CardGrid.js';
import healtypes from './healtypes.js';
import armortypes from './armortypes.js';

export default class ChestGrid extends Grid {
    
    constructor(data) {
        super(data)
    }

    addCards(startIndex) {
        for (let index = startIndex; index < this.columns * this.rows; index++) {
            let cardTypeIndex = Math.floor(Math.random() * 3);
            let card = null;
            if (index % 3 == 1) cardTypeIndex = Math.floor(Math.random() * 2);
            switch (cardTypeIndex) {
                case 0:
                    card = this.generateCard(healtypes, index, 'potioncard', 9);
                    card.depth = 0;
                    break;
                case 1:
                    card = this.generateCard(armortypes, index, 'armorcard', 9);
                    card.depth = 0;
                    break;
                case 2:
                    card = "NO";
                    break;
            }
            this.cards.push(card);
        }
        let returnCardIndex = (this.rows * 3) + 1;
        let returnCard = new CardGrid({
            scene: this.scene,
            x: this.xOffset + (this.scene.game.config.width / 2 - this.xOffset) * (returnCardIndex % this.columns),
            y: this.yStart - this.yOffset * Math.floor(returnCardIndex / this.columns),
            card: 'blankcard',
            image: 'return',
            value: 0,
            name: '',
            type: 'return'
        });
        this.cards.push("NO");
        returnCard.depth = 0;
        this.cards.push(returnCard);
        this.cards.push("NO");
    }

    fadeFrontRow() {
        setTimeout(() => {
            this.cards.splice(0, 3).forEach(card => {if (card != "NO") card.destroy()});
            this.cards.forEach(card => {
                this.scene.tweens.add({
                    targets: card,
                    duration: 400,
                    y: card.y + this.yOffset
                });
            });
        }, 1000);

        this.cards.slice(0, 3).forEach(card => {
            if (!card.selected) {
                this.scene.tweens.add({ targets: card, alpha: 0, duration: 200});
            }
        });
    }
}