import icons from "./database-icons.js";

export default  {
    name: "Painter 2",
    id: 0,
    svg: icons.rocket,
    backgroundColor: "rgb(0, 0, 255)",
    script: `
















/////////////////////////////////////////////////////////////
//
// 🤖 README FIRST
//
//  Use chrome brower debug window for debugging (only on desktop 🥲)
//    . Press option+command+i on chrome osx,
//    . Use the 'console' tab to see the errors message while you
//      are typing code,
//    . Add 'debugger' instruction (without brackets) to add a breakpoint
//      anywhere in your code in this page,
//    . Each time you type a character... the app auto relaunch.
//
//  ✅ Done !
//

//////////////////////////
//
// 🎨 PAINTER APP 1.0
//

clear()
import "https://code.playcanvas.com/playcanvas-stable.min.js"

print('<orange>the <yellow>Painter App<orange> 1.0')
print('<canvas id="application"></canvas>')

const canvas = document.getElementById('application');

// Create the app and start the update loop
const app = new pc.Application(canvas, {});
app.start();

// Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// helper function to create a primitive with shape type, position, scale, color and layer
function createPrimitive(primitiveType, position, scale, layer, material) {
    // create primitive
    const primitive = new pc.Entity();
    primitive.addComponent("render", {
        type: primitiveType,
        layers: layer,
        material: material,
        castShadows: false,
        receiveShadows: false,
    });

    // set position and scale and add it to scene
    primitive.setLocalPosition(position);
    primitive.setLocalScale(scale);
    app.root.addChild(primitive);

    return primitive;
}

// create texture and render target for rendering into
const texture = new pc.Texture(app.graphicsDevice, {
    width: 1024,
    height: 1024,
    format: pc.PIXELFORMAT_RGB8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
});

const renderTarget = new pc.RenderTarget({
    colorBuffer: texture,
    depth: false,
});

// create a layer for rendering to texture, and add it to the beginning of layers to render into it first
const paintLayer = new pc.Layer({ name: "paintLayer" });
app.scene.layers.insert(paintLayer, 0);

// create a material we use for the paint brush - it uses emissive color to control its color, which is assigned later
const brushMaterial = new pc.StandardMaterial();
brushMaterial.emissiveTint = true;
brushMaterial.useLighting = false;
brushMaterial.update();

// we render multiple brush imprints each frame to make smooth lines, and set up pool to reuse them each frame
const brushes = [];
function getBrush() {
    let brush;
    if (brushes.length === 0) {
        // create new brush - use sphere primitive, but could use plane with a texture as well
        // Note: plane would need to be rotated by -90 degrees along x-axis to face camera and be visible
        brush = createPrimitive(
            "sphere",
            new pc.Vec3(2, 1, 0),
            new pc.Vec3(1, 1, 1),
            [paintLayer.id],
            brushMaterial
        );
    } else {
        // reuse already allocated brush
        brush = brushes.pop();
        brush.enabled = true;
    }
    return brush;
}

// Create orthographic camera, which renders brushes in paintLayer, and renders before the main camera
const paintCamera = new pc.Entity();
paintCamera.addComponent("camera", {
    clearColorBuffer: false,
    projection: pc.PROJECTION_ORTHOGRAPHIC,
    layers: [paintLayer.id],
    renderTarget: renderTarget,
    priority: -1,
});

// make it look at the center of the render target, some distance away
paintCamera.setLocalPosition(0, 0, -10);
paintCamera.lookAt(pc.Vec3.ZERO);
app.root.addChild(paintCamera);

// Create main camera, which renders entities in world layer - this is where we show the render target on the box
const camera = new pc.Entity();
camera.addComponent("camera", {
    clearColor: new pc.Color(0.2, 0.2, 0.2),
});

camera.translate(0, 0, 30);
camera.lookAt(pc.Vec3.ZERO);
app.root.addChild(camera);

// material used to add render target into the world
const material = new pc.StandardMaterial();
material.emissiveMap = texture;
material.useLighting = false;
material.update();

// create a box which we use to display rendered texture in the world layer
const worldLayer = app.scene.layers.getLayerByName("World");
const box = createPrimitive(
    "box",
    new pc.Vec3(0, 0, 0),
    new pc.Vec3(15, 15, 15),
    [worldLayer.id],
    material
);

let progress = 1;
let scale;
let startPos, endPos;
const pos = new pc.Vec3();
const usedBrushes = [];

// update things each frame
app.on("update", function (dt) {
    // if the last brush stroke is finished, generate new random one
    if (progress >= 1) {
        progress = 0;

        // generate start and end position for the stroke
        startPos = new pc.Vec3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            0
        );
        endPos = new pc.Vec3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            0
        );

        // random width (scale)
        scale = 0.1 + Math.random();

        // assign random color to the brush
        brushMaterial.emissive = new pc.Color(
            Math.random(),
            Math.random(),
            Math.random()
        );
        brushMaterial.update();
    }

    // disable brushes from the previous frame and return them to the free pool
    while (usedBrushes.length > 0) {
        const brush = usedBrushes.pop();
        brush.enabled = false;
        brushes.push(brush);
    }

    // step along the brush line multiple times each frame to make the line smooth
    const stepCount = 30;
    const stepProgress = 0.005;

    // in each step
    for (let i = 0; i < stepCount; i++) {
        // move position little bit
        pos.lerp(startPos, endPos, progress);

        // setup brush to be rendered this frame
        const activeBrush = getBrush();
        activeBrush.setLocalPosition(pos);
        activeBrush.setLocalScale(scale, scale, scale);
        usedBrushes.push(activeBrush);

        // progress for the next step
        progress += stepProgress;
    }

    // rotate the box in the world
    box.rotate(5 * dt, 10 * dt, 15 * dt);
});


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
  ui.innerHTML = '<style>::-webkit-scrollbar{display:none;} center{position:fixed; left:50%; top:50%; transform:translate(-50%,-50%)} red{color:red} white{color:white} blue{color:blue} green{color:green} yellow{color:yellow} orange{color:orange} purple{color:purple}</style>'
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
  ui.innerHTML = '<style>::-webkit-scrollbar{display:none;} center{position:fixed; left:50%; top:50%; transform:translate(-50%,-50%)} red{color:red} white{color:white} blue{color:blue} green{color:green} yellow{color:yellow} orange{color:orange} purple{color:purple}</style>'
}
  
function printf(html, uiId = 'ui') {
  const ui = getUI(uiId)
  ui.insertAdjacentHTML('beforeend', html);
}

function print(html, uiId = 'ui') {
  const ui = getUI(uiId)
  ui.insertAdjacentHTML('beforeend', html+"<br>");
}



`}