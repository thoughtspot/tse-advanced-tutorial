<script>
    import {store} from "$lib/store.js";
    import {onMount} from "svelte";
    import Modal from '$lib/components/Modal.svelte';

    import {EmbedEvent, LiveboardEmbed, RuntimeFilterOp,} from '$lib/tsembed.es.js';
    import {LiveboardContextActionData} from "$lib/dataclasses.js";

    $: $store.cssFile, onCustomAction();

    const onCustomAction = () => {

        // -------------------------------------------------------------------------------
        // Exercise 4.1: Embed a liveboard with a state and handle the custom action event.
        // -------------------------------------------------------------------------------

    }

    // Show a pop-up with the product sales for the state selected.
    const showDetails = (payload) => {

        // -------------------------------------------------------------------------------
        // Exercise 4.2: Show a modal box with the details of the state selected.
        // 1. Create a LiveboardContextActionData object from the payload.
        // 2. Get the filter value from the data.
        // 3. Create a new LiveboardEmbed object with runtime filters using the state.
        // Note the embed-id for the modal box is "show-details".
        // -------------------------------------------------------------------------------

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
        height: 90vh;
    }

    #show-details {
        height: 60vh;
    }
</style>