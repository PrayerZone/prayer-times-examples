import { useEffect } from "react";

const widgetUrl =
  "https://cdn.jsdelivr.net/gh/PrayerZone/prayer-times-widget@v2.0.1/src/prayer-zone-widget.js";

let widgetPromise;

function loadWidget() {
  widgetPromise ??= import(/* @vite-ignore */ widgetUrl);
  return widgetPromise;
}

export function PrayerTimesWidget({
  city = "paris",
  language = "en",
  theme = "auto",
  compact = false,
  showQibla = true,
}) {
  useEffect(() => {
    void loadWidget();
  }, []);

  return (
    <prayer-zone-widget
      city={city}
      lang={language}
      theme={theme}
      compact={compact ? "" : undefined}
      show-qibla={showQibla ? "" : undefined}
    />
  );
}
