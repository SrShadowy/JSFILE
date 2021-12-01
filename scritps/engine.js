const _keys_ = [];

class Engine
{
    /// CREATE CANVAS AND PUSH HERE ELEMENT
    /// CellSize For all objects (grids size)
    constructor(Canvas, CellSize = 50)
    {
        // Canvas
        this.Canvas = Canvas;

        // Pos of Canvas
        this.CtxPos = undefined;

        // Draws
        this.Context = undefined;
        
        //Vars
        this.KeyPress = undefined;

       

        // Const
        this.CellSize = CellSize;
        this.mouse = {
            x        : undefined,
            y        : undefined,
            width    : 0,
            height   : 0,
            clicked  : false,
        }

        //cap frames
        this.capframes      =   30;
        this.fpsInterval    =   0;
        this.frames         =   0;
        this.fps            =   0;
        this.enlspo         =   0;

        this.game_pause     = true;
        this.game_menu      = false;

        this.onMap          =  -1;

    }

    update()
    {        
        this.new_frame();
        let delta = (performance.now() - this.frames)/1000;
        
        switch(this.onMap)
        {
            case 0:
                if(map0(this.Canvas, this.Context, this.KeyPress))
                {
                    this.onMap = 1;
                    this.game_pause = false;
                }
            break;
            case 1:
                if(map1(this.Context, 0))
                this.onMap = 2;
            break;
            case 2:
                if(map2(this.Context))
                this.onMap = 0;
            break;

            case -1: // menu
               if( hud.menu_start(this.Context, this.Canvas.width, this.Canvas.height, this.mouse))
               {
                   this.onMap = 0;
               }
               break;
            case -2: // Game over
                {
                   if(hud.game_over(this.Context, this.Canvas.width, this.Canvas.height))
                   {
                        location.reload(true);
                        //this.game_pause = true;
                        //this.onMap = -1;
                   }

                }
        }

        let game = ( key, dest ) => {
            Events_manager.run_events(this.Context, key, this.onMap);
            enimy.show_us(this.Context, this.onMap);
            if(Player_manager.show_players(this.Context, false, key, dest, undefined, delta, this.onMap))
            {
                this.onMap = -2;
            }
        }


        //console.log(this.onMap);
        if(!this.game_pause)
        {
            let dest = GridCell.show_grids(this.mouse, this.Context);
            if(!this.game_menu)
                game(this.KeyPress, dest);    
            else
                game();
            
            this.game_menu = hud.menu_player(this.Context, this.Canvas.width, this.Canvas.height, this.KeyPress, this.mouse  );
        }
    

   
        this.finishing_events_user();
        this.yce();

       

        if(this.capframes == 0)
            requestAnimationFrame( this.update.bind(this));
        
        this.fps = (1/delta);
        this.frames = performance.now()
        hud.showFPS(this.Context, this.fps);
       
    }

    startup()
    {
        this.Context = this.Canvas.getContext('2d');
        {
            this.Canvas.height           = '600';
            this.Canvas.width            = '900';
            this.Canvas.style.border     = "solid 1px black";
            this.CtxPos                  = this.Canvas.getBoundingClientRect();
        }
        GridCell.init_grids(this.Canvas.height , this.Canvas.width , this.CellSize);
        Player_manager.get_canvas_sz(this.Canvas);

        this.hooks();
        this.fpsInterval  =  1000 / this.capframes ;
        this.frames  = performance.now();

        if(this.capframes > 0) 
            setInterval( () => { this.update.bind(this)() }, this.fpsInterval); 
        else
            this.update();
    }


    new_frame(){
        if(this.Context != undefined)
        this.Context.clearRect(0,0, this.Canvas.width, this.Canvas.height);
    }


    finishing_events_user()
    {
        this.mouse.clicked = false;
        //this.KeyPress = undefined; more fast check keys
    }

    

    //you can edit me
    yce()
    {
        //console.log();
    }

    // All controls
    hooks()
    {
        let cv_mouse_move = (e) => {
            this.mouse.x = e.x - this.CtxPos.x;
            this.mouse.y = e.y - this.CtxPos.y;
        }
        let cv_mouse_leave = (e) => {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        }

        let cv_mouse_click = (e) => {
            this.mouse.x = e.x - this.CtxPos.x;
            this.mouse.y = e.y - this.CtxPos.y;
        }

        let dc_mouse_down = () => { 
            this.mouse.clicked = true 
        }

        let dc_key_down = (e) =>{
            this.KeyPress = e.code;
        }

        let dc_key_up = (e) =>{
            this.KeyPress = undefined;
        }

        document.addEventListener('keydown'  ,   dc_key_down);
        document.addEventListener("keyup"    ,   dc_key_up  );
        document.addEventListener('mousedown', dc_mouse_down);
        if(this.Canvas != undefined) // CHECK OUT
        {
            this.Canvas.addEventListener('mousemove' ,   cv_mouse_move );
            this.Canvas.addEventListener('mouseleave',   cv_mouse_leave);
            this.Canvas.addEventListener('click'     ,   cv_mouse_click);
        }
    }
}