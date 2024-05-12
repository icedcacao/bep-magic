<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({ iconName: String, dynamicClass: String });
const emit = defineEmits(["action"]);
</script>

<template>
  <button
    type="button"
    @click="$emit('action')"
    :class="dynamicClass"
    class="rounded border-2 border-black p-1 text-center"
  >
    <Icon :icon="iconName" class="h-6 w-6" />
  </button>
</template>
