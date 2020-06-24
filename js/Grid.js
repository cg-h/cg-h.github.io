import CardGrid from './CardGrid.js';
import healtypes from './healtypes.js';
import armortypes from './armortypes.js';
import attacktypes from './attacktypes.js';
import chesttypes from './chesttypes.js';

export default class Grid {
    constructor(data) {
        let { scene, columns, rows } = data;
        this.xOffset = 447;
        this.yOffset = 266;
        this.yStart = scene.game.config.height / 2;
        this.columns = columns;
        this.rows = rows;
        this.scene = scene;
        this.cards = [];
        this.addCards(0);
    }

    addCards(startIndex) {
        for (let index = startIndex; index < this.columns * this.rows; index++) {
            let cardTypeIndex = Math.floor(Math.random() * 10);
            let card = null;
            if (index % 3 == 1) cardTypeIndex = Math.floor(Math.random() * 8);
            switch (cardTypeIndex) {
                case 0: case 1:
                    card = this.generateCard(healtypes, index, 'potioncard', 9);
                    card.depth = 0;
                    break;
                case 2: case 3:
                    card = this.generateCard(armortypes, index, 'armorcard', 9);
                    card.depth = 0;
                    break;
                case 4: case 5: case 6:
                    card = this.generateCard(attacktypes, index, 'card', 14);
                    card.depth = 0;
                    break;
                case 7:
                    card = this.generateCard(chesttypes, index, 'blankcard', -1);
                    card.depth = 0;
                    break;
                case 8: case 9:
                    card = "NO";
                    break;
            }
            this.cards.push(card);
        }
    }

    generateCard(cardtypes, index, frame, maxVal) {
        const cardtype = cardtypes[Math.floor(Math.random() * cardtypes.length)];
        let card = new CardGrid({
            scene: this.scene,
            x: this.xOffset + (this.scene.game.config.width / 2 - this.xOffset) * (index % this.columns),
            y: this.yStart - this.yOffset * Math.floor(index / this.columns),
            card: frame,
            image: cardtype.image,
            value: Math.floor(Math.random() * maxVal) + 1,
            name: cardtype.name,
            type: cardtype.type
        });

        return card;
    }

    addBackRow() {
        if (this.cards.length >= this.columns * this.rows) return;
        this.addCards(6);
    }

    fadeFrontRow() {
        setTimeout(() => {
            this.cards.splice(0, 3).forEach(card => {if (card != "NO") card.destroy()});
            this.cards.forEach(card => {
                this.scene.tweens.add({
                    targets: card,
                    duration: 400,
                    y: card.y + this.yOffset,
                    onComplete: () => this.addBackRow()
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