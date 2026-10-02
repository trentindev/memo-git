#!/usr/bin/env bash
# Crée les labels de niveau et les issues #1 à #13 du TP sur un dépôt neuf.
# Prérequis : GitHub CLI connecté (gh auth status) avec les droits d'administration du dépôt.
# Usage : bash creer_issues.sh proprietaire/memo-git
set -euo pipefail

REPO="${1:?Usage : bash creer_issues.sh proprietaire/memo-git}"

# Les numéros d'issue ne correspondent aux features que si le dépôt n'a encore ni issue ni pull request.
if [ -n "$(gh issue list --repo "$REPO" --state all --limit 1 --json number --jq '.[].number')" ] \
  || [ -n "$(gh pr list --repo "$REPO" --state all --limit 1 --json number --jq '.[].number')" ]; then
  echo "Le dépôt contient déjà des issues ou des pull requests : abandon." >&2
  exit 1
fi

gh label create "niveau 1" --repo "$REPO" --color 0E8A16 --description "Contenu Markdown ou CSS" --force
gh label create "niveau 2" --repo "$REPO" --color FBCA04 --description "Modification ciblée du JavaScript" --force
gh label create "niveau 3" --repo "$REPO" --color D93F0B --description "Évolution d'un module JavaScript" --force

gh issue create --repo "$REPO" --title "F1 : Page « Annuler une modification »" --label "niveau 1" --body-file - <<'EOF_ISSUE'
Niveau : 1

Zone : Contenu

Branche proposée : `feat/1-page-annuler`

On crée `src/content/annuler.md` et on l'ajoute dans `pages.json`, juste après `depot-local.md`.

Critères d'acceptation :

1. le titre de niveau 1 est « Annuler une modification » et il apparaît sur l'accueil ;
2. la page présente quatre situations, chacune dans une section de niveau 2 avec un bloc de code : abandonner les modifications d'un fichier (`git restore <fichier>`), retirer un fichier de la zone de préparation (`git restore --staged <fichier>`), corriger le dernier commit tant qu'il n'est pas poussé (`git commit --amend`), annuler un commit déjà partagé en créant un commit inverse (`git revert <commit>`) ;
3. la page précise, pour `git restore <fichier>`, que les modifications abandonnées ne sont pas récupérables.

Détail complet : annexe B du document de TP, feature F1.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F2 : Page « Glossaire »" --label "niveau 1" --body-file - <<'EOF_ISSUE'
Niveau : 1

Zone : Contenu

Branche proposée : `feat/2-page-glossaire`

On crée `src/content/glossaire.md` et on l'ajoute à la fin de `pages.json`.

Critères d'acceptation :

1. le titre de niveau 1 est « Glossaire » et il apparaît sur l'accueil ;
2. la page définit au moins huit termes, dont : branche, commit, conflit, dépôt distant, fusion, pull request, review, zone de préparation ;
3. les termes sont présentés en liste à puces, par ordre alphabétique, au format `**terme** : définition` ;
4. chaque définition tient en une ou deux phrases.

Détail complet : annexe B du document de TP, feature F2.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F3 : Page « Travailler avec un dépôt distant »" --label "niveau 1" --body-file - <<'EOF_ISSUE'
Niveau : 1

Zone : Contenu

Branche proposée : `feat/3-page-depot-distant`

On crée `src/content/depot-distant.md` et on l'ajoute dans `pages.json`, juste après `depot-local.md`.

Critères d'acceptation :

1. le titre de niveau 1 est « Travailler avec un dépôt distant » et il apparaît sur l'accueil ;
2. la page présente `git remote -v`, `git fetch`, `git pull`, `git push` et `git push -u origin <branche>`, chacune avec un bloc de code ;
3. une section explique la différence entre `git fetch` (téléchargement sans modification de la branche courante) et `git pull` (téléchargement puis intégration dans la branche courante) ;
4. la page se termine par un lien vers la page des branches : `[les branches](#/page/branches)`.

Détail complet : annexe B du document de TP, feature F3.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F4 : Documentation de l'architecture" --label "niveau 2" --body-file - <<'EOF_ISSUE'
Niveau : 2

Zone : Documentation

Branche proposée : `docs/4-architecture`

On crée `docs/architecture.md` et on ajoute un lien vers ce fichier dans la section « Structure du projet » du `README.md`.

Critères d'acceptation :

