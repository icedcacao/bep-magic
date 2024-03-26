<template>
  <div
    class="grid grid-cols-12 gap-4 rounded border border-black bg-white-cream p-2 text-lg font-bold"
  >
    <div class="col-span-2">
      <!-- <img
        :src="runtimeConfig.public.imageDomain + '/' + food.image_url"
        alt=""
      /> -->
    </div>
    <div class="col-span-2 flex flex-col justify-center">
      {{ food.name }}
    </div>
    <div class="col-span-1 flex flex-col justify-center text-center">
      {{
        food.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      }}
    </div>
    <div class="col-span-1 flex flex-col justify-center text-center">
      {{ food.category }}
    </div>
    <div class="col-span-2 flex flex-col justify-center">
      {{ food.description || "N/A" }}
    </div>
    <div class="col-span-2 flex flex-col justify-center">
      <ul>
        <li v-for="(value, key) in food.nutritional_value" :key="key">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
    <div class="col-span-2 flex flex-col justify-center space-y-2 text-center">
      <div>
        <button
          @click="openEditModal"
          class="w-32 rounded border-2 border-black bg-[#FFA726] px-2 py-1 text-center hover:bg-[#FFA726]/75"
        >
          Edit
        </button>
      </div>
      <div>
        <button
          @click="openDeleteModal"
          class="w-32 rounded border-2 border-black bg-[#EF5350] px-2 py-1 text-center hover:bg-[#EF5350]/75"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  <!-- Delete Modal -->
  <HeadlessTransitionRoot appear :show="isDeleteOpen" as="template">
    <HeadlessDialog as="div" @close="closeDeleteModal" class="relative z-10">
      <HeadlessTransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </HeadlessTransitionChild>
      <div class="fixed inset-0 flex items-center justify-center">
        <HeadlessTransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <HeadlessDialogPanel
            class="w-full max-w-sm transform space-y-4 rounded border-2 border-black bg-white-cream p-6 shadow-xl transition-all"
          >
            <div>
              <button
                @click="closeDeleteModal"
                class="flex justify-center rounded border-2 border-black bg-orange p-2 hover:bg-orange/75"
              >
                <img class="h-8 w-8" src="/icons/arrow_back.svg" alt="" />
              </button>
            </div>
            <HeadlessDialogTitle class="text-xl font-bold" as="h3">
              Are you sure you want to delete this item?
            </HeadlessDialogTitle>
            <div class="flex justify-end">
              <button
                @click="handleDeleteItem"
                class="rounded border-2 border-black bg-[#EF5350] px-8 py-1 text-center text-xl font-bold hover:bg-[#EF5350]/75"
              >
                Delete
              </button>
            </div>
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
  <!-- Edit Modal -->
  <HeadlessTransitionRoot appear :show="isEditOpen" as="template">
    <HeadlessDialog as="div" @close="closeEditModal" class="relative z-10">
      <HeadlessTransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </HeadlessTransitionChild>
      <div class="fixed inset-0 flex items-center justify-center">
        <HeadlessTransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <HeadlessDialogPanel
            class="w-full max-w-screen-lg transform space-y-4 rounded border-2 border-black bg-white-cream p-6 shadow-xl transition-all"
          >
            <div>
              <button
                @click="closeEditModal"
                class="flex justify-center rounded border-2 border-black bg-orange p-2 hover:bg-orange/75"
              >
                <img class="h-8 w-8" src="/icons/arrow_back.svg" alt="" />
              </button>
            </div>
            <HeadlessDialogTitle class="text-3xl font-bold" as="h2">
              Edit Panel
            </HeadlessDialogTitle>
            <form @submit.prevent="handleEditItem" class="space-y-6">
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h2 class="text-xl font-bold">Name</h2>
                    <input
                      type="text"
                      v-model="name"
                      :placeholder="food.name"
                      class="w-full rounded border-2 px-3 py-2 text-xl"
                    />
                  </div>
                  <div>
                    <h2 class="text-xl font-bold">Price</h2>
                    <input
                      type="text"
                      v-model="price"
                      :placeholder="String(food.price)"
                      class="w-full rounded border-2 px-3 py-2 text-xl"
                    />
                  </div>
                  <div>
                    <h2 class="text-xl font-bold">Category</h2>
                    <select
                      v-model="category"
                      class="w-full rounded border-2 px-3 py-2 text-xl"
                    >
                      <option v-for="option in categoryOptions" :key="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <h2 class="text-xl font-bold">Image</h2>
                    <input
                      class="w-full rounded border-2 px-3 py-1.5 text-xl"
                      type="file"
                    />
                  </div>
                </div>
              </div>
            </form>
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const props = defineProps<{
  food: DFood;
}>();

const categoryOptions = ["Main", "Drink", "Desert"];

const isDeleteOpen = ref(false);
const isEditOpen = ref(false);

const name = ref();
const price = ref();
const category = ref(props.food.category);

// Delete Modal

function closeDeleteModal() {
  isDeleteOpen.value = false;
}
function openDeleteModal() {
  isDeleteOpen.value = true;
}
async function handleDeleteItem() {
  const result = await $fetch(`/api/food/${props.food._id}`, {
    headers: useRequestHeaders(["cookie"]),
    method: "DELETE",
  });
  closeDeleteModal();
}

async function handleEditItem() {}

// Edit Modal

function closeEditModal() {
  isEditOpen.value = false;
}
function openEditModal() {
  isEditOpen.value = true;
}
</script>
