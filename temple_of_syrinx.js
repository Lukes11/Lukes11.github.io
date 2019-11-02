var sketchProc=function(processingInstance){ with (processingInstance){
size(800, 600); 
frameRate(60);

/*
===Information===
This is the starting screen for my final project, a role-playing-game
called The Temple Of Syrinx. The starting screen has a mountain/trees backdrop,
fire flies that fly around, and some birds that fly across the screen.
There are two buttons, and instructions button and a play button, which can be activated by
clicking the left mouse button while hovering over them. The Instructions
button opens the instructions screen, which displays information about each
character class and some movement controls. There is a return button on the 
instructions screen that goes back to the main title screen. The play button does not do anything
as of yet. 

All the assets used are in the folder labeled "assets". Some assets in the folder I haven't used yet, 
and plan to further along in the development of the project. The assets folder must be in the same directory
as the game script ,the html template, and the processingJS source. 
*/
var floatingLights = [];
var lightCount = 0;
var birds = [];
var game_state = 0;
GameStates = {
    INITIAL_SCREEN: 0,
    START_SCREEN: 1,
    INSTRUCTION_SCREEN: 2,
    //more to be added
};

Background = {
    BACK:               loadImage('assets/parallax-mountain-bg.png'),
    BACK_MOUNTAIN:      loadImage('assets/parallax-mountain-montain-far.png'),
    FRONT_MOUNTAIN:     loadImage('assets/parallax-mountain-mountains.png'),
    BACK_TREES:         loadImage('assets/parallax-mountain-trees.png'),
    FRONT_TREES:        loadImage('assets/parallax-mountain-foreground-trees.png'),  
    TITLE:              loadImage('assets/title.png'),
    NAME:               loadImage('assets/name.png')

};
Warrior = {
    WALK_FORWARD_1:             loadImage('assets/frames/chara/chara5_1/down_walk1.png'),
    WALK_FOWARD_2:              loadImage('assets/frames/chara/chara5_1/down_walk2.png')
};
Magician = {
    WALK_FORWARD_1:             loadImage('assets/frames/chara/chara5_6/down_walk1.png'),
    WALK_FOWARD_2:              loadImage('assets/frames/chara/chara5_6/down_walk2.png')
};
Rogue = {
    WALK_FORWARD_1:             loadImage('assets/frames/chara/chara2_3/down_walk1.png'),
    WALK_FOWARD_2:              loadImage('assets/frames/chara/chara2_3/down_walk2.png')
};
Bird_1 = {
    FLY_R_1:                    loadImage('assets/bird_1/bird_flyr_1.png'),
    FLY_R_2:                    loadImage('assets/bird_1/bird_flyr_2.png'),
    FLY_R_3:                    loadImage('assets/bird_1/bird_flyr_3.png'),
};
SoundTracks = {
    TITLE_THEME:           new Audio('assets/title-theme.wav'),
    CLICK_1:               new Audio('assets/Click_02.ogg')
};
Fonts = {
    DP_COMIC_22:        createFont('assets/dpcomic.ttf', 22),
};
var war_walk_down = [Warrior.WALK_FORWARD_1, Warrior.WALK_FOWARD_2];
var mage_walk_down = [Magician.WALK_FORWARD_1, Magician.WALK_FOWARD_2];
var rog_walk_down = [Rogue.WALK_FORWARD_1, Rogue.WALK_FOWARD_2];
var bird_fly_r = [Bird_1.FLY_R_1, Bird_1.FLY_R_2, Bird_1.FLY_R_3];
var characterObj = function(x, y, animationArr)
{
    this.x = x;
    this.y = y;
    this.animationArr = animationArr;
    this.animationIndex = 0;
}
characterObj.prototype.walk_down = function()
{
    image(this.animationArr[this.animationIndex], this.x, this.y);
    if(frameCount % 30 === 0)
    {
        this.animationIndex = 1 - this.animationIndex;
    }
};
var birdObj = function(x, y, animationArr)
{
    this.x = x;
    this.y = y;
    this.animationArr = animationArr;
    this.animationIndex = 0;
};
birdObj.prototype.draw = function()
{
    image(this.animationArr[this.animationIndex], this.x, this.y);
    if(frameCount % 20 === 0)
    {
        this.animationIndex++;
        if(this.animationIndex === 3) {this.animationIndex = 0;}
    }
};
birdObj.prototype.move = function()
{
    this.x++;
    if(this.x > 810)
    {
        this.x = -10;
    }
};
//bird object
birds.push(new birdObj(0, 100, bird_fly_r), new birdObj(-500, 300, bird_fly_r));
//character objects
var warrior_walk = new characterObj(100, 230, war_walk_down);
var mage_walk = new characterObj(100, 330, mage_walk_down);
var rogue_walk = new characterObj(100, 430, rog_walk_down);
var drawBirds = function()
{
    var i;
    for(i = 0; i < birds.length; i++)
    {
        birds[i].move();
        birds[i].draw();
    }
};
var t = 0;
var start_screen = function()
{
    image(Background.BACK, 0, 0, 800, 600);
    image(Background.BACK_MOUNTAIN, 0, 0, 800, 600);
    image(Background.FRONT_MOUNTAIN, 0, 0, 800, 700);
    image(Background.BACK_TREES, 0, 0, 800, 600);
    image(Background.FRONT_TREES, 0, 0, 800, 600);
    if(game_state === GameStates.INITIAL_SCREEN)
    {
        textSize(22);
        fill(255, 215, 0, t);
        text("Click The Full Moon", 300, 280);
        t++;
    }
};
var instruction_screen = function()
{
    noStroke();
    fill(105, 105, 105, 200);
    rect(50, 50, 700, 500);
    fill(60, 60, 60);
    rect(50, 50, 700, 20);
    rect(750, 50, 20, 520);
    rect(50, 50,  20, 500);
    rect(50, 550, 700, 20);
    textSize(22);
    fill(255, 215, 0);
    text("Choose Your Class!", 100, 120);
    text("The Warrior", 100, 200);
    text("The Magician", 100, 300);
    text("The Rogue", 100, 400);
    warrior_walk.walk_down();
    mage_walk.walk_down();
    rogue_walk.walk_down();
    fill(0, 0, 139);
    textSize(16);
    text("Overwhelm foes with brute force", 150, 230);
    text("Use deadly cleaving attacks to fell multiple enemies", 150, 250);
    text("Defeat enemies from far away with magic spells", 150, 330);
    text("Cast spells that grant you greater power, or heal you", 150, 350);
    text("Damage foes with lightning fast attacks", 150, 430);
    text("Lay traps on the ground that catch enemies off guard", 150, 450);
    fill(255, 215, 0);
    textSize(22);
    text("Controls", 500, 120);
    textSize(16);
    fill(0, 0, 139);
    text("Use WASD to move", 500, 150);
    text("Use LMB to attack", 500, 180)
    text("", 150, 250);
    fill(60,60,60);
    if((mouseX > 590 && mouseX < 690) && (mouseY > 457 && mouseY < 488))
    {
        stroke(255, 215, 0);
    }
    rect(590, 457, 95, 30);
    fill(255, 215, 0);
    textSize(22);
    text("Return", 600, 480);
};
var instruction_button = function()
{
    fill(105, 105, 105);
    stroke(255, 215, 0);
    strokeWeight(2);
    if((mouseX > 90 && mouseX < 230) && (mouseY > 425 && mouseY < 465)) 
    {
        strokeWeight(4);
    }
    rect(90, 425, 135, 35);
    fill(255, 215, 0);
    textSize(22);
    textFont(Fonts.DP_COMIC_22);
    text("Instructions", 100, 450);
}
var play_button = function()
{
    fill(105, 105, 105);
    stroke(255, 215, 0);
    strokeWeight(2);
    if((mouseX > 575 && mouseX < 710) && (mouseY > 425 && mouseY < 465)) 
    {
        strokeWeight(4);
    }
    rect(575, 425, 135, 35);
    fill(255, 215, 0);
    textSize(22);
    text("Play", 620, 450);
};
var floatingLightObj = function(x, y)
{
    this.position = new PVector(x, y);
    this.step = new PVector(0,0);
    this.w = 5;
    this.h = 5;
    this.angle = random(0, 6);
    this.acceleration = 0;
    this.r = 0;
};
floatingLightObj.prototype.draw = function()
{
    noStroke();
    fill(235, 235, 52, 110);
    ellipse(this.position.x, this.position.y, this.w + this.r, this.h + this.r);
    fill(255, 255, 204);
    ellipse(this.position.x, this.position.y, this.w, this.h);
};
floatingLightObj.prototype.move = function()
{   
    //change direction every three seconds
    if(frameCount % 60 === 0)
    {
        this.acceleration = random(-0.1, 0.1);
    }
    this.step.x = cos(this.angle);
    this.step.y = sin(this.angle);
    this.position.add(this.step);
    this.angle += this.acceleration;
    if(frameCount % 10 === 0) {this.r = random(1, 10);}
    
};
var mouseClicked = function()
{
    //click instruction button
    if((mouseX > 90 && mouseX < 230) && (mouseY > 425 && mouseY < 465) && game_state === GameStates.START_SCREEN)
    {
        game_state = GameStates.INSTRUCTION_SCREEN;
        SoundTracks.CLICK_1.play();
    }
    //click return to start screen button from instruction screen
    if((mouseX > 590 && mouseX < 690) && (mouseY > 457 && mouseY < 488) && game_state === GameStates.INSTRUCTION_SCREEN)
    {
        game_state = GameStates.START_SCREEN;
        SoundTracks.CLICK_1.play();
    }
    //click moon to go to start screen from initial screen
    if((mouseX > 335 && mouseX < 465) && (mouseY > 60 && mouseY < 240 )&& game_state === GameStates.INITIAL_SCREEN)
    {
        game_state = GameStates.START_SCREEN;
    }
    
};
var spawnFloatingObjs = function()
{
    var i;
    if(lightCount < 20)
    {
        floatingLights.push(new floatingLightObj(random(0, 800), random(0, 600)));
        lightCount++;
    }
    for(i = 0; i < floatingLights.length; i++)
    {
        if(floatingLights[i].position.x < 0 || floatingLights[i].position.x > 800 || floatingLights[i].position.y < 0 || floatingLights[i].position.y > 600)
        {
            floatingLights[i].position.x = random(0, 800);
            floatingLights[i].position.y = random(0, 600);
        }
        floatingLights[i].draw();
    }

};
var floatLights = function()
{
  var i;
  for(i = 0; i < floatingLights.length; i++)
  {
      floatingLights[i].move();
  }
};

var draw = function()
{            
    switch(game_state) {
        case GameStates.INITIAL_SCREEN:
        start_screen();
        spawnFloatingObjs();
        floatLights(); 
        break;

        case GameStates.START_SCREEN:
        start_screen();
        SoundTracks.TITLE_THEME.play();
        image(Background.TITLE, 80, 200, 640, 90);
        image(Background.NAME, 250, 520, 300, 30);
        instruction_button();
        play_button();
        drawBirds();
        spawnFloatingObjs();
        floatLights(); 
        break; 

        case GameStates.INSTRUCTION_SCREEN:
        start_screen();
        spawnFloatingObjs();
        floatLights();
        instruction_screen();
        break;
    }
}
}};
