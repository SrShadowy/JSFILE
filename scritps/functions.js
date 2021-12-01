let delay = 0;
function collision(f,s)
{
   
   if((f != undefined && s != undefined) && s.x != undefined && f.x != undefined)
   {
      return ((f.x === s.x && f.y === s.y) || 
                (f.x < s.x + s.width &&
                f.x + f.width > s.x  &&
                f.y + f.height > s.y && 
                f.y < s.y + s.height ));
   }
}


function check_key_press(key, keyname)
{
    if(key === keyname &&  (performance.now() - delay) > 100 )
    {

        delay = performance.now();
        return true;
    }
    return false

}