<script setup>
import axios from "axios";
import AdminCartEditForm from "@/components/Admin/Cart/AdminCartEditForm.vue";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const foods = ref([]);

async function fetchFoods() {
  const response = await axios.get(`/api/food`);
  foods.value = response.data;
}

onMounted(async () => await fetchFoods());
</script>

<template>
  <div
    class="relative flex items-end justify-between space-x-2 overflow-x-auto overflow-y-hidden"
  >
    <div class="space-y-2">
      <ButtonIcon
        @action="router.back()"
        icon-name="material-symbols:arrow-back-rounded"
        dynamic-class="hover:bg-black/10"
      />
      <h1 class="text-4xl font-semibold">EDIT CART</h1>
    </div>
  </div>
  <AdminCartEditForm :foods="foods" />
</template>
