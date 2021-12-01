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
}
