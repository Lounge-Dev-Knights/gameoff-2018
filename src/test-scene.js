
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
import gameover from '../assets/game-over.png';
import presents from '../assets/BS_presents.png';
import title from '../assets/sumo_raice.png';


import style from '../style/default.css';

const viewHeight = 800;
const speed = 8;
let gameHeight = 1000;

let gameRunning = false;
var score = 0;
var scoreString = "Score: ";
var scoreText, gameoverText;
var highestTouchPlayer = 1


class TestScene extends Scene {

    constructor() {
        super({
            key: "TestScene"
        })
    }

    startGame() {
        this.presents.setVisible(false)
        this.title.setVisible(false)
        this.ballSprite.setIgnoreGravity(false)
        this.gameStarted = true;
        this.ballSprite.applyForce({x: -0.01, y: -0.03})

    }
    gameOver () {

      if (this.character == this.ballSprite.lastTouchedBy) {
        highestTouchPlayer = 1;
      } else {
        highestTouchPlayer = 2;
      }

        scoreText = this.add.text(32, 24, scoreString + score, {
            fontSize: 32,
            stroke: 'black',
            strokeThickness: 5
        });

        gameoverText = this.add.image(32, 24, 'gameover');
        gameoverText.visible = false;

        console.log("gameover")
        gameRunning = false;
        scoreText.visible = true;
        gameoverText.visible = true;

        scoreText.setText("Player: " + highestTouchPlayer + "  score: " + Math.round(score, 0));

    }

    createWalls(fromHeight, toHeight) {
        const bambooHeight = 2000;
        for (let i = -fromHeight; i > -toHeight; i -= bambooHeight) {
            const left = this.matter.add.image(0, i, 'bamboo')
            left.setCollisionCategory(this.catWalls);
            left.setStatic(true)

            const right = this.matter.add.image(800, i, 'bamboo')
            right.setCollisionCategory(this.catWalls);
            right.setStatic(true)
            //walls.push(right)
        }
    }

    createClouds(fromHeight, toHeight) {
        for (let i = -fromHeight - (Math.random() * 1000); i > -toHeight; i -= (Math.random() * 1000)) {
            const cloud = this.matter.add.image((Math.random() * 1600) - 800, i, 'w' + Math.ceil((Math.random() * 3)))
            cloud.setScale(Math.random() * 2)
            cloud.setIgnoreGravity(true)
            cloud.setCollidesWith([])
            this.clouds.push({
                cloud: cloud,
                direction: (Math.ceil(i) % 3) - 1
            })
        }
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
        this.load.image('w4', w4)
        this.load.image('gameover', gameover)
        this.load.image('presents', presents)
        this.load.image('title', title)

        //this.player.body.
        //this.load.image('circle', circle);
    }

