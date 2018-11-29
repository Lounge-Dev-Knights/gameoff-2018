
import { Scene, GameObjects, Matter } from 'phaser';

import sumo from '../assets/dude.png';
import sumo2 from '../assets/dude2.png';
import dudes from '../assets/Dudes.png';
import ball from '../assets/balls.png';
import background from '../assets/backG.png';
import boden from '../assets/boden.png';
import bamboo from '../assets/bamboo.png';
import house from '../assets/house.png';
import w1 from '../assets/w1.png';
import w2 from '../assets/w2.png';
import w3 from '../assets/w3.png';
import w4 from '../assets/w4.png';


import style from '../style/default.css';

const viewHeight = 800;

const gameHeight = 10000;

let gameRunning = true;
var score = 0;
var scoreString = "Score: ";
var scoreText;




class TestScene extends Scene {

    constructor() {
        super({
            key: "TestScene"
        })
    }

    gameOver () {
        console.log("gameover")
        gameRunning = false;
        scoreText.visible = true;
        scoreText.setText("your score: " + score);
    }

    preload () {
        this.load.spritesheet('sumoSheet', dudes, { frameWidth: 100, frameHeight: 100})
        this.load.image('sumo', sumo)
        this.load.image('sumo2', sumo2)
        this.load.image('ball', ball)
        this.load.image('background', background)
        this.load.image('boden', boden)
        this.load.image('bamboo', bamboo)
        this.load.image('house', house)
        this.load.image('w1', w1)
        this.load.image('w2', w2)
        this.load.image('w3', w3)
        this.load.image('w3', w3)

        //this.player.body.
        //this.load.image('circle', circle);
    }

