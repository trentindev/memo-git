# TP pull requests : consignes du chef de projet

## Le rôle du chef de projet

Le chef de projet prépare le dépôt sur lequel l'équipe travaille, puis il anime le TP. Il réalise, dans l'ordre :

1. la création du dépôt GitHub à partir du projet de départ ;
2. les réglages du dépôt, pour que toute modification passe par une pull request relue ;
3. la création des issues du catalogue de features ;
4. la connexion du dépôt à SonarQube Cloud ;
5. l'invitation des membres de l'équipe et le lancement du TP ;
6. l'animation des points d'équipe et le déblocage des situations qui coincent.

Le dépôt appartient au compte GitHub du chef de projet : lui seul a accès à ses réglages (onglet **Settings**). Les autres membres de l'équipe sont des collaborateurs. Une fois le dépôt prêt, le chef de projet fait le TP comme les autres : il crée ses branches, ouvre ses pull requests et relit celles de ses coéquipiers.

Les sections 2 à 8 se suivent dans l'ordre. Un point demande une attention particulière : les issues (section 6) doivent être créées avant toute pull request. GitHub numérote les issues et les pull requests avec le même compteur, et le document de TP suppose que les features portent les numéros #1 à #12.

Il est conseillé de faire cette préparation en partage d'écran : l'équipe voit ainsi comment un dépôt se configure. Les membres de l'équipe qui ne suivent pas le partage d'écran réalisent pendant ce temps la section 1.1 du document de TP (vérification des outils) et lisent les règles du TP.

## 1. Ce qu'il faut avant de commencer

Sur son poste, le chef de projet dispose de :

1. Git ; sous Windows, Git for Windows, et toutes les commandes se tapent dans **Git Bash** ;
2. Node.js 22.13 ou supérieur ;
3. GitHub CLI, la commande `gh`, à installer depuis https://cli.github.com ;
4. le script `creer_issues.sh`, fourni avec ce document ;
5. le nom du compte GitHub de chaque membre de l'équipe.

GitHub CLI permet de piloter GitHub depuis le terminal : créer un dépôt, créer des issues, lister des pull requests. On le connecte à son compte GitHub une seule fois :

```bash
gh auth login
```

La commande pose quatre questions. On répond **GitHub.com**, puis **HTTPS**, puis **Yes** à la question qui propose d'authentifier Git avec ses identifiants GitHub, puis **Login with a web browser**. Un code à usage unique s'affiche : on le copie, on appuie sur `Entrée`, et on le colle dans la page que le navigateur ouvre.

On vérifie la connexion :

```bash
gh auth status
```

La commande doit afficher `Logged in to github.com account`, suivi du nom de son compte.

On vérifie aussi son identité Git, comme dans la section 1.1 du document de TP.

## 2. Créer le dépôt

Le projet de départ est publié dans un dépôt public : https://github.com/trentindev/memo-git. Le chef de projet en récupère une copie sur son poste, puis il crée à partir de cette copie son propre dépôt GitHub : c'est sur ce dépôt que l'équipe travaillera.

On se place dans le dossier où on range ses projets, puis :

```bash
git clone https://github.com/trentindev/memo-git.git
cd memo-git
git remote remove origin
gh repo create memo-git --public --source=. --remote=origin
git push -u origin main
```

Ce que fait chaque commande :

| Commande | Rôle |
| --- | --- |
| `git clone <adresse>` | Copie le dépôt de départ sur son poste, avec tout son historique, dans un dossier `memo-git`. Git enregistre l'adresse d'origine sous le nom `origin`. |
| `cd memo-git` | Se place dans le dossier du projet. |
| `git remote remove origin` | Supprime le lien vers le dépôt de départ. Les fichiers et l'historique ne sont pas touchés. |
| `gh repo create memo-git ...` | Crée un dépôt `memo-git` vide sur son propre compte GitHub et l'enregistre dans le dépôt local. |
| `git push -u origin main` | Envoie la branche `main` vers ce nouveau dépôt. L'option `-u` mémorise le lien entre la branche locale et la branche distante : les commandes `git push` et `git pull` suivantes n'ont plus besoin de précision. |

Les options de `gh repo create` :

