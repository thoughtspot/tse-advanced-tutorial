<script>
    import {store} from "$lib/store.js";
    import {onMount} from "svelte";
    import Modal from '$lib/components/Modal.svelte';

    import {EmbedEvent, LiveboardEmbed, RuntimeFilterOp,} from '$lib/tsembed.es.js';
    import {LiveboardContextActionData} from "$lib/dataclasses.js";

    let mounted=false;
    $: $store.cssFile, onCustomAction();  // only do this if the page is mounted.

    const onCustomAction = () => {
        if (! mounted) return;  // only display if the page has mounted.

        // -------------------------------------------------------------------------------
        // Exercise 4.1: Embed a liveboard with a state and handle the custom action event.
        // 1. Create a liveboard embed object using the playground.
        // 2. Add a custom action event handler to the embed object when rendering that
        // calls showDetails.
        // -------------------------------------------------------------------------------
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

        // -------------------------------------------------------------------------------
        // Exercise 4.2: Show a modal box with the details of the state selected.
        // 1. Create a LiveboardContextActionData object from the payload.
        // 2. Get the filter value from the data.
        // 3. Create a new LiveboardEmbed object with runtime filters using the state.
        // Note the embed-id for the modal box is "show-details".
        // -------------------------------------------------------------------------------

        const pinboardContextData = LiveboardContextActionData.createFromJSON(payload);

        // Only gets the first column value.
        const filter = pinboardContextData.data[pinboardContextData.columnNames[0]];

        // Now show the details with the filter applied in a popup.
        const popupEmbed = new LiveboardEmbed("#show-details", {
            liveboardId: "879252b1-510c-4fed-a4ae-ad8d14e40d90",
            vizId: "4a002bae-8e3c-4bcd-8bbf-1e74cea4e41e",
            runtimeFilters: [{
                columnName: 'state',
                operator: RuntimeFilterOp.EQ,
                values: [filter]
            }],
        });

        popupEmbed.render();

        // display the model box.
        showModal = 'visible';
    }

    /** Whether to show the modal. */
    let showModal = 'hidden';

    onMount(() => {
        mounted = true;
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