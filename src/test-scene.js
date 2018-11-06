
import { Scene, GameObjects } from 'phaser';

//import circle from '../assets/circle.svg';

import style from '../style/default.css';




class TestScene extends Scene {

    constructor() {
        super({
            key: "TestScene"
        })
    }
    
    preload () {
        //this.player.body.
        //this.load.image('circle', circle);
    }


    create () {
        console.log("create")


        const rect = this.add.rectangle(100, 0, 50, 1000, 0xffffff)


        this.player = this.add.rectangle(200, 400, 50, 50, 0xff00ff)

        //const jumpingRect = this.add.rectangle(200, 100, 50, 50, 0xffffff)
        //const circle = this.add.star(200, 100, 5, 20, 40, 0x0000ff);
        const circle2 = this.add.circle(300, 100, 50, 0xff0000);
        
        this.physics.add.existing(this.player)
        const walls = this.physics.add.staticGroup()
        const elements = this.physics.add.group()
        //elements.add(circle)
        elements.add(circle2)
        //elements.add(jumpingRect)
        walls.add(rect)
        walls.add(this.add.rectangle(500, 0, 50, 1000, 0xffffff))
        walls.add(this.add.rectangle(100, 500, 1000, 50, 0xffffff))


//        this.physics.add.collider(elements, walls)
        this.physics.add.collider(this.player, walls, (player, wall) => {
            
            //wall.body.setFriction(1, 1)
            const wallVelocity = 100;
            if (player.body.touching.left) {
                console.log("touching left")
                this.player.body.setVelocity(-1, wallVelocity)
            } 
            if (player.body.touching.right) {
                console.log("touching right")
                this.player.body.setVelocity(1, wallVelocity)
            } 
        })
        this.physics.add.collider(elements, elements)
        this.physics.add.collider(walls, elements)
        this.physics.add.collider(this.player, elements)

        //circle.body.setVelocity(-200, -200)
        circle2.body.setVelocity(-200, 200)
        circle2.body.setCircle(50, -25, -25)
        //jumpingRect.body.setVelocityX(-200)
        //circle.body.setBounceX(0.5)
        //circle.body.setBounceY(0.5)
        circle2.body.setBounceX(1)
        circle2.body.setBounceY(1)
        //jumpingRect.body.setBounceX(0)
        //jumpingRect.body.setBounceY(0)

        
        this.player.body.setVelocity(-200)
        this.player.body.setBounceX(0)
        this.player.body.setBounceY(0)
        this.player.body.setMass(10)
        //this.player.body.setImmovable(true)

        
        console.log(circle2.body)

        this.input.keyboard.on("keydown_SPACE", (event) => {
            console.log("space")
            const jumpVelocity = 500
            if (this.player.body.touching.left) {
                console.log("left")
                this.player.body.setVelocity(jumpVelocity, -jumpVelocity)
            }
            if (this.player.body.touching.right) {
                console.log("right")
                this.player.body.setVelocity(-jumpVelocity, -jumpVelocity)
            }
        })


    }

    update() {

    }
}

export default TestScene
