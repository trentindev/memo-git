/**
 * Routage côté client fondé sur le fragment d'URL (la partie après #).
 *
 * #/              accueil
 * #/page/<slug>   affichage de la page <slug>.md
 *
 * Le fragment n'est jamais envoyé au serveur : le site fonctionne avec
 * n'importe quel hébergement de fichiers statiques.
 */

export const HOME_HREF = '#/';

const PAGE_PATH = /^\/page\/([a-z\d]+(?:-[a-z\d]+)*)$/;

/**
 * @param {string} slug
 * @returns {string}
 */
export function pageHref(slug) {
  return `#/page/${slug}`;
}

/**
 * @param {string} hash valeur de location.hash, par exemple "#/page/branches"
 * @returns {{ name: 'home' } | { name: 'page', slug: string } | { name: 'not-found' }}
 */
export function parseRoute(hash) {
  const path = hash.startsWith('#') ? hash.slice(1) : hash;

  if (path === '' || path === '/') {
    return { name: 'home' };
  }

  const page = PAGE_PATH.exec(path);
  if (page) {
    return { name: 'page', slug: page[1] };
  }

  return { name: 'not-found' };
}
