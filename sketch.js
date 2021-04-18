PLAY = 1;
END = 0;
WIN = 2;

var score;
var knifeSound;
var bombSound;

var gameState = PLAY;

var player, thief;
var ground;
var life = 5;

function preload()
{
  playerImg = loadImage("player.png");
  thiefImg = loadImage("burgler.png");
  bg1Img = loadImage("bg1.png");
  knifeImg = loadImage("katana.png");
  bombImg = loadImage("bomb2.png");
  shieldImg = loadImage("shield.png");
  knifeSound = loadSound("knifeSound.mp3");
  bombSound = loadSound("bombSound.wav");
}

function setup() 
{  
  createCanvas(1200,400);

  bg = createSprite(400,200,800,400);
  bg.velocityX = -3.5;
  bg.addImage(bg1Img);
  bg.scale = 2;

  ground = createSprite(600,390,1200,10);
  ground.shapeColor = "brown";
  ground.visible = false;

  player = createSprite(200, 330, 50, 50);
  player.addImage(playerImg);
  player.scale = 0.019;

  thief = createSprite(900,330,20,20);
  thief.addImage(thiefImg);
  thief.scale = 0.095;

  score = 0;
 
  knifeGroup = createGroup();
  bombGroup = createGroup();
  powerGroup = createGroup();
}

function draw() 
{
  background("white");

    if(gameState === PLAY)
    {

      score = score + Math.round(getFrameRate()/60);

      if(bg.x < 300)
      {
        bg.x = bg.width/2;
      }
    
      if(player.isTouching(powerGroup))
      {
        player.velocityX = 2;
        life = 5;
      }
          
      if(keyDown("space") && player.y > 50)
      {
        player.velocityY = -10;
      }
    
      player.velocityY = player.velocityY + 0.8;
    
      player.collide(ground);
      thief.collide(ground);
    
      if(player.isTouching(bombGroup))
      {
        bombGroup.destroyEach();
        bombSound.play();
        life = life - 2;    
      }

      if(player.isTouching(knifeGroup))
      {
        knifeGroup.destroyEach();
        knifeSound.play();
        life = life - 1;    
      }

      if(life <= 0)
      {
        gameState = END;
      }

      if(player.x > 1200)
      {
        gameState = END;
      }
  
      if(player.collide(thief))
      {
        gameState = WIN;
      }

      spawnShield();
      spawnBomb();
      spawnKnife();

      drawSprites();
    }

    if(gameState === END)
    {
      stroke("white");
      fill("red");
      textSize(50);
      text("Game Over",450,200);
    }

   if(gameState === WIN)
   {
      stroke("white");
      fill("green");
      textSize(50);
      text("You Win",430,200);
    }

    stroke("white");
    fill("black");
    textSize(25);
    text("Score:"+score,1000,50);

    stroke("white");
    fill("white");
    textSize(20);
    text("Collect Shield to restore life and to boost the player to catch the thief",100,20);
    text("Press space to jump",100,40);

    stroke("white");
    fill("black");
    textSize(25);
    text("life:" + life ,1000,80)
}

function spawnKnife()
{
  if(World.frameCount % 80 === 0){
    var knife = createSprite(900,330,20,20);
    knife.addImage(knifeImg);
    knife.velocityX = -(10 + score/80) ;
    knife.scale = 0.055;
    knifeGroup.add(knife);
  }  
}

function spawnBomb()
{
  if(World.frameCount % 350 === 0){
    var bomb = createSprite(900,330,30,30);
    bomb.y = Math.round(random(305,330));
    bomb.addImage(bombImg);
    bomb.velocityX = -(13 + score/60);
    bomb.scale = 0.05;
    bombGroup.add(bomb);
  }
}

function spawnShield()
{
  if(World.frameCount % 750 === 0){
    var shield = createSprite(1200,50,20,20);
    shield.y = Math.round(random(40,90));
    shield.addImage(shieldImg);
    shield.scale = 0.02;
    shield.velocityX = -(5 + score/100);
    powerGroup.add(shield);
  }  
}