| Option | Rôle |
| --- | --- |
| `--public` | Le dépôt est public |
| `--source=.` | Le dépôt GitHub est rattaché au dépôt local situé dans le dossier courant |
| `--remote=origin` | Le dépôt GitHub est enregistré dans le dépôt local sous le nom `origin` |

Pourquoi supprimer le lien vers le dépôt de départ : après le clonage, `origin` désigne le dépôt `trentindev/memo-git`, sur lequel le chef de projet n'a pas le droit de pousser. On libère ce nom pour le donner au dépôt de l'équipe.

On n'utilise pas le bouton **Fork** de GitHub, pour deux raisons : une pull request ouverte depuis un fork cible par défaut le dépôt d'origine et non le fork, et les issues sont désactivées par défaut sur un fork.

Le dépôt doit être public pour deux raisons : sur un compte GitHub gratuit, les règles de protection de branche (section 5) ne sont disponibles que sur les dépôts publics, et l'offre gratuite de SonarQube Cloud analyse sans limite de taille les projets publics.

On vérifie que le dépôt local connaît le dépôt GitHub, puis on ouvre la page du dépôt dans le navigateur :

```bash
git remote -v
gh repo view --web
```

`git remote -v` doit afficher deux lignes commençant par `origin`, avec l'adresse `https://github.com/<proprietaire>/memo-git.git`. Dans tout ce document, `<proprietaire>` désigne le nom du compte GitHub du chef de projet.

Sans GitHub CLI, on remplace la commande `gh repo create` par ces étapes : sur GitHub, on crée un dépôt public vide nommé `memo-git`, sans README, sans `.gitignore` et sans licence, puis on tape :

```bash
git remote add origin https://github.com/<proprietaire>/memo-git.git
git push -u origin main
```

`git remote add origin <adresse>` enregistre le dépôt GitHub sous le nom `origin`.

On peut également partir de l'archive `memo-git.zip`, si elle a été fournie, au lieu de cloner le dépôt de départ. On la décompresse, on ouvre un terminal dans le dossier `memo-git` obtenu, et on remplace les trois premières commandes par :

```bash
git init -b main
git add .
git commit -m "chore: initialiser le projet Mémo Git"
```

`git init -b main` transforme le dossier en dépôt Git et nomme `main` sa première branche. Les deux commandes suivantes créent le premier commit du projet. On poursuit ensuite avec `gh repo create` et `git push`, comme ci-dessus.

## 3. Vérifier le projet

```bash
npm ci
npm run check
npm start
```

| Commande | Rôle |
| --- | --- |
| `npm ci` | Installe les outils de qualité dans le dossier `node_modules`, exactement dans les versions inscrites dans `package-lock.json`. Contrairement à `npm install`, cette commande ne modifie jamais `package-lock.json`. |
| `npm run check` | Enchaîne ESLint (règles de qualité du JavaScript), Prettier (mise en forme) et les 30 tests unitaires. Les trois doivent réussir. |
| `npm start` | Lance le serveur de développement. On ouvre http://localhost:8080, on parcourt les quatre pages, puis on arrête le serveur avec `Ctrl+C`. |

Le dossier `node_modules` n'est pas versionné : le fichier `.gitignore` l'exclut. On le vérifie avec `git status`, qui doit afficher `nothing to commit, working tree clean`.

## 4. Régler les fusions

Sur la page du dépôt : **Settings**, puis **General**, section **Pull Requests**.

1. Décocher **Allow merge commits**.
2. Garder **Allow squash merging** coché et, dans le menu déroulant situé juste en dessous, choisir **Pull request title**.
3. Décocher **Allow rebase merging**.
4. Cocher **Automatically delete head branches**.

Ce que ces réglages produisent :

| Réglage | Effet |
| --- | --- |
| Seul le squash merging reste autorisé | À la fusion, tous les commits de la branche sont regroupés en un seul commit sur `main`. L'historique de `main` contient donc un commit par pull request. |
| Pull request title | Le message de ce commit reprend le titre de la pull request. C'est pour cela que le titre d'une pull request doit respecter la convention des messages de commit. |
| Automatically delete head branches | GitHub supprime la branche distante dès que sa pull request est fusionnée. Le dépôt ne garde pas de branches mortes. |

