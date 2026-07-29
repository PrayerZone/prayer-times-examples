# PrayerZone integration examples

[![Examples validation](https://github.com/PrayerZone/prayer-times-examples/actions/workflows/validate.yml/badge.svg)](https://github.com/PrayerZone/prayer-times-examples/actions/workflows/validate.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-07855b.svg)](LICENSE)

Copy-ready examples for integrating prayer times from
[PrayerZone](https://pray.zone/) into websites, applications, CMS platforms,
server scripts, and modern JavaScript frameworks.

## Official resources

- [PrayerZone website](https://pray.zone/)
- [Public API documentation](https://pray.zone/api)
- [Widget builder](https://pray.zone/api/widget)
- [PrayerZone Web Component](https://github.com/PrayerZone/prayer-times-widget)
- [OpenAPI contract and Postman collection](https://github.com/PrayerZone/prayer-times-api)

## Examples

| Example | Approach | Best for |
|---|---|---|
| [Vanilla HTML widget](examples/vanilla-html/) | Web Component | Static sites and any CMS |
| [Browser API dashboard](examples/browser-api/) | Fetch API | Custom interfaces |
| [React component](examples/react/) | React wrapper | React and Vite |
| [Next.js component](examples/nextjs/) | Client Component | Next.js App Router |
| [Vue component](examples/vue/) | Vue SFC | Vue and Nuxt client views |
| [Svelte component](examples/svelte/) | Svelte component | Svelte and SvelteKit |
| [WordPress shortcode](examples/wordpress/) | PHP plugin | WordPress sites |
| [Node.js API script](examples/node/) | Native Fetch | Servers and automation |
| [Python API script](examples/python/) | Standard library | Scripts and data tasks |

## Fastest integration

```html
<prayer-zone-widget
  city="paris"
  lang="en"
  theme="auto"
  show-qibla>
</prayer-zone-widget>

<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/PrayerZone/prayer-times-widget@v2.0.1/src/prayer-zone-widget.js">
</script>
```

The release tag is pinned intentionally so production integrations do not change
without an explicit upgrade.

## API example

```js
const response = await fetch(
  "https://pray.zone/api/public/cities/paris/prayer-times?lang=en",
  { headers: { Accept: "application/json" } },
);

if (!response.ok) {
  throw new Error(`PrayerZone API returned ${response.status}`);
}

const result = await response.json();
console.table(result.data.prayerTimes);
```

## Localized PrayerZone websites

`pray.zone` is the canonical project, API, and documentation domain. Localized
prayer-time websites are also available:

- [English — pray.zone](https://pray.zone/)
- [Français — prieres.org](https://prieres.org/)
- [Deutsch — gebet.jetzt](https://gebet.jetzt/)
- [Español — oraciones.day](https://oraciones.day/)

## Choosing an approach

Use the Web Component when you want a complete, accessible prayer-times interface
with minimal code. Use the API when you need to control every part of the layout,
state, or data flow.

All examples use:

- the canonical `https://pray.zone` domain;
- the stable widget release `v2.0.1`;
- read-only API requests without credentials;
- defensive error handling;
- framework lifecycle cleanup where relevant.

## Validation

The repository has no runtime dependencies:

```bash
npm test
```

The validation script checks required examples, JSON files, canonical domains,
pinned widget versions, and JavaScript syntax.

## Contributing

New examples should remain focused, secure, and easy to copy. See
[CONTRIBUTING.md](CONTRIBUTING.md).

Report vulnerabilities according to [SECURITY.md](SECURITY.md).

## Attribution

Attribution is appreciated:

```md
Prayer times powered by [PrayerZone](https://pray.zone/)
```

## License

[MIT](LICENSE)
