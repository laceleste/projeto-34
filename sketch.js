const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var maca
var rock
var tree
function preload(){
  tree_img = loadImage("arvore.png")
  macaimg = loadImage("maca.png")
  bgImg = loadImage("bg2.jpg")
  pedra_img = loadImage("rock2.png")
}

function setup() {
  createCanvas(700,600);

  engine = Engine.create();
  world = engine.world;
  var options={
		isStatic:false,
		restitution:0.3,
		friction:0,
		density:1.2
	}

  ground = new Ground(200,590,1000,20);

  tree = createSprite(100,400,100,100)
  tree.setCollider("rectangle",0,0,100,1000)
  tree.debug= true
  tree.addImage("tree",tree_img)
  tree.scale = 0.2

 

  pedra = Bodies.circle(300,300,20,options)
  World.add(world, pedra)
}

function draw() 
{
  background(255);
   rectMode(CENTER)
  //  [fundo]
  image(bgImg,0,0,width,height);
  Engine.update(engine);
  
  // [if para quando colidir]
   if(collide(tree,pedra)==true){
    if(frameCount%30===0){ 
    maca = createSprite(random(100,200),400,100,100)
    maca.visible =false
    maca.addImage("maca",macaimg)
    maca.scale=0.2
    maca.visible=true
    maca.velocityY=2
     }
  }

  image(pedra_img,pedra.position.x,pedra.position.y,30,30)
  
  // pontuação [fazer]
  fill ("black")
  text("Pontuação: ",width/2-300,height/2-250)
  ground.show()
  drawSprites()

}

// [função do projeto 21 para aplicar força em um corpo]
function keyPressed() {
  if (keyCode === UP_ARROW) {
  Matter.Body.applyForce(pedra,pedra.position,{x:-85,y:-85});
 }
}

// [funçaõ do jogo do coelho para quando colidir]
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,pedra);
              return true; 
            }
            else{
              return false;
            }
         }
}