<template>
  <div
    class="grid grid-cols-12 gap-4 rounded border border-black bg-white-cream px-4 py-2 text-lg font-bold"
  >
    <div class="col-span-2"></div>
    <div class="col-span-2">
      {{ food.name }}
    </div>
    <div class="col-span-1 text-center">
      {{
        food.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      }}
    </div>
    <div class="col-span-1 text-center">
      {{ food.category }}
    </div>
    <div class="col-span-2">
      {{ food.description || "N/A" }}
    </div>
    <div class="col-span-2">
      <ul>
        <li v-for="(value, key) in food.nutritional_value">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  food: DFood;
}>();
</script>
