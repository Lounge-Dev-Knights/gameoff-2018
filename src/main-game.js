import { Game, AUTO } from 'phaser';

import circle from '../assets/circle.svg';

import style from '../style/default.css';

function preload ()
{
    this.load.image('circle', circle);
}

function create ()
{
    console.log("create")
    var circle = this.add.image(100, 100, 'circle');

    this.tweens.add({
        targets: circle,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}
const config = {
    type: AUTO,
//    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

export class MainGame {
    constructor() {
        var game = new Game(config);
        console.log("test")
    }

}



export default MainGame;
