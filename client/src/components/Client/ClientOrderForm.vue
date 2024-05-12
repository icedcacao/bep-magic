<script setup>
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import SubmitButton from "../Button/SubmitButton.vue";
import TextInput from "../Form/TextInput.vue";
import TextAreaInput from "../Form/TextAreaInput.vue";
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";
const props = defineProps({ foods: [Object] });

const orders = ref([]);
const grandTotal = ref(0);
const phoneNumber = ref("");
const deliveryAddress = ref("");
const notes = ref("");

function resetForm() {
  orders.value = [];
  grandTotal.value = 0;
  phoneNumber.value = "";
  deliveryAddress.value = "";
  notes.value = "";
}

async function calculateGrandTotal() {
  let tempGrandTotal = 0;
  for (let i = 0; i < orders.value.length; i++) {
    tempGrandTotal += orders.value[i].food.price * orders.value[i].quantity;
  }
  grandTotal.value = tempGrandTotal;
}

async function addFoodToCartById(_id) {
  const foodToAdd = props.foods.find((obj) => obj._id === _id);
  if (foodToAdd) {
    for (let i = 0; i < orders.value.length; i++) {
      if (orders.value[i].food._id == foodToAdd._id) {
        orders.value[i].quantity += 1;
        calculateGrandTotal();
        return;
      }
    }
    orders.value.push({
      food: foodToAdd,
      quantity: 1,
    });
    calculateGrandTotal();
  }
}

async function removeFoodFromCartById(_id) {
  orders.value = orders.value.filter((obj) => obj.food._id !== _id);
  calculateGrandTotal();
}

async function addCart() {
  let body = {};
  if (orders.value.length > 0) {
    body.orders = [];
    for (let i = 0; i < orders.value.length; i++) {
      let food = {};
      food._id = orders.value[i].food._id;
      body.orders.push({
        food: food,
        quantity: orders.value[i].quantity,
      });
    }
  }
  if (phoneNumber.value.trim()) {
    body.phone_number = phoneNumber.value;
  }
  if (deliveryAddress.value.trim()) {
    body.delivery_address = deliveryAddress.value;
  }
  if (notes.value.trim()) {
    body.notes = notes.value;
  }
  try {
    const response = await axios.post("/api/cart", body);
    if (response.status == 201) {
      toast.success("Successfully added!");
      resetForm();
    }
  } catch (error) {
    toast.error("Error! Can not added!");
  }
}
</script>

<template>
  <div class="mt-4 grid grid-cols-12 gap-4">
    <div
      class="relative col-span-12 overflow-x-auto sm:rounded-lg md:col-span-7"
    >
      <table class="w-full text-left text-sm text-black">
        <thead class="bg-stone-300 text-xs uppercase">
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </thead>
        <tbody>
          <tr
            v-for="food in foods"
            :food="food"
            :key="food._id"
            class="border-b bg-white last:border-none hover:bg-black/5"
          >
            <td class="text-nowrap px-6 py-4">{{ food.name }}</td>
            <td class="px-6 py-4">
              {{
                food.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </td>
            <td class="px-6 py-4">
              <ButtonIcon
                @action="addFoodToCartById(food._id)"
                icon-name="material-symbols:add-circle-outline-rounded"
                dynamic-class="hover:bg-black/10"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="relative col-span-12 md:col-span-5">
      <form class="bg-white p-4 sm:rounded-lg" @submit.prevent="addCart">
        <h1 class="border-b-2 border-black pb-1 text-xl font-semibold">
          THANH TOÁN
        </h1>
        <div class="pt-1">
          <span
            class="flex cursor-pointer hover:line-through"
            v-for="order in orders"
            @click="removeFoodFromCartById(order.food._id)"
            :key="order.food._id"
          >
            <div class="text-nowrap">
              {{ order.food.name }} x {{ order.quantity }}
            </div>
            <span class="w-full overflow-hidden whitespace-nowrap">
              ..............................................................................................................................................</span
            >
            <div>
              {{
                (order.food.price * order.quantity).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </div>
          </span>
        </div>
        <div class="pt-1">
          <h2 class="text-xl font-semibold">
            Tổng tiền:
            <span v-if="grandTotal > 0" class="font-normal">{{
              grandTotal.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            }}</span>
          </h2>
        </div>
        <div class="grid gap-2 pt-2">
          <TextInput input-label="Phone Number" v-model:input="phoneNumber" />
          <TextInput
            input-label="Delivery Address"
            v-model:input="deliveryAddress"
          />
          <TextAreaInput
            input-label="Notes (Thời gian giao hàng)"
            v-model:input="notes"
            rows="4"
          />
          <div class="mt-2 flex justify-center">
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
