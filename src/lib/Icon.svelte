<!-------------------------------------------------------->
<!-- Icon.svelte ----------------------------------------->
<!-------------------------------------------------------->


<script>
    export let size = '80%'
    export let name = 'nona'
    export let backgroundColor = 'rgb(55, 53, 48)'
    export let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="red" d="M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24Zm37.7 130.3a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-26.3 26.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4l26.4-26.3l-26.4-26.3a8.1 8.1 0 0 1 11.4-11.4l26.3 26.4l26.3-26.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"/></svg>`
</script>


<!-------------------------------------------------------->
<!-------------------------------------------------------->
<!-------------------------------------------------------->


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click>
    <div class='item' style='--size: {size}; --backgroundColor: {backgroundColor}'>
        {@html svg}
    </div>
    <div class='name'>{name}</div>
</div>


<!-------------------------------------------------------->
<!-------------------------------------------------------->
<!-------------------------------------------------------->


<style>
    .item {
        width: var(--size);
        height: var(--size);
        background-color: var(--backgroundColor);
        border-radius: 20%;
        border: solid 1.5px var(--backgroundColor);
    }
    .item:hover {
        border: solid 1.5px rgb(165, 253, 22);
    }
    .name {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 0.8em;
        color:rgb(191, 187, 197);
        text-align: center;
        margin: 3px 0px 0px 0px;
    }
</style>


<!-------------------------------------------------------->
<!-------------------------------------------------------->
<!-------------------------------------------------------->