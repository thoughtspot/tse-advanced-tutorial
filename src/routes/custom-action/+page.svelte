<script>
  import {onMount} from "svelte";
  import Modal from '$lib/components/Modal.svelte';

  import {EmbedEvent, LiveboardEmbed, RuntimeFilterOp,} from '$lib/tsembed.es.js';
  import {LiveboardContextActionData} from "$lib/dataclasses.js";

  const onCustomAction = () => {

    // TODO replace the following with an embed that responds to a custom action.
    // document.getElementById("embed").innerHTML = "<p class='warning'>Custom action not yet embedded.</p>";

    const embed = new LiveboardEmbed("#embed", {
      liveboardId: "e40c0727-01e6-49db-bb2f-5aa19661477b",
      vizId: "8d2e93ad-cae8-4c8e-a364-e7966a69a41e",
      visibleActions: ['show-details'],
    });

    embed
      .on(EmbedEvent.CustomAction, payload => {
        if (payload.id === 'show-details' || payload.data.id === 'show-details') {
          showDetails(payload);
        }
      })
      .render();
  }



  // Show a pop-up with the product sales for the state selected.
  const showDetails = (payload) => {
    const pinboardContextData = LiveboardContextActionData.createFromJSON(payload);

    // Only gets the first column value.
    const filter = pinboardContextData.data[pinboardContextData.columnNames[0]];

    // Now show the details with the filter applied in a popup.
    const popupEmbed = new LiveboardEmbed("#show-details", {
      liveboardId: "e40c0727-01e6-49db-bb2f-5aa19661477b",
      vizId: "96db6db8-662a-45b5-bc70-00341d75846b",
      runtimeFilters: [{
        columnName: 'state',
        operator: RuntimeFilterOp.EQ,
        values: [filter]
      }],
    });

    popupEmbed.render();

    // display the model box.  Must be called before trying to embed to create the div.
    showModal = 'visible';
  }

  /** Whether to show the modal. */
  let showModal = 'hidden';

  onMount(() => {
    onCustomAction();
  })

</script>

<Modal id="show-details-modal" showCancel={true} visibility={showModal}>
    <div id="show-details"></div>
</Modal>

<div id="embed">
    <p>Add a custom action</p>
</div>

<style>
  #embed {
    height: 80vh;
  }

  #show-details {
    height: 60vh;
  }
</style>