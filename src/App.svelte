<!-------------------------------------------------------->
<!-- App.svelte --300823---------------------------------->
<!-------------------------------------------------------->

<script>

  import { onMount } from "svelte";

  import Editor from "./lib/Editor.svelte";
  import Icon from "./lib/Icon.svelte";
  import icons from "./lib/database-icons.js";
  import apps_database from "./lib/database-apps.js";
  import app_template from "./lib/app-template.js"

  import CONST from './lib/CONST.js'

  /////////////////////////////////////////////////////
  //
  // init
  //
  let apps = apps_database;

  const apps_stringified = JSON.stringify(apps)
  apps = JSON.parse(apps_stringified)


  let selectedApp
  let windowScrollYMemo
  let iconSize = "64px";
  let state = {
    home: true,
  };

  function update_apps(_apps) {
    if (typeof localStorage !== "undefined") {
      const apps_database = localStorage.getItem("zx80-apps-database")
      if (apps_database) {
        return JSON.parse(apps_database)
      } else {
        const stringified_apps = JSON.stringify(_apps)
        localStorage.setItem("zx80-apps-database", stringified_apps);
        localStorage.setItem("zx80-apps-database-length", stringified_apps.length)
        return _apps
      }
    } else {
      console.log('#ERROR# localStorage undefined')
    }
  }

  onMount(() => {
    windowScrollYMemo = window.scrollY;
    apps = update_apps(apps)
  });
  //
  // init
  //
  /////////////////////////////////////////////////////


  /////////////////////////////////////////////////////
  //
  // user interaction handling
  //
  function handleHomeClick(event) {
    // hide app-view
    let program_1_container = document.getElementById("app-view");
    program_1_container.style.display = "none";

    // display home-view
    let home_view = document.getElementById("home-view");
    home_view.style.display = "flex";

    // restore scrollY position
    if (windowScrollYMemo && !state.home) window.scroll(0, windowScrollYMemo);
    state.home = true;
  }
//
  function handleAppClick(app) {
    if (document) {
      // if current view is home-view :
      // - hide home-view,
      // - display app-view
      // - launch app
      if (state.home) {
        selectedApp = app;

        if (app.system) {
          if (app.system===CONST.ADD_APP) newApp()
          return
        }

        // memo window scrollY
        windowScrollYMemo = window.scrollY;

        // hide home-view
        let home_view = document.getElementById("home-view");
        home_view.style.display = "none";
        state.home = false;

        // display app-view
        let app_view = document.getElementById("app-view");
        app_view.style.display = "block";
      }
    }
  }  
  //
  // user interaction handling
  //
  /////////////////////////////////////////////////////


  /////////////////////////////////////////////////////
  //
  // create a new app and add to home-view
  //
  function rnd() {
    const date = Date.now().toString().substring(2)
    const result = date.substring(0,date.length-3)

    return result
  }

  function newApp() {
    if (document) {
      const clone = Object.assign({}, app_template);
      clone.name = rnd()

      apps.push(clone);
      apps = apps; // force update home-view

      const stringified_apps = JSON.stringify(apps)
      localStorage.setItem("zx80-apps-database", stringified_apps);
      localStorage.setItem("zx80-apps-database-length", stringified_apps.length)
    }
  }
  //
  // create a new app and add to home-view
  //
  /////////////////////////////////////////////////////

</script>

<!-------------------------------------------------------->
<!-------------------------------------------------------->
<!-------------------------------------------------------->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="home-button" on:click={handleHomeClick}>home</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="app-view">
  {#if selectedApp}
    <Editor app={selectedApp} />
  {/if}
</div>

<div id="home-view" display="block">
  {#each apps as app}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="toto" on:click={() => handleAppClick(app)}>
      <Icon
        size={iconSize}
        name={app.name}
        svg={app.svg}
        backgroundColor={app.backgroundColor}
      />
    </div>
  {/each}
</div>

<div id="background" />


<!-------------------------------------------------------->
<!-------------------------------------------------------->
<!-------------------------------------------------------->


<style>
  #background {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-image: url("/sunrise.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: color;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  #app-view {
    display: none;
    position: absolute;
    top: 40px;
    left: 0px;
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
  }

  #home-view {
    position: absolute;
    top: calc(env(safe-area-inset-top) + 20px);
    display: flex;
    overflow: scroll;
    flex-wrap: wrap;
    justify-content: center;
    gap: 22px;
  }

  #home-button {
    z-index: 9;

    position: fixed;
    left: 50%;
    transform: translate(-50%, 0%);
    bottom: 0px;
    width: 100%;
    padding: 12px;
    margin: 0px;
    background-color: rgba(62, 173, 237, 0.349);
    color: blanchedalmond;
    text-align: center;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    font-weight: 700;
    font-size: 20px;
  }
</style>