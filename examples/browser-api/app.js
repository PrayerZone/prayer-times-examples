const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city");
const languageInput = document.querySelector("#language");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const locationHeading = document.querySelector("#location");
const date = document.querySelector("#date");
const times = document.querySelector("#times");

async function loadPrayerTimes(city, language) {
  const url = new URL(
    `/api/public/cities/${encodeURIComponent(city)}/prayer-times`,
    "https://pray.zone",
  );
  url.searchParams.set("lang", language);

  status.textContent = "Loading prayer times…";
  result.hidden = true;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`PrayerZone API returned ${response.status}`);
    }

    const payload = await response.json();
    locationHeading.textContent = `${payload.city.name}, ${payload.city.country}`;
    date.textContent = `${payload.data.date} · ${payload.data.timezone}`;
    times.replaceChildren(
      ...payload.data.prayerTimes.map((prayer) => {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        const time = document.createElement("td");
        name.textContent = prayer.name;
        time.textContent = prayer.time;
        row.append(name, time);
        return row;
      }),
    );
    status.textContent = "";
    result.hidden = false;
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Unable to load prayer times.";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  void loadPrayerTimes(cityInput.value.trim(), languageInput.value);
});

void loadPrayerTimes(cityInput.value, languageInput.value);
