import icons from "./database-icons.js";

export default  {
    name: "Pixel 2",
    id: 0,
    svg: icons.boy,
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
// 👾 PIXEL APP 1.0
//

// some printings
print('<orange>the <yellow>Pixel App<orange> 1.0')


// add a drawing canvas for the pixel app !
print('<canvas style="border: solid 2px orange; border-radius: 15px; touch-action:none; width:80%" class="rainbow-pixel-canvas"></canvas>')

// some more printings
print('so happy it works !')
print('<purple>Yeah Man !</red>')
print('👀')
print('my name is John !')
print('i am your 🤖')
print('<blue>yes <white>i <red>am')
print('so nice 🤩')
print('so happy it works !')
print('<purple>Yeah Man !</red>')

/////////////////////////////////////////////////////////////
//
// the pixel app... could work as it is a static html file...
//
// <html>
//   <head>
//   </head>
//   <body>
//     <script type='module'> ... adding all the content of this file here ! </scr ipt>
//   </body>
// </html>
// 
// STRANGE BUG : NEVER PUT THE correct</sc ript> in the comment...


import interact from 'https://cdn.interactjs.io/v1.10.11/interactjs/index.js';

var pixelSize = 16;

interact('.rainbow-pixel-canvas')
  .draggable({
    autoScroll: false,
    max: Infinity,
    maxPerElement: Infinity,
    origin: 'self',
    modifiers: [
      interact.modifiers.snap({
      // snap to the corners of a grid
        targets: [
          interact.snappers.grid({ x: pixelSize, y: pixelSize }),
        ],
      }),
    ],
    listeners: {
      // draw colored squares on move
      move: function (event) {
        var context = event.target.getContext('2d');
        // calculate the angle of the drag direction
        var dragAngle =
          (180 * Math.atan2(event.dx, event.dy)) / Math.PI;
        // set color based on drag angle and speed
        context.fillStyle =
          'hsl(' +
          dragAngle +
          ', 86%, ' +
          (30 + Math.min(event.speed / 1000, 1) * 50) +
          '%)';
        // draw squares
        context.fillRect(
          event.pageX - pixelSize / 2,
          event.pageY - pixelSize / 2,
          pixelSize,
          pixelSize
        );
      },
    },
  })
  // clear the canvas on doubletap
  .on('doubletap', function (event) {
    var context = event.target.getContext('2d');
    context.clearRect(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    resizeCanvases();
  });

function resizeCanvases() {
  [].forEach.call(
    document.querySelectorAll('.rainbow-pixel-canvas'),
    function (canvas) {
      delete canvas.width;
      delete canvas.height;
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  );
}

resizeCanvases();
 
// interact.js can also add DOM event listeners
interact(window).on('resize', resizeCanvases);


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