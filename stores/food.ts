// Need to add interface to type check.
export const useFoodStore = defineStore("foodStore", {
  state: () => ({
    list: [] as DFood[],
  }),
  actions: {
    async fetch() {
      const foods = await $fetch("/api/food/admin", {
        headers: useRequestHeaders(["cookie"]),
      });
      this.list = foods as DFood[];
    },
  },
});
