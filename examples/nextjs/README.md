# Next.js App Router

Copy `PrayerTimesWidget.jsx` into your project. It is a Client Component because
custom elements are registered in the browser.

```jsx
import { PrayerTimesWidget } from "./PrayerTimesWidget";

export default function Page() {
  return <PrayerTimesWidget city="london" language="en" />;
}
```
