
import { Scene, GameObjects, Matter } from 'phaser';

import blazerMan from '../assets/BackupBlazerstories/mainC.png';

import style from '../style/default.css';




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
        console.log(this.matter)
        const gameHeight = 100000;
        const y = gameHeight - 100
        this.matter.world.setBounds(0, 0, 800, gameHeight)

        this.character = this.matter.add.image(50, y, 'blazerMan')
        this.matter.scene.cameras.main.startFollow(this.character)
        this.matter.add.image(200, y, 'blazerMan')
        for (let i = y; i > 1000; i -= 100) {
            const left = this.matter.add.image(0, i, 'blazerMan') 
            left.setStatic(true)
            const right = this.matter.add.image(800, i, 'blazerMan') 
            right.setStatic(true)
        }
        this.matter.add.circle(300, y, 5, {
            strokeStyle: 'red'
        }) 
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

        


    }

    update() {
        this.character.setAngle(0)

    }
}

export default TestScene
