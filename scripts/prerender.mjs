// Writes a fully rendered HTML file for every route into dist/, with route-specific
// <title>, description, canonical and social-preview tags. Run after both builds:
//   vite build && vite build --ssr src/entry-server.ts --outDir dist-ssr
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render, metaFor, prerenderRoutes, SITE_URL } = await import(pathToFileURL(serverEntry).href)
let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

// The page arrives fully rendered, so the app script can download at low priority and
// leave bandwidth for the stylesheet, font and hero image that the first paint needs.
template = template.replace(/<script type="module" crossorigin src="/, '<script type="module" crossorigin fetchpriority="low" src="')

// Preload the main body font (Latin DM Sans) so text paints in the right font sooner.
const fontFile = fs.readdirSync(path.join(dist, 'assets')).find((f) => /^dm-sans-latin-opsz-normal-.*\.woff2$/.test(f))
if (fontFile) {
  template = template.replace(
    '</title>',
    `</title>\n    <link rel="preload" href="/assets/${fontFile}" as="font" type="font/woff2" crossorigin />`,
  )
}

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function setTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${label} in index.html`)
  return html.replace(pattern, replacement)
}

function withHead(html, route) {
  const { title, description } = metaFor(route)
  const url = `${SITE_URL}${route}`
  const t = escapeHtml(title)
  const d = escapeHtml(description)
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, '<title>')
  html = setTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${d}" />`, 'description')
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${t}" />`, 'og:title')
  html = setTag(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${d}" />`, 'og:description')
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url')
  html = setTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${t}" />`, 'twitter:title')
  html = setTag(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${d}" />`, 'twitter:description')
  return html
}

for (const route of prerenderRoutes) {
  const appHtml = await render(route)
  let html = withHead(template, route)
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`, 'root div')
  // Write both /lab/index.html and /lab.html so every host maps "/lab" to the pre-rendered page.
  const outFiles = route === '/' ? [path.join(dist, 'index.html')] : [path.join(dist, route.slice(1), 'index.html'), path.join(dist, `${route.slice(1)}.html`)]
  for (const outFile of outFiles) {
    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(outFile, html)
  }
  console.log(`prerendered ${route.padEnd(10)} → ${outFiles.map((f) => path.relative(root, f)).join(', ')} (${Math.round(html.length / 1024)} KB)`)
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
