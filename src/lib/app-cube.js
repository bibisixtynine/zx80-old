import icons from "./database-icons.js";

export default  {
    name: "Cube 3",
    id: 0,
    svg: icons.tree,
    backgroundColor: "rgb(0, 0, 255)",
    script: `
















/////////////////////////////////////////////////////////////
//
// 🤖 README FIRST
//
//  Use chrome brower debug window for debugging (only on desktop 🥲)
//    . Press option+command+i on chrome osx,
//      Use the 'console' tab to see the errors message while you
//      are typing code,
//    . Add 'debugger' instruction (without brackets) to add a breakpoint
//      anywhere in your code in this page,
//    . Each time you type a character... the app auto relaunch.
//
//  ✅ Done !
//

//////////////////////////
//
// ⬜️ CUBE APP 3.0
//
/*
import "https://code.playcanvas.com/playcanvas-stable.min.js"

clear()
print('<orange>the <yellow>Cube App<orange> 1.0')
print('<canvas id="application"></canvas>')

const canvas = document.getElementById('application');

// Create the app and start the update loop
const app = new pc.Application(canvas, {});
app.start();

// fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// ensure canvas is resized when window changes size
window.addEventListener('resize', () => app.resizeCanvas());

// create box entity
const box = new pc.Entity('cube');
box.addComponent('model', {
    type: 'box'
});
app.root.addChild(box);

// create camera entity
const camera = new pc.Entity('camera');
camera.addComponent('camera', {
    clearColor: new pc.Color(0.4, 0.1, 0.1)
});
app.root.addChild(camera);
camera.setPosition(0, 0, 3);

// create directional light entity
const light = new pc.Entity('light');
light.addComponent('light');
app.root.addChild(light);
light.setEulerAngles(45, 0, 0);

// rotate the box according to the delta time since the last frame
app.on('update', dt => box.rotate(10 * dt, 20 * dt, 30 * dt));




/////////////////////////////
//
// 📚 libs
//
// NB: _ prefixed function are 'private' to 'libs'
function input(text,fct) {
  const id=Date.now().toString()
  printf(text+ '<input id="'+id+'"placeholder="Enter some text" name="name" />')
  const e = document.getElementById(id)
  e.addEventListener('change',(event)=>{
    fct(event.target.value)
  })
}

function getUI(uiId) {
  const ui = document.getElementById(uiId)
  if (!ui) {
    const div = document.createElement('div')
    div.id = uiId
    document.body.appendChild(div)
    _initUI(div)
  }
  return document.getElementById(uiId)
} 

function _initUI(ui) {
  ui.innerHTML = ''
  ui.innerHTML = '<style>center{position:fixed; left:50%; top:50%; transform:translate(-50%,-50%)} red{color:red} white{color:white} blue{color:blue} green{color:green} yellow{color:yellow} orange{color:orange} purple{color:purple}</style>'
  ui.style.fontFamily = 'monospace'
  ui.style.fontSize = '20px'
  ui.style.position = 'fixed'
  ui.style.top = '0px'
  ui.style.left = '0px'
  ui.style.backgroundColor = 'rgba(0,0,0,0.5)'
  ui.style.width = '100%'
  ui.style.height = '100%'
  ui.style.overflow = 'scroll'
  ui.style.color = 'green'
  ui.style.textAlign = 'center'
  ui.style.borderRadius = '25px'
  ui.style.margin = '0px'
  ui.style.padding = '0px'
  return ui
}

function clear(uiId = 'ui') {
  const ui = getUI(uiId)
  ui.innerHTML = ''
  ui.innerHTML = '<style>center{position:fixed; left:50%; top:50%; transform:translate(-50%,-50%)} red{color:red} white{color:white} blue{color:blue} green{color:green} yellow{color:yellow} orange{color:orange} purple{color:purple}</style>'
}
  
function printf(html, uiId = 'ui') {
  const ui = getUI(uiId)
  ui.insertAdjacentHTML('beforeend', html);
}

function print(html, uiId = 'ui') {
  const ui = getUI(uiId)
  ui.insertAdjacentHTML('beforeend', html+"<br>");
}
*/



`}