    create () {
        gameHeight = 1000;

        this.gameStarted = false;
        gameRunning = true;
        score = 0;

        var catChars = this.matter.world.nextCategory();
        var catWalls = this.matter.world.nextCategory();
        this.catWalls = catWalls;
        var catFloor = this.matter.world.nextCategory();
        var catBalls = this.matter.world.nextCategory();
        var catBackground = this.matter.world.nextCategory();




        this.cursors = this.input.keyboard.createCursorKeys()
        this.cursors2 = this.input.keyboard.addKeys(
        {up:Phaser.Input.Keyboard.KeyCodes.W, down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A, right:Phaser.Input.Keyboard.KeyCodes.D});
        //console.log(this.matter)
        const y = -100
        this.matter.world.setBounds(0, 0, 800, 600)


        // set background
        this.background = this.matter.scene.add.image(0, gameHeight, 'background')
        this.background.setScale(1.2)


        // clouds
        this.clouds = []

        this.createClouds(0, gameHeight)
        //for (let i = y - (Math.random() * 1000); i > 1000; i -= (Math.random() * 1000)) {
        //    const cloud = this.matter.add.image((Math.random() * 1600) - 800, i, 'w' + Math.ceil((Math.random() * 3)))
        //    cloud.setScale(Math.random() * 2)
        //    cloud.setIgnoreGravity(true)
        //    cloud.setCollidesWith([])
        //    this.clouds.push({
        //        cloud: cloud,
        //        direction: (Math.ceil(i) % 3) - 1
        //    })
        //}

        //this.background.setCollisionCategory(catBackground)
        const bounceFactor = .8

        //creating player 1 and player 2:
        this.character = this.matter.add.sprite(200, y, 'sumoSheet', 2)
        this.character.setCircle(50)
        this.character.canJump = true;
        this.character.lastHit = true;
        this.character.setFrictionAir(0)
        this.character.setMass(20)
        this.character.setBounce(bounceFactor,bounceFactor)
        this.character.setCollisionCategory(catChars);
        this.character.setCollidesWith([ catWalls, catFloor, catChars, catBalls]);
        const char1 = this.character;

        this.character2 = this.matter.add.sprite(600, y, 'sumoSheet', 2)
        this.character2.setCircle(50)
        this.character2.canJump = true;
        this.character2.lastHit = false;
        this.character2.setFrictionAir(0)
        this.character2.setMass(20)
        this.character2.setBounce(bounceFactor,bounceFactor)
        this.character2.setCollisionCategory(catChars);
        this.character2.setCollidesWith([ catWalls, catFloor, catChars, catBalls]);
        const char2 = this.character2;

        this.matter.scene.cameras.main.setBounds(0, 0, 800, gameHeight - 175)
        //var cameraX = (this.character.body.position.x + this.character2.body.position.x) / 2
        var cameraY = (this.character.body.position.y + this.character2.body.position.y) / 2
        console.log("character pos")
        console.log(this.matter.scene.cameras.main)
          this.matter.scene.cameras.main.startFollow(this.character, true, 0.99, 0.99) //player2?
          this.matter.scene.cameras.main.stopFollow(this.character, true, 0.99, 0.99)
        //this.matter.scene.cameras.main.startFollow(this.character, true, 0.99, 0.99) //player2?
        const walls = [];

        //const secondMan = this.matter.add.sprite(600, y, 'sumoSheet', 2)                 //player2?
        //secondMan.setCollisionCategory(catChars)                                //player2?





        //const bambooHeight = 2000;
        //for (let i = y + bambooHeight; i > -10000; i -= bambooHeight) {
        //    const left = this.matter.add.image(0, i, 'bamboo')
        //    left.setCollisionCategory(catWalls);
        //    left.setStatic(true)

        //    const right = this.matter.add.image(800, i, 'bamboo')
        //    right.setCollisionCategory(catWalls);
        //    right.setStatic(true)
        //    walls.push(right)
        //}
        this.createWalls(0, 1000)

        const houseSprite = this.matter.add.image(400, - 360, 'house')
        houseSprite.setCollisionCategory(catBackground);
        houseSprite.setStatic(true)
        for (let i = 0; i < 2; i++) {
            const floor = this.matter.add.image(i * 800, 0, 'boden').setOrigin(0.5, 0.55)
            floor.setCollisionCategory(catFloor);
            floor.setStatic(true)
        }


        // Title
        this.presents = this.matter.scene.add.image(400, -800, 'presents')
        this.title = this.matter.scene.add.image(400, -490, 'title')

        this.ballSprite = this.matter.add.image(585, y - 472, 'ball')
        const ballScale = 0.56;
        this.ballSprite.setScale(ballScale)
        this.ballSprite.setCircle(150 * ballScale)
        this.ballSprite.setMass(1)
        this.ballSprite.setBounce(bounceFactor,bounceFactor)
        this.ballSprite.setIgnoreGravity(true)
        //console.log(this.ballSprite)
        //this.matter.add.circle(50, 500, 10)
        //

        this.ballSprite.setCollisionCategory(catBalls)
        this.ballSprite.setCollidesWith([catWalls, catFloor, catBalls, catChars]);


        this.input.keyboard.on("keydown_F", () => {
            console.log(this.character.getBounds(), this.matter.world)
            console.log(this.matter.scene.cameras.main)
        })
        this.input.keyboard.on("keydown_SPACE", () => {
            // Jump
            if (!this.gameStarted) {
                this.matter.scene.cameras.main.startFollow(this.character, true, 0.99, 0.99) //player2?
                this.matter.world.setBounds(0, 0, 800, gameHeight)
                this.startGame()
            }
        })

        this.input.keyboard.on("keydown_UP", () => {
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

        this.input.keyboard.on("keydown_W", () => {
            console.log(this.character2.getBounds(), this.matter.world)
            console.log(this.matter.scene.cameras.main)
            if (gameRunning && this.character2.canJump > 0) {
                //this.character.applyForce({x: 0, y: -0.8})
                this.character2.setVelocityY(-10)
                // TODO maybe second jump less high
                //this.character.setVelocityY(-5 * this.character.canJump)
                this.character2.canJump -= 1;
                this.character2.setFrame(1)
            }
        })
        this.input.keyboard.on("keydown_R", () => {
            this.scene.restart("TestScene")
            console.log(this)
        })

        //Character 2 Keys:


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





        // why does this.gameOver() fail inside the collision-handler?
        const gameOver = this.gameOver.bind(this);
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            //console.log(this.walls)
            //console.log('collision', event, bodyA, bodyB)
            //
            //
            if ((bodyA.collisionFilter.category === catWalls ||
                bodyB.collisionFilter.category === catWalls) &&
                (bodyA.collisionFilter.category === catChars ||
                    bodyB.collisionFilter.category === catChars))
            {
              if(bodyA.collisionFilter.category == catChars){
                bodyA.gameObject.canJump = 2
                bodyA.gameObject.setVelocityY(Math.max(0, bodyA.gameObject.velocity.y))
                bodyA.gameObject.setFrame(0)
              }
              if(bodyB.collisionFilter.category == catChars){
                bodyB.gameObject.canJump = 2
                bodyB.gameObject.setVelocityY(Math.max(0, bodyB.gameObject.velocity.y))
                bodyB.gameObject.setFrame(0)
              }
            }

            if ((bodyA.collisionFilter.category === catChars ||
                bodyB.collisionFilter.category === catChars) &&
                (bodyA.collisionFilter.category === catBalls ||
                    bodyB.collisionFilter.category === catBalls))
            {
              let character;
              let ball;
              if(bodyA.collisionFilter.category == catChars) {
                character = bodyA.gameObject;
                ball = bodyB.gameObject;
              }
              if(bodyB.collisionFilter.category == catChars){
                character = bodyB.gameObject;
                ball = bodyA.gameObject;
              }
              //who had the last touch?
              ball.lastTouchedBy = character;
            }
            if ((bodyA.collisionFilter.category === catFloor ||
                bodyB.collisionFilter.category === catFloor) &&
                (bodyA.collisionFilter.category === catBalls ||
                    bodyB.collisionFilter.category === catBalls))
            {
                gameOver();
            }
        })


        //console.log(this.background)
    }

