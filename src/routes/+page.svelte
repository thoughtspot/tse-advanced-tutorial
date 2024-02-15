<script>
import ts_logo from "$lib/images/ts.png";
import {store} from "$lib/store.js";
import {constants} from "$lib/constants.js";
import {Footer, FooterBrand, FooterCopyright, FooterLink, FooterLinkGroup} from "flowbite-svelte";
</script>

<div id="welcome">
    <h1>Welcome to ThoughtSpot Everywhere Advanced Training</h1>
    <p>This application is designed to let you learn to more tightly integrate ThoughtSpot into your application.
        It contains the following learning topics:</p>

    <ul class="instructions">
        <li>Authenticating using trusted authentication.</li>
        <li>Using REST APIs to get system information.</li>
        <li>Handling system events and sending host events.</li>
        <li>Responding to custom actions to extend the capabilities of ThoughtSpot.</li>
        <!--
        <li>Call the SearchData API and rending in your application.</li>
        -->
        <li>Use a custom CSS in the embedded ThoughtSpot.</li>
    </ul>

    <p>The application has the following pages:</p>

    <ul class="instructions">
        <li>Home page - shows the overview of the application.</li>
        <li>Host Event - contains two embedded search components with one responding to actions in the other.</li>
        <li>Custom Action - shows an embedded liveboard with a custom action.</li>
        <!--
        <li>Data API - shows a table based data from the SearchData API call.</li>
        -->
    </ul>
</div>

<Footer footerType="logo" class="relative bottom-10 min-w-full">
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
    <div class="sm:flex sm:items-right sm:justify-between">
        <FooterBrand href="https://thoughtspot.com" src={ts_logo} alt="ThoughtSpot Logo"
                     name="ThoughtSpot" target="_blank"/>
        <div class="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-1">
            <div>
                <FooterLinkGroup>
                    <span>Logged in as {$store.tsUser}</span>
                    <span>&nbsp;</span>  <!-- spacer - this seems hacky -->
                    <!-- Training Note: The version will automatically update after REST API calls -->
                    <FooterLink classA="hover:underline hover:text-orange-600" href="{constants.tsURL}" target="_blank">
                        ThoughtSpot Host
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

<style>
  #welcome {
    padding: 10px 50px;
    font-size: 1.2em;
    overflow: scroll;
    height: 75vh;
  }

  h1 {
    text-align: center;
  }
</style>