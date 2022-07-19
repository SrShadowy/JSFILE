//------------------- Object of grid -------------------
const Grids = [];
//------------------- Class of grids -------------------
class GridCell{
    constructor(x,y, sizeH, sizeW) 
    {
        this.x      = x;
        this.y      = y;
        this.height = sizeH;
        this.width  = sizeW;
        this.color  = 'Black';
    }

    draw(object_mouse, Ctx)
    {
        if(object_mouse != undefined && collision(this, object_mouse))
        {
            //console.log(this);
            if(object_mouse.clicked) this.color = 'Red';
            Ctx.strokeStyle = this.color;
            Ctx.strokeRect(this.x,this.y,this.width,this.height);
        }
    }

    /******************* Canvas & And Cell Size ************************/
    static init_grids(CanvasHeight, CanvasWeidth, CellSize)
    {
        for (let h = 0; h < CanvasHeight; h += CellSize )
        {
            for(let w = 0; w < CanvasWeidth; w += CellSize )
            {
                
                Grids.push(new GridCell(w, h, CellSize, CellSize));
            }
        }
    }

    static show_grids(mouse, Context)
    {
        let x = undefined;
        for (let g of Grids)
        {
            
            g.draw(mouse, Context);
            if(g.color != 'Black')
            {
                x = g;
                g.color = 'Black';
            }
        }
        return x;
    }

}
