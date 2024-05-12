<script setup>
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import ButtonLinkIcon from "@/components/Button/ButtonLinkIcon.vue";
import SelectInput from "@/components/Form/SelectInput.vue";
import AdminFoodTable from "@/components/Admin/Food/AdminFoodTable.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

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
  <div
    class="relative flex items-end justify-between space-x-2 overflow-x-auto overflow-y-hidden"
  >
    <h1 class="text-4xl font-semibold">MENU</h1>
    <div class="flex items-end space-x-2">
      <SelectInput
        input-label="Category"
        :options="['', 'normal', 'smartchef']"
        v-model:input="category"
      />
      <ButtonLinkIcon
        icon-name="material-symbols:create-new-folder-outline"
        navigate-to="/admin/food/post"
        dynamic-class="text-white bg-sky-600 hover:bg-sky-600/75"
      />
      <ButtonIcon
        icon-name="material-symbols:restart-alt-rounded"
        @action="fetchFoods"
        dynamic-class="hover:bg-black/10"
      />
    </div>
  </div>
  <AdminFoodTable :foods="foods" />
</template>
