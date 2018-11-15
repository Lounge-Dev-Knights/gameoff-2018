
import { Scene, GameObjects, Matter } from 'phaser';

import blazerMan from '../assets/BackupBlazerstories/mainC.png';
import ball from '../assets/BounceNBounce/powerups/02powup.png';


import style from '../style/default.css';

var score = 0;
var scoreString = "Score: ";
var scoreText;




class TestScene extends Scene {

    constructor() {

        super({
            key: "TestScene"
        })



    }

    preload () {
        this.load.image('blazerMan', blazerMan)
        this.load.image('ball', ball)

        //this.player.body.
        //this.load.image('circle', circle);
    }

    create () {
        this.cursors = this.input.keyboard.createCursorKeys()
        console.log(this.matter)
        const gameHeight = 100000;
        const y = gameHeight - 100
        this.matter.world.setBounds(0, 0, 800, gameHeight)

        this.character = this.matter.add.image(50, y, 'blazerMan')


        this.matter.scene.cameras.main.startFollow(this.character)
        this.matter.add.image(200, y, 'blazerMan')
        for (let i = y + 50; i > 1000; i -= 80) {
            const left = this.matter.add.image(0, i, 'blazerMan') 
            left.setStatic(true)
            const right = this.matter.add.image(800, i, 'blazerMan')
            right.setStatic(true)
        }
        this.ballSprite = this.matter.add.image(100, y - 400, ball)
        const bounceFactor = .8
        this.ballSprite.setBounce(bounceFactor,bounceFactor)
        console.log(this.ballSprite)
        //this.matter.add.circle(50, 500, 10)
        this.character.setMass(20)
        console.log(this.character)

        this.input.keyboard.on("keydown_A", () => {
            console.log(this.character.getBounds(), this.matter.world)
        })
        this.input.keyboard.on("keydown_SPACE", () => {
            this.character.applyForce({x: 0, y: -0.8})
        })
        //this.input.keyboard.on("keydown_UP", () => {
        //    this.character.setScale(2)
        //})
        //this.input.keyboard.on("keydown_DOWN", () => {
        //    this.character.setScale(1)
        //})


        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            //console.log(event, bodyA, bodyB)

        })

        this.matter.world.on('beforeUpdate', (event) => {
            console.log(event)
            //console.log(event, bodyA, bodyB)

        })

//setup collision
        var cat1 = this.matter.world.nextCategory();
        this.character.setCollisionCategory(cat1);
        this.matter.world.on('collisionstart', function (event) {

        })


        scoreText = this.add.text(32, 24, scoreString + score);
            scoreText.visible = true;
    }

    update() {
        this.character.setAngle(0)

        if (this.cursors.left.isDown) {
            this.character.setVelocityX(-5)
            this.character.setFlipX(true)
        }
        if (this.cursors.right.isDown) {
            this.character.setVelocityX(5)
            this.character.setFlipX(false)
        }
        if (this.cursors.up.isDown) {
        }
        if (this.cursors.down.isDown) {
        }
    }
}

export default TestScene
