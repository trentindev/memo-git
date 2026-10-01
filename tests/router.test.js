import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { pageHref, parseRoute } from '../src/js/router.js';

describe('parseRoute', () => {
  it("reconnaît l'accueil", () => {
    for (const hash of ['', '#', '#/']) {
      assert.deepEqual(parseRoute(hash), { name: 'home' }, hash);
    }
  });

  it('reconnaît une page', () => {
    assert.deepEqual(parseRoute('#/page/pull-requests'), { name: 'page', slug: 'pull-requests' });
  });

  it('refuse les identifiants invalides', () => {
    for (const hash of ['#/page/', '#/page/../secret', '#/page/A', '#/autre']) {
      assert.deepEqual(parseRoute(hash), { name: 'not-found' }, hash);
    }
  });
});

describe('pageHref', () => {
  it('produit un lien que parseRoute sait relire', () => {
    assert.deepEqual(parseRoute(pageHref('branches')), { name: 'page', slug: 'branches' });
  });
});
