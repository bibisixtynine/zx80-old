<!-------------------------------------------------------->
<!-- Editor.svelte --------------------------------------->
<!-------------------------------------------------------->
<script>
    export let app = {
      name: "first mount app",
      id: 0,
      svg: icons.tree,
      backgroundColor: "rgb(0, 0, 255)",
      script: `// no code - first mount APP //`,
    };
  
    import icons from "../lib/database-icons.js";
  
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";
    import { oneDark } from "@codemirror/theme-one-dark";
  
    import { onMount } from "svelte";
  
    import execute from "./execute.js";
  
    let script = '//hello world//';
  
    let mounted = false;
    onMount(() => {
      mounted = true;
    });
  
    $: {
      if (mounted) {
        updateAppScriptIfAlreadyStored(app)
      }
    }
  
    $: {
      if (mounted) {
        evaluateCode(script);
        saveCode(script)
      }
    }
  
    function updateAppScriptIfAlreadyStored(_app) {
      if (typeof localStorage !== "undefined") {
        const code = localStorage.getItem("zx80-script-" + _app.name)
        if (code) {
          _app.script = code
          script = _app.script
        } else {
          localStorage.setItem("zx80-script-" + _app.name, _app.script);
          script = _app.script
        }
      } else {
        console.log('#ERROR# localStorage undefined')
      }
    }
  
  
    /**
     * @param {string} code
     */
    function saveCode(code) {
      if (typeof localStorage !== "undefined") {
        app.script = code
        localStorage.setItem("zx80-script-" + app.name, code);
      } else {
        console.log('#ERROR# localStorage undefined')
      }
    }
  
    const evaluateCode = (/** @type {string} */ code) => {
      if (!mounted) return;
      try {
        const ui = document.getElementById("ui");
        execute(ui, code);
      } catch (err) {
        console.error("##BIBIL-ERROR##");
        console.error(err);
      }
    };
  
  
    ///////////////////////////////////////////////////////////////////////
    //
    // resizing and dragging of the ui view :
    //
    let isResizing = false;
    let isDragging = false;
    let initialMouseX = 0;
    let initialMouseY = 0;
    let initialUIWidth = 0;
    let initialUIHeight = 0;
    let uiElement;
 
    ///////////////////////////////////////////////
    // MOUSE/TOUCH DOWN - resizing
    // Function to start resizing
    function startResize(event) {
      event.preventDefault();
      isResizing = true;
      initialMouseX = event.clientX;
      initialMouseY = event.clientY;
      initialUIWidth = parseFloat(getComputedStyle(uiElement).width);
      initialUIHeight = parseFloat(getComputedStyle(uiElement).height);

      // will keep dragging even if mouse moves fast
      document.addEventListener("mousemove", handleMouseMoveResize);
      document.addEventListener("mouseup", stopResize);
      // Disable mouse events on the uiElement while dragging
      // this is done to avoid continuous mouse dragging if the mouse goes fast
      // and down (in the uiElement...)
      uiElement.style.pointerEvents = "none";
    }
  
  
    function handleTouchStartResize(event) {
      event.preventDefault();
      isResizing = true;
      const touch = event.touches[0];
      initialMouseX = touch.clientX;
      initialMouseY = touch.clientY;
      initialUIWidth = parseFloat(getComputedStyle(uiElement).width);
      initialUIHeight = parseFloat(getComputedStyle(uiElement).height);
    }

    // MOUSE/TOUCH MOVE - resizing
    function handleMouseMoveResize(event) {
      if (!isResizing) return;
      const newWidth = initialUIWidth + (event.clientX - initialMouseX);
      const newHeight = initialUIHeight + (event.clientY - initialMouseY);
      uiElement.style.width = newWidth + 'px';
      uiElement.style.height = newHeight + 'px';
    }
  
    function handleTouchMoveResize(event) {
      if (!isResizing) return;
      const touch = event.touches[0];
      const newWidth = initialUIWidth + (touch.clientX - initialMouseX);
      const newHeight = initialUIHeight + (touch.clientY - initialMouseY);
      uiElement.style.width = newWidth + 'px';
      uiElement.style.height = newHeight + 'px';
    }
  
    function stopResize() {
      isResizing = false;
      document.removeEventListener("mousemove", handleMouseMoveResize);
      document.removeEventListener("mouseup", stopResize);
      // Re-enable mouse events on the uiElement
      uiElement.style.pointerEvents = "auto";
    }

    // MOUSE/TOUCH UP - resizing
    function handleTouchEndResize() {
      isResizing = false;
    }

  
    //////////////////////////////////////////////
    // MOUSE/TOUCH DOWN - dragging
    // Function to start dragging
    function startDrag(event) {
      event.preventDefault();
      isDragging = true;
      initialMouseX = event.clientX;
      initialMouseY = event.clientY;
      // will keep dragging even if mouse moves fast
      document.addEventListener("mousemove", handleMouseMoveDrag);
      document.addEventListener("mouseup", stopDrag);
      // Disable mouse events on the uiElement while dragging
      // this is done to avoid continuous mouse dragging if the mouse goes fast
      // and down (in the uiElement...)
      uiElement.style.pointerEvents = "none";
    }
  

  
    function handleTouchStartDrag(event) {
      event.preventDefault();
      isDragging = true;
      const touch = event.touches[0];
      initialMouseX = touch.clientX;
      initialMouseY = touch.clientY;
    }

    // MOUSE/TOUCH MOVE - dragging
    function handleMouseMoveDrag(event) {
      if (!isDragging) return;
      const offsetX = event.clientX - initialMouseX;
      const offsetY = event.clientY - initialMouseY;
      const currentX = parseFloat(getComputedStyle(uiElement).left) || 0;
      const currentY = parseFloat(getComputedStyle(uiElement).top) || 0;

      initialMouseX = event.clientX;
      initialMouseY = event.clientY;

      uiElement.style.left = currentX + offsetX + 'px';
      uiElement.style.top = currentY + offsetY + 'px';
    }
  
    function handleTouchMoveDrag(event) {
      if (!isDragging) return;
      const touch = event.touches[0];
      const offsetX = touch.clientX - initialMouseX;
      const offsetY = touch.clientY - initialMouseY;
      const currentX = parseFloat(getComputedStyle(uiElement).left) || 0;
      const currentY = parseFloat(getComputedStyle(uiElement).top) || 0;
      
      initialMouseX = touch.clientX;
      initialMouseY = touch.clientY;

      uiElement.style.left = currentX + offsetX + 'px';
      uiElement.style.top = currentY + offsetY + 'px';
    }

    // MOUSE/TOUCH UP - dragging
    function stopDrag() {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMoveDrag);
      document.removeEventListener("mouseup", stopDrag);
      // Re-enable mouse events on the uiElement
      uiElement.style.pointerEvents = "auto";
    }
  
    function handleTouchEndDrag() {
      isDragging = false;
    }
  
  </script>
  
  
  <!-------------------------------------------------------->
  <!-------------------------------------------------------->
  <!-------------------------------------------------------->
  
  
  <CodeMirror bind:value={script} lang={javascript()} theme={oneDark} />
  
  <div id="ui-container" bind:this={uiElement}>
    
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      id="resize-handle"
      on:mousedown={startResize}
      on:touchstart={handleTouchStartResize}
      on:touchmove={handleTouchMoveResize}
      on:touchend={handleTouchEndResize}
    ></div>
    
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      id="drag-handle" 
      on:mousedown={startDrag}
         
      on:touchstart={handleTouchStartDrag}
      on:touchmove={handleTouchMoveDrag}
      on:touchend={handleTouchEndDrag}
    ></div>
    
    <div id="ui"> ...loading... </div>

  </div>
  
  <!-------------------------------------------------------->
  <!-------------------------------------------------------->
  <!-------------------------------------------------------->
  
  
  <style>
    #ui-container{
      margin: 0px;
      padding: 0px;
      position: fixed;
      top: 40px;
      height: 30%;
      width: 100%;
      border: solid orange 5px;
      border-radius: 25px;
    }
    
    #ui{
      padding: 0px;
      margin: 0px;
  
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      overflow: scroll;
      text-align: center;
  
      /*border: solid red 1px;*/
      border-radius: 25px;
      width: calc(100% - 2px); /* 4px = border-width (2px... see above) x 2 */
  
      font-family: monospace;
      color: green;
      background-color: rgba(0, 0, 0, 0.2);
      /*transform: scale(0.7);*/
          
      -ms-overflow-style: none;  /* IE and Edge hide scrollbar */
      scrollbar-width: none;  /* Firefox */
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    #ui::-webkit-scrollbar {
      display: none;
    }
    
    /* New styles for the resize handle and draggable UI */
    #drag-handle {
      position: absolute;
      top: -50px; /* Adjust this value to control the handle's position */
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 40px;
      background-color: orange;
      border-radius: 50%;
      cursor: grab;
      z-index: 1000; /* Set z-index to make circles visible */

    }
    
    #resize-handle {
      position: absolute;
      bottom: -35px; /* Adjust this value to control the handle's position */
      right: -35px; /* Adjust this value to control the handle's position */
      width: 40px;
      height: 40px;
      background-color: orange;
      border-radius: 50%;
      cursor: nwse-resize;
      z-index: 1000; /* Set z-index to make circles visible */
    }
  </style>