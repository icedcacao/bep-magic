<script setup>
import ButtonLinkIcon from "@/components/Button/ButtonLinkIcon.vue";
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import axios from "axios";
import { toast } from "vue-sonner";

const props = defineProps({ cart: Object });

async function deleteCart() {
  const response = await axios.delete(`/api/cart/id/${props.cart._id}`);
  if (response.status == 200) {
    toast.success("Successfully deleted!");
  } else {
    toast.error("Error! Can not deleted!");
  }
}
</script>

<template>
  <tr class="border-b bg-white last:border-none hover:bg-black/5">
    <td class="px-6 py-4">
      <ul>
        <li v-for="order in cart.orders" :key="order.food._id">
          {{ order.food.name }}
        </li>
      </ul>
    </td>
    <td class="px-6 py-4">
      <ul>
        <li v-for="order in cart.orders" :key="order.food._id">
          {{
            order.food.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          }}
        </li>
      </ul>
    </td>
    <td class="px-6 py-4">
      <ul>
        <li v-for="order in cart.orders" :key="order.food._id">
          {{ order.quantity }}
        </li>
      </ul>
    </td>
    <td class="px-6 py-4">
      <ul>
        <li v-for="order in cart.orders" :key="order.food._id">
          {{
            (order.food.price * order.quantity).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          }}
        </li>
      </ul>
    </td>
    <td class="px-6 py-4">
      {{
        cart.grand_total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      }}
    </td>
    <td class="px-6 py-4">
      {{ cart.phone_number }}
    </td>
    <td class="px-6 py-4">
      {{ cart.delivery_address }}
    </td>
    <td class="px-6 py-4">
      {{ cart.status }}
    </td>
    <td class="px-6 py-4">
      {{ cart.notes }}
    </td>
    <td class="flex space-x-2 px-6 py-4">
      <ButtonLinkIcon
        icon-name="material-symbols:edit-square-outline"
        dynamic-class="text-white bg-amber-600 hover:bg-amber-600/75"
        :navigate-to="'/admin/cart/put/' + cart._id"
      />
      <ButtonIcon
        icon-name="material-symbols:delete-outline-rounded"
        dynamic-class="text-white bg-red-600 hover:bg-red-600/75"
        @action="deleteCart"
      />
    </td>
  </tr>
</template>
