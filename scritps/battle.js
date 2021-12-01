
/**
 * 
 * 
 * Cast de magias


magia firebooll 1s para lançamento 1 segundo para resfriamento

lógica:
lançar em direção reta ou target?
quanto de distancia apos ser lançada se dispesa?
quanto de magia consome?

Bola de fogo
Custo 10mp
1 segundo de lançamento
1 segundo de resfriamento
Desc:
Uma magia inicial, comuns entre qualquer mago, dizem que é a primeira coisa que se aprende, até mesmo antes de dizer mamae.

causa 10 de dano magico
1% de chance critico causando flangelo


Inimigos "BUGS"
são lentos, apesar de serem fracos, normalmente são resto de codigos mal feitos que causa algum problema, naturalmente são faceis de deter e pode ganhar alguma experiencia acabando com a raça deles!
 * 
 * 
 * 
 */


class battle
{
    constructor(type, x,y, d, end, e_or_h)
    {
        this.id          = 0;
        this.x           = x;
        this.y           = y;
        this.old_x       = x;
        this.old_y       = y;
        this.width       = 10;
        this.height      = 10;
        this.direction   = d;
        this.distance    = 50;
        this.speed       = 10;
        this.endMap      = end;
        this.who         = e_or_h;
        this.type        = type; // lutador, guerreiro, lanceiro, atirador, sacerdote, feiticero
        this.tatk        = 0;

        if(type == 5){

           this.tatk = this.who.AtkM + this.who.level;
           this.distance += 150;
           //console.log("CRIADO");
        }
        if(type == 1)
        {
            this.tatk = this.who.AtkF + this.who.level;
            //this.speed += 50;
        }

    }

    check(target)
    {
        if(this.x < 0 || this.y < 0)
        return true;
        if(this.endMap != undefined){
            if(this.x > this.endMap.width || this.y > this.endMap.height)
            return true;
            
        }
        


        if(collision(this, target) && this.who.Map == target.Map)
        {
            //console.log(target);
           //this.tatk = battle.atk(this);
           //console.log(this.tatk);
           let dmg = Math.floor( battle.demage(this.tatk, target) );
           //console.log(dmg);
           target.hp -= dmg;
            // atk
            // dmg
            return true;
        }
     
    }

    run(ctx)
    {


        switch(this.direction)
        {
            case 0:
                this.y +=  10;
            break;
            case 3:
                this.y -=  10;
            break;
            case 2:
                this.x +=  10;
            break;
            case 1:
                this.x -=  10;
            break;
        }

        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, 10, 10); //, Math.PI * 2);


       if(this.check_distance())
       return true;

        if((this.who instanceof Player_manager))
        {
            for(let e of enimys)
            {
               if(this.check(e))
                return true;
               
               
            }
        }
        if((this.who instanceof enimy))
        {
            for(let p of player)
            {
               if( this.check(p) ) 
               return true;
            }

        }
    }

    check_distance()
    {
        let check_d = this.x - this.old_x;
        if(check_d < 0) check_d *= -1;

        if(check_d > this.distance)
        return true;
        
        check_d = this.y - this.old_y;
        if(check_d < 0) check_d *= -1;

        if(check_d > this.distance)
        return true;

        return false;
    }

    //Um soco poderoso carregador de energia \ magia capaz de destruir pedras - classes que usam forças, Guerreiros, Lutadores, lanceiros
    static powerPunch(me, target)
    {
       
    }
    // Uma bola de fogo, Uma magia inicial, comuns entre qualquer mago, dizem que é a primeira coisa que se aprende, até mesmo antes de dizer mamae.
    static firebool(me)
    {
        if(me.class == "Mage")
        {
           return (new battle(5, me.x+20, me.y+20, me.direction, me.limit, me));
        }
    }
    // Energizar um projetil e atirar com magia, dizem que so prodigeos consegue fazer algo assim - Quem usam projetis arqueiro, atirador, assasinos
    static eurugi(me, target)
    {
        

    }
    //Uma magia na antiga lingua,  capaz de reverter os ferimentos, consome muita mana do usuario de magia, até mesmo os mais experientes
    static itaiushiro(me, target)
    {

    }

    // Soco ataque basico todos que tem um membro dianteiro pode fazer
    static punch(me)
    {
        return (new battle(5, me.x+20, me.y+20, me.direction, me.limit, me));
    }

    // Calculo de ataque
    static atk(me)
    {
        let max_dmg = me.level + me.AtkF + me.AtkM;
        console.log(max_dmg);
        return Math.random() * (max_dmg - 10) + 10;

    }
    // calculo de dano 
    static demage(atk, target)
    {
        let def = target.DefF + target.DefM + target.level;

        def = Math.random() * (def - 1) + 1;
        //console.log(def);
        if( def > atk)
        {
            return 0; // miss
        }
        return (atk - def);
    }

}



