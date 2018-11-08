
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

        this.matter.world.setBounds(0,0,800,600)
        console.log(this.matter)
        this.circle = this.matter.add.circle(50, 200, 20, {})
        
        const trapezoid = this.matter.add.trapezoid(50, 50, 20, 20, 5)
        this.matter.add.mouseSpring()
        //circle.setPosition(0,0)
        console.log(this.circle)
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


    }

    update() {
        //console.log(this.circle)

    }
}

export default TestScene