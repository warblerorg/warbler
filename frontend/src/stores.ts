import { writable } from 'svelte/store';
import { Author } from './communication/schemas';

/**
 * The currently logged in user. `undefined` if logged out.
 */
export const user = writable<Author | undefined>(undefined);
