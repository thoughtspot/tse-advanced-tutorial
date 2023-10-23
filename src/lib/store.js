import { writable } from 'svelte/store';
import { cssFiles } from './constants.js';

export const store = writable({
  tsUser: 'user',           // Exercise 1:  Set to the user to use.
  token: null,              // Exercise 1: Set when authenticating.
  tsAPI: null,              // Exercise 2: Set up after authenticating.
  version: "unknown",       // Exercise 2: Set by API call.
  cssFile: cssFiles.default // Exercise 5: cssFile being used.
});