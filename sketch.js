var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  


  var survivalTime=0;
  

   monkey=createSprite(50,250,20,50);
   monkey.addAnimation("moving", monkey_running);

   monkey.scale=0.1
  
  ground = createSprite(200,280,400,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
 
  ground.visible=false         
}


function draw() {
  
  background(255);
  text("SurvilalTime: "+ score, 300,50);
  
    if(gameState === PLAY) {
      if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
      if(monkey.isTouching(obstacleGroup)) {
        gameState = END 
         }
      spawnObstacle();
      
      spawnFood();
      
    }
  
  if(gameState === END) {
   
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
  }
    monkey.collide(ground);   
  
 
  drawSprites();
}

function spawnObstacle(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(900,250,10,40);
   obstacle.addImage("obstacle",obstacleImage);
  obstacle.x = Math.round(random(900,120));
    obstacle.velocityX = -4;
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   obstacle.velocityX = -(4 + score/100);
    obstacleGroup.add(obstacle);
 }
}
function spawnFood() {
 
  if (frameCount % 60 === 0) {
    var banana = createSprite(900,150,40,10);
    banana.x = Math.round(random(900,120));
    banana.addImage(bananaImage);
   banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    
    
    FoodGroup.add(banana);
  }
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+2;
    }
  
}

