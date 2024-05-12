<script setup>
import ButtonIcon from "@/components/Button/ButtonIcon.vue";
import SubmitButton from "@/components/Button/SubmitButton.vue";
import NumberInput from "@/components/Form/NumberInput.vue";
import SelectInput from "@/components/Form/SelectInput.vue";
import TextInput from "@/components/Form/TextInput.vue";
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";

const name = ref("");
const price = ref("");
const category = ref("");

function resetForm() {
  name.value = "";
  price.value = "";
  category.value = "";
}

async function addFood() {
  let body = {};
  if (name.value.trim()) {
    body.name = name.value;
  }
  if (parseInt(price.value) >= 0) {
    body.price = parseInt(price.value);
  }
  if (category.value) {
    body.category = category.value;
  }
  const response = await axios.post("/api/food", body);
  if (response.status == 201) {
    toast.success("Successfully added!");
    resetForm();
  } else {
    toast.error("Error! Can not added!");
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
    <form @submit.prevent="addFood" class="mt-4">
      <div class="grid-col-1 grid w-full gap-4 md:grid-cols-2 2xl:w-1/2">
        <TextInput input-label="Name" v-model:input="name" />
        <NumberInput input-label="Price" v-model:input="price" />
        <SelectInput
          input-label="Category"
          :options="['normal', 'smartchef']"
          v-model:input="category"
        />
        <div class="col-span-2">
          <SubmitButton />
        </div>
      </div>
    </form>
  </div>
</template>
