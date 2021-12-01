/////////////////////
const inventary = [];
let   Gcoin = 0;
/////////////////////

class Inventary_manager
{
    constructor(id = 1,value = 1,max = 0, price = 0,  name = "", desc = "", ava = 0, consu = true, type = 0, reach = 1)
    {
        // Common Item Properties

        this.id             = id;
        this.value          = value;        // the amount on inventory
        this.max            = max;        // the max of amount on inventory (0 == any)
        this.price          = price;
        this.name           = name;
        this.desc           = desc;
        this.availability   = ava;        //0 Forever / 1 Menu / ??? may combate / 3 none
        this.consumable     = consu;
        this.type           = type;        // 0 comun / 1 especial / 2 rare / 3 godness
        this.reach          = reach;        // 1 = one character, 2 = team, 3 = one enimy, 4 = all enimy


    }

    use_me()
    {

    }





    static HPpequeno(value)
    {   
        let item = new Inventary_manager(1,value,0,50,"Poção HP pequena", "Capaz de criar até 25 de HP instantaneamente", 0, true, 0,1);
        item.use_me = function(me)
        {
            me.hp += 25;
            if(me.hp > me.hpCap)
                me.hp = me.hpCap;
        }
        return item
    }
    static MPpequeno(value)
    {
        let item = new Inventary_manager(2,value,0,50,"Poção MP pequena", "Capaz de criar até 25 de MP instantaneamente", 0, true, 0,1);
        item.use_me = function(me)
        {
            me.mp += 25;
            if(me.mp > me.mpCap)
                me.mp = me.mpCap;
        }
        return item
    }


    static add_to_inv(item)
    {
        console.log(item);
        let find = false;
        for(let i of inventary)
        {
            if(i.id == item.id)
            {
                find = true;
                i.value += item.value;
                break;
            }
        }
        if(!find)
        {
            inventary.push(item);
        }
    }

    static use_item(i)
    {
        if(inventary[i] != undefined)
        {
            inventary[i].use_me(player[0]);
            if(inventary[i].value > 1)
            {
                inventary[i].value--;
            }else
            {
                inventary.splice(i,1);
                console.log(inventary);
            }

            
        }

    }

}