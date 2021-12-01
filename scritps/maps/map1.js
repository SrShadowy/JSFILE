function init_map1()
{
    // creates events
    {
        let img = new Image();
        img.src = "./resources/Actor.png";
        events.push( new Events_manager(400,100, 50, img, 4,4, true, "Joao1010",0, 1)); // <- if u dont use same event on another map u need clear events!
       
        events[0].hook_this_event = function()
        {
            events[0].show_message("Uma vez um cachorro começeu uma lição de casa e até hoje... ele é sabio", "Joao1010", "green");
        }

        events.push(new Events_manager(850,550, 50, undefined, 0,0, false, "Teleporte", 1, 1));
        events[1].hook_this_event = function()
        {
            chenge_map = 2;
            events[1].teleporte(0,0, chenge_map);
        };

        events.push( new Events_manager(350,0, 50,   undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(400,0, 50,   undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(450,50, 50,  undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(500,50, 50,  undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(550,100, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(600,150, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(650,150, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(700,200, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(750,250, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(800,300, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(850,350, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(900,400, 50, undefined, 0,0, true, "Wall",0, 1))

        events.push( new Events_manager(0,100, 50,   undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(50,100, 50,   undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(100,100, 50,   undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(150,150, 50,  undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(200,200, 50,  undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(200,250, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(250,300, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(300,350, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(350,400, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(400,450, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(450,500, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(500,500, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(550,550, 50, undefined, 0,0, true, "Wall",0, 1))
        events.push( new Events_manager(650,600, 50, undefined, 0,0, true, "Wall",0, 1))


        console.log(" on map 1 have " + events.length);
    }
    // This is an player
    {
        let img = new Image();
        img.src = "./resources/Actor.png";
        let face =  new Image();
        face.src = "./resources/ActorF.png";
                                    // X,Y, SPRITE, sz, H,W, MAP, FACE
        player.push(new Player_manager(0,0, img, 50, 0, 4, 1,face, 1,0));
    }

    //inventary.push(Inventary_manager.HPpequeno(1));
    inventary.push(Inventary_manager.HPpequeno(1));
    //inventary.push(Inventary_manager.HPpequeno(1));
    inventary.push(Inventary_manager.MPpequeno(10));
    Inventary_manager.add_to_inv(Inventary_manager.HPpequeno(2));

    console.log(inventary);
}

let background = new Image();
background.src = "./resources/background.png"


function map1(Context) // <- Need more thinks normaly need context and key
{
    if(chenge_map != 1)
    {
        return true;
    }

    //Grids
    Game.set_background(background, Context);


}
init_map1();