## 5. Protéger la branche main

Un ruleset est un ensemble de règles que GitHub applique à certaines branches. On en crée un pour `main`.

**Settings**, puis **Rules**, puis **Rulesets**, puis **New ruleset**, puis **New branch ruleset** :

1. **Ruleset Name** : `protection-main`.
2. **Enforcement status** : **Active**.
3. **Bypass list** : on la laisse vide.
4. **Target branches** : **Add target**, puis **Include default branch**.
5. Dans la liste des règles, cocher **Restrict deletions**.
6. Cocher **Require a pull request before merging**, puis dans les options qui apparaissent : régler **Required approvals** sur 1 et cocher **Require conversation resolution before merging**.
7. Cocher **Block force pushes**.
8. Enregistrer avec **Create**.

Ce que chaque règle impose :

| Règle | Effet |
| --- | --- |
| Bypass list vide | Personne ne contourne les règles, pas même le chef de projet |
| Include default branch | Les règles s'appliquent à la branche par défaut du dépôt, `main` |
| Restrict deletions | Personne ne peut supprimer `main` |
| Require a pull request before merging | Un push direct sur `main` est refusé : toute modification passe par une pull request |
| Required approvals : 1 | Une pull request ne peut être fusionnée qu'après l'approbation d'une autre personne que son auteur |
| Require conversation resolution before merging | La fusion est bloquée tant qu'une conversation de review reste ouverte |
| Block force pushes | Personne ne peut réécrire l'historique de `main` avec `git push --force` |

Quand un membre de l'équipe pousse par erreur sur `main`, Git affiche un refus qui contient le code `GH013: Repository rule violations found`. Rien n'est cassé : il lui suffit de créer une branche à partir de son travail avec `git switch -c <nom-de-branche>`, puis de pousser cette branche.

Si une règle bloque l'équipe à tort, le chef de projet rouvre le ruleset, passe **Enforcement status** sur **Disabled**, enregistre, règle le problème, puis repasse le statut sur **Active**.

## 6. Créer les issues

Le script `creer_issues.sh` crée, dans cet ordre :

1. trois labels, « niveau 1 », « niveau 2 » et « niveau 3 » ;
2. les issues #1 à #12, une par feature du catalogue, chacune avec son niveau, sa zone, le nom de branche proposé et ses critères d'acceptation ;
3. l'issue #13 « Compléter la liste des contributeurs », commune à toute l'équipe pour la partie 1.

On ouvre un terminal dans le dossier qui contient le script, puis :

```bash
bash creer_issues.sh <proprietaire>/memo-git
```

`bash creer_issues.sh` demande à l'interpréteur Bash d'exécuter le fichier. L'argument `<proprietaire>/memo-git` indique au script sur quel dépôt travailler.

Le script utilise trois commandes de GitHub CLI :

| Commande | Rôle |
| --- | --- |
| `gh issue list` et `gh pr list` | Vérifier que le dépôt ne contient encore aucune issue ni aucune pull request. Si ce n'est pas le cas, le script s'arrête sans rien créer, car les numéros ne correspondraient plus au catalogue. |
| `gh label create "niveau 1" --color ... --force` | Créer un label. L'option `--force` met le label à jour s'il existe déjà, au lieu d'échouer. |
| `gh issue create --title ... --label ... --body-file -` | Créer une issue. L'option `--body-file -` lit la description de l'issue sur l'entrée standard : le script la fournit juste après la commande. |

La ligne `set -euo pipefail`, au début du script, l'arrête à la première commande qui échoue. Les issues ne sont donc jamais créées dans le désordre.

On vérifie le résultat :

```bash
gh issue list --repo <proprietaire>/memo-git
```

La liste doit contenir 13 issues, de #1 « F1 : Page « Annuler une modification » » à #13 « Compléter la liste des contributeurs ».

Si le script s'arrête en cours de route, par exemple à cause d'une coupure réseau, on ne le relance pas : il refuserait de s'exécuter. On note le numéro de la dernière issue créée, puis on crée les suivantes à la main sur GitHub (onglet **Issues**, bouton **New issue**), dans l'ordre du catalogue, en copiant le titre et les critères d'acceptation depuis l'annexe B du document de TP.

