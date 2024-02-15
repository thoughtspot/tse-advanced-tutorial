import { writable } from 'svelte/store';
import { cssFiles } from './constants.js';

export const store = writable({
  tsUser: 'userXXX',  // Set to the user to use.
  cssFile: cssFiles.default // cssFile being used.
});