import { writable } from 'svelte/store';
import { cssFiles } from './constants.js';

export const store = writable({
  tsUser: 'user300',  // Set to the user to use.
  version: "unknown",  // Set by API call.
  token: null,  // Set when authenticating.
  tsAPI: null,  // Set up after authenticating.
  cssFile: cssFiles.default // cssFile being used.
});