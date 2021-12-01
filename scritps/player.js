///////////////////////////////////////////////////////////////////////
const player = [];
///////////////////////////////////////////////////////////////////////

class Player_manager
{
    constructor(x,y,sprite, size, Hsprite = 0, Wsprite = 0, map = 0, FaceSprite, Fw, Fh)
    {
        this.x          =    x;
        this.y          =    y;
        this.old_x      =    x;
        this.old_y      =    y;
        this.width      =    size;
        this.height     =    size;


        // Basic information
        this.hp         =    100;
        this.hpCap      =    100;
        this.mp         =    100;
        this.mpCap      =    100;

        this.DefF       =     50;
        this.DefM       =     50;
        this.AtkF       =     30;
        this.AtkM       =     60;

        this.level      =       1;
        this.class      =   'Mage';
        this.name       =   'Shadowy';
        this.sex        =   'M';
        this.hi         =   (Hsprite * 48);
        this.wi         =   (Wsprite * 48);
        this.faceW      =   (Fw * 144);
        this.faceH      =   (Fh * 144);

        this.animation  =    0;
        this.direction  =    0;
        this.sprite     =    sprite;
        this.Fsrpite    =    FaceSprite;
        this.speed      =    5;

        this.destine    =    undefined//{x: x, y: y};
        this.path       =    [];
        this.walking    =    false;

        this.atks       =    [];

        this.limit      =    {x:0,y:0,width:0, height:0};

        this.delta      =     0.00000000000000000;

        this.Map        =     map;

        this.key_atack  = undefined;
        if(this.class == "Mage")
        {
            this.key_atack = {
                Digit1: 
                    function(me){return battle.firebool(me)}

                ,
            }
        }

    }

    draw( context )
    {
       this.animation_sprite();

       context.drawImage(this.sprite, this.hi + (48 * this.animation),  // Posição X da imagem
       this.wi + (48 * this.direction),                                // Posição Y da imagem
       48, 48,                                              // Resolução da imagem  
       this.x,this.y,                                      // position
       48,                                                // largura da imagem
       48);                                              // Altura da imagem


    }

    draw_face(context, x, y, lage_i = 144, height_i = 144)
    {
        context.drawImage(this.Fsrpite,this.faceH ,            // Posição X da imagem
        this.faceW,                                             // Posição Y da imagem
        144, 144,                                               // Resolução da imagem  
        x, y,                                          // position
        lage_i,                                                    // largura da imagem
        height_i);                                                   // Altura da imagem
 
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

    move(new_destine, sec)
    {
        this.walking = this.check_destine(new_destine);  

        this.check_direction();


        if(this.walking)
        {
            this.old_y = this.y;
            this.old_x = this.x;

            switch(this.direction)
            {
                case 0:
                    this.y +=  this.speed;
                break;
                case 3:
                    this.y -=  this.speed;
                break;
                case 2:
                    this.x +=  this.speed;
                break;
                case 1:
                    this.x -=  this.speed;
                break;
            }

            if(this.check_colision(sec))
            {
                this.x       = this.old_x;
                this.y       = this.old_y;
                new_destine  = undefined;
                this.destine = undefined;
                this.walking = false;
                return;
            }
            this.walking = !(this.destine.x == this.x && this.destine.y == this.y);
            return;
        }
    }

    static show_players(context, team = false, key_ = undefined, destine = undefined, sec = undefined, delta = 0.1, Onmap)
    {
        if(player[0] != undefined)
        {
                //player[0].Map = Onmap;
                player[0].delta = delta;
                player[0].check_controle(key_, destine, sec);
                player[0].draw(context);
                for(let i = 0; i<player[0].atks.length; ++i){
                   if( player[0].atks[i].run(context))
                   {
                       player[0].atks.splice(i,1);
                   }
                }
                if(player[0].hp < 0)
                return true;
        }

    }

    static get_canvas_sz(canvas)
    {
        for(let p of player)
        {
            p.limit.width = canvas.width;
            p.limit.height = canvas.height;
        }
    }

    static player_nowalkingnow()
    {
        for(let  p of player)
        {
            p.walking = false;
            p.destine = undefined;
        }
    }

    control_player(key_, sec)
    {
       //console.log("e" + key_);
       let ck = {KeyW:0,ArrowUp: 0, KeyS:3, ArrowDown: 3, KeyA: 2, ArrowLeft: 2, KeyD: 1, ArrowRight: 1};
       let tst = ck[key_];
       if(tst != undefined)
       {
            let dst = {x: 0, y: 0};
            switch(tst)
            {
                case 0:
                    dst.y = ( this.y % 50 == 0)?  this.y- 50 : this.y- (this.y % 50);
                    dst.x = this.x;
                break;
                case 3:
                    dst.y = ( this.y % 50 == 0)?  this.y+50  : this.y+ (this.y % 50);
                    dst.x = this.x;
                break;
                case 2:
                    dst.x = ( this.x % 50 == 0)?  this.x- 50 : this.x- (this.x % 50);
                    dst.y = this.y;
                break;
                case 1:
                    dst.x = ( this.x % 50 == 0)?  this.x+ 50 : this.x+ (this.x % 50);
                    dst.y = this.y;
                break; 
            }
            this.move(dst, sec);
       }else if(this.key_atack[key_]){
            //console.log()
            this.atks.push(this.key_atack[key_](this));
        }
       
    }

    check_controle(key_ = undefined, destine = undefined, sec)
    {
        if(destine != undefined)
        {
            this.move(destine, sec);
        }else if (key_ != undefined)
        {
            this.control_player(key_, sec);
        }else if(this.destine != undefined && this.walking)
        {
            this.move(this.destine, sec);
        }
    }

    check_direction()
    {
        if(this.x != this.destine.x)
        {
            this.direction = ( this.x > this.destine.x ) ? 1 : 2;
            return;
        }
        if(this.y != this.destine.y)
        {
            this.direction = ( this.y < this.destine.y ) ? 0 : 3;
            return;
        }
    }

    check_destine(new_destine)
    {
        let can_new_destine = ( this.destine == undefined || ( this.destine.x == this.x && this.destine.y == this.y )) // checkout if is finishing destine
    
        if(new_destine.x != undefined && new_destine.y != undefined )
        {
            if (can_new_destine) this.destine = new_destine;
        }
        return !(this.destine.x == this.x && this.destine.y == this.y );
    }

    check_colision(sec)
    {
        if(this.x < 0 || this.y < 0)
        return true;

        if((this.x + this.width > this.limit.width) || (this.y + this.height > this.limit.height))
        return true;

        for(let ed of events)
        {
            if(ed.collide)
            {
                //console.log( this.Map + " AND " + ed.Map);
                if( this.Map == ed.Map)
                {
                    if(collision(this, ed))
                    return true;
                }
            }
          
        }
        return false;
    }
}
