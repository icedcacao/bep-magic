<script setup>
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import ButtonLinkIcon from "@/components/Button/ButtonLinkIcon.vue";
import SelectInput from "@/components/Form/SelectInput.vue";
import AdminCartTable from "@/components/Admin/Cart/AdminCartTable.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const carts = ref([]);
const filter = ref("pending");
// 0 for des 1 for asc
const sort = ref("0");
const page = ref(1);
const limit = ref(25);

// Can be improved using axios query
async function fetchCarts() {
  const response = await axios.get(
    `/api/cart?filter=${filter.value}&sort=${sort.value}&page=${page.value}&limit=${limit.value}`,
  );
  carts.value = response.data;
}

onMounted(async () => {
  if (!route.query.page) {
    page.value = 1;
  } else {
    page.value = parseInt(route.query.page);
  }
  await fetchCarts();
});

// sign is a string "next" and "prev"
async function handlePageChange(sign) {
  if (page.value <= 1 && sign == "prev") return;
  if (page.value > 1 && sign == "prev") {
    page.value -= 1;
  } else {
    page.value += 1;
  }
  router.push({ query: { page: page.value } });
  await fetchCarts();
}
</script>
<template>
  <div
    class="relative flex items-end justify-between space-x-2 overflow-x-auto overflow-y-hidden"
  >
    <h1 class="text-4xl font-semibold">CART</h1>
    <div class="flex items-end space-x-2">
      <SelectInput
        input-label="Filter"
        :options="['pending', 'paid', 'delivered']"
        v-model:input="filter"
      />
      <SelectInput
        input-label="Sort (0:asc, 1:des)"
        :options="['0', '1']"
        v-model:input="sort"
      />

      <ButtonLinkIcon
        icon-name="material-symbols:create-new-folder-outline"
        navigate-to="/admin/cart/post"
        dynamic-class="text-white bg-sky-600 hover:bg-sky-600/75"
      />

      <ButtonIcon
        icon-name="material-symbols:restart-alt-rounded"
        @action="fetchCarts"
        dynamic-class="hover:bg-black/10"
      />
    </div>
  </div>
  <AdminCartTable :carts="carts" />
  <div class="mt-4 flex items-center justify-center space-x-2">
    <ButtonIcon
      icon-name="material-symbols:chevron-left-rounded"
      @action="handlePageChange('prev')"
      dynamic-class="hover:bg-black/10"
    />

    <ButtonIcon
      icon-name="material-symbols:chevron-right-rounded"
      @action="handlePageChange('next')"
      dynamic-class="hover:bg-black/10"
    />
  </div>
</template>
