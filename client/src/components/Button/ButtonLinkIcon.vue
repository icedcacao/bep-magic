<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  iconName: String,
  dynamicClass: String,
  navigateTo: String,
});
</script>

<template>
  <RouterLink
    :to="navigateTo"
    :class="dynamicClass"
    class="rounded border-2 border-black p-1 text-center"
  >
    <Icon :icon="iconName" class="h-6 w-6" />
  </RouterLink>
</template>
