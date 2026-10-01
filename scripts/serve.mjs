/**
 * Serveur HTTP de développement, sans dépendance, qui sert le dossier src/.
 * Usage : npm start, puis ouvrir http://localhost:8080
 * Le port peut être changé avec la variable d'environnement PORT.
 */

import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', 'src');
const PORT = Number(process.env.PORT ?? 8080);

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

/** Renvoie le chemin du fichier demandé, ou null s'il sort du dossier servi. */
function resolveFile(requestUrl) {
  const { pathname } = new URL(requestUrl, 'http://localhost');
  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, '') || 'index.html';
  const filePath = resolve(ROOT, relativePath);
  return filePath.startsWith(ROOT + sep) ? filePath : null;
}

function send(response, status, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(status, { 'Content-Type': contentType });
  response.end(body);
}

const server = createServer(async (request, response) => {
  let filePath;
  try {
    filePath = resolveFile(request.url ?? '/');
  } catch {
    send(response, 400, 'Requête invalide');
    return;
  }

  if (filePath === null) {
    send(response, 403, 'Accès refusé');
    return;
  }

  try {
    const body = await readFile(filePath);
    send(response, 200, body, CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream');
  } catch {
    send(response, 404, 'Fichier introuvable');
  }
});

server.listen(PORT, () => {
  console.log(`Mémo Git disponible sur http://localhost:${PORT}`);
});
