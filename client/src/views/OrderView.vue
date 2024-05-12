<script setup>
import ClientOrderForm from "@/components/Client/ClientOrderForm.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const foods = ref([]);

const category = ref("");

async function fetchFoods() {
  const response = await axios.get(`/api/food?category=${category.value}`);
  foods.value = response.data;
}

onMounted(async () => {
  if (!route.query.category) {
    category.value = "";
  } else {
    category.value = route.query.category;
  }
  await fetchFoods();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-semibold">ORDER</h1>
    <ClientOrderForm :foods="foods" />
  </div>
</template>
