<script>
  export let closing; // Expects a handler to a function that takes no parameters.
  export let visibility = 'hidden';  // users of the modal would set this to hidden or visible.
  export let showCancel = true;

  function close() {
    if (closing) {
      closing();
    }
    visibility = 'hidden';
  }
</script>

<div id='top-modal' class={visibility}>
    <div id='modal' role='alertdialog' on:click|stopPropagation={()=>{}}>
        {#if showCancel}
            <svg id="close" on:click={()=>close()} viewBox="0 0 12 12">
                <circle cx=6 cy=6 r=6/>
                <line x1=3 y1=3 x2=9 y2=9/>
                <line x1=9 y1=3 x2=3 y2=9/>
            </svg>
        {/if}
    <div id='modal-content'>
            <slot/>
        </div>
    </div>
</div>

<style>
  #top-modal {
    visibility: hidden;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #4448;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #modal {
    position: relative;
    border-radius: 6px;
    background: white;
    border: 2px solid #000;
    filter: drop-shadow(5px 5px 5px #555);
    padding: 1em;
    width: 60vw;
  }

  .visible {
    visibility: visible !important;
  }

  #modal-content {
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
    overflow: auto;
  }

  #close {
    position: absolute;
    top: -12px;
    right: -12px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    fill: #F44;
    transition: transform 0.3s;
  }

  #close:hover {
    transform: scale(2);
  }

  #close line {
    stroke: #FFF;
    stroke-width: 2;
  }
</style>