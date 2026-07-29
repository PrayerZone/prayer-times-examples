<script setup>
import { onMounted } from "vue";

const props = defineProps({
  city: { type: String, default: "paris" },
  language: { type: String, default: "en" },
  theme: { type: String, default: "auto" },
  showQibla: { type: Boolean, default: true },
});

onMounted(() => {
  void import(
    /* @vite-ignore */
    "https://cdn.jsdelivr.net/gh/PrayerZone/prayer-times-widget@v2.0.1/src/prayer-zone-widget.js"
  );
});
</script>

<template>
  <prayer-zone-widget
    :city="props.city"
    :lang="props.language"
    :theme="props.theme"
    :show-qibla="props.showQibla ? '' : undefined"
  />
</template>
