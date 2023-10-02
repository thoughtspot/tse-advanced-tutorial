<script>
  import {onMount} from "svelte";

  import {EmbedEvent, HostEvent, SearchEmbed} from '$lib/tsembed.es.js';

  const worksheetID = "4d98d3f5-5c6a-44eb-82fb-d529ca20e31f";  // ID of the worksheet to use for chart/table.

  const onHostEvent = () => {

    // TODO: embed a SearchEmbed with a handler for EventEmbed.Data.
    const embed = null;

  }

  const showTable = (embed, payload) => {

    // Get TML and then embed a SearchEmbed with the TML search.
    embed.trigger();
  }


  onMount(() => {
    onHostEvent();
  });

</script>

<div id="chart-embed">
</div>
<div id="table-embed">
    <p class="info">Waiting for data.....</p>
</div>

<style>

  #chart-embed, #table-embed {
    height: 40vh;
    width: 100vw;
  }

</style>