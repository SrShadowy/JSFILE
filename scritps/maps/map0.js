let speed = 0;
let chenge_map = 0;
let inMap = 0;
function map0(cvn, ctx, key_)
{

    if(speed > 1400 || chenge_map != 0)
    {
        chenge_map = 1;
        player[0].Map = 1;
        return true; // there important set return true to end map fase to change maps file
    }
   

    // There is ex of message of history
    if (key_ == 'Enter')
    {
        speed += 5;
    }else{
        speed += 2;
    }
    console.log(key_)
    if(key_ == "Escape")
    {
        speed += 1400;
    }

    text = "Era uma vez um codigo em js vazio....\nEle não tinha seus objetivos como os demais\nEntão aos longos dias que se passaram\n"
    text += "Ele criou seu proprio universo de fantasia\nEo mundo vivia em paz\n\n\nAté que um certo dia o desenvolvedor começou\na escrever codigos em seus arquivos.";
    text += "\nNesse momento a paz tinha dias contados,\nbugs e mais bugs começaram a aparecer\ne com isso o grande mal...\n";
    text += "\nBRAVO GUERREIRO!\nPrecisamos de você para nós salvar!\nEu já sou velho demais para isso\n só você pode nós liberta do 'Erro'!\nEstamos contando com você.";

    hud.over_message(ctx, text, cvn.width, cvn.height, speed );
  

    //console.log(speed);
}

