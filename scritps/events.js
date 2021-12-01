///////////////////////////////////////////////////////////////////
//***************************************************************//
const events = [];
//***************************************************************//
///////////////////////////////////////////////////////////////////

class Events_manager
{
    constructor(x = 0, y =0, size = 50, img = undefined, Hsprite = 0, Wsprite = 0, collide = false, event_name, action,  map)
    {
        this.x          =   x;
        this.y          =   y;
        this.height     =   size;
        this.width      =   size;
        this.img        =   img;
        this.collide    =   collide;
        this.hi         =   (Hsprite * 48);
        this.wi         =   (Wsprite * 48);
        this.animation  =   0;
        this.direction  =   0;
        this.action     =   action;
        this.name       =   (event_name != undefined)? 
                            event_name : 'event_'+events.length;
        this.limit      =   undefined;
        this.show       =   false;
        this.delay      =   0;
        this.context    =   undefined;

        this.Map        =   map;
    }

    draw( context )
    {

       this.animation_sprite();
       if(this.img == undefined)
        return;
       context.drawImage(this.img, this.hi + (48 * this.animation),     // Posição X da imagem
       this.wi + (48 * this.direction),                                // Posição Y da imagem
       48, 48,                                                        // Resolução da imagem  
       this.x,this.y,                                                // position
       48,                                                          // largura da imagem
       48);                                                        // Altura da imagem


    }

    animation_sprite()
    {
        if(this.walking)
        {
            this.animation++;
            if(this.animation > 2)
                this.animation = 0;
        }
    }


    show_message( text = "", name = "Joao1010", color = "red")
    {
        // let me now .... default
        hud.message(this.context, 25,this.limit.height - 130,this.limit.width - 50, 100, text, name, color);
        //console.log(text);
    }


    static run_events(Context, key_, map)
    {
        for(let e of events)
        {
            if(e.Map == map)
            {
                if(e.collid_whitPlayer(player[0]))
                {
                    e.limit = player[0].limit;
                    e.Event_action(Context, key_);
                }
                e.draw(Context);
            }
        }
            
    }

    Event_action(Context, key)
    {
        this.context = Context;
        switch(this.action)
        {
            case 0: // message on key
                //check_key_press(key, keyname)
                if(check_key_press(key,'Enter'))
                {   this.show = !this.show;         }
            break;
            case 1:
                //if(this.collid_whitPlayer(Player[0]))
                {
                    this.show = true;
                }
            break;
            case 2: // paralele

            break;
        }
        if(this.show)
        {
            this.hook_this_event();
            //this.show_message(Context,"Vai caçar o que fazer sem oque fazer");
        }

    }


    hook_this_event(){
    }

    teleporte(x,y,map)
    {
        if(player[0] != undefined)
        {
            player[0].Map       = map;
            player[0].x         = x;
            player[0].y         = y;
            player[0].destine   = undefined;
        }
        
    }

    collid_whitPlayer(Player)
    {
        let rage ={x: this.x - 15 , y: this.y -15, width: this.width + 30, height: this.height + 30 };
        return (collision(rage,Player))
    }
}

