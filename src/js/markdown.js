/**
 * Moteur Markdown minimal, sans dépendance.
 *
 * Syntaxe prise en charge :
 * - titres de niveau 1 à 6 (`#` à `######`) ;
 * - paragraphes, séparés par une ligne vide ;
 * - listes à puces (`-` ou `*`) ;
 * - blocs de code délimités par trois accents graves, avec langue facultative ;
 * - en ligne : `code`, **gras**, *italique* et [liens](url).
 *
 * Sécurité : tout le texte source est échappé avant d'être transformé en HTML.
 * Les liens dont le protocole n'est pas http, https ou mailto sont neutralisés.
 */

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HEADING = /^(#{1,6})[ \t]+(\S.*)$/;
const LIST_ITEM = /^ {0,3}[-*][ \t]+(\S.*)$/;
const FENCE = /^ {0,3}```[ \t]*([\w+-]*)[ \t]*$/;
const INLINE_TOKEN = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
const URL_SCHEME = /^([a-z][a-z\d+.-]*):/i;
const ALLOWED_SCHEMES = new Set(['http', 'https', 'mailto']);

/**
 * Échappe les caractères spéciaux HTML.
 * @param {string} text
 * @returns {string}
 */
export function escapeHtml(text) {
  return text.replaceAll(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/**
 * Indique si une URL peut être placée dans un attribut href.
 * Les URL relatives sont acceptées, ainsi que les protocoles autorisés.
 * @param {string} url
 * @returns {boolean}
 */
export function isSafeUrl(url) {
  const match = URL_SCHEME.exec(url);
  return match === null || ALLOWED_SCHEMES.has(match[1].toLowerCase());
}

function renderEmphasis(escapedText) {
  return escapedText
    .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replaceAll(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderLink(label, url) {
  const labelHtml = renderEmphasis(escapeHtml(label));
  if (!isSafeUrl(url)) {
    return labelHtml;
  }
  return `<a href="${escapeHtml(url)}">${labelHtml}</a>`;
}

/**
 * Convertit le Markdown en ligne d'une seule ligne de texte.
 * @param {string} text
 * @returns {string} HTML
 */
export function renderInline(text) {
  let html = '';
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_TOKEN)) {
    const [token, code, label, url] = match;
    html += renderEmphasis(escapeHtml(text.slice(lastIndex, match.index)));
    html += code === undefined ? renderLink(label, url) : `<code>${escapeHtml(code)}</code>`;
    lastIndex = match.index + token.length;
  }

  return html + renderEmphasis(escapeHtml(text.slice(lastIndex)));
}

function createState() {
  return { blocks: [], paragraph: [], listItems: [], code: null };
}

function flushParagraph(state) {
  if (state.paragraph.length > 0) {
    state.blocks.push(`<p>${renderInline(state.paragraph.join(' '))}</p>`);
    state.paragraph = [];
  }
}

function flushList(state) {
  if (state.listItems.length > 0) {
    const items = state.listItems.map((item) => `<li>${renderInline(item)}</li>`);
    state.blocks.push(`<ul>${items.join('')}</ul>`);
    state.listItems = [];
  }
}

function flushText(state) {
  flushParagraph(state);
  flushList(state);
}

function closeCodeBlock(state) {
  const { language, lines } = state.code;
  const classAttribute = language ? ` class="language-${escapeHtml(language)}"` : '';
  state.blocks.push(`<pre><code${classAttribute}>${escapeHtml(lines.join('\n'))}</code></pre>`);
  state.code = null;
}

function handleCodeLine(state, line) {
  if (FENCE.test(line)) {
    closeCodeBlock(state);
  } else {
    state.code.lines.push(line);
  }
}

function handleTextLine(state, line) {
  const fence = FENCE.exec(line);
  if (fence) {
    flushText(state);
    state.code = { language: fence[1], lines: [] };
    return;
  }

  if (line.trim() === '') {
    flushText(state);
    return;
  }

  const heading = HEADING.exec(line);
  if (heading) {
    flushText(state);
    const level = heading[1].length;
    state.blocks.push(`<h${level}>${renderInline(heading[2].trim())}</h${level}>`);
    return;
  }

  const listItem = LIST_ITEM.exec(line);
  if (listItem) {
    flushParagraph(state);
    state.listItems.push(listItem[1].trim());
    return;
  }

  flushList(state);
  state.paragraph.push(line.trim());
}

/**
 * Convertit un document Markdown en HTML.
 * Un bloc de code non refermé est fermé automatiquement en fin de document.
 * @param {string} markdown
 * @returns {string} HTML
 */
export function renderMarkdown(markdown) {
  const state = createState();
  const lines = markdown.replaceAll(/\r\n?/g, '\n').split('\n');

  for (const line of lines) {
    if (state.code) {
      handleCodeLine(state, line);
    } else {
      handleTextLine(state, line);
    }
  }

  if (state.code) {
    closeCodeBlock(state);
  }
  flushText(state);

  return state.blocks.join('\n');
}

/**
 * Renvoie le texte du premier titre de niveau 1 du document,
 * en ignorant le contenu des blocs de code.
 * @param {string} markdown
 * @returns {string | null} le titre, ou null si le document n'en contient pas
 */
export function extractTitle(markdown) {
  let inCode = false;

  for (const line of markdown.replaceAll(/\r\n?/g, '\n').split('\n')) {
    if (FENCE.test(line)) {
      inCode = !inCode;
      continue;
    }
    const heading = inCode ? null : HEADING.exec(line);
    if (heading && heading[1].length === 1) {
      return heading[2].trim();
    }
  }

  return null;
}