    create () {

        var catChars = this.matter.world.nextCategory();
        var catWalls = this.matter.world.nextCategory();
        var catFloor = this.matter.world.nextCategory();
        var catBalls = this.matter.world.nextCategory();
        var catBackground = this.matter.world.nextCategory();




        this.cursors = this.input.keyboard.createCursorKeys()

        console.log(this.matter)
        const y = gameHeight - 100
        this.matter.world.setBounds(0, 0, 800, gameHeight)


        // set background
        this.background = this.matter.scene.add.image(0, gameHeight, 'background')
        this.background.setScale(1.2)
        // clouds
        this.clouds = []

        for (let i = y - (Math.random() * 1000); i > 1000; i -= (Math.random() * 1000)) {
            const cloud = this.matter.add.image((Math.random() * 1600) - 800, i, 'w' + Math.ceil((Math.random() * 3)))
            cloud.setScale(Math.random() * 2)
            cloud.setIgnoreGravity(true)
            cloud.setCollidesWith([])
            this.clouds.push({
                cloud: cloud,
                direction: (Math.ceil(i) % 3) - 1
            })
        }

        //this.background.setCollisionCategory(catBackground)


        this.character = this.matter.add.sprite(50, y, 'sumoSheet', 2)
        this.character.setCircle(50)
        this.character.canJump = true;
        this.character.setFrictionAir(0)
        this.character.setCollisionCategory(catChars);

        this.matter.scene.cameras.main.setBounds(0, 0, 800, gameHeight - 175)
        this.matter.scene.cameras.main.startFollow(this.character, true, 0.99, 0.99)
        const walls = [];

        const secondMan = this.matter.add.image(600, y, 'sumo')
        secondMan.setCollisionCategory(catChars)





        const bambooHeight = 52;
        for (let i = y + bambooHeight; i > 0; i -= bambooHeight * 10) {
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
            floor.setCollisionCategory(catFloor);
            floor.setStatic(true)

            const ceil = this.matter.add.image(i * 800, 0, 'boden')
            ceil.setCollisionCategory(catWalls);
            ceil.setStatic(true)
        }

        this.ballSprite = this.matter.add.image(100, y - 400, 'ball')
        const ballScale = 0.5;
        this.ballSprite.setScale(ballScale)
        const bounceFactor = .8
        this.ballSprite.setCircle(150 * ballScale)
        this.ballSprite.setMass(1)
        this.ballSprite.setBounce(bounceFactor,bounceFactor)
        console.log(this.ballSprite)
        //this.matter.add.circle(50, 500, 10)
        this.character.setMass(20)
        console.log(this.character)
        this.ballSprite.setCollisionCategory(catBalls)

        this.input.keyboard.on("keydown_A", () => {
            console.log(this.character.getBounds(), this.matter.world)
            console.log(this.matter.scene.cameras.main)
        })
        this.input.keyboard.on("keydown_SPACE", () => {
            // Jump

            if (gameRunning && this.character.canJump > 0) {
                //this.character.applyForce({x: 0, y: -0.8})
                this.character.setVelocityY(-10)
                // TODO maybe second jump less high
                //this.character.setVelocityY(-5 * this.character.canJump)
                this.character.canJump -= 1;
                this.character.setFrame(1)

            }
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
            //console.log(event)
            //console.log(event, bodyA, bodyB)

        })

        //setup collision 
        this.character.setCollidesWith([ catWalls, catFloor, catChars, catBalls]);
        this.ballSprite.setCollidesWith([catWalls, catFloor, catBalls, catChars]);
        const char = this.character;


        // why does this.gameOver() fail inside the collision-handler?
        const gameOver = this.gameOver;
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            //console.log(this.walls)
            //console.log('collision', event, bodyA, bodyB)
            //
            console.log(event, bodyA, bodyB)
            if ((bodyA.collisionFilter.category === catWalls || 
                bodyB.collisionFilter.category === catWalls) &&
                (bodyA.collisionFilter.category === catChars || 
                    bodyB.collisionFilter.category === catChars))
            {
                char.canJump = 2;
                char.setVelocityY(0)
                char.setFrame(0)
            }

            if ((bodyA.collisionFilter.category === catFloor || 
                bodyB.collisionFilter.category === catFloor) &&
                (bodyA.collisionFilter.category === catBalls || 
                    bodyB.collisionFilter.category === catBalls))
            {
                gameOver();
            }
        })


        scoreText = this.add.text(32, 24, scoreString + score);
        scoreText.visible = false;
        console.log(this.background)
    }

    update() {
        const cam = this.matter.scene.cameras.main
        this.background.setPosition(400, cam._scrollY + viewHeight / 2)
        scoreText.setPosition(400, cam._scrollY + viewHeight / 2)

        if (gameRunning) {
            score = Math.max(score, gameHeight - this.ballSprite.y)
            //scoreText.setText(score)
            const speed = 8;
            this.character.setAngle(0)
            //this.background.

            this.character.setVelocityX(this.character.body.velocity.x * 0.9);

            //this.character.setFrame(1)
            if (this.cursors.left.isDown) {
                this.character.setVelocityX(-speed)
                this.character.setFlipX(true)
                //t//his.character.setFrame(0)
            }
            if (this.cursors.right.isDown) {
                this.character.setVelocityX(speed)
                this.character.setFlipX(false)
                //this.character.setFrame(2)
            }
            if (this.cursors.down.isDown) {
                if (this.character.body.velocity.y < speed) {
                    this.character.setVelocityY(speed)
                }
                //this.character.setFlipX(false)
                //this.character.setFrame(2)
            }
            if (this.cursors.up.isDown) {
            }
            if (this.cursors.down.isDown) {
            }



            this.clouds.forEach(cloud => {
                if (cloud.cloud.x > 800) {
                    cloud.direction = -1
                }
                if (cloud.cloud.x < 0) {
                    cloud.direction = 1
                }
                cloud.cloud.setVelocity(cloud.direction, 0)

            })


            if (this.ballSprite.y > (this.character.y + 500) ) {
                this.gameOver();
            }
        }


    }


}

export default TestScene
