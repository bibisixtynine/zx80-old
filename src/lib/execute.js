function execute(ui,code) {
    //ui.style.border = 'solid blue 2px'
    ui.style.margin = '0px'
    ui.style.padding = '0px'
    const iframe = document.createElement('iframe')
    iframe.width = '100%'
    iframe.height = '100%'
    iframe.srcdoc = '<script type="module">' + code + '</script>'
    iframe.style.border = 'none'
    iframe.style.padding = '0px'
    iframe.style.margin = '0px'
    
    ui.innerHTML = ''
    ui.appendChild(iframe)
}

export default execute