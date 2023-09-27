import { writable } from 'svelte/store';

export const store = writable({
  tsUser: 'user251',  // Set to the user to use.  Ideally this would be prompted for.
  version: "unknown",  // TODO add the API call to get.
  token: null,  // Set when authenticating.
  tsAPI: null,  // Set up after authenticating.
});