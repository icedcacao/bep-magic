<script setup>
const files = ref();

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

async function convertFileToBase64(file) {
  try {
    const base64String = await readFileAsBase64(file);
    return base64String;
  } catch (error) {
    console.error("Error converting file to base64:", error);
    return null;
  }
}

async function handleImageUpload(fileList) {}

async function handleFile(e) {
  files.value = await convertFileToBase64(e.target.files[0]);
  console.log(files.value);
  const imageUrl = await useFetch("/api/food", {
    // headers: [
    //   {
    //     "x-api-key":
    //       "0rCjrNslieJBSvW4n7h4WKNlu8wUTnI0EF1xjuNQAWOnyH42ypQOfFIgsK9CIsfA",
    //   },
    // ],
    method: "POST",
    body: {
      image: "ddd",
    },
  });
  console.log(imageUrl);
}
</script>

<template>
  <form @submit.prevent="handleImageUpload">
    <input multiple type="file" @change="handleFile($event)" />
    <input type="submit" />
  </form>
</template>
