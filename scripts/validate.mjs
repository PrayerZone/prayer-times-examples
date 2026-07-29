import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const required = [
  "README.md",
  "catalog.json",
  "examples/vanilla-html/index.html",
  "examples/browser-api/index.html",
  "examples/react/PrayerTimesWidget.jsx",
  "examples/nextjs/PrayerTimesWidget.jsx",
  "examples/vue/PrayerTimesWidget.vue",
  "examples/svelte/PrayerTimesWidget.svelte",
  "examples/wordpress/prayerzone-examples.php",
  "examples/node/city-prayer-times.mjs",
  "examples/python/city_prayer_times.py",
];

const textExtensions = new Set([
  ".cs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".php",
  ".py",
  ".svelte",
  ".vue",
  ".yml",
]);

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collect(path)));
    } else if (textExtensions.has(extname(entry.name))) {
      files.push(path);
    }
  }

  return files;
}

const errors = [];

for (const file of required) {
  try {
    await readFile(new URL(file, root), "utf8");
  } catch {
    errors.push(`Missing required file: ${file}`);
  }
}

const files = await collect(rootPath);

for (const file of files) {
  const content = await readFile(file, "utf8");
  const displayPath = relative(rootPath, file);

  if (
    displayPath !== join("scripts", "validate.mjs") &&
    content.includes("https://prieres.org/api")
  ) {
    errors.push(`${displayPath}: API links must use https://pray.zone/api`);
  }

  if (
    displayPath !== join("scripts", "validate.mjs") &&
    content.includes("prayer-times-widget@main")
  ) {
    errors.push(`${displayPath}: widget CDN links must pin a release`);
  }

  if (
    content.includes("cdn.jsdelivr.net/gh/PrayerZone/prayer-times-widget") &&
    !content.includes("prayer-times-widget@v2.0.1")
  ) {
    errors.push(`${displayPath}: expected widget release v2.0.1`);
  }
}

const catalog = JSON.parse(await readFile(new URL("catalog.json", root), "utf8"));
if (catalog.canonicalWebsite !== "https://pray.zone/") {
  errors.push("catalog.json: canonicalWebsite must be https://pray.zone/");
}

for (const script of [
  "scripts/validate.mjs",
  "examples/node/city-prayer-times.mjs",
  "examples/browser-api/app.js",
]) {
  const result = spawnSync(
    process.execPath,
    ["--check", fileURLToPath(new URL(script, root))],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    errors.push(`${script}: ${result.stderr.trim()}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${required.length} required examples and ${files.length} text files.`);
