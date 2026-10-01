import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isValidFileName, loadManifest, loadPages, slugFromFileName } from '../src/js/pages.js';

/** Simule fetch à partir d'un dictionnaire { url: contenu }. */
function fakeFetch(files) {
  return async (url) => {
    if (!(url in files)) {
      return { ok: false, status: 404 };
    }
    const body = files[url];
    return {
      ok: true,
      status: 200,
      json: async () => JSON.parse(body),
      text: async () => body,
    };
  };
}

describe('isValidFileName', () => {
  it('accepte les noms en minuscules séparés par des tirets', () => {
    assert.equal(isValidFileName('pull-requests.md'), true);
  });

  it('refuse les chemins, majuscules, accents et autres extensions', () => {
    for (const name of ['../secret.md', 'Branches.md', 'thème.md', 'page.txt', 'a--b.md', 42]) {
      assert.equal(isValidFileName(name), false, String(name));
    }
  });
});

describe('slugFromFileName', () => {
  it("retire l'extension .md", () => {
    assert.equal(slugFromFileName('pull-requests.md'), 'pull-requests');
  });
});

describe('loadManifest', () => {
  it('ignore les entrées invalides et les doublons', async () => {
    const fetchFn = fakeFetch({ 'content/pages.json': '["a.md", "../b.md", "a.md", "c.md"]' });
    assert.deepEqual(await loadManifest(fetchFn), ['a.md', 'c.md']);
  });

  it("rejette un manifeste qui n'est pas un tableau", async () => {
    const fetchFn = fakeFetch({ 'content/pages.json': '{"pages": []}' });
    await assert.rejects(loadManifest(fetchFn), TypeError);
  });

  it('rejette un manifeste absent', async () => {
    await assert.rejects(loadManifest(fakeFetch({})), /HTTP 404/);
  });
});

describe('loadPages', () => {
  it("conserve l'ordre du manifeste et utilise le titre de niveau 1", async () => {
    const fetchFn = fakeFetch({
      'content/pages.json': '["z.md", "a.md"]',
      'content/z.md': '# Dernière lettre\n\nTexte',
      'content/a.md': 'Pas de titre',
    });
    const pages = await loadPages(fetchFn);
    assert.deepEqual(
      pages.map(({ slug, title }) => ({ slug, title })),
      [
        { slug: 'z', title: 'Dernière lettre' },
        { slug: 'a', title: 'a' },
      ],
    );
  });
});
