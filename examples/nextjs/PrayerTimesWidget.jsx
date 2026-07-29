"use client";

import { useEffect } from "react";

const widgetUrl =
  "https://cdn.jsdelivr.net/gh/PrayerZone/prayer-times-widget@v2.0.1/src/prayer-zone-widget.js";

let widgetPromise;

export function PrayerTimesWidget({
  city = "paris",
  language = "en",
  theme = "auto",
}) {
  useEffect(() => {
    widgetPromise ??= import(/* webpackIgnore: true */ widgetUrl);
    void widgetPromise;
  }, []);

  return (
    <prayer-zone-widget
      city={city}
      lang={language}
      theme={theme}
      show-qibla=""
    />
  );
}
