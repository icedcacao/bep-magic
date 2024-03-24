<template>
  <nav class="fixed h-screen space-y-4 bg-white-cream p-4">
    <h1 class="text-center font-dela text-4xl">MF</h1>
    <div class="h-0.5 w-full bg-black"></div>
    <div class="space-y-4">
      <NuxtLink
        to="/admin/menu"
        class="flex justify-center rounded border-2 border-black stroke-white p-2"
        activeClass="admin-nav-active"
      >
        <svg
          class="fill-current h-12 w-12"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M533-440q-32-45-84.5-62.5T340-520q-56 0-108.5 17.5T147-440h386ZM40-360q0-109 91-174.5T340-600q118 0 209 65.5T640-360H40Zm0 160v-80h600v80H40ZM720-40v-80h56l56-560H450l-10-80h200v-160h80v160h200L854-98q-3 25-22 41.5T788-40h-68Zm0-80h56-56ZM80-40q-17 0-28.5-11.5T40-80v-40h600v40q0 17-11.5 28.5T600-40H80Zm260-400Z"
          />
        </svg>
      </NuxtLink>
      <NuxtLink
        to="/admin/cart"
        class="flex justify-center rounded border-2 border-black stroke-white p-2"
        activeClass="admin-nav-active"
      >
        <svg
          class="fill-current h-12 w-12"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
          />
        </svg>
      </NuxtLink>
    </div>
  </nav>
</template>
