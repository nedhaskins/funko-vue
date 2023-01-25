// Goals for this store:
// list of items in cart
// add, remove, add additional copies of, items

import { defineStore } from 'pinia';

export const useShoppingCartStore = defineStore('shoppingCart', {
	state: () => {
		if (localStorage.getItem('shoppingCartData')) return JSON.parse(localStorage.getItem('shoppingCartData'));
		return {
			list: [],
		};
	},

	actions: {
		add(item) {
			this.list.push(item);
		},
	},

	getters: {
		//anything that returns a value -- not modifies
		getCount() {
			return this.list.length;
		},
	},
});