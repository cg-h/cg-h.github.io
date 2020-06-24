import { ENEMYNUM, TESTING } from './constants.js';

export let attacktypes = [];

if (TESTING) {
    attacktypes.push({
        name: '',
        image: ENEMYNUM,
        type: 'attack'
    });
} else {
    for (let i = ENEMYNUM; i >= 0; i--) {
        attacktypes.push({
            name: '',
            image: i,
            type: 'attack'
        });
    }
}

export default attacktypes;