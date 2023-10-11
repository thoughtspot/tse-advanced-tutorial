<script>
    import {onMount} from 'svelte';
    import {invalidateAll} from "$app/navigation";
    import ts_logo from '$lib/images/ts.png';
    import {
        Navbar,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl,
        Toggle,
    } from 'flowbite-svelte';
    import '../app.postcss';
    import '../app.css';
    import {constants, cssFiles} from "$lib/constants.js";
    import {store} from "$lib/store.js";
    import {page} from '$app/stores';
    import {AuthStatus, AuthType, init} from '$lib/tsembed.es.js';
    import {TSAPIv2} from '$lib/rest-api-v2.0.js';

    $: activeUrl = $page.url.pathname;

    let cssMode = 'default';  // current options are 'default' and 'dark'. See cssFiles in constants.js

    const tsInitialize = async () => {

            // -------------------------------------------------------------------------------
            // Exercise 1: Update the section below to use trusted authentication.  You will need to:
            // 1. Set the authType to TrustedAuthToken
            // 2. Set the username to the value of $store.tsUser
            // 3. Set the getAuthToken to the getAuthToken function
            // 4. Uncomment the line to set up the API.
            // -------------------------------------------------------------------------------

            // -------------------------------------------------------------------------------
            // Exercise 5: Add the customCSSUrl to the customizations section of the init
            // function to be the value of the $store.cssFile variable.  See toggleCSS below.
            // -------------------------------------------------------------------------------

            const ee = null; // init()

            if (ee) {
                // This section shows how to capture the return values from init().
                ee
                    .on(AuthStatus.SUCCESS, () => {
                        console.log("Success");
                    })
                    .on(AuthStatus.SDK_SUCCESS, () => {
                        console.log("SDK Success");
                    })
                    .on(AuthStatus.FAILURE, (reason) => {
                        console.log("Failure:  " + reason);
                    })
            }

            // Uncomment to set up the API after calling init.
            // await setupAPI();  // make sure the API is set up.
        }
    ;

    const getAuthToken = async () => {
        const endpoint = `${constants.tokenServer}/token?username=${$store.tsUser}`;
        console.log('token endpoint: ' + endpoint);

        const response = await fetch(endpoint);

        $store.token = await response.json();
        console.log('token == ' + $store.token);

        // Set up the v2 API
        return $store.token;
    };

    const setupAPI = async () => {
        console.log('setting up the API');
        /*  This works if the auth token was called.  But if it isn't, then the auth token doesn't exist.
        $store.tsAPI = new TSAPIv2(constants.tsURL, $store.token);
         */
        // If a token exists from auth, then use that.  If not, then get a new one.
        // Might be able to just not use the store token.
        let token = $store.token;
        if (!token) {
            token = await getAuthToken();
        }

        console.log('should have a token by now: ' + token);
        $store.tsAPI = new TSAPIv2(constants.tsURL, token);
        setVersion();
    }

    const setVersion = () => {
        console.log(`setting the version with tsURL of ${constants.tsURL} and token of ${$store.token}`);
        console.log(`tsAPI is ${$store.tsAPI}`)

        // The tsAPI needs to have been set up.
        if (!$store.tsAPI) {
            console.log('Trying to set the version before the API is set up.');
            return;
        }

        // -------------------------------------------------------------------------------
        // Exercise 2: Add a call to the system API to get the version of ThoughtSpot and then set the $store.version
        // The system API call is in /lib/rest-api-v2.0.js, q.v.
        // You will see the results in the footer (located in the +page.svelte file) once completed.
        //
        // The format for the call will be $store.tsAPI.system().then((response) => {.....
        // This can only be done after the API object is created.
        // -------------------------------------------------------------------------------

    }

    const toggleCSS = () => {
        if (cssMode === 'default') {
            cssMode = 'dark';
        } else {
            cssMode = 'default';
        }
        console.log('cssMode is now ' + cssMode);
        $store.cssFile = cssFiles[cssMode];
        tsInitialize();
    }

    onMount(() => {
        tsInitialize();
    });
</script>

<Navbar navClass="px-2 sm:px-4 py-0.5 absolute w-full z-20 top-0 left-0 border-b" let:hidden let:toggle>
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TSE Advanced</span>
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
        <!--
        <NavLi href="/get-data">Data API</NavLi>
        -->
    </NavUl>
</Navbar>

<div class="relative flex flex-col h-85:w">
    <slot/>
</div>