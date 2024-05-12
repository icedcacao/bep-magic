<script setup>
import AdminFoodEditForm from "@/components/Admin/Food/AdminFoodEditForm.vue";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();
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
      <h1 class="text-4xl font-semibold">EDIT FOOD</h1>
    </div>
  </div>
  <AdminFoodEditForm />
</template>
