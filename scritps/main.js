/******************* All magic begin here!!! ************************/
function init()
{
    // Inicialize main's variables
    const engine = new Engine(document.getElementById("game"), 50);
    
    engine.startup();
}
window.onload = init;