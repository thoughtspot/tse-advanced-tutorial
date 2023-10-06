<script>
  import {onMount} from "svelte";

  import {EmbedEvent, HostEvent, SearchEmbed} from '$lib/tsembed.es.js';

  const worksheetID = "4d98d3f5-5c6a-44eb-82fb-d529ca20e31f";  // ID of the worksheet to use for chart/table.

  const onHostEvent = () => {
    const embed = new SearchEmbed("#chart-embed", {
      dataSources: [worksheetID],
      collapseDataSources: true,
      searchOptions: {
        searchTokenString: '[sales] [product type] top 30 [sales date].monthly',
        executeSearch: true,
      },
    });

    embed
      .on(EmbedEvent.Data, payload => showTable(embed, payload))
      .render();
  }

  const showTable = (embed, payload) => {

    embed.trigger(HostEvent.GetTML).then(response => {
      let search = response.answer.search_query;
      console.log("TML string: " + search);

      const embedTable = new SearchEmbed("#table-embed", {
        dataSources: [worksheetID],
        hideDataSources: true,
        forceTable: true,
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
    onHostEvent();
  })

</script>

<div id="chart-embed">
</div>
<div id="table-embed">
    <p class="info">Waiting for data.....</p>
</div>

<style>

  #chart-embed, #table-embed {
    height: 45vh;
    width: 100vw;
  }

</style>