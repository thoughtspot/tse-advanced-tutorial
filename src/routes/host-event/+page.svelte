<script>
  import {onMount} from "svelte";

  import {EmbedEvent, HostEvent, SearchEmbed} from '$lib/tsembed.es.js';

  const worksheetID = "cd252e5c-b552-49a8-821d-3eadaa049cca";  // ID of the worksheet to use for chart/table.

  const onHostEvent = () => {
    const embed = new SearchEmbed("#chart-embed", {
      dataSources: [worksheetID],
      collapseDataSources: true,
      searchOptions: {
        searchTokenString: '[sales] [item type] top 30 [date].monthly',
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
      });
      embedTable.render();
    });
  }


  onMount(() => {
    onHostEvent();
  })

  let horizontal = false;
</script>

<div id="chart-embed">
</div>
<div id="table-embed">
    <p class="info">Waiting for data.....</p>
</div>

<style>

  #chart-embed, #table-embed {
    height: 40vh;
    width: 100%;
  }

</style>