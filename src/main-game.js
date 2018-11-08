import { Game, AUTO } from 'phaser';

import TestScene from './test-scene.js'


const config = {
    type: AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            //gravity: { y: 1000 },
            debug: true
        }
    },
    scene: [
        TestScene
    ]
};

export class MainGame extends Game {
    constructor() {
        super(config)
    }
}


export default MainGame;
