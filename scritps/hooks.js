/******************* LISTENER! ************************/
function hooks()
{
    let cv_mouse_move = (e) => {
        mouse.x = e.x - CanvasPos.x;
        mouse.y = e.y - CanvasPos.y;
    }
    let cv_mouse_leave = (e) => {
        mouse.x = undefined;
        mouse.y = undefined;
    }

    let cv_mouse_click = (e) => {
        mouse.x = e.x - CanvasPos.x;
        mouse.y = e.y - CanvasPos.y;
    }

    let dc_mouse_down = () => { 
        mouse.clicked = true 
    }

    let dc_key_down = (e) =>{
        KeyPress = e.code;
    }

    let dc_key_up = (e) =>{
        KeyPress = undefined;
    }

    document.addEventListener('keydown'  ,   dc_key_down);
    document.addEventListener("keyup"    ,   dc_key_up  );
    document.addEventListener('mousedown', dc_mouse_down);
    if(Canvas != undefined) // CHECK OUT
    {
        Canvas.addEventListener('mousemove' ,   cv_mouse_move );
        Canvas.addEventListener('mouseleave',   cv_mouse_leave);
        Canvas.addEventListener('click'     ,   cv_mouse_click);
    }
}
/******************* LISTENER! ************************/
