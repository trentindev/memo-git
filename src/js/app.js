/**
 * Point d'entrée de l'application : charge les pages puis affiche la vue
 * correspondant au fragment d'URL, à chaque changement de celui-ci.
 */

import { loadPages } from './pages.js';
import { parseRoute } from './router.js';
import { renderHome, renderMessage, renderPage } from './views.js';

const SITE_TITLE = 'Mémo Git';

const container = document.getElementById('contenu');
let pages = [];

function showNotFound() {
  renderMessage(container, 'Page introuvable', "Cette page n'existe pas ou n'est plus publiée.");
  document.title = `Page introuvable | ${SITE_TITLE}`;
}

function showRoute() {
  const route = parseRoute(globalThis.location.hash);

  if (route.name === 'home') {
    renderHome(container, pages);
    document.title = SITE_TITLE;
  } else if (route.name === 'page') {
    const page = pages.find((candidate) => candidate.slug === route.slug);
    if (page) {
      renderPage(container, page);
      document.title = `${page.title} | ${SITE_TITLE}`;
    } else {
      showNotFound();
    }
  } else {
    showNotFound();
  }

  // Après une navigation, le focus est placé sur le contenu pour les lecteurs d'écran.
  container.focus();
}

async function start() {
  try {
    pages = await loadPages(globalThis.fetch.bind(globalThis));
  } catch (error) {
    console.error(error);
    renderMessage(
      container,
      'Erreur de chargement',
      'Les pages ne peuvent pas être chargées. Le site doit être servi par un serveur HTTP (commande npm start).',
    );
    return;
  }

  globalThis.addEventListener('hashchange', showRoute);
  showRoute();
}

await start();
