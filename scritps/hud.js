class hud
{

    static message(ctx, x,y, sw, sh, txt, user, color)
    {   
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, sw, sh);
        ctx.font = "15px Impact";   
        // title
        ctx.fillStyle = color;    
        ctx.fillText( user, x+10, y+30 );

        ctx.fillStyle = 'white';    
        ctx.fillText( txt, x+50, y+60 );
    }

    static showFPS(ctx, fps)
    {
        ctx.fillStyle = "#00FF00FF";
        ctx.font      = "normal 16pt Arial";
        ctx.fillText(Math.floor(fps) + " fps", 10, 26);
        ctx.strokeStyle = "black";
        //ctx.font      =  "normal 18pt Arial";
        ctx.strokeText(Math.floor(fps) + " fps", 10, 26);
    }

    static over_message(ctx, txt = "", screenW,  screenH, speed)
    {
        ctx.fillStyle   = 'black';
        ctx.fillRect(0, 0, screenW, screenH);
        ctx.font        = "normal 16pt Arial";  
        ctx.fillStyle   = 'white';
        let breakLines  = txt.split('\n');
        let ln          = 0;

        for(ln = 0; ln < (breakLines.length) ; ln++)
        {
            ctx.fillText( breakLines[ln], 150, screenH - (speed - (50*ln)) );
        }
              
    }


    static menu_start(ctx, screenW, screenH, mouse)
    {

        // background

        // name
        
        // options

        let Menu = (x,y , w,h)=>
        {
            ctx.fillStyle = "#004bffBB";
            ctx.fillRect( x , y , w, h);
        }
        let Generic_button = (text = "", x = 0, y = 0, sizeW = 10, sizeH = 10  ) =>
        {
            ctx.fillStyle = "white";
            ctx.strokeRect(x, y, sizeW, sizeH);
            ctx.strokeRect(x,y, sizeW, sizeH )
            ctx.fillText(text, x + 25 , y + 20);
            this.opc = {x: x, y: y , width: sizeW, height: sizeH};
                if(collision(mouse, this.opc)){
                    ctx.fillStyle = "#001Fff55";
                    ctx.fillRect(x, y , sizeW,  sizeH);
                    ctx.fillStyle = "White";

                    if(mouse.clicked) return true;
                }
            return false;
        }

        let bg = new Image();

        bg.src = "./resources/Sword.png";
        ctx.drawImage(bg,0,0, screenW, screenH);

        let x = 350;
        let y = 300;

        ctx.fillStyle = "white";
        ctx.font = "23px Arial";
        ctx.fillText("J-ugamnt of F-ight - File!", (screenW/2)-120, (screenH/2)-80 );
        ctx.strokeStyle = "black"
        ctx.font = "23px Arial";
        ctx.strokeText("J-ugamnt of F-ight - File!", (screenW/2)-120, (screenH/2)-80 );


        Menu((screenW/2)-x/2,(screenH/2)-70, x,y);

        if(Generic_button("Start", screenW - 500, (screenH/2)-50, 100,25))
        {
            return true;;
        }


    }

    static menu_player(ctx, screenW,  screenH, key, mouse)
    {
        this.react = {x: screenW - 60, y: 10, width: 50, height: 50};
        ctx.font = "normal 16pt Arial";

        // Keys
        {
            if(check_key_press(key, "Escape") || ( collision(mouse, this.react)  && mouse.clicked  ) )
            {         
                Player_manager.player_nowalkingnow();
                this.menu_status = (this.menu_status == 0)? 1 : 0;
            }
            if(check_key_press(key, "KeyB"))
            {
                this.menu_status = (this.menu_status == 0)? 2 : 0;
            }

            if(check_key_press(key, "KeyC"))
            {
                this.menu_status = (this.menu_status == 0)? 3 : 0;
            }
        }
        
        let closing = ()=>
        {
            ctx.fillStyle = "RED";
            ctx.font = "40px Arial";
            ctx.fillText("X"  , screenW - 50, 50 );
        }

        let Menu = ()=>
        {
            ctx.fillStyle = "#004bffBB";
            ctx.fillRect( 10 , 10 , screenW - 20, screenH - 20);
        }

        let Generic_button = (text = "", x = 0, y = 0, sizeW = 10, sizeH = 10  ) =>
        {
            ctx.strokeRect(x, y, sizeW, sizeH);
            ctx.fillText(text, x + 25 , y + 20);
            this.opc = {x: x, y: y , width: sizeW, height: sizeH};
                if(collision(mouse, this.opc)){
                    ctx.fillStyle = "#001Fff55";
                    ctx.fillRect(x, y , sizeW,  sizeH);
                    ctx.fillStyle = "White";
                    if(mouse.clicked)
                        return true;
                }
            return false;
        }

        if(this.menu_status == undefined || this.menu_status == 0)
        {
            ctx.fillStyle = "#006bffa1";
            ctx.fillRect(screenW - 60, 10, 50,50);
            //roundRect(ctx, screenW - 60, 10 ,50,50, 10, "#006bffa1");

        }else if (this.menu_status == 1)
        {
            
            Menu();
            ctx.strokeStyle = "black";
            ctx.strokeRect(15,15, screenW - 300,  screenH - 30 );
            for(let py = 0; py < player.length; ++py)
            {
                ctx.fillStyle = "White";
                ctx.fillText(player[py].name + "   " + player[py].class + "  Level: " + player[py].level, 30 + 100, 60 * (1 + py) );                
                ctx.fillText(("HP:" + player[py].hp + "/" +player[py].hpCap)  , 30 + 100, (60 * (1 + py)) + 30 );
                ctx.fillText(("MP:" + player[py].mp + "/" +player[py].mpCap)  , 30 + 100, (60 * (1 + py)) + 60 );
                player[py].draw_face(ctx, 20, 30 * (1 + py), 100,100);
            }

            ctx.strokeRect(screenW - 280, 60, 260,  screenH - 150 );
            //let infos = ["Inventario", "Equipamento", "Magia", "Status", "Time", "Opção", "Salva", "Sair"];
            let infos = ["Inventario", "Equipamento", "Opção", "Salva", "Sair"];
            for(let py = 0; py < infos.length; ++py)
            {
                if(Generic_button(infos[py], screenW - 275, (40 *(py+1))+25,245, 30 )) this.menu_status = 2+py;
            }

            closing();
            return true;
        }else if (this.menu_status == 2)
        {
            Menu();

            ctx.strokeRect(20, 60, screenW - 40,  screenH - 250);

            ctx.fillStyle = "white";
            ctx.font = "normal 16pt Arial";
            for(let i = 0; i < inventary.length; ++i)
            {
                if(Generic_button(inventary[i].name,(25+( 230 * i)), 70,220,30))
                {
                    if(this.iqt == i)
                    {
                        Inventary_manager.use_item(i);
                    }
                    this.iqt = i;
                }
            }
            ctx.strokeRect(20, screenH-180,  screenW - 40, 160);
            ctx.font = "normal 16pt Arial";

            if(this.iqt != undefined && inventary[this.iqt] != undefined)
            {
                ctx.fillText(inventary[this.iqt].desc , 30 , screenH-150);
                ctx.fillText("Ainda resta: " + inventary[this.iqt].value + ". No seu inventario" , 30 , screenH-125);
            }
            closing();
            return true;
        }else if (this.menu_status == 3)
        {
            Menu();

            closing();
        }else if (this.menu_status == 4)
        {
            Menu();

            closing();  
        }else if (this.menu_status == 5)
        {
            Menu();

            closing();  
        }

        return false;
    }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {

    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  
    ctx.restore();
  }