    update() {

        const cam = this.matter.scene.cameras.main
        this.background.setPosition(400, cam._scrollY + viewHeight / 2)

        if (gameRunning) {

            score = Math.max(score, -this.ballSprite.y - 500)
            //scoreText.setText(score)
            //this.background.
            this.character.setAngle(0)
            this.character2.setAngle(0)
            this.character.setVelocityX(this.character.body.velocity.x * 0.9);
            this.character2.setVelocityX(this.character2.body.velocity.x * 0.9);
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

//character2
            if (this.cursors2.left.isDown) {
                this.character2.setVelocityX(-speed)
                this.character2.setFlipX(true)
                //t//his.character.setFrame(0)
            }
            if (this.cursors2.right.isDown) {
                this.character2.setVelocityX(speed)
                this.character2.setFlipX(false)
                //this.character.setFrame(2)
            }
            if (this.cursors2.down.isDown) {
                if (this.character2.body.velocity.y < speed) {
                    this.character2.setVelocityY(speed)

                }
                //this.character.setFlipX(false)
                //this.character.setFrame(2)
            }
            if (this.cursors2.up.isDown) {
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

            // Check and process map extension if needed

            const oldGameHeight = gameHeight
            const newGameHeight = -this.ballSprite.y + 1000

            if (newGameHeight > gameHeight) {
                gameHeight = newGameHeight + 1000
                this.createClouds(oldGameHeight, gameHeight)
                this.createWalls(oldGameHeight, gameHeight)

                this.children.bringToTop(this.character)
                this.children.bringToTop(this.ballSprite)
                this.matter.scene.cameras.main.setBounds(0, -gameHeight - 1000, 800, gameHeight + 1000 - 150 )

            }

        } else {

            // Move gameover-text with camera
            scoreText.setPosition(180, cam._scrollY + viewHeight / 2 - 350)
            gameoverText.setPosition(400, cam._scrollY + viewHeight / 2)
        }
    }
}

export default TestScene
