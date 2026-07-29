<script>
  import { onMount } from "svelte";

  export let city = "paris";
  export let language = "en";
  export let theme = "auto";
  export let showQibla = true;

  onMount(() => {
    void import(
      /* @vite-ignore */
      "https://cdn.jsdelivr.net/gh/PrayerZone/prayer-times-widget@v2.0.1/src/prayer-zone-widget.js"
    );
  });
</script>

<prayer-zone-widget
  {city}
  lang={language}
  {theme}
  show-qibla={showQibla ? "" : undefined}
/>
