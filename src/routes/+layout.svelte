<script>
  import {onMount} from 'svelte';
  import {invalidateAll} from "$app/navigation";
  import ts_logo from '$lib/images/ts.png';
  import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterLink,
    FooterLinkGroup,
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
  let cssFile = cssFiles[cssMode];

  const tsInitialize = async () => {
    // Initialize the ThoughtSpot Embed SDK using trusted auth.
    const ee = init({
      thoughtSpotHost: constants.tsURL,
      // authType: AuthType.None,
      authType: AuthType.TrustedAuthToken,
      username: $store.tsUser,
      getAuthToken: getAuthToken,
      customizations: {
        style: {
          customCSSUrl: cssFile,
        }
      }
      }
    );

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

    await setupAPI();  // make sure the API is set up.
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

      $store.tsAPI.system().then((response) => {
        console.log(response);
        try {
          $store.version = response.release_version;
        } catch (e) {
          console.log('error getting version: ' + e);
        }
      });
    }

    const toggleCSS = () => {
      if (cssMode === 'default') {
        cssMode = 'dark';
      } else {
        cssMode = 'default';
      }
      console.log('cssMode is now ' + cssMode);
      cssFile = cssFiles[cssMode];
      tsInitialize();
      invalidateAll();
    }

    onMount(() => {
      tsInitialize();
    });
</script>

<Navbar navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b" let:hidden let:toggle>
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
        <NavLi href="/custom-action">Custom Action</NavLi>
        <NavLi href="/host-event">Host Event</NavLi>
        <NavLi href="/get-data">Data API</NavLi>
    </NavUl>
</Navbar>

<div class="relative flex flex-col h-100 top-20">
    <slot/>
</div>

<Footer footerType="logo" class="absolute bottom-0 min-w-full">
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
    <div class="sm:flex sm:items-right sm:justify-between">
        <FooterBrand href="https://thoughtspot.com" src={ts_logo} alt="ThoughtSpot Logo"
                     name="ThoughtSpot" target="_blank"/>
        <div class="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-1">
            <div>
                <FooterLinkGroup>
                    <span>Logged in as {$store.tsUser}</span>
                    <span>&nbsp;</span>  <!-- spacer - this seems hacky -->
                    <FooterLink classA="hover:underline hover:text-orange-600" href="{constants.tsURL}" target="_blank">
                        ThoughtSpot Host (v {$store.version})
                    </FooterLink>
                    <FooterLink classA="hover:underline hover:text-orange-600" href="{constants.developerDocs}"
                                target="_blank">
                        Developer Docs
                    </FooterLink>
                </FooterLinkGroup>
            </div>
        </div>
    </div>
    <FooterCopyright href="/" by="ThoughtSpot"/>
</Footer>

