/**
 * Chargement des pages Markdown déclarées dans le manifeste content/pages.json.
 *
 * Un site statique ne peut pas lister le contenu d'un dossier depuis le navigateur :
 * le manifeste indique donc explicitement les fichiers à publier, dans l'ordre d'affichage.
 */

import { extractTitle } from './markdown.js';

export const CONTENT_DIR = 'content/';
export const MANIFEST_FILE = `${CONTENT_DIR}pages.json`;

const FILE_NAME = /^[a-z\d]+(?:-[a-z\d]+)*\.md$/;

/**
 * Un nom de fichier valide est en minuscules, sans accent, avec des tirets
 * comme séparateurs, et porte l'extension .md (exemple : pull-requests.md).
 * @param {unknown} fileName
 * @returns {boolean}
 */
export function isValidFileName(fileName) {
  return typeof fileName === 'string' && FILE_NAME.test(fileName);
}

/**
 * @param {string} fileName exemple : pull-requests.md
 * @returns {string} exemple : pull-requests
 */
export function slugFromFileName(fileName) {
  return fileName.slice(0, -'.md'.length);
}

async function fetchOk(url, fetchFn) {
  const response = await fetchFn(url);
  if (!response.ok) {
    throw new Error(`Échec du chargement de ${url} (HTTP ${response.status})`);
  }
  return response;
}

/**
 * Lit le manifeste et renvoie la liste des noms de fichiers valides.
 * @param {typeof fetch} fetchFn
 * @returns {Promise<string[]>}
 */
export async function loadManifest(fetchFn) {
  const response = await fetchOk(MANIFEST_FILE, fetchFn);
  const entries = await response.json();

  if (!Array.isArray(entries)) {
    throw new TypeError(`${MANIFEST_FILE} doit contenir un tableau de noms de fichiers`);
  }

  const invalid = entries.filter((entry) => !isValidFileName(entry));
  if (invalid.length > 0) {
    console.warn(`Entrées ignorées dans ${MANIFEST_FILE} :`, invalid);
  }

  return [...new Set(entries.filter(isValidFileName))];
}

/**
 * Charge toutes les pages du manifeste.
 * Le titre d'une page est son premier titre de niveau 1 ; à défaut, son identifiant.
 * @param {typeof fetch} fetchFn
 * @returns {Promise<Array<{ slug: string, title: string, source: string }>>}
 */
export async function loadPages(fetchFn) {
  const fileNames = await loadManifest(fetchFn);

  return Promise.all(
    fileNames.map(async (fileName) => {
      const response = await fetchOk(`${CONTENT_DIR}${fileName}`, fetchFn);
      const source = await response.text();
      const slug = slugFromFileName(fileName);
      return { slug, title: extractTitle(source) ?? slug, source };
    }),
  );
}
