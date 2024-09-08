import { writable } from 'svelte/store';

export const selectedChat = writable({});
export const allChats = writable([]);