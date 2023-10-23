<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
  import {onMount} from "svelte";
  import {store} from "$lib/store.js";
  import {SearchData} from "$lib/dataclasses.js";

  let searchData = null;
  let searchDataTable = null;
  const tmlquery = "[sales] [product type] [product]";
  const worksheetId = "4d98d3f5-5c6a-44eb-82fb-d529ca20e31f";

  const doSearch = async () => {
    if (!$store.tsAPI) {
      console.log('waiting for API to load');
      setTimeout(doSearch, 1000);
      return;
    }

    const searchResults = await $store.tsAPI.searchData(tmlquery, worksheetId);
    console.log(searchResults);
    searchData = SearchData.createFromJSON(searchResults);
    searchDataTable = searchData.getDataAsTable();
    console.log(searchData);
  }

  onMount(() => {
    doSearch();
  });

</script>

<h1>Search Data</h1>
{#if searchData}
<Table striped={true} class="overflow-x-auto overflow-y-auto h-80h" divClass="relative overflow-x-auto overflow-y-auto h-80h">
    <caption>
        Search string: <span class="mono">{tmlquery}</span>
    </caption>
    <TableHead>
        {#each searchData.columnNames as cn}
            <TableHeadCell>{cn}</TableHeadCell>
        {/each}
    </TableHead>
    <TableBody class="divide-y">
        {#each { length: searchData.nbrRows } as _, i}
            <TableBodyRow>
                {#each { length: searchData.columnNames.length} as _, j}
                    <TableBodyCell>{searchDataTable[i][j]}</TableBodyCell>
                {/each}
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
{/if}
