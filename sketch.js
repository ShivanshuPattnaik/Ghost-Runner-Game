var tower, towerImage;

var ghost, ghostImage;

var door, doorImage, doorGroup;

var climber, climberImage, climberGroup;

var invisibleBlock, invisibleBlockGroup;

var gameState = "play";

function preload(){
 
  towerImage = loadImage("tower.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
}

function setup(){
  
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 6;
  
  ghost = createSprite(300, 300, 10, 10);
  ghost.addImage(ghostImage);
  ghost.scale = 0.35;
  
  doorGroup = createGroup();
  
  climberGroup = createGroup();
  
  invisibleBlockGroup = createGroup();

}

function draw(){
  
  background("black");
  
  if(gameState === "play"){
    
    if(tower.y > 400){
    
    tower.y = 300;
    
  }
  
  if(keyDown("space")){
    
    ghost.velocityY = -6;
    
  }
  
  if(keyDown("RIGHT_ARROW")){
    
    ghost.x += 3;
    
  }
  
  if(keyDown("LEFT_ARROW")){
    
    ghost.x -= 3;
    
  }
  
  ghost.velocityY += 0.8;
    
      spawnDoors();
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
    
  }
    
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  
    ghost.destroy();
    
    gameState = "end"
    
  }
    
}
  else if(gameState === "end"){
    
    textFont("Typograph Pro");
    fill("yellow");
    stroke("yellow");
    strokeWeight(2);
    textSize(30);
    text("GAME OVER!!", 200, 300);
    
  }
  
  drawSprites();
  
}

function spawnDoors(){
  
  if(frameCount % 80 === 0){
    
    door = createSprite(200, -50, 10, 10);
    door.addImage(doorImage);
    door.velocityY = 6;
    door.x = Math.round(random(120, 400));
    door.lifetime = 200;
    
    climber = createSprite(200, 0, 10, 10);
    climber.addImage(climberImage);
    climber.velocityY = 6;
    climber.x = door.x;
    climber.lifetime = 200;
    
    invisibleBlock = createSprite(200, 5, 10, 2);
    invisibleBlock.x = climber.x;
    invisibleBlock.velocityY = 6;
    invisibleBlock.lifetime = 200;
    invisibleBlock.visible = false;
    
    doorGroup.add(door);
    
    climberGroup.add(climber);
    
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    
    ghost.depth += 1;
    
  }
  
}