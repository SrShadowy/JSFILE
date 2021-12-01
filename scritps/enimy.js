const enimys = [];
class enimy
{
    constructor(x,y,name, sprite, atk,def,atkM,defM, hp, mp,level,xp,gold,speed, type, map, area, wsprite, hsprite)
    {
        this.x          =    x;
        this.y          =    y;
        this.old_x      =    x;
        this.old_y      =    y;
        this.width      =    50;
        this.height     =    50;


        // Basic information
        this.hp         =    hp;
        this.hpCap      =    hp;
        this.mp         =    mp;
        this.mpCap      =    mp;

        this.DefF       =    def;
        this.DefM       =    defM;
        this.AtkF       =    atk;
        this.AtkM       =    atkM;

        this.level      =   level;
        this.class      =   'War';
        this.name       =   name;
        this.sex        =   'M';
        this.hi         =   (hsprite * 48);
        this.wi         =   (wsprite * 48);

        this.xp         =   xp;
        this.gold       =   gold;

        this.animation  =    0;
        this.direction  =    0;
        this.sprite     =    sprite;
      
        //this.faceW      =   (Fw * 144);
        //this.faceH      =   (Fh * 144);
        //this.Fsrpite    =    FaceSprite;


        this.speed      =    speed;

        this.destine    =    {x: x, y:y}//{x: x, y: y};
        this.path       =    [];
        this.walking    =    false;

        this.atks       =    [];

        this.range      =    area;
        this.type       =    type;


        this.Map        =     map;

        this.wait       =     500;
        this.dly        =       0;
    }


    draw( context )
    {
        if(this.ia())
        {
            for(let atk of this.atks)
            {
                if(atk.run(context))
                {
                    let id = this.atks.indexOf(atk);
                    this.atks.splice(id, 1);
                }
            }
        }

        this.animation_sprite();

       context.drawImage(this.sprite, this.hi + (48 * this.animation),  // Posição X da imagem
       this.wi + (48 * this.direction),                                // Posição Y da imagem
       48, 48,                                              // Resolução da imagem  
       this.x,this.y,                                      // position
       48,                                                // largura da imagem
       48);                                              // Altura da imagem



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


    ia()
    {
        //this.area.x = this.x;
        //this.area.y = this.y;
        if(collision(this.range, player[0])){
            //console.log("PLAYER NA AREA HORA DE MATAR");
            this.destine.x = player[0].x;
            this.destine.y = player[0].y;
            this.follow(player[0]);
            return this.attack();
        }



    }

    attack()
    {
        for(let p of player)
        {
            let rage ={x: this.x - 15 , y: this.y -15, width: this.width + 30, height: this.height + 30 };
            if(collision(rage, p))
            {
                
                let now = performance.now();
                if(now - this.dly > this.wait)
                {   
                    this.atks.push(battle.punch(this));
                    this.dly = now;
                }
               return true;
            }
        }
    }



    follow(p)
    {
        this.check_direction();
        this.walking = !(this.destine.x == this.x && this.destine.y == this.y);

        if(collision(this,p))
        {
            this.x = this.old_x;
            this.y = this.old_y;
            this.walking = false;
        }
        

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

        
            this.walking = !(this.destine.x == this.x && this.destine.y == this.y);
            return;
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


    static show_us(context, map)
    {
        for(let e of enimys)
        {
           
            if(e.Map == map)
            {
                //console.log(e);
                if(e.hp > 0)
                {
                    e.draw(context);
                   
                }
                else
                {
                    let i = enimys.indexOf(e);
                    enimys.splice(i,1);
                }
            }
        }
    }




    static bugs_week(x,y, map, area, srpite, wsprite, hsprite, atk = 50, def=0, defM = 0, atkM = 0, name = "BUGS",  hp = 100, mp = 30, level = 5, xp = 20, gold = 10, speed = 5, type = 1)
    {

        let rage ={x: x - (area.x/2), y:  y - (area.y/2), width: area.width + 50, height: area.height + 50 };

        enimys.push(new enimy(x,y, name, srpite, atk, def, atkM, defM, hp, mp, level, xp, gold, speed, type,map, rage,  wsprite, hsprite));
    }

    static bugs_medio(x,y, map, area, srpite,  wsprite, hsprite, name = "BUGS", atk = 250, def=100, defM = 0, atkM = 0, hp = 890, mp = 80, level = 20, xp = 100, gold = 50, speed = 8, type = 2)
    {
        enimys.push(new enimy(x,y, name, srpite, atk, def, atkM, defM, hp, mp, level, xp, gold, speed, type,map, area,  wsprite, hsprite));
    }



}