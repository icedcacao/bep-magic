<script setup lang="ts">
const messages = ref<Record<string, any>>([]);
const events = ref<EventSource>();
onMounted(() => {
  events.value = new EventSource("/api/sse/cart");
  events.value.addEventListener("connect", (evt: any) =>
    messages.value.push(JSON.parse(evt.data))
  );
  events.value.addEventListener("message", (evt: any) =>
    console.log("New Message")
  );
});
</script>
