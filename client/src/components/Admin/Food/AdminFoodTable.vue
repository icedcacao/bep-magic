<script setup>
import AdminFoodTableItem from "./AdminFoodTableItem.vue";

const props = defineProps({ foods: [Object] });
</script>

<template>
  <div class="relative mt-4 overflow-x-auto sm:rounded-lg">
    <table class="w-full text-left text-sm text-black">
      <thead class="bg-stone-300 text-xs uppercase">
        <th scope="col" class="px-6 py-3">Name</th>
        <th scope="col" class="px-6 py-3">Price</th>
        <th scope="col" class="px-6 py-3">Category</th>
        <th scope="col" class="px-6 py-3">Action</th>
      </thead>
      <tbody>
        <AdminFoodTableItem
          v-for="food in foods"
          :food="food"
          :key="food._id"
        />
      </tbody>
    </table>
  </div>
</template>
