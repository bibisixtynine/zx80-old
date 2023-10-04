import icons from "./database-icons.js";

export default  {
    name: "template",
    id: 0,
    svg: icons.earth,
    backgroundColor: "rgb(0, 50, 0)",
    script: `
















    
//////////////////////////
//
// 🤩 TEMPLATE APP 1.1
//

print('👀<center><h1><orange>Hello<yellow> World!</h1>')


























/////////////////////////////
///////////////////////////////
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