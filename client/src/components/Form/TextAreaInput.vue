<script setup>
const props = defineProps({ inputLabel: String, rows: String });
const input = defineModel("input");
</script>

<template>
  <div>
    <label class="mb-1 block text-sm font-medium text-black">
      {{ inputLabel }}
    </label>
    <textarea
      :rows="rows"
      v-model="input"
      class="block w-full rounded-lg border border-stone-500 bg-stone-100 p-2.5 text-black sm:text-lg"
    ></textarea>
  </div>
</template>
