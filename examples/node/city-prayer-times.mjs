const city = process.argv[2] ?? "paris";
const language = process.argv[3] ?? "en";
const url = new URL(
  `/api/public/cities/${encodeURIComponent(city)}/prayer-times`,
  "https://pray.zone",
);

url.searchParams.set("lang", language);

const response = await fetch(url, {
  headers: { Accept: "application/json" },
});

if (!response.ok) {
  const message = await response.text();
  throw new Error(`PrayerZone API ${response.status}: ${message}`);
}

const payload = await response.json();
console.log(`${payload.city.name} · ${payload.data.date} · ${payload.data.timezone}`);

for (const prayer of payload.data.prayerTimes) {
  console.log(`${prayer.isNext ? "→" : " "} ${prayer.name.padEnd(10)} ${prayer.time}`);
}
