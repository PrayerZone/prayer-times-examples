# Vue

Copy `PrayerTimesWidget.vue` into a Vue application.

Configure Vue's compiler to recognize the custom element:

```js
// vite.config.js
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "prayer-zone-widget",
    },
  },
});
```
