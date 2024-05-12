<script setup>
const props = defineProps({ inputLabel: String, options: Array });
const input = defineModel("input");
</script>

<template>
  <div>
    <label class="mb-1 block text-sm font-medium text-black">
      {{ inputLabel }}
    </label>
    <select
      v-model="input"
      class="block w-full rounded-lg border border-stone-500 bg-stone-100 p-2.5 text-black sm:text-lg"
    >
      <option
        v-for="option in options"
        :value="{
          _id: option._id,
          name: option.name,
          price: option.price,
        }"
        :key="option._id"
      >
        {{ option.name }} -
        {{
          option.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        }}
      </option>
    </select>
  </div>
</template>