1. le document décrit le rôle de chacun des cinq modules de `src/js/` en deux à quatre phrases ;
2. il décrit, étape par étape, ce qui se passe entre le clic sur un titre de l'accueil et l'affichage de la page, en citant les fonctions appelées (`parseRoute`, `renderPage`, `renderMarkdown`...) ;
3. il explique pourquoi le site a besoin du manifeste `pages.json` ;
4. il explique comment le moteur Markdown empêche l'injection de HTML.

Détail complet : annexe B du document de TP, feature F4.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F5 : Nombre de pages sur l'accueil" --label "niveau 2" --body-file - <<'EOF_ISSUE'
Niveau : 2

Zone : Accueil

Branche proposée : `feat/5-compteur-pages`

Critères d'acceptation :

1. sous le titre « Pages disponibles », un paragraphe indique le nombre de pages : « 4 pages publiées » ;
2. le singulier est respecté : « 1 page publiée » ;
3. quand il n'y a aucune page, le message existant « Aucune page publiée. » reste le seul affiché ;
4. le libellé est produit par une fonction exportée `formatPageCount(count)` dans `views.js`, testée dans un nouveau fichier `tests/views.test.js` (au moins les cas 1 et 4).

Détail complet : annexe B du document de TP, feature F5.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F6 : Tri alphabétique des pages" --label "niveau 2" --body-file - <<'EOF_ISSUE'
Niveau : 2

Zone : Chargement

Branche proposée : `feat/6-tri-alphabetique`

Critères d'acceptation :

1. l'accueil affiche les pages dans l'ordre alphabétique de leur titre, quel que soit l'ordre du manifeste ;
2. le tri respecte les règles du français : « Écrire » se place entre « Dépôt » et « Fusion » ; on utilise `Intl.Collator` avec la locale `fr`, ou `localeCompare` avec les mêmes paramètres ;
3. le tri est réalisé par une fonction exportée `sortByTitle(pages)` de `pages.js`, qui renvoie un nouveau tableau sans modifier celui reçu ;
4. le test existant « conserve l'ordre du manifeste » est remplacé par un test du nouvel ordre, et un test vérifie le cas des accents ;
5. la phrase du `README.md` qui parle de « la position souhaitée dans la liste » est mise à jour.

Détail complet : annexe B du document de TP, feature F6.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F7 : Titres sans syntaxe Markdown sur l'accueil" --label "niveau 2" --body-file - <<'EOF_ISSUE'
Niveau : 2

Zone : Moteur Markdown

Branche proposée : `fix/7-titres-sans-markdown`

Constat : une page dont le titre est `# Les commandes **essentielles**` apparaît sur l'accueil avec les astérisques. La fonction `extractTitle` renvoie le texte brut du titre, sans interpréter la syntaxe en ligne. On reproduit le problème avant de le corriger, en créant temporairement une page de test, qu'on ne commite pas.

Critères d'acceptation :

1. `extractTitle` renvoie le texte sans syntaxe : `# Les commandes **essentielles**` donne `Les commandes essentielles`, `` # La commande `git switch` `` donne `La commande git switch`, `# Lire [Pro Git](https://git-scm.com/book/fr/v2)` donne `Lire Pro Git` ;
2. le traitement est fait par une fonction exportée `stripInline(text)` dans `markdown.js` ;
3. un test couvre chacun des trois exemples ci-dessus.

Détail complet : annexe B du document de TP, feature F7.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F8 : Mise en forme du code" --label "niveau 1" --body-file - <<'EOF_ISSUE'
Niveau : 1

Zone : Styles

Branche proposée : `feat/8-style-code`

Critères d'acceptation :

1. le code en ligne a un fond coloré (`var(--color-surface)`), une marge intérieure horizontale et des coins arrondis ;
2. les blocs de code ont une bordure de 1 pixel (`var(--color-border)`) et des coins arrondis ;
3. la taille du texte du code vaut 0,9 fois celle du texte courant (`0.9em`) ;
4. le code situé dans un bloc ne reçoit pas le fond et la marge du code en ligne (sélecteur `.markdown-body pre code`) ;
5. aucune couleur n'est écrite en dur : on n'utilise que les variables de `:root`.

Détail complet : annexe B du document de TP, feature F8.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F9 : Mode sombre automatique" --label "niveau 2" --body-file - <<'EOF_ISSUE'
Niveau : 2

Zone : Styles

Branche proposée : `feat/9-mode-sombre`

Critères d'acceptation :

