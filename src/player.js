class Player {
  constructor(keyJump, keyLeft, keyRight, Sprite, Mass, Speed, posX, posY, velocityX, velocityY){
    this.keyJump = keyJump;
    this.keyLeft = keyLeft;
    this.keyRight = keyRight;
    this.Sprite = Sprite;
    this.Mass = Mass;
    this.Speed = Speed; //not working with acceleration i feel.
    this.posX = posX;
    this.posY = posY;
    this.velocityX = velocityX;
    this.velocityY = velocityY;   
  }
  moveLeft(){
  //return this.velocityX = -this.Speed   //still thinking what to do with moveLeft()
  }
  
}
