<script>
  import {onMount} from "svelte";
  import Modal from '$lib/components/Modal.svelte';

  import {EmbedEvent, LiveboardEmbed, RuntimeFilterOp,} from '$lib/tsembed.es.js';
  import {LiveboardContextActionData} from "$lib/dataclasses.js";

  const onCustomAction = () => {

    // TODO replace the following with an embed that responds to a custom action.
    // document.getElementById("embed").innerHTML = "<p class='warning'>Custom action not yet embedded.</p>";

    const embed = new LiveboardEmbed("#embed", {
      liveboardId: "879252b1-510c-4fed-a4ae-ad8d14e40d90",
      vizId: "c17072a9-8f4b-4016-9dcf-920c5ec65eda",
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
    // TODO: create a LiveboardCustomerActionData object.
    const liveboardContextData = null;

    // TODO: set the filter value from the liveboardContextData
    // Only gets the first column value.
    const filter = null;

    // TODO use the playground to create a LiveboardEmbed, put it into #show-details and render it with runtime filters.
    // Now show the details with the filter applied in a popup.

    // display the model box.
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
    <p>Loading visualization with custom action.....</p>
</div>

<style>
  #embed {
    height: 80vh;
  }

  #show-details {
    height: 60vh;
  }
</style>