import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  escapeHtml,
  extractTitle,
  isSafeUrl,
  renderInline,
  renderMarkdown,
} from '../src/js/markdown.js';

describe('escapeHtml', () => {
  it('échappe les caractères spéciaux HTML', () => {
    assert.equal(
      escapeHtml(`<a href="x">'&'</a>`),
      '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;',
    );
  });
});

describe('isSafeUrl', () => {
  it('accepte les URL relatives et les protocoles autorisés', () => {
    for (const url of [
      '#/page/branches',
      'page.html',
      '/chemin',
      'https://git-scm.com',
      'mailto:a@b.fr',
    ]) {
      assert.equal(isSafeUrl(url), true, url);
    }
  });

  it('refuse les autres protocoles, quelle que soit la casse', () => {
    for (const url of [
      'javascript:alert(1)',
      'JavaScript:alert(1)',
      'data:text/html,x',
      'vbscript:x',
    ]) {
      assert.equal(isSafeUrl(url), false, url);
    }
  });
});

describe('renderInline', () => {
  it('convertit le gras, l’italique et le code', () => {
    assert.equal(
      renderInline('**gras**, *italique* et `code`'),
      '<strong>gras</strong>, <em>italique</em> et <code>code</code>',
    );
  });

  it('ne transforme pas le contenu du code en ligne', () => {
    assert.equal(renderInline('`**a** <b>`'), '<code>**a** &lt;b&gt;</code>');
  });

  it('convertit les liens', () => {
    assert.equal(
      renderInline('voir [les branches](#/page/branches)'),
      'voir <a href="#/page/branches">les branches</a>',
    );
  });

  it('neutralise les liens dangereux en gardant leur texte', () => {
    assert.equal(renderInline('[clic](javascript:alert(1))'), 'clic)');
  });

  it('échappe le HTML présent dans le texte', () => {
    assert.equal(
      renderInline('<img src=x onerror=alert(1)>'),
      '&lt;img src=x onerror=alert(1)&gt;',
    );
  });
});

describe('renderMarkdown', () => {
  it('convertit les titres de niveau 1 à 6', () => {
    assert.equal(renderMarkdown('# Un\n###### Six'), '<h1>Un</h1>\n<h6>Six</h6>');
  });

  it('ne considère pas #titre sans espace comme un titre', () => {
    assert.equal(renderMarkdown('#titre'), '<p>#titre</p>');
  });

  it('regroupe les lignes consécutives en un paragraphe', () => {
    assert.equal(
      renderMarkdown('ligne 1\nligne 2\n\nligne 3'),
      '<p>ligne 1 ligne 2</p>\n<p>ligne 3</p>',
    );
  });

  it('convertit les listes à puces', () => {
    assert.equal(renderMarkdown('- un\n* deux'), '<ul><li>un</li><li>deux</li></ul>');
  });

  it('sépare un paragraphe et une liste qui se suivent', () => {
    assert.equal(renderMarkdown('texte\n- item'), '<p>texte</p>\n<ul><li>item</li></ul>');
  });

  it('convertit les blocs de code sans interpréter leur contenu', () => {
    assert.equal(
      renderMarkdown('```bash\n# pas un titre\n<b>\n```'),
      '<pre><code class="language-bash"># pas un titre\n&lt;b&gt;</code></pre>',
    );
  });

  it('ferme un bloc de code non refermé en fin de document', () => {
    assert.equal(renderMarkdown('```\ncode'), '<pre><code>code</code></pre>');
  });

  it('accepte les fins de ligne Windows', () => {
    assert.equal(renderMarkdown('# Titre\r\n\r\ntexte'), '<h1>Titre</h1>\n<p>texte</p>');
  });
});

describe('extractTitle', () => {
  it('renvoie le premier titre de niveau 1', () => {
    assert.equal(
      extractTitle('intro\n## Sous-titre\n# Titre principal\n# Autre'),
      'Titre principal',
    );
  });

  it('ignore les titres situés dans un bloc de code', () => {
    assert.equal(extractTitle('```\n# commentaire shell\n```\n# Vrai titre'), 'Vrai titre');
  });

  it('renvoie null si le document n’a pas de titre de niveau 1', () => {
    assert.equal(extractTitle('## Seulement un sous-titre'), null);
  });
});
