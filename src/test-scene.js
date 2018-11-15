
import { Scene, GameObjects, Matter } from 'phaser';

import blazerMan from '../assets/BackupBlazerstories/mainC.png';

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
        //this.player.body.
        //this.load.image('circle', circle);
    }


    create () {
        var catChars = this.matter.world.nextCategory();
        var catWalls = this.matter.world.nextCategory();



        console.log(this.matter)
        const gameHeight = 100000;
        const y = gameHeight - 100
        this.matter.world.setBounds(0, 0, 800, gameHeight)

        this.character = this.matter.add.image(50, y, 'blazerMan')
        this.character.setCollisionCategory(catChars);

        this.matter.scene.cameras.main.startFollow(this.character)
        const walls = [];
        this.matter.add.image(200, y, 'blazerMan')
        for (let i = y; i > 1000; i -= 100) {
            const left = this.matter.add.image(0, i, 'blazerMan')
            left.setCollisionCategory(catWalls);
            left.setStatic(true)

            const right = this.matter.add.image(800, i, 'blazerMan')
            right.setCollisionCategory(catWalls);
            right.setStatic(true)
            walls.push(right)
        }
            this.matter.add.circle(200, y, 5)
        //this.matter.add.circle(50, 500, 10)
        this.character.setMass(20)
        console.log(this.character)

        this.input.keyboard.on("keydown_A", () => {
            console.log(this.character.getBounds(), this.matter.world)
        })
        this.input.keyboard.on("keydown_SPACE", () => {
            this.character.applyForce({x: 0, y: -1})
        })
        this.input.keyboard.on("keydown_LEFT", () => {
            this.character.setFlipX(true)
            this.character.setVelocityX(-10)
        })
        this.input.keyboard.on("keydown_RIGHT", () => {
            this.character.setFlipX(false)
            this.character.setVelocityX(10)
        })
        this.input.keyboard.on("keydown_UP", () => {
            this.character.setScale(2)
        })
        this.input.keyboard.on("keydown_DOWN", () => {
            this.character.setScale(1)
        })


        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            //console.log(event, bodyA, bodyB)

        })

        this.matter.world.on('beforeUpdate', (event) => {
            console.log(event)
            //console.log(event, bodyA, bodyB)

        })

//setup collision

        this.character.setCollidesWith([ catWalls, catChars ]);
        this.matter.world.on('collisionstart', function (event) {

        })

        //circle.setPosition(0,0)
        //this.input.on("pointermove", (pointer) => {
        //    //this.matter.add.circle(pointer.x, pointer.y, 20)
        //    console.log("click")
        //})
        //console.log("create")
        //this.matter.world.setBounds(0, 0, 1000, 1000)
        //console.log("create")



        //const rect = this.add.rectangle(100, 0, 50, 1000, 0xffffff)


        ////console.log(this.matter)
        //this.player = this.add.rectangle(200, 400, 50, 50, 0xff00ff)

        ////const jumpingRect = this.add.rectangle(200, 100, 50, 50, 0xffffff)
        ////const circle = this.add.star(200, 100, 5, 20, 40, 0x0000ff);
        //const circle2 = this.matter.add.circle(300, 100, 50, 0xff0000);
        //
        //this.matter.add.gameObject(this.player)
        //const walls = this.matter.scene.add.group()
        //const elements = this.matter.scene.add.group()
        ////elements.add(circle)
        ////elements.add(circle2)
        ////elements.add(jumpingRect)
        ////walls.add(rect)
        ////walls.add(this.add.rectangle(500, 0, 50, 1000, 0xffffff))
        ////walls.add(this.add.rectangle(100, 500, 1000, 50, 0xffffff))


//      //  this.matter.add.collider(elements, walls)
        ////this.matter.add.collider(this.player, walls, (player, wall) => {
        ////
        ////    //wall.body.setFriction(1, 1)
        ////    const wallVelocity = 100;
        ////    if (player.body.touching.left) {
        ////        console.log("touching left")
        ////        this.player.body.setVelocity(-1, wallVelocity)
        ////    }
        ////    if (player.body.touching.right) {
        ////        console.log("touching right")
        ////        this.player.body.setVelocity(1, wallVelocity)
        ////    }
        ////})
        ////this.matter.add.collider(elements, elements)
        ////this.matter.add.collider(walls, elements)
        ////this.matter.add.collider(this.player, elements)

        ////circle.body.setVelocity(-200, -200)
        ////circle2.setVelocity(-200, 200)
        ////circle2.body.setCircle(50, -25, -25)
        ////jumpingRect.body.setVelocityX(-200)
        ////circle.body.setBounceX(0.5)
        ////circle.body.setBounceY(0.5)
        ////circle2.body.setBounceX(1)
        ////circle2.body.setBounceY(1)
        ////jumpingRect.body.setBounceX(0)
        ////jumpingRect.body.setBounceY(0)

        //
        //console.log(this.player)
        //this.player.setVelocity(-200)
        ////this.player.setBounceX(0)
        ////this.player.setBounceY(0)
        //this.player.setMass(10)
        ////this.player.body.setImmovable(true)

        //
        //console.log(circle2)

        ////this.input.keyboard.on("keydown_SPACE", (event) => {
        ////    console.log("space")
        ////    const jumpVelocity = 500
        ////    if (this.player.body.touching.left) {
        ////        console.log("left")
        ////        this.player.body.setVelocity(jumpVelocity, -jumpVelocity)
        ////    }
        ////    if (this.player.body.touching.right) {
        ////        console.log("right")
        ////        this.player.body.setVelocity(-jumpVelocity, -jumpVelocity)
        ////    }
        ////})

        scoreText = this.add.text(32, 24, scoreString + score);
            scoreText.visible = true;
    }

    update() {
        //console.log(this.circle)
        this.character.setAngle(0)
        const y = this.character.y;
        //console.log(y)

        //this.world.bounds.min.y = 300 + character.bounds.min.y
        //this.world.bounds.max.y = 300 + character.bounds.min.y + initialEngineBoundsMaxY

        //this.matter.world.setBounds(0, y - 600, 800, 600)

        //this.matter.world.setBounds(0, -400, 800, 1000)
        const size = 1000;

        //console.log(y)
        //this.matter.world.setBounds(0,(size - y) + 400,800,size)


    }
}

export default TestScene
