<script>
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
  } from 'flowbite-svelte';
  import '../app.postcss';
  import '../app.css';
  import {currentUser, developerDocs, tsURL, version} from "$lib/store.js";
  import {page} from '$app/stores';
  import {AuthType, init} from '$lib/tsembed.es.js';

  $: activeUrl = $page.url.pathname;

  init({
    thoughtSpotHost: tsURL,
    authType: AuthType.None,
  });

</script>

<Navbar navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b" let:hidden let:toggle>
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">TSE Advanced</span>
    </NavBrand>
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
                    <span>Logged in as {currentUser}</span>
                    <span>&nbsp;</span>  <!-- spacer - this seems hacky -->
                    <FooterLink classA="hover:underline hover:text-orange-600" href="{tsURL}" target="_blank">ThoughtSpot Host (v {version})</FooterLink>
                    <FooterLink classA="hover:underline hover:text-orange-600" href="{developerDocs}" target="_blank">Developer Docs</FooterLink>
                </FooterLinkGroup>
            </div>
        </div>
    </div>
    <FooterCopyright href="/" by="ThoughtSpot"/>
</Footer>

