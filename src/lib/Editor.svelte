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
  </script>
  
  
  <!-------------------------------------------------------->
  <!-------------------------------------------------------->
  <!-------------------------------------------------------->
  
  
  <CodeMirror bind:value={script} lang={javascript()} theme={oneDark} />
  <div id="ui">...loading...</div>
  
  
  <!-------------------------------------------------------->
  <!-------------------------------------------------------->
  <!-------------------------------------------------------->
  
  
  <style>
    #ui {
      padding: 0px;
      margin: 0px;
  
      position: fixed;
      top: 0px;
      height: 30%;
      overflow: scroll;
      text-align: center;
  
      border: solid red 1px;
      border-radius: 25px;
      width: calc(100% - 2px); /* 4px = border-width (2px... see above) x 2 */
  
      font-family: monospace;
      color: green;
      background-color: rgba(0, 0, 0, 0.2);
      transform: scale(0.7);
          
      -ms-overflow-style: none;  /* IE and Edge hide scrollbar */
      scrollbar-width: none;  /* Firefox */
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    #ui::-webkit-scrollbar {
      display: none;
    }
  </style>