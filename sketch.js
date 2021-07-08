var climberImg, doorImg, ghostImg, towerImg
var tower
var door
var ghost
var climber
var doorsGroup, climberGroup
var invisBlock,invisBlockGroup
var gameState="play"
var score=0
function preload(){
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
}
function setup(){
  createCanvas(displayWidth,displayHeight)
  tower = createSprite(width/2,width/2,width,height)
  tower.addImage(towerImg)
  tower.scale = 2.2;
  tower.velocityY=1
  doorsGroup=new Group();
  climberGroup=new Group();
  invisBlockGroup=new Group();
  ghost=createSprite(300,300,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
}
function draw(){
  background("black")
  fill ("red")
  if(gameState==="play"){
    score=score+Math.round(frameCount/60)
  camera.position.x=ghost.x
  camera.position.y=ghost.y
  if(tower.y>400){
    tower.y = 300;
  }
  spawnDoors();
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3
  
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3
  }
  if(keyDown("space")){
    ghost.velocityY=-5 
  }
  ghost.velocityY=ghost.velocityY+0.8
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  if(ghost.y>height||invisBlockGroup.isTouching(ghost)){
    gameState="end"
    ghost.destroy();
  }
drawSprites();
text("score:"+score,width/2,50)
  }else{
    fill ("red")
    textSize(30)
    text("GAME OVER",width/2,height/2)
    text("score:"+score,width/2,50)
  }
}
  function spawnDoors(){
    if(frameCount%250===0){
      door = createSprite(200,-50);
      door.addImage(doorImg);
      door.x=Math.round(random(100,width));
      door.velocityY=1;
      door.lifetime=800;
      doorsGroup.add(door)
      climber=createSprite(200,10)
      climber.addImage(climberImg);
      climber.x=door.x;
      climber.velocityY=1;
      climber.lifetime=800;
      climberGroup.add(climber);
      ghost.depth=door.depth
      ghost.depth+=1
      invisBlock=createSprite(200,15,climber.width,2)
      invisBlock.debug=true;
      invisBlock.x=climber.x
      invisBlock.velocityY=1
      invisBlock.lifetime=800
      invisBlockGroup.add(invisBlock)
    }
  }
