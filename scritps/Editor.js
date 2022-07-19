const ed_games = document.getElementById("ed_game");
const ctx_2d = ed_games.getContext("2d");
const canvas_pos = ed_games.getBoundingClientRect();
const grid_size = 48;
const Grids = [];
const scene = [];
let mouse = {x:0,y:0,click:0, w: 1, h: 1};
const layouts = new Array;
let Layout = 0;
let imgs = "./resources/EDITOR/48x48/!CL_DEMO_48x48.png";
const check_input_grids = document.getElementById("for_grids");

let cursors_img = ["./resources/EDITOR/UIX/pencil.svg", "./resources/EDITOR/UIX/eraser.svg"];
let pin = 0;
let cursor_per = new Image();
cursor_per.src = cursors_img[pin];

/*
"./resources/EDITOR/48x48/!CL_DEMO_48x48.png"
"./resources/EDITOR/48x48/Interiors_free_48x48.png"
"./resources/EDITOR/48x48/Room_Builder_free_48x48.png"
*/

function set_cur_function(fc)
{
    pin = fc;
    cursor_per = new Image();
    cursor_per.src = cursors_img[pin];
}

function imgs_(let)
{
    switch(let)
    {
        case 0:
            imgs = "./resources/EDITOR/48x48/!CL_DEMO_48x48.png";
            break;
        case 1:
            imgs = "./resources/EDITOR/48x48/Interiors_free_48x48.png";
            break;
        case 2:
            imgs = "./resources/EDITOR/48x48/Room_Builder_free_48x48.png";
            break;
    }

    document.getElementById("tileset").src = imgs;
}

function create_layouts()
{
    layouts[0] = new Array;
    layouts[1] = new Array;
    layouts[2] = new Array;
    layouts[3] = new Array;

}

function init_grids()
{
    create_layouts();

    for (let h = 0; h < canvas_pos.height; h += grid_size )
        {
            for(let w = 0; w < canvas_pos.width; w += grid_size )
            {
                Grids.push({x: w, y: h, w: grid_size, h: grid_size});
            }
        }

   
}

function show_grids()
{
    let x = undefined;


    for(let g of Grids)
    {


        let show = colid(g, mouse)
        //console.log(show);
        if(show)
        {
            ctx_2d.strokeRect(g.x, g.y, g.h, g.w);
            x = g;
        }
       

    }
    return x;
}

function clearUp()
{
    ctx_2d.clearRect(0, 0, canvas_pos.width, canvas_pos.height);
}

function set_grid_tile()
{
    let x = document.getElementById("X").value;
    let y = document.getElementById("Y").value;


    let sequare = document.getElementById("sqe");
    sequare.style.top = (y*48) + 'px';
    sequare.style.left = (x*48) + 'px';
    return {x: x, y: y};

}

function render_scene()
{
    //render_layout_3();
    //render_layout_2();
    //render_layout_1();
    render_layout_0();
}




function update()
{
    clearUp();
    let checkbox = document.getElementById("Show_grids");



    render_scene();

    if(checkbox.checked) show_grids();
    Layout_name();
    set_grid_tile();
    ctx_2d.drawImage(cursor_per, mouse.x,  mouse.y-10, 16,16); // custom cursor fuckup haha
    if(mouse.click)
    {
        switch(pin)
        {
            case 0:
                set_img_up();
            break;

            case 1:
                erease_img_up();
            break;
        }
        
    }

}





function render_layout_0()
{

    for(let ly of layouts)
    {
        for(let i of ly)
        {
            ctx_2d.drawImage(i.img, i.x * 48, i.y * 48, 48,48,i.px, i.py,48,48);
        }
    }
    return true;
}



function set_img_up()
{
    let infos = set_grid_tile();
    let img = new Image();
    img.src = imgs;
    let grid_info = undefined;
 
    if(check_input_grids.checked)
        grid_info = show_grids();
    else
        grid_info = {x: mouse.x , y: mouse.y, w: 48, h: 48};

    let checkbox = document.getElementById("replace_grids");

    let index = -1;

    if(grid_info == undefined)
    return;

    if(checkbox.checked)
    {

        let find;
        for(let fnd of layouts[Layout])
        {
            if(fnd.py == grid_info.y  && fnd.px == grid_info.x)
            {
                find = fnd;
                break;
            }
        }

        index =  layouts[Layout].indexOf(find);
    }

    if(index > -1)
    layouts[Layout][index] = {img: img, px: grid_info.x,py: grid_info.y, x: infos.x, y: infos.y, sizeY: grid_info.h, sizeX: grid_info.w };
    else
    layouts[Layout].push({img: img, px: grid_info.x,py: grid_info.y, x: infos.x, y: infos.y, sizeY: grid_info.h, sizeX: grid_info.w });


}

function erease_img_up()
{
    if(check_input_grids.checked)
    grid_info = show_grids();
    else
    grid_info = {x: mouse.x , y: mouse.y, w: 48, h: 48};

    let find = undefined;
    for(let fnd of layouts[Layout])
    {
        if(fnd.py == grid_info.y  && fnd.px == grid_info.x)
        {
            find = fnd;
            break;
        }
    }

    let index = layouts[Layout].indexOf(find);
    if(index > -1)
        layouts[Layout].splice(index, 1);

    //console.log(index);
}

function init()
{
    console.log(ctx_2d);
    console.log(canvas_pos)
    ed_games.height           = canvas_pos.height;
    ed_games.width            = canvas_pos.width;
    console.log(ed_games);
    init_grids();

    
    //let this_grids = document.getElementById("grids");

    document.getElementById("grid_imgs").addEventListener("click", function(e)
    {
        //console.log( this_grids.style.top);
        
        let top = Math.floor(e.offsetY / 48);
        let left = Math.floor(e.offsetX / 48);

        document.getElementById("X").value = left;
        document.getElementById("Y").value = top;



        //this_grids.style.top = (top * 48) +  'px';
        //this_grids.style.left = (left * 48) + 'px';
    })

    //console.log(this_grids);

    ed_games.addEventListener("mousemove", function(e)
    {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
       
    })

    ed_games.addEventListener("click", function(e)
    {
        //set_img_up();
    })

    ed_games.addEventListener("mousedown", function(e)
    {


        mouse.click = ( e.buttons == 1 );


    })

    ed_games.addEventListener("mouseup", function(e)
    {

        mouse.click = false;

    })



    setInterval(update, 1000/30); // set 60fps to render up
}

function colid(f, s)
{
    if((f != undefined && s != undefined) && s.x != undefined && f.x != undefined)
   {
      return(f.x < s.x && f.x + f.w > s.x && f.y < s.y && f.y+f.h > s.y)
   }
}


//Change layout
function Layoutbackground()
{
    Layout = 0; // For make background
}

function LayoutObscule()
{
    Layout = 1; // Same to player
}

function LayoutDetails()
{
    Layout = 2;  // To out of position
}

function Layout_EVENTS()
{
    Layout = 3; // Events and etc
}

function Layout_name()
{
    let name = undefined;
    switch(Layout)
    {
        case 0:
            name = "Background";
            break;
        case 1:
            name = "Items";
            break;
        case 2:
            name = "Details";
            break;
        case 3:
            name = "Events";
            break;
        default:
            name = "UNKOW";
            break;
    }
    document.getElementById("SetLayout").innerHTML = name;
}

window.onload = init;