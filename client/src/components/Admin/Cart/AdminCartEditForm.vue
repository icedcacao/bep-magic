<script setup>
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import SubmitButton from "@/components/Button/SubmitButton.vue";
import NumberInput from "@/components/Form/NumberInput.vue";
import OrderSelectInput from "@/components/Form/OrderSelectInput.vue";
import SelectInput from "@/components/Form/SelectInput.vue";
import TextAreaInput from "@/components/Form/TextAreaInput.vue";
import TextInput from "@/components/Form/TextInput.vue";
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({ foods: [Object] });

const orderItem = ref({});
// Default: 1
const orderItemQuantity = ref(1);
const orders = ref([]);
const grandTotal = ref(0);
const phoneNumber = ref("");
const deliveryAddress = ref("");
const status = ref("");
const notes = ref("");

function resetForm() {
  orderItem.value = {};
  orderItemQuantity.value = 1;
  orders.value = [];
  grandTotal.value = 0;
  phoneNumber.value = "";
  deliveryAddress.value = "";
  status.value = "";
  notes.value = "";
}

async function addFoodToCart() {
  for (let i = 0; i < orders.value.length; i++) {
    if (orders.value[i].food._id == orderItem.value._id) {
      orders.value[i].quantity += orderItemQuantity.value;
      grandTotal.value += orderItem.value.price * orderItemQuantity.value;
      // Reset the form
      orderItem.value = {};
      orderItemQuantity.value = 1;
      return;
    }
  }
  const order = {
    food: orderItem.value,
    quantity: orderItemQuantity.value,
  };
  orders.value.push(order);

  // Recalculate if giving options to increase / decrease / remove
  grandTotal.value += orderItem.value.price * orderItemQuantity.value;

  // Reset the form
  orderItem.value = {};
  orderItemQuantity.value = 1;
}

async function editCart() {
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
  if (grandTotal.value > 0) {
    body.grand_total = grandTotal.value;
  }
  if (phoneNumber.value) {
    body.phone_number = phoneNumber.value;
  }
  if (deliveryAddress.value) {
    body.delivery_address = deliveryAddress.value;
  }
  if (status.value) {
    body.status = status.value;
  }
  if (notes.value) {
    body.notes = notes.value;
  }
  const response = await axios.put(`/api/cart/id/${route.params.id}`, body);
  if (response.status == 201) {
    toast.success("Successfully edited!");
    resetForm();
  } else {
    toast.error("Error! Can not edited!");
  }
}
</script>

<template>
  <div class="mt-4">
    <ButtonIcon
      @action="resetForm"
      icon-name="material-symbols:restart-alt-rounded"
      dynamic-class="hover:bg-black/10"
    />
    <form @submit.prevent="editCart" class="mt-4">
      <div class="grid-col-1 grid w-full gap-4 md:grid-cols-2 2xl:w-1/2">
        <!-- Order Table -->
        <div
          v-if="orders.length > 0"
          class="relative col-span-2 mt-4 overflow-x-auto sm:rounded-lg"
        >
          <table class="w-full text-left text-sm text-black">
            <thead class="bg-stone-300 text-xs uppercase">
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" class="px-6 py-3">Quantity</th>
              <th scope="col" class="px-6 py-3">Total</th>
            </thead>
            <tbody>
              <tr
                v-for="order in orders"
                class="border-b border-stone-700 bg-white"
                :key="order.food._id"
              >
                <td class="px-6 py-4">{{ order.food.name }}</td>
                <td class="px-6 py-4">
                  {{
                    order.food.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </td>
                <td class="px-6 py-4">{{ order.quantity }}</td>
                <td class="px-6 py-4">
                  {{
                    (order.food.price * order.quantity).toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      },
                    )
                  }}
                </td>
              </tr>
              <tr class="border-b border-stone-700 bg-white">
                <td class="border-r px-6 py-4 font-bold" colspan="3">
                  GRAND TOTAL
                </td>
                <td class="px-6 py-4">
                  {{
                    grandTotal.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Order Table -->
        <OrderSelectInput
          input-label="Item"
          v-model:input="orderItem"
          :options="foods"
        />
        <div class="flex gap-4">
          <NumberInput
            input-label="Quantity"
            v-model:input="orderItemQuantity"
          />
          <ButtonIcon
            @action="addFoodToCart"
            icon-name="material-symbols:add-circle-outline-rounded"
            dynamic-class="hover:bg-black/10"
          />
        </div>
        <TextInput input-label="Phone Number" v-model:input="phoneNumber" />
        <TextInput
          input-label="Delivery Address"
          v-model:input="deliveryAddress"
        />
        <TextAreaInput input-label="Notes" v-model:input="notes" rows="4" />
        <SelectInput
          input-label="Status"
          :options="['pending', 'paid', 'delivered']"
          v-model:input="status"
        />
        <div class="col-span-2">
          <SubmitButton />
        </div>
      </div>
    </form>
  </div>
</template>
