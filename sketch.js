var fundo;
var player, playerIMG, playerladoIMG, playercostasIMG;
var idleside, idleback, idle;
var hitbox1, hitbox2, hitbox3, hitbox4
var esqueleto, esqueletoIMG, esqueletoladoIMG, esqueletocostasIMG
var tiro, tiroIMG
var municao = 20
var PokebolaIMG  
var municaotext 
var esqueletoG
var PokebolaG
var shotenabled = true
var coracaoIMG
var coracaotext
var vida = 10

function preload() {
  fundo = loadImage("Fundo.png");
  playerIMG = loadImage("character/frontGif.gif");
  playerladoIMG = loadImage("character/sideGif.gif");
  playercostasIMG = loadImage("character/backGif.gif");
  idle = loadImage("character/idle.png");
  idleback = loadImage("character/idleback.png");
  idleside = loadImage("character/idleside.png");
  esqueletoIMG = loadImage('frontgif.gif')
  esqueletoladoIMG = loadImage('sidegif.gif')
  esqueletocostasIMG = loadImage('backgif.gif')
  tiroIMG = loadImage("Pokebola.png")
 }

function setup() {
  createCanvas(1280, 870);
  player = createSprite(897, 572);
  player.addImage("frente", playerIMG);
  player.addImage("costas", playercostasIMG);
  player.addImage("lado", playerladoIMG);
  player.addImage("idle", idle);
  player.addImage("idleback", idleback);
  player.addImage("idleside", idleside);
  hitbox1 = createSprite(742, 462, 130)
  hitbox2 = createSprite(702, 622, 130)
  hitbox3 = createSprite(1062, 462, 130)
  hitbox4 = createSprite(1062, 622, 130)
  hitbox1.visible = false
  hitbox2.visible = false
  hitbox3.visible = false
  hitbox4.visible = false
  PokebolaG = new Group()
  esqueletoG = new Group()
  PokebolaIMG = createImg("Pokebola.png")
  PokebolaIMG.position(50,20)
  PokebolaIMG.size(50,50)
  municaotext= createElement("h2")
  
  coracaoIMG = createImg("heart.png")
  coracaoIMG.position(50,70)
  coracaoIMG.size(50,50)
  coracaotext= createElement("h2")


}

function draw() {
  background("black");

  municaotext.position(99, 25)
  municaotext.html("X" + municao)

coracaotext.position(99,60)
coracaotext.html("x"+ vida)

  image(fundo, 0, 0, 1800, 1600);

  player.collide(hitbox1);
  player.collide(hitbox2);
  player.collide(hitbox3);
  player.collide(hitbox4);

  if (keyDown("A") && player.x > 300) {
    player.x -= 5;
    player.changeImage("lado");
    player.mirrorX(1);
  }

  if (keyDown("S") && player.y < 1312) {
    player.y += 10;
    player.changeImage("frente");
  }

  if (keyDown("D") && player.x < 1767) {
    player.x += 5;
    player.changeImage("lado");
    player.mirrorX(-1);
  }

  if (keyDown("W") && player.y > 42) {
    player.y -= 10;
    player.changeImage("costas");
  }

  if (player.y < 447) {
    camera.position.y = 447;
  } else if (player.y > 1162) {
    camera.position.y = 1162;
  } else {
    camera.position.y = player.y;
  }

  if (player.x < 642) {
    camera.position.x = 642;
  } else if (player.x > 1157) {
    camera.position.x = 1157;
  } else {
    camera.position.x = player.x;
  }

  shot()
  spawn();

player.overlap(esqueletoG, function( e1, e2){
  var alero = [100,-100]
  var alerorandom = random(alero)
  e1.x += alerorandom
 e2.destroy()
 vida-=1
})

  PokebolaG.overlap(esqueletoG,function(e1,e2){
e1.destroy()
e2.destroy()
var municaospawn = Math.round(random(1,4))
municao += municaospawn

  })



  console.log("x:" + player.x + "y:" + player.y);
  drawSprites();
}

function shot(){

if(shotenabled){
  if(keyIsDown(RIGHT_ARROW) && municao>0){
    tiro = createSprite(player.x + 5, player.y)
    tiro.addImage(tiroIMG)
    tiro.scale = 0.04
    PokebolaG.add(tiro)
    tiro.velocityX += 6
    municao -=1
    shotenabled = false
    setTimeout(()=>{
  shotenabled = true
  },500)
  }
  
  if(keyIsDown(LEFT_ARROW) && municao>0){
    tiro = createSprite(player.x - 5, player.y)
    tiro.addImage(tiroIMG)
    tiro.scale = 0.04
    tiro.velocityX -= 6
    PokebolaG.add(tiro)
    municao -=1
    shotenabled = false
    setTimeout(()=>{
      shotenabled = true
      },500)
  }
  
    if(keyIsDown(DOWN_ARROW)&& municao>0){
      tiro = createSprite(player.x, player.y + 4)
      tiro.addImage(tiroIMG)
      tiro.scale = 0.04
      tiro.velocityY += 6    
      PokebolaG.add(tiro)
      municao -=1
      shotenabled = false
    setTimeout(()=>{
      shotenabled = true
      },500)
      }
  
      if(keyIsDown(UP_ARROW)&& municao>0){
        tiro = createSprite(player.x, player.y - 5)
        tiro.addImage(tiroIMG)
        tiro.scale = 0.04
        tiro.velocityY -= 6
        PokebolaG.add(tiro)
        municao -=1  
        shotenabled = false
    setTimeout(()=>{
      shotenabled = true
      },500)
      }
  

}
      
}


function keyReleased() {
  if (keyCode === 65) {
    player.changeImage("idleside");
  }
  //a
  if (keyCode === 83) {
    player.changeImage("idle");
  }
  //s
  if (keyCode === 68) {
    player.changeImage("idleside");
  }
  //d
  if (keyCode === 87) {
    player.changeImage("idleback");
  }
  //w

}

function spawn(){
if(frameCount % 60 === 0 ){
  var randomposition = Math.round(random(1,4))
  if(randomposition === 1 ){
    esqueleto = createSprite(random (100,1700),0)
    esqueleto.addImage(esqueletoIMG)
    //esqueleto.velocityY = 7
  }
  else if(randomposition === 2 ){
    esqueleto = createSprite(random (100,1700),1600)
    esqueleto.addImage(esqueletocostasIMG)
   // esqueleto.velocityY = -7
  }
  else if(randomposition === 3 ){
    esqueleto = createSprite(0,random(100, 1600))
    esqueleto.addImage(esqueletoladoIMG)
    esqueleto.mirrorX(-1)
   // esqueleto.velocityX = 7
  }
  else if(randomposition === 4 ){
    esqueleto = createSprite(1700,random(100, 1600))
    esqueleto.addImage(esqueletoladoIMG)
    esqueleto.mirrorX(1)
    //esqueleto.velocityX = -7

  
  }

  esqueleto.attractionPoint(7, player.x, player.y)

  esqueletoG.add(esqueleto)
}
}








