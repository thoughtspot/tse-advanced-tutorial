<script>
  import {onMount} from "svelte";

  import {EmbedEvent, HostEvent, SearchEmbed} from '$lib/tsembed.es.js';
  import {store} from "$lib/store.js";

  const worksheetID = "4d98d3f5-5c6a-44eb-82fb-d529ca20e31f";  // ID of the worksheet to use for chart/table.

  let mounted = false;
  $: $store.cssFile, onHostEvent();  // re-run when the css file is changed.

  const onHostEvent = () => {

    if (!mounted) return;  // only display if the page has mounted.

    // -------------------------------------------------------------------------------
    // Exercise 2.1: Embed a chart and listen for the EmbedEvent.Data event.
    // 1. Create a new SearchEmbed object using the playground that uses the worksheet
    //    and has a default search.
    // 2. Add a handler for the EmbedEvent.Data that will call to showTable().
    // Note: Pay attention the embed IDs in the HTML.
    //
    // -------------------------------------------------------------------------------

    // const embed = ....
    const embed = new SearchEmbed("#chart-embed", {
      dataSources: [worksheetID],
      collapseDataSources: true,
      searchOptions: {
        searchTokenString: '[sales] [product type] top 30 [sales date].monthly',
        executeSearch: true,
      },
    });

    embed
      .on(EmbedEvent.Data, payload => showTable(embed))
      .render();

  }

  const showTable = (embed) => {

    // -------------------------------------------------------------------------------
    // Exercise 2.2: Embed a search embed as a table and pass the TML string from the payload.
    // 1. Add a handler to trigger the GetTML event from the embed object.
    // 2. Create a new SearchEmbed object that uses the worksheet and has a search using the TML.
    // Note: pay attention to the embed IDs in the HTML.
    // -------------------------------------------------------------------------------

    // embed.trigger(HostEvent.GetTML).then(response => { ....
    embed.trigger(HostEvent.GetTML).then(response => {
      let search = response.answer.search_query;
      console.log("TML string: " + search);

      const embedTable = new SearchEmbed("#table-embed", {
        dataSources: [worksheetID],
        hideDataSources: true,
        forceTable: true,
        hideSearchBar: true,
        searchOptions: {
          searchTokenString: search,
          executeSearch: true,
        },
        visibleActions: []  // hide all actions.
      });
      embedTable.render();
    });
  }

  onMount(() => {
    mounted = true;
    onHostEvent();
  })

</script>

<div id="embedded-content">
  <div id="chart-embed">
    <p class="info">Embedded Chart</p>
  </div>
  <div id="table-embed">
    <p class="info">Embedded Table</p>
  </div>
</div>

<style>

    #embedded-content {
        height: 95vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
    }

    #chart-embed, #table-embed {
        height: 100%;
        width: 50%;
        background: darkgray;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid darkgray;
    }

</style>