## 7. Connecter SonarQube Cloud

SonarQube Cloud analyse le code de chaque pull request et publie son rapport directement dans la pull request. On utilise son analyse automatique : SonarQube Cloud lit le code dans le dépôt GitHub, sans pipeline à écrire. Le fichier `.sonarcloud.properties`, déjà présent à la racine du projet, lui indique où se trouvent le code source et les tests.

Premier cas : le chef de projet n'a jamais utilisé SonarQube Cloud avec son compte GitHub.

1. Sur https://sonarcloud.io, se connecter avec **GitHub**.
2. Ouvrir le menu **+**, en haut à droite, et choisir **Create new organization**.
3. Sous **Import from a DevOps platform**, choisir **GitHub**. La page d'installation de l'application GitHub **SonarQubeCloud** s'ouvre : sélectionner son compte personnel.
4. Dans le choix de l'accès aux dépôts, sélectionner **Only select repositories**, choisir `memo-git`, puis valider l'installation.
5. De retour sur SonarQube Cloud, accepter la clé d'organisation proposée, choisir l'offre **Free**, puis cliquer sur **Create Organization**.
6. Sélectionner le dépôt `memo-git` et lancer la configuration. Quand SonarQube Cloud demande comment définir le nouveau code, choisir **Previous version**.

Second cas : le compte GitHub est déjà relié à une organisation SonarQube Cloud, par exemple depuis le TD SonarQube Cloud du module.

1. Dans SonarQube Cloud, ouvrir **Administration**, puis **Organization Settings**, puis **Organization binding**, et cliquer sur le lien **Repository Access settings**.
2. Dans la page GitHub qui s'ouvre, ajouter `memo-git` à la liste des dépôts accessibles, puis cliquer sur **Save**.
3. De retour sur SonarQube Cloud, ouvrir le menu **+**, choisir **Analyze new project**, sélectionner `memo-git` et lancer la configuration, avec **Previous version** pour la définition du nouveau code.

Dans les deux cas, SonarQube Cloud lance alors seul une première analyse de la branche `main`. On attend qu'elle soit terminée, puis on vérifie, dans **Administration**, **Analysis Method**, que **Automatic Analysis** est activée.

On copie l'adresse de la page du projet affichée dans le navigateur : on la communiquera à l'équipe. Le dépôt étant public, cette page se consulte sans compte SonarQube Cloud.

Deux notions à connaître pour la suite :

1. dans une pull request, le résultat de SonarQube Cloud apparaît sous la forme d'une vérification nommée `SonarCloud Code Analysis` ;
2. son verdict s'appelle la quality gate : **Passed** ou **Failed**. L'annexe D du document de TP explique comment le lire.

Facultatif, une fois les premières pull requests de la partie 1 ouvertes : on peut demander à GitHub de bloquer la fusion quand la quality gate échoue. Dans le ruleset `protection-main`, on coche **Require status checks to pass**, on clique sur **Add checks** et on ajoute `SonarCloud Code Analysis`. Cette vérification n'apparaît dans la liste qu'après avoir été exécutée au moins une fois sur le dépôt.

## 8. Inviter l'équipe

**Settings**, puis **Collaborators**, puis **Add people** : on saisit le nom du compte GitHub d'un membre de l'équipe, on le sélectionne et on valide. On recommence pour chaque membre.

Un collaborateur peut pousser des branches, ouvrir, relire et fusionner des pull requests, et s'assigner des issues. Il ne peut pas modifier les réglages du dépôt.

Tant qu'une invitation n'est pas acceptée, elle apparaît dans cette page avec la mention **Pending Invite**, et tous les pushs de la personne concernée sont refusés avec une erreur 403. Une invitation expire sept jours après son envoi : si un membre rejoint l'équipe lors d'une séance ultérieure, on vérifie son invitation et on la renvoie au besoin.

## 9. Lancer le TP

