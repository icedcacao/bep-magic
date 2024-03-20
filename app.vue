<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "bg-yellow font-arimo",
  },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/icons/favicon.svg" }],
});
</script>
