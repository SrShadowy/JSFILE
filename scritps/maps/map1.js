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