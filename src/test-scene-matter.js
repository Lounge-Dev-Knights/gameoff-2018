import { Scene, GameObjects, Matter } from 'phaser';

//import blazerMan from '../assets/BackupBlazerstories/mainC.png';
//import ball from '../assets/BounceNBounce/powerups/02powup.png';
import sheetPNG from '../assets/dataJsonPNG.png';
import sheetJSON from  '../assets/dataJsonPNG.json';
import shapes from '../assets/characters.json';
import style from '../style/default.css';

var score = 0;
var scoreString = "Score: ";
var scoreText;
var gamePausedString = "GAME IS PAUSED";
var gamePaused;
var gameIsPaused = 0;

class TestScene extends Scene {
    constructor() {
        super({
            key: "TestScene"
        })
    }

    preload () {
        //this.load.image('blazerMan', blazerMan)
        //this.load.image('ball', ball)
console.log('sheetPNG');
console.log(sheetPNG);
console.log('sheetJSON');
console.log(sheetJSON);
console.log('shapes');
console.log(shapes);
        this.load.atlas('sheet', sheetPNG, sheetJSON);
        //this.load.atlas('sheet', 'assets/fruit-sprites.png', 'assets/fruit-sprites.json');
        //this.load.multiatlas('cityscene', 'assets/cityscene.json', 'assets');
        this.load.json('shapes', shapes);
        //this.player.body.
        //this.load.image('circle', circle);

    }

    create () {
        const gameHeight = 1000;
        gamePaused = this.add.text(200, -100, gamePausedString);

        var shapes = this.cache.json.get('shapes');
      //var shapes = this.cache.json.get('shapes');
        this.matter.world.setBounds(0, 0, 800, gameHeight);
      //this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
        this.add.image(0, 0, 'sheet', 'scene/gameBackground1').setOrigin(0, 0);
      //this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);
        var mainC = this.matter.add.sprite(0, 0, 'sheet', 'characters/blazerMan', {shape: shapes.mainC});
      //var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: shapes.ground});
        mainC.setPosition(0 + mainC.centerOfMass.x, 100 + mainC.centerOfMass.y);  // position (0,280)
      //ground.setPosition(0 + ground.centerOfMass.x, 280 + ground.centerOfMass.y);  // position (0,280)$
var hello = 1;
        var ball = this.matter.add.sprite(100, 50, 'sheet1', 'powerups/powup02', {shape: shapes.powup02});

    //  var mainC = this.matter.add.sprite(0, 0, 'sheet', 'mainC', {shape: shapes.mainC}); //frame 2 ='scene/gameBackground1' , 'dataJsonPNG.png')
      //var background = this.add.sprite(0, 0, 'cityscene', 'background.png');


  //      this.add.image(29, 10, 'sheet','02powup',);//.setOrigin(200,-200); //'sheet' assets/BounceNBounce/powerups/
        console.log('add image:');
        console.log(this.matter.add.image(62, 62, 'sheet', 'powerups/powup01').setOrigin(100,100));
        console.log('added image.');



        //this.matter.add.sprite(200, 50, 'sheet', 'crate', {shape: shapes.crate});

        var catChars = this.matter.world.nextCategory();
        var catWalls = this.matter.world.nextCategory();
        //this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

        this.cursors = this.input.keyboard.createCursorKeys()

        console.log(this.matter)

        const y = gameHeight - 100


      //  mainC = this.matter.add.image(50, y, 'blazerMan')
      //  mainC.
        mainC.setCollisionCategory(catChars);

        this.matter.scene.cameras.main.startFollow(mainC)
/*        const walls = [];
        this.matter.add.image(200, y, 'blazerMan')
        for (let i = y + 50; i > 1000; i -= 80) {
            const left = this.matter.add.image(0, i, 'blazerMan')
            left.setCollisionCategory(catWalls);
            left.setStatic(true)

            const right = this.matter.add.image(800, i, 'blazerMan')
            right.setCollisionCategory(catWalls);
            right.setStatic(true)
            walls.push(right)
        }
*/
        this.ballSprite = this.matter.add.sprite(100, y - 400, ball)
        const bounceFactor = .8
        this.ballSprite.setBounce(bounceFactor,bounceFactor)
        console.log('this.ballSprite:')
        console.log(this.ballSprite)
        //this.matter.add.circle(50, 500, 10)
        .setMass(20)
        //console.log(mainC)

        this.input.keyboard.on("keydown_A", () => {
            //console.log(mainC.getBounds())
        })
        this.input.keyboard.on("keydown_SPACE", () => {
            mainC.applyForce({x: 0, y: -0.8})
        })
        this.input.keyboard.on("keydown_P", () => {
          //console.log(gameIsPaused);
          if (gameIsPaused == 0){
            gameIsPaused = 1;
          }
          else {
              gameIsPaused = 0;
          }

        })
        //this.input.keyboard.on("keydown_DOWN", () => {
        //    mainC.setScale(1)
        //})


        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            //console.log(event, bodyA, bodyB)

        })

        this.matter.world.on('beforeUpdate', (event) => {
            //console.log(event)
            //console.log(event, bodyA, bodyB)

        })

//setup collision

        mainC.setCollidesWith([ catWalls, catChars ]);
        this.matter.world.on('collisionstart', function (event) {

        })


        scoreText = this.add.text(32, 24, scoreString + score);
            scoreText.visible = true;
    }

    update() {
if (gameIsPaused == 0){
        gamePaused.visible = false;
mainC.setVelocity(0,0);
mainC.setMass(0);
        mainC.setAngle(0)
        if (this.cursors.left.isDown) {
            mainC.setVelocityX(-5)
            mainC.setFlipX(true)
        }
        if (this.cursors.right.isDown) {
            mainC.setVelocityX(5)
            mainC.setFlipX(false)
        }
        if (this.cursors.up.isDown) {
        }
        if (this.cursors.down.isDown) {
        }
}
if (gameIsPaused == 1) {
    gamePaused.visible = true;
    mainC.setMass(20);
    }
}

}
export default TestScene
