// Need to add interface to type check.
export const useCartStore = defineStore("cartStore", {
  state: () => ({
    list: [] as DCart[],
  }),
  actions: {
    async fetch() {
      const carts = await $fetch("/api/cart", {
        headers: useRequestHeaders(["cookie"]),
      });
      this.list = carts as DCart[];
    },
  },
});
