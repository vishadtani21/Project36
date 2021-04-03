var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feed;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

/*
 
 if(lastFed>=12){
   text ("Last Feed : " + lastFed%12 + "PM", 200,30);
 } else if(lastFed === 0){
   text ("Last Feed : 12 AM", 200,30);
 } else {
 text ("Last Feed : " + lastFed%00 + "PM", 200,30);

 }
 

*/
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  
  hour ();

  foodS = foodS-1;

  database.ref('/').update({
    Food:foodS
  })

  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS = foodS+1;
  database.ref('/').update({
    Food:foodS
  })
}