1. Communiquer à l'équipe l'adresse du dépôt, `https://github.com/<proprietaire>/memo-git`, et l'adresse du projet SonarQube Cloud.
2. Vérifier, dans **Settings**, **Collaborators**, que plus aucune invitation ne porte la mention **Pending Invite**.
3. Faire attribuer les numéros de contributeur, de 1 à 5, par ordre alphabétique des prénoms, comme l'indique la section « Avant de commencer » du document de TP. Le chef de projet a lui aussi un numéro.
4. Commencer soi-même la partie 1 du TP.

## 10. Animer le TP

### Suivre l'avancement

L'onglet **Pull requests** du dépôt liste les pull requests ouvertes, et le filtre **Closed** celles qui sont fusionnées. L'onglet **Issues** montre, pour chaque feature, qui s'en est chargé. Depuis le terminal :

```bash
gh pr list --repo <proprietaire>/memo-git --state all
```

L'option `--state all` affiche toutes les pull requests, qu'elles soient ouvertes, fusionnées ou fermées. Sans elle, seules les pull requests ouvertes sont listées.

### Animer les points d'équipe

Le document de TP prévoit trois moments où le chef de projet réunit l'équipe :

1. le point d'équipe 1, quand toutes les pull requests de la partie 1 sont fusionnées ;
2. le point d'équipe 2, quand chacun a fusionné sa première feature ;
3. le bilan, quand chacun a fusionné sa seconde feature.

À chaque point, on fait le tour de l'équipe : chacun indique ce qui lui a posé problème, puis annonce la feature qu'il choisit pour la suite.

### Veiller à ce que chacun tourne et essaie

1. Chaque membre de l'équipe relit au moins une pull request par partie, et les reviewers changent d'une partie à l'autre.
2. Les features de niveau 1 sont laissées en priorité à ceux qui débutent.
3. Aucune pull request ne reste sans reviewer : si un reviewer désigné n'est pas disponible, l'auteur en désigne un autre.
4. Ceux qui sont à l'aise tentent une feature du niveau au-dessus, ou développent à deux avec un coéquipier moins à l'aise.

### Débloquer les situations courantes

| Symptôme | Cause | Solution |
| --- | --- | --- |
| Un push est refusé avec `GH013: Repository rule violations found` | Push direct sur `main` | Créer une branche avec `git switch -c <nom-de-branche>`, puis pousser cette branche |
| Un push est refusé avec une erreur 403 | Invitation au dépôt non acceptée | Faire accepter l'invitation, geste G1 du document de TP |
| Le bouton de fusion est désactivé | Approbation manquante ou conversation non résolue | Lire le cadre de fusion en bas de la pull request : GitHub indique la condition qui manque |
| La vérification `SonarCloud Code Analysis` n'apparaît pas dans une pull request | La pull request ne cible pas `main`, ou l'analyse automatique est désactivée, ou l'application SonarQubeCloud n'a pas accès au dépôt | Vérifier la branche cible de la pull request, puis les réglages de la section 7 |
| GitHub affiche **This branch has conflicts that must be resolved** | `main` a évolué depuis la création de la branche | L'auteur suit les sections 3.2 et 3.3 du document de TP |

### Si le TP se poursuit lors d'une autre séance

Il n'y a rien à refaire : le dépôt, les issues et les pull requests conservent l'état du travail. À la reprise, chacun met son dépôt local à jour :

```bash
git switch main
git pull
git fetch --prune
```

`git fetch --prune` retire du dépôt local les références aux branches distantes que GitHub a supprimées après leur fusion.

Le chef de projet fait ensuite le tour des pull requests encore ouvertes avec l'équipe, et vérifie les invitations en attente (section 8).

## 11. Contenu du projet de départ

```text
src/                    le site (HTML, CSS, JavaScript, pages Markdown)
tests/                  30 tests unitaires (node:test)
scripts/serve.mjs       serveur de développement sans dépendance
.github/                modèle de description des pull requests
.sonarcloud.properties  configuration de l'analyse automatique
Consignes TP/           documents du TP
README.md, CONTRIBUTING.md, CONTRIBUTEURS.md
eslint.config.js, .prettierrc.json, .editorconfig, .gitattributes, .gitignore
package.json, package-lock.json
```

Le dossier `node_modules` n'en fait pas partie : la commande `npm ci` le crée.