1. quand le système de l'utilisateur est réglé en mode sombre, le site s'affiche en mode sombre ; on utilise la requête média `@media (prefers-color-scheme: dark)` qui redéfinit les variables de `:root` ;
2. on ajoute `color-scheme: light dark;` dans `:root`, pour que le navigateur adapte aussi ses propres éléments (barres de défilement, champs de formulaire) ;
3. le contraste entre le texte et le fond est d'au moins 4,5 pour 1 (niveau AA des WCAG) pour le texte courant, les liens et le texte du pied de page ; on le vérifie avec l'outil de contraste des outils de développement du navigateur ;
4. pour tester sans changer le réglage de son système, dans Chrome : outils de développement (`F12`), puis menu de commandes (`Ctrl+Maj+P`), puis commande **Show Rendering**, puis option **Emulate CSS media feature prefers-color-scheme**.

Détail complet : annexe B du document de TP, feature F9.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F10 : Listes numérotées" --label "niveau 3" --body-file - <<'EOF_ISSUE'
Niveau : 3

Zone : Moteur Markdown

Branche proposée : `feat/10-listes-numerotees`

Critères d'acceptation :

1. une ligne au format `1. texte` (un à neuf chiffres, un point, au moins une espace) produit un élément `<li>` dans une liste `<ol>` ; les lignes consécutives forment une seule liste ;
2. si le premier numéro n'est pas 1, la liste reçoit l'attribut `start` : une liste qui commence par `3.` produit `<ol start="3">` ;
3. passer d'une ligne `- texte` à une ligne `1. texte` ferme la liste à puces et ouvre une liste numérotée, et inversement ;
4. au moins quatre tests couvrent ces cas, plus le cas d'un paragraphe suivi d'une liste numérotée ;
5. aucune fonction ne dépasse le seuil de complexité cognitive signalé par SonarQube Cloud (règle `javascript:S3776`, seuil de 15) : si `handleTextLine` devient trop complexe, on la découpe.

Détail complet : annexe B du document de TP, feature F10.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F11 : Navigation page précédente et page suivante" --label "niveau 3" --body-file - <<'EOF_ISSUE'
Niveau : 3

Zone : Navigation

Branche proposée : `feat/11-navigation-pages`

Critères d'acceptation :

1. en bas de chaque page, un bloc de navigation propose un lien vers la page précédente et un lien vers la page suivante, dans l'ordre de l'accueil ; chaque lien affiche le titre de la page visée ;
2. la première page n'a pas de lien « précédente », la dernière n'a pas de lien « suivante » ;
3. le bloc est un élément `<nav>` avec l'attribut `aria-label="Pages précédente et suivante"` ;
4. le calcul des pages voisines est fait par une fonction exportée et testée, qui reçoit la liste des pages et l'identifiant (`slug`) de la page courante.

Détail complet : annexe B du document de TP, feature F11.
EOF_ISSUE

gh issue create --repo "$REPO" --title "F12 : Filtre de recherche sur l'accueil" --label "niveau 3" --body-file - <<'EOF_ISSUE'
Niveau : 3

Zone : Accueil

Branche proposée : `feat/12-recherche-accueil`

Critères d'acceptation :

1. au-dessus de la liste, un champ `<input type="search">` associé à un `<label>` « Filtrer les pages » ;
2. la liste se filtre à chaque frappe (événement `input`) : seules restent les pages dont le titre contient le texte saisi ;
3. la comparaison ignore la casse et les accents : « depot » trouve « Travailler dans un dépôt local » ; on peut utiliser `normalize('NFD')` puis supprimer les caractères de la catégorie Unicode `\p{M}` ;
4. si aucune page ne correspond, un message indique : « Aucune page ne correspond à « texte saisi ». » ;
5. la comparaison est faite par une fonction exportée `matchesQuery(title, query)` dans `views.js`, testée dans un nouveau fichier `tests/views.test.js` (casse, accents, texte vide).

Détail complet : annexe B du document de TP, feature F12.
EOF_ISSUE

gh issue create --repo "$REPO" --title "Compléter la liste des contributeurs" --body-file - <<'EOF_ISSUE'
Issue commune à toute l'équipe (partie 1 du TP).

Chaque membre de l'équipe remplace la ligne « À compléter » de son numéro de contributeur dans `CONTRIBUTEURS.md` par `Prénom Nom, @compte-github`.

Branche : `docs/13-contributeur-prenom`. Les pull requests référencent cette issue avec `Refs #13`, sans la fermer.
EOF_ISSUE

echo "Issues créées :"
gh issue list --repo "$REPO" --state open --limit 20
