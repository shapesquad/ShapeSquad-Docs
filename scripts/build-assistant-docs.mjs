// Builds docs/public/assistant-docs.json: the pages of this site split into
// sections, for the Artlets AI assistant's search_docs / read_doc tools.
// Run before vitepress (see the package.json scripts); the output is not committed.
//
// Format:
// {"generated_at": "...", "base_url": "https://docs.artlets.co",
//  "pages": [{"path": "/nodes/mix", "title": "Mix",
//             "sections": [{"heading": "Inputs", "anchor": "inputs", "level": 2, "text": "..."}]}]}

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS_DIR = join(ROOT, 'docs')
const OUT_FILE = join(DOCS_DIR, 'public', 'assistant-docs.json')
const SKIP_DIRS = new Set(['.vitepress', 'public', 'node_modules'])
const BASE_URL = (process.env.DOCS_BASE_URL || 'https://docs.artlets.co').replace(/\/+$/, '')

// VitePress 1.x heading ids (vitepress/dist/node: slugify + markdown-it-anchor):
// the slug of the heading's plain text, made unique per page with -1, -2, ...
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[̀-ͯ]/g
const slugify = (str) =>
  str
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()

function listMarkdownFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) files.push(...listMarkdownFiles(join(dir, entry.name)))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(join(dir, entry.name))
    }
  }
  return files
}

function routeOf(file) {
  const route = '/' + relative(DOCS_DIR, file).split(sep).join('/').replace(/\.md$/, '')
  if (route === '/index') return '/'
  return route.endsWith('/index') ? route.slice(0, -'index'.length) : route
}

// Splits off a leading YAML frontmatter block; only the top-level `title` is read.
function splitFrontmatter(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(source)
  if (!match) return { title: null, body: source }
  const titleLine = /^title:[ \t]*(.+?)[ \t]*$/m.exec(match[1])
  const title = titleLine ? titleLine[1].replace(/^(['"])(.*)\1$/, '$2') : null
  return { title, body: source.slice(match[0].length) }
}

const decodeEntities = (text) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')

// Applies fn to the parts of a line outside inline code spans.
function outsideCode(line, fn) {
  return line
    .split(/(`+[^`]*`+)/)
    .map((part, i) => (i % 2 ? part : fn(part)))
    .join('')
}

// Plain text of a heading as markdown-it-anchor sees it (text and code tokens).
function headingText(raw) {
  const text = raw
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
  const plain = outsideCode(text, (part) =>
    decodeEntities(
      part
        .replace(/(\*{1,3})(\S(?:.*?\S)?)\1/g, '$2')
        .replace(/(^|\W)(_{1,3})(\S(?:.*?\S)?)\2(?=\W|$)/g, '$1$3')
        .replace(/\\([!-/:-@[-`{-~])/g, '$1'),
    ),
  )
  return plain.replace(/`+ ?([^`]*?) ?`+/g, '$1').trim()
}

// Removes what only makes sense to the VitePress/Vue renderer from prose (not code blocks):
// script/style blocks, comments, images, tags (keeping their text), container fences.
function cleanProse(text) {
  const withoutHtml = outsideCode(
    text
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<iframe\b[^>]*?\bsrc="([^"]+)"[^>]*>(?:[\s\S]*?<\/iframe\s*>)?/gi, (_, src) => `[Video](${src})`)
      .replace(/<img\b[^>]*>/gi, ''),
    (part) => part.replace(/<\/?[A-Za-z][\w-]*(?:\s[^<>]*)?\/?>/g, ''),
  )
  return withoutHtml
    .split('\n')
    .map((line) => {
      const container = /^\s*:::+\s*([\w-]*)\s*(.*?)\s*$/.exec(line)
      if (container) {
        // `::: tip NOTE` -> `**NOTE**`, `::: warning` -> `**WARNING**`; closing fences and groups go.
        const [, type, title] = container
        if (!type || type === 'code-group' || type === 'raw' || type === 'v-pre') return ''
        return `**${title || type.toUpperCase()}**`
      }
      return /^\s*\[\[toc\]\]\s*$/i.test(line) ? '' : line
    })
    .join('\n')
}

// Splits the body into prose and fenced code chunks, so that neither cleaning nor
// heading detection touches code.
function chunks(body) {
  const result = []
  let prose = []
  let fence = null
  let code = []
  for (const line of body.split(/\r?\n/)) {
    if (fence) {
      code.push(line)
      const close = /^\s{0,3}(`{3,}|~{3,})\s*$/.exec(line)
      if (close && close[1][0] === fence[0] && close[1].length >= fence.length) {
        result.push({ code: true, text: code.join('\n') })
        fence = null
        code = []
      }
      continue
    }
    const open = /^\s{0,3}(`{3,}|~{3,})/.exec(line)
    if (open) {
      result.push({ code: false, text: prose.join('\n') })
      prose = []
      fence = open[1]
      code = [line]
      continue
    }
    prose.push(line)
  }
  result.push({ code: false, text: prose.join('\n') })
  if (code.length) result.push({ code: true, text: code.join('\n') })
  return result
}

const tidy = (lines) =>
  lines
    .join('\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

function buildPage(file) {
  const { title: frontmatterTitle, body } = splitFrontmatter(readFileSync(file, 'utf8'))
  const usedSlugs = new Set()
  const uniqueSlug = (slug) => {
    let unique = slug
    for (let i = 1; usedSlugs.has(unique); i += 1) unique = `${slug}-${i}`
    usedSlugs.add(unique)
    return unique
  }

  let title = frontmatterTitle
  let titleTaken = false
  const sections = [{ heading: null, anchor: '', level: 1, lines: [] }]
  for (const chunk of chunks(body)) {
    if (chunk.code) {
      sections.at(-1).lines.push(chunk.text)
      continue
    }
    for (const line of cleanProse(chunk.text).split('\n')) {
      const heading = /^\s{0,3}(#{1,6})[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$/.exec(line)
      if (!heading) {
        sections.at(-1).lines.push(line)
        continue
      }
      const level = heading[1].length
      const customId = /\s*\{#([^}\s]+)\}\s*$/.exec(heading[2])
      const text = headingText(customId ? heading[2].slice(0, customId.index) : heading[2])
      const anchor = customId ? customId[1] : uniqueSlug(slugify(text))
      if (customId) usedSlugs.add(anchor)
      if (level === 1 && !titleTaken) {
        titleTaken = true
        title = title || text
      } else if (level <= 3) {
        sections.push({ heading: text, anchor, level, lines: [] })
      } else {
        sections.at(-1).lines.push(line)
      }
    }
  }

  title = title || routeOf(file)
  return {
    path: routeOf(file),
    title,
    sections: sections
      .map(({ heading, anchor, level, lines }) => ({ heading: heading ?? title, anchor, level, text: tidy(lines) }))
      .filter((section, i) => i > 0 || section.text),
  }
}

const pages = listMarkdownFiles(DOCS_DIR)
  .sort()
  .map(buildPage)
  .filter((page) => page.sections.length)

mkdirSync(dirname(OUT_FILE), { recursive: true })
writeFileSync(
  OUT_FILE,
  JSON.stringify({ generated_at: new Date().toISOString(), base_url: BASE_URL, pages }) + '\n',
)
console.log(`assistant docs: ${pages.length} pages -> ${relative(ROOT, OUT_FILE)}`)
