
import { Scene, GameObjects, Matter } from 'phaser';

import blazerMan from '../assets/BackupBlazerstories/mainC.png';
import ball from '../assets/BounceNBounce/powerups/02powup.png';
import background from '../assets/backG.png';
import boden from '../assets/boden.png';
import bamboo from '../assets/bamboo.png';
import house from '../assets/house.png';


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
        this.load.image('background', background)
        this.load.image('boden', boden)
        this.load.image('bamboo', bamboo)
        this.load.image('house', house)

        //this.player.body.
        //this.load.image('circle', circle);
    }

    create () {

        var catChars = this.matter.world.nextCategory();
        var catWalls = this.matter.world.nextCategory();
        var catBalls = this.matter.world.nextCategory();
        var catBackground = this.matter.world.nextCategory();




        this.cursors = this.input.keyboard.createCursorKeys()

        console.log(this.matter)
        const gameHeight = 10000;
        const y = gameHeight - 100
        this.matter.world.setBounds(0, 0, 800, gameHeight)

        // set background
        this.background = this.matter.scene.add.image(0, gameHeight, 'background')
    //this.background.setCollisionCategory(catBackground)

        this.character = this.matter.add.image(50, y, 'blazerMan')
        this.character.setCollisionCategory(catChars);

        this.matter.scene.cameras.main.startFollow(this.character, true, 50, 50)
        const walls = [];

        const secondMan = this.matter.add.image(200, y, 'blazerMan')
        secondMan.setCollisionCategory(catChars)


        


        for (let i = y + 52; i > 1000; i -= 52) {
            const left = this.matter.add.image(0, i, 'bamboo')
            left.setCollisionCategory(catWalls);
            left.setStatic(true)

            const right = this.matter.add.image(800, i, 'bamboo')
            right.setCollisionCategory(catWalls);
            right.setStatic(true)
            walls.push(right)
        }
        const houseSprite = this.matter.add.image(400, gameHeight - 340, 'house')
        houseSprite.setCollisionCategory(catBackground);
        houseSprite.setStatic(true)
        for (let i = 0; i < 2; i++) {
            const floor = this.matter.add.image(i * 800, gameHeight, 'boden')
            floor.setCollisionCategory(catWalls);
            floor.setStatic(true)
        }

        this.ballSprite = this.matter.add.image(100, y - 400, ball)
        const bounceFactor = .8
        this.ballSprite.setBounce(bounceFactor,bounceFactor)
        this.ballSprite.setCollisionCategory(catBalls)
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

        this.character.setCollidesWith([ catWalls, catChars, catBalls]);
        this.ballSprite.setCollidesWith([catWalls, catBalls, catChars]);

        this.matter.world.on('collisionstart', function (event) {

        })


        scoreText = this.add.text(32, 24, scoreString + score);
        scoreText.visible = true;
        console.log(this.background)
    }

    update() {
        this.character.setAngle(0)
        //this.background.
        //console.log(this.background)
        this.background.setPosition(this.character.x, this.character.y)

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
