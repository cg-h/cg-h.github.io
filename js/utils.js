import { ENEMYNUM, PLAYERNUM } from './constants.js';

export function scenePreload(object) {
    object.load.image('armor', 'assets/armor.png');
    object.load.image('armorcard', 'assets/armorcard.png');
    object.load.image('blankcard', 'assets/blankcard.png');
    object.load.image('card', 'assets/card.png');
    object.load.image('dead', 'assets/dead.jpg');
    object.load.image('normalchest', 'assets/normalchest.jpg');
    object.load.image('potion', 'assets/potion.png');
    object.load.image('shield', 'assets/shield.jpg');
    object.load.image('playercard', 'assets/playercard.png');
    object.load.image('potioncard', 'assets/potioncard.png');
    object.load.image('restartbutton', 'assets/restartbutton.png');
    object.load.image('return', 'assets/return.jpg');
    object.load.bitmapFont('pressstart', 'assets/pressstart.png', 'assets/pressstart.fnt');
    for (let i = ENEMYNUM; i >= 0; i--) object.load.image(i.toString(), 'assets/' + i.toString() + '.jpg');
    for (let j = 0; j < PLAYERNUM; j++) object.load.image('player' + j.toString(), 'assets/player' + j.toString() + '.jpg');
}

export function sceneUpdate(object) {
    if (!(object.grid.cards[0] == "NO")) object.grid.cards[0].highlighted = false;
    if (!(object.grid.cards[1] == "NO")) object.grid.cards[1].highlighted = false;
    if (!(object.grid.cards[2] == "NO")) object.grid.cards[2].highlighted = false;
    object.highlighted = null;
    let columnWidth = object.game.config.width / object.grid.columns;
    let xDiff = Math.abs(object.player.x - object.player.originalX);
    if (object.player.y < 700 && xDiff < columnWidth * 1.4) {
        if (object.player.x < columnWidth * 1.3 && !(object.grid.cards[0] == "NO")) {
            object.grid.cards[0].highlighted = true;
            object.highlighted = object.grid.cards[0];
        } else if(object.player.x > columnWidth * 1.745 && !(object.grid.cards[2] == "NO")) {
            object.grid.cards[2].highlighted = true;
            object.highlighted = object.grid.cards[2];
        } else if (columnWidth < object.player.x && object.player.x < columnWidth * 1.745 && !(object.grid.cards[1] == "NO")) {
            object.grid.cards[1].highlighted = true;
            object.highlighted = object.grid.cards[1];
        }
    }
}