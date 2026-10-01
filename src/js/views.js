/**
 * Construction des vues dans le conteneur principal.
 *
 * Les titres et libellés sont insérés avec textContent : le navigateur les
 * traite comme du texte, jamais comme du HTML. Seul le corps des pages passe
 * par innerHTML, après conversion par le moteur Markdown qui échappe la source.
 */

import { renderMarkdown } from './markdown.js';
import { HOME_HREF, pageHref } from './router.js';

function createElement(doc, tagName, { className, text, href } = {}) {
  const element = doc.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  if (href !== undefined) {
    element.href = href;
  }
  return element;
}

function createBackLink(doc) {
  const nav = createElement(doc, 'nav', { className: 'breadcrumb' });
  nav.setAttribute('aria-label', "Fil d'Ariane");
  nav.append(createElement(doc, 'a', { text: "Retour à l'accueil", href: HOME_HREF }));
  return nav;
}

/**
 * @param {HTMLElement} container
 * @param {Array<{ slug: string, title: string }>} pages
 */
export function renderHome(container, pages) {
  const doc = container.ownerDocument;
  const heading = createElement(doc, 'h1', { text: 'Pages disponibles' });

  if (pages.length === 0) {
    container.replaceChildren(heading, createElement(doc, 'p', { text: 'Aucune page publiée.' }));
    return;
  }

  const list = createElement(doc, 'ul', { className: 'page-list' });
  for (const page of pages) {
    const item = createElement(doc, 'li');
    item.append(createElement(doc, 'a', { text: page.title, href: pageHref(page.slug) }));
    list.append(item);
  }

  container.replaceChildren(heading, list);
}

/**
 * @param {HTMLElement} container
 * @param {{ source: string }} page
 */
export function renderPage(container, page) {
  const doc = container.ownerDocument;
  const article = createElement(doc, 'article', { className: 'markdown-body' });
  article.innerHTML = renderMarkdown(page.source);
  container.replaceChildren(createBackLink(doc), article);
}

/**
 * @param {HTMLElement} container
 * @param {string} title
 * @param {string} message
 */
export function renderMessage(container, title, message) {
  const doc = container.ownerDocument;
  container.replaceChildren(
    createBackLink(doc),
    createElement(doc, 'h1', { text: title }),
    createElement(doc, 'p', { text: message }),
  );
}
