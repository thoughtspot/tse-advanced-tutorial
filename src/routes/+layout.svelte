<script>
  import {onMount} from "svelte";
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    Toggle,
  } from "flowbite-svelte";
  import "../app.postcss";
  import "../app.css";
  import {constants, cssFiles} from "$lib/constants.js";
  import {store} from "$lib/store.js";
  import {page} from "$app/stores";
  import {AuthStatus, AuthType, init} from "$lib/tsembed.es.js";
  import {getAuthToken} from "$lib/util.js";

  $: activeUrl = $page.url.pathname;

  let cssMode = "default"; // current options are 'default' and 'dark'. See cssFiles in constants.js
  const toggleCSS = () => {
    cssMode = cssMode == "default" ? "dark" : "default";

    console.log("cssMode is now " + cssMode);
    $store.cssFile = cssFiles[cssMode];
    console.log('css file', $store.cssFile);
    tsInitialize(); // call to re-initialize with the new style.
  };

  const tsInitialize = async () => {
    // -------------------------------------------------------------------------------
    // Exercise 5: Add the customCSSUrl to the customizations section of the init
    // function to be the value of the $store.cssFile variable.  See toggleCSS below.
    // Note that the table text color is not currently available in the variables, so
    // it must be set using an UNSTABLE rule.
    // -------------------------------------------------------------------------------

    /// The following is needed to show the text in a table.  There are currently no variables for table text.
    let customCss;
    if (cssMode === "default") {
      customCss = "";
    } else {
      customCss = {
        rules_UNSTABLE: {
          ".bk-outline .ag-theme-alpine .ag-row": {
            color: "white",
          },
        },
      };
    }

    // -------------------------------------------------------------------------------
    // Exercise 1: Update the section below to use trusted authentication.  You will need to:
    // 1. Copy the init from the playground.
    // 2. Set the authType to TrustedAuthToken
    // 3. Set the username to the value of $store.tsUser  (update the value in the store.js file)
    // 4. Set the getAuthToken to use the getAuthToken function
    // -------------------------------------------------------------------------------

    const ee = init({
      thoughtSpotHost: constants.tsURL,
      // authType: AuthType.None,
      authType: AuthType.TrustedAuthToken,
      username: $store.tsUser,
      getAuthToken: () => {
        return getAuthToken($store.tsUser);
      },
      customizations: {
        style: {
          customCSSUrl: $store.cssFile,
          customCSS: customCss,
        },
      },
    });

    if (ee) {
      ee.on(AuthStatus.SUCCESS, () => {
        console.log("Success");
      })
        .on(AuthStatus.SDK_SUCCESS, () => {
          console.log("SDK Success");
        })
        .on(AuthStatus.FAILURE, (reason) => {
          console.log("Failure:  " + reason);
        });
    }

  };

  onMount(() => {
    tsInitialize();
  });
</script>

<Navbar
        navClass="px-2 sm:px-4 py-0.5 absolute w-full z-20 top-0 left-0 border-b"
        let:hidden
        let:toggle
>
  <NavBrand href="/">
    <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    >TSE Advanced</span
    >
  </NavBrand>
  <Toggle on:change={toggleCSS}>
    Dark Mode
    <span slot="on">Dark</span>
    <span slot="off">Light</span>
  </Toggle>
  <NavHamburger on:click={toggle}/>
  <NavUl {hidden} {activeUrl}>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/host-event">Host Event</NavLi>
    <NavLi href="/custom-action">Custom Action</NavLi>
    <NavLi href="/get-data">Data API</NavLi>
  </NavUl>
</Navbar>

<div class="relative flex flex-col h-85:w">
  <slot/>
</div>
