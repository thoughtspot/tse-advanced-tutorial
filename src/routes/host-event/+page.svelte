<script>
    import {onMount} from "svelte";

    import {EmbedEvent, HostEvent, SearchEmbed} from '$lib/tsembed.es.js';
    import {store} from "$lib/store.js";

    const worksheetID = "4d98d3f5-5c6a-44eb-82fb-d529ca20e31f";  // ID of the worksheet to use for chart/table.
    const waitingMsg = "Waiting for data.....";

    $: $store.cssFile, onHostEvent();  // re-run when the css file is changed.

    const onHostEvent = () => {

        // -------------------------------------------------------------------------------
        // Exercise 3.1: Embed a chart and listen for the EmbedEvent.Data event.
        // Once the data event triggers, call to show the table.
        // Note the embed IDs in the HTML.
        // -------------------------------------------------------------------------------

    }

    const showTable = (embed, payload) => {

        // -------------------------------------------------------------------------------
        // Exercise 3.2: Embed a search embed as a table and pass the TML string from the payload.
        // Note the embed IDs in the HTML.
        // -------------------------------------------------------------------------------

    }

    onMount(() => {
        onHostEvent();
    })

</script>

<div id="chart-embed">
    <p class="info">Chart not yet embedded.</p>
</div>
<div id="table-embed">
    <p id="waiting-for-data" class="info">{waitingMsg}<p>
</div>

<style>

    #chart-embed, #table-embed {
        height: 45vh;
        width: 100vw;
    }

</style>