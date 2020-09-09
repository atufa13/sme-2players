var player1, database;
var position,position2;
var player2;
var p1animation,p2animation;

function preload(){
    p1animation =loadAnimation("assets/player1a.png","assets/player1b.png");
    p2animation =loadAnimation("assets/player2a.png","assets/player2b.png");
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(600,600);

  player1 = createSprite(100,250,10,10);
  player1.shapeColor = "red";
 //player1.addAnimation("walking",p1animation);

  var player1Position = database.ref('player1/position');
  player1Position.on("value", readPosition, showError);

  player2 = createSprite(400,250,10,10);
  player2.shapeColor = "green";
  //player2.addAnimation("walkin2",p2animation);

  var player2Position = database.ref('player2/position');
  player2Position.on("value", readPosition2, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }

    if(keyDown("a")){
      writePosition2(-1,0);
    }
    else if(keyDown("s")){
      writePosition2(1,0);
    }
    else if(keyDown("w")){
      writePosition2(0,-1);
    }
    else if(keyDown("z")){
      writePosition2(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('player1/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function writePosition2(x,y){
  database.ref('player2/position').set({
    'x': position2.x + x ,
    'y': position2.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  player1.x = position.x;
  player1.y = position.y;
}

function readPosition2(data){
  position2 = data.val();
  console.log(position2.x);
  player2.x = position2.x;
  player2.y = position2.y;
}

function showError(){
  console.log("Error in writing to the database");
}
