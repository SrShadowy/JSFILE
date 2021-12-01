function map2(context)
{
    if(chenge_map != 2)
    {
        return true;
    }

    Game.set_background(background, context);
  

}

background = new Image();
background.src = "./resources/background.png"

{
    monster = new Image();
    monster.src = "./resources/Monster.png";
    enimy.bugs_week(500,250, 2, {x: 100,y: 100, width: 300, height: 300}, monster,0,3, 100,0,0,40);


    events.push( new Events_manager(350,0, 50,   undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(400,0, 50,   undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(450,50, 50,  undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(500,50, 50,  undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(550,100, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(600,150, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(650,150, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(700,200, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(750,250, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(800,300, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(850,350, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(900,400, 50, undefined, 0,0, true, "Wall",0, 2))

    events.push( new Events_manager(0,100, 50,   undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(50,100, 50,   undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(100,100, 50,   undefined, 0,0, true, "Wall",0,2))
    events.push( new Events_manager(150,150, 50,  undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(200,200, 50,  undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(200,250, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(250,300, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(300,350, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(350,400, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(400,450, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(450,500, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(500,500, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(550,550, 50, undefined, 0,0, true, "Wall",0, 2))
    events.push( new Events_manager(650,600, 50, undefined, 0,0, true, "Wall",0, 2))
}
