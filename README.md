# Mémo Git

Wiki statique qui affiche des pages rédigées en Markdown. Tout le rendu est fait dans le navigateur : il n'y a pas de back-end.

La page d'accueil liste les pages publiées. Chaque page est identifiée par son premier titre de niveau 1. Un clic sur un titre affiche la page, et un lien permet de revenir à l'accueil.

## Prérequis

- Git ;
- Node.js 22.13 ou supérieur (Node.js 24 recommandé).

## Installation

```bash
git clone <url-du-depot>
cd memo-git
npm ci
```

`npm ci` installe exactement les versions inscrites dans `package-lock.json`. On ne l'utilise que pour les outils de qualité (ESLint, Prettier) : le site lui-même n'a aucune dépendance.

## Lancer le site

```bash
npm start
```

Puis on ouvre http://localhost:8080 dans un navigateur. Pour utiliser un autre port : `PORT=3000 npm start` (Linux, macOS, Git Bash).

Ouvrir directement `src/index.html` depuis l'explorateur de fichiers ne fonctionne pas : les navigateurs bloquent le chargement des fichiers Markdown depuis une adresse `file://`.

## Commandes disponibles

| Commande               | Rôle                                                |
| ---------------------- | --------------------------------------------------- |
| `npm start`            | Lance le serveur de développement                   |
| `npm test`             | Exécute les tests unitaires (`node:test`)           |
| `npm run lint`         | Analyse le code JavaScript avec ESLint              |
| `npm run format`       | Met en forme tous les fichiers avec Prettier        |
| `npm run format:check` | Vérifie la mise en forme sans modifier les fichiers |
| `npm run check`        | Enchaîne lint, vérification du format et tests      |

## Ajouter une page

1. Créer un fichier dans `src/content/`. Son nom est en minuscules, sans accent ni espace, avec des tirets comme séparateurs : `ma-page.md`.
2. Commencer le fichier par un titre de niveau 1 : `# Titre de ma page`. C'est ce titre qui s'affiche sur l'accueil.
3. Ajouter le nom du fichier dans `src/content/pages.json`, à la position souhaitée dans la liste. Le manifeste contient une entrée par ligne : chaque entrée est suivie d'une virgule, sauf la dernière.

Un site statique ne peut pas lire le contenu d'un dossier depuis le navigateur : c'est pour cela que le manifeste `pages.json` déclare explicitement les pages publiées.

## Syntaxe Markdown prise en charge

Titres (`#` à `######`), paragraphes, listes à puces (`-` ou `*`), blocs de code délimités par trois accents graves, et en ligne : `code`, `**gras**`, `*italique*`, `[lien](url)`.

Pour lier une page à une autre : `[texte du lien](#/page/nom-du-fichier-sans-extension)`.

## Structure du projet

```text
src/
  index.html          page unique de l'application
  styles/main.css     feuille de style
  js/app.js           point d'entrée : chargement et navigation
  js/router.js        lecture du fragment d'URL (#/page/...)
  js/pages.js         chargement du manifeste et des pages
  js/markdown.js      conversion Markdown vers HTML
  js/views.js         construction des vues
  content/            pages Markdown et manifeste pages.json
tests/                tests unitaires
scripts/serve.mjs     serveur de développement
```

## Contribuer

Les règles de contribution (branches, messages de commit, pull requests) sont décrites dans [CONTRIBUTING.md](CONTRIBUTING.md).
