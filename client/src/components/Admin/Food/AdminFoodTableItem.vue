<script setup>
import ButtonLinkIcon from "@/components/Button/ButtonLinkIcon.vue";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import axios from "axios";
import { toast } from "vue-sonner";
const props = defineProps({ food: Object });

async function deleteFood() {
  const response = await axios.delete(`/api/food/id/${props.food._id}`);
  if (response.status == 200) {
    toast.success("Successfully deleted!");
  } else {
    toast.error("Error! Can not deleted!");
  }
}
</script>

<template>
  <tr class="border-b bg-white last:border-none hover:bg-black/5">
    <td class="px-6 py-4">{{ food.name }}</td>
    <td class="px-6 py-4">
      {{
        food.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      }}
    </td>
    <td class="px-6 py-4">{{ food.category }}</td>
    <td class="flex space-x-2 px-6 py-4">
      <ButtonLinkIcon
        icon-name="material-symbols:edit-square-outline"
        dynamic-class="text-white bg-amber-600 hover:bg-amber-600/75"
        :navigate-to="'/admin/food/put/' + food._id"
      />
      <ButtonIcon
        icon-name="material-symbols:delete-outline-rounded"
        dynamic-class="text-white bg-red-600 hover:bg-red-600/75"
        @action="deleteFood"
      />
    </td>
  </tr>
</template>
