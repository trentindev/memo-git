# TP : piloter GitHub depuis le terminal avec GitHub CLI

Module : Versioning et gestion de versions décentralisé (RNCP 39608, bloc BC03)

Format : travail individuel, 30 minutes.

## Objectifs du TP

À la fin du TP, on sait :

1. expliquer ce que fait GitHub CLI et ce qui le distingue de Git ;
2. connecter GitHub CLI à son compte GitHub ;
3. créer un dépôt GitHub et le cloner en une seule commande ;
4. créer, lister, consulter et commenter une issue ;
5. ouvrir une pull request, la consulter et la fusionner ;
6. modifier les informations d'un dépôt et retrouver une commande dans l'aide.

Toutes les manipulations se font dans le terminal. Le navigateur ne sert qu'à deux moments : pour valider la connexion (section 1.2) et pour constater le résultat.

## GitHub CLI en bref

### Ce que c'est

GitHub CLI est l'outil en ligne de commande officiel de GitHub. Sa commande s'appelle `gh`. Il permet de faire depuis le terminal ce qu'on fait habituellement dans l'interface web de GitHub : créer un dépôt, ouvrir une issue, ouvrir et fusionner une pull request.

### Git et GitHub CLI : deux outils, deux rôles

GitHub CLI ne remplace pas Git. Les deux outils se complètent :

| Outil | Rôle | Exemples |
| --- | --- | --- |
| `git` | Gérer l'historique du dépôt local et l'échanger avec le dépôt distant | `git commit`, `git switch`, `git push` |
| `gh` | Agir sur les objets de la plateforme GitHub | `gh repo create`, `gh issue create`, `gh pr merge` |

Un commit ou une branche sont des objets Git : ils existent dans n'importe quel dépôt, hébergé ou non sur GitHub. Une issue ou une pull request sont des objets de GitHub : Git ne les connaît pas. C'est pour cela qu'il faut un second outil pour les manipuler depuis le terminal.

### La forme d'une commande

```text
gh <commande> <sous-commande> [arguments] [options]
```

La commande désigne l'objet sur lequel on agit, la sous-commande désigne l'action. Exemple :

```bash
gh issue list --state closed
```

Ici, `issue` est la commande, `list` la sous-commande, et `--state closed` une option qui limite la liste aux issues fermées.

Les quatre commandes utilisées dans ce TP :

| Commande | Objet |
| --- | --- |
| `gh auth` | La connexion de GitHub CLI au compte GitHub |
| `gh repo` | Les dépôts |
| `gh issue` | Les issues |
| `gh pr` | Les pull requests |

### Sur quel dépôt la commande agit-elle ?

Quand on lance `gh` dans le dossier d'un dépôt cloné, GitHub CLI lit les dépôts distants déclarés dans Git (ceux qu'affiche `git remote -v`) et agit sur le dépôt GitHub correspondant. C'est pourquoi la plupart des commandes de ce TP se lancent sans préciser le nom du dépôt.

Pour agir sur un autre dépôt, on ajoute l'option `--repo <proprietaire>/<depot>`.

### L'aide intégrée

Chaque niveau de commande a sa page d'aide :

```bash
gh --help
gh repo --help
gh repo create --help
```

La première liste toutes les commandes, la deuxième liste les sous-commandes de `gh repo`, la troisième détaille les options de `gh repo create`. Le manuel complet est en ligne : https://cli.github.com/manual

## La fiche de réponses

Chacun remplit sa propre fiche de réponses, fournie à part. Les questions sont signalées dans ce document par la mention **Fiche de réponses**, suivie du numéro de la question. On y répond au moment où elle apparaît : la plupart des réponses demandent de copier un résultat affiché à cet instant précis.

À la fin de chaque partie, la fiche demande d'indiquer les difficultés rencontrées : commande qui a échoué, message d'erreur, consigne mal comprise. S'il n'y en a pas eu, on écrit « Aucune ».

## Avant de commencer

Cette préparation ne fait pas partie des 30 minutes du TP.

Il faut disposer de :

1. un compte GitHub, et de quoi s'y connecter dans le navigateur ;
2. Git ; sous Windows, Git for Windows, et toutes les commandes de ce document se tapent dans **Git Bash** ;
3. GitHub CLI.

On vérifie que son identité Git est configurée :

```bash
git config --global user.name
git config --global user.email
```

Si une des deux commandes n'affiche rien, on la configure :

```bash
git config --global user.name "Prénom Nom"
git config --global user.email "adresse@exemple.fr"
```

Si GitHub CLI n'est pas installé, on l'installe avec la commande qui correspond à son système :

| Système | Commande |
| --- | --- |
| Windows (dans PowerShell) | `winget install --id GitHub.cli --source winget` |
| macOS (avec Homebrew) | `brew install gh` |
| Linux | Suivre la section de sa distribution dans https://github.com/cli/cli/blob/trunk/docs/install_linux.md |

Sous Windows, l'installation modifie la variable `PATH`. Il faut ouvrir une nouvelle fenêtre de terminal pour que la commande `gh` soit reconnue.

## Le déroulé

| Partie | Contenu | Durée indicative |
| --- | --- | --- |
| 1 | Vérifier l'installation et se connecter | 5 minutes |
| 2 | Créer un dépôt et l'explorer | 6 minutes |
| 3 | Gérer une issue | 5 minutes |
| 4 | Ouvrir et fusionner une pull request | 10 minutes |
| 5 | Modifier le dépôt et chercher dans l'aide | 4 minutes |

Dans les commandes, `<compte>` désigne le nom de son compte GitHub. On le remplace par sa valeur, sans les chevrons.

## Partie 1 : vérifier l'installation et se connecter

### 1.1 Vérifier l'installation

```bash
gh --version
```

La commande affiche le numéro de version et sa date de publication. Si le terminal répond que la commande `gh` est introuvable, on revient à la section « Avant de commencer ».

### 1.2 Se connecter à son compte GitHub

On regarde d'abord si GitHub CLI est déjà connecté :

```bash
gh auth status
```

Si la réponse contient `Logged in to github.com account`, suivi du nom de son compte, la connexion est déjà faite : on passe directement à la question de la fiche. Sinon, on lance la connexion :

```bash
gh auth login
```

La commande pose quatre questions. On choisit une réponse avec les flèches du clavier et on valide avec `Entrée` :

| Question | Réponse |
| --- | --- |
| Where do you use GitHub? | **GitHub.com** |
| What is your preferred protocol for Git operations on this host? | **HTTPS** |
| Authenticate Git with your GitHub credentials? | **Y** |
| How would you like to authenticate GitHub CLI? | **Login with a web browser** |

GitHub CLI affiche ensuite un code à usage unique, de la forme `XXXX-XXXX`. On le copie, on appuie sur `Entrée`, et le navigateur ouvre la page https://github.com/login/device. On y colle le code, puis on autorise GitHub CLI. Le terminal affiche alors `Authentication complete.`, puis `Logged in as`, suivi du nom de son compte.

Ce que cette connexion a mis en place :

1. GitHub a délivré à GitHub CLI un **jeton d'accès** (token), c'est-à-dire une clé qui remplace le mot de passe ; le jeton est enregistré dans le gestionnaire d'identifiants du système d'exploitation, ou, s'il n'y en a pas, dans un fichier de configuration de GitHub CLI ;
2. la réponse **Y** à la troisième question a configuré Git pour qu'il utilise ce même jeton : les commandes `git push` et `git pull` en HTTPS ne demanderont pas d'identifiants.

On vérifie :

```bash
gh auth status
```

La commande affiche le compte connecté, le protocole utilisé pour les opérations Git, le jeton masqué par des astérisques, et la ligne `Token scopes`, qui liste les autorisations accordées à GitHub CLI.

Sous Windows, si les questions de `gh auth login` s'affichent mal ou si les flèches ne répondent pas dans Git Bash, on relance la commande sous cette forme :

```bash
winpty gh auth login
```

**Fiche de réponses : Q1.**

## Partie 2 : créer un dépôt et l'explorer

### 2.1 Créer le dépôt

On se place dans le dossier où on range ses projets, puis :

```bash
gh repo create tp-gh-cli --public --description "Terrain d'essai pour GitHub CLI" --add-readme --clone
```

GitHub CLI confirme la création, affiche l'adresse du dépôt, `https://github.com/<compte>/tp-gh-cli`, puis le clone dans un nouveau dossier `tp-gh-cli`.

| Élément de la commande | Rôle |
| --- | --- |
| `tp-gh-cli` | Nom du dépôt. Comme on ne précise pas de propriétaire, le dépôt est créé sur son propre compte. |
| `--public` | Rend le dépôt visible par tous. Les autres valeurs possibles sont `--private` et `--internal`. |
| `--description "..."` | Renseigne la description affichée sur la page du dépôt. |
| `--add-readme` | Demande à GitHub de créer un fichier `README.md` dans le dépôt. |
| `--clone` | Clone le nouveau dépôt dans le dossier courant. |

On entre dans le dossier du dépôt. Toutes les commandes suivantes se lancent depuis ce dossier :

```bash
cd tp-gh-cli
```

**Fiche de réponses : Q2.**

### 2.2 Explorer le dépôt

On regarde d'abord le dépôt avec Git :

```bash
git remote -v
git log --oneline
```

**Fiche de réponses : Q3.**

On le regarde ensuite avec GitHub CLI :

```bash
gh repo view
gh repo view --web
gh repo list --limit 5
```

| Commande | Rôle |
| --- | --- |
| `gh repo view` | Affiche dans le terminal le nom, la description et le contenu du `README.md` du dépôt. |
| `gh repo view --web` | Ouvre la page du dépôt dans le navigateur. L'option `--web` existe aussi sur `gh issue view`, `gh issue list`, `gh pr view` et `gh pr list`. |
| `gh repo list --limit 5` | Liste les dépôts de son compte, en se limitant à 5. Sans l'option `--limit`, la limite est de 30. |

On revient au terminal pour la suite.

## Partie 3 : gérer une issue

Une issue est une fiche de suivi attachée à un dépôt GitHub : elle décrit un travail à faire, un bug ou une question. Chaque issue porte un numéro.

### 3.1 Créer une issue

GitHub fournit des labels par défaut dans tout nouveau dépôt. On les affiche :

```bash
gh label list
```

On crée l'issue, en lui attribuant le label `documentation` et en se l'assignant :

```bash
gh issue create --title "Compléter le README" --body "Ajouter une section qui liste les commandes gh utilisées pendant le TP." --label documentation --assignee "@me"
```

| Option | Rôle |
| --- | --- |
| `--title` | Titre de l'issue. |
| `--body` | Description de l'issue. |
| `--label` | Label à poser sur l'issue. Il doit déjà exister dans le dépôt. |
| `--assignee "@me"` | Personne chargée de l'issue. La valeur `@me` désigne le compte connecté. |

GitHub CLI affiche l'adresse de l'issue créée. Elle se termine par son numéro : `/issues/1`.

Sans les options `--title` et `--body`, la commande pose les questions une par une dans le terminal. Dans ce TP, on passe tout en options pour obtenir le résultat en une seule ligne.

### 3.2 Lister, consulter et commenter

```bash
gh issue list
gh issue view 1
gh issue comment 1 --body "Je traite cette issue dans la branche docs/1-completer-readme."
gh issue view 1 --comments
```

| Commande | Rôle |
| --- | --- |
| `gh issue list` | Liste les issues ouvertes du dépôt. |
| `gh issue view 1` | Affiche le détail de l'issue numéro 1. |
| `gh issue comment 1 --body "..."` | Ajoute un commentaire à l'issue numéro 1. |
| `gh issue view 1 --comments` | Affiche l'issue avec ses commentaires. |

**Fiche de réponses : Q4.**

## Partie 4 : ouvrir et fusionner une pull request

Une pull request propose d'intégrer les commits d'une branche dans une autre. On va traiter l'issue #1 dans une branche, puis proposer cette branche à la fusion dans `main`.

### 4.1 Préparer la modification avec Git

Cette section n'utilise que Git : on crée une branche, on modifie le `README.md`, on commite et on pousse.

```bash
git switch -c docs/1-completer-readme
printf '\n## Commandes utilisées\n\n- gh repo create\n- gh issue create\n- gh pr create\n- gh pr merge\n' >> README.md
git diff
```

La commande `printf` ajoute une section à la fin du `README.md`. L'opérateur `>>` écrit à la suite du fichier sans effacer son contenu. `git diff` doit montrer uniquement des lignes ajoutées, précédées de `+`.

```bash
git add README.md
git commit -m "docs: lister les commandes gh dans le README"
git push -u origin docs/1-completer-readme
```

### 4.2 Ouvrir la pull request

```bash
gh pr create --title "docs: lister les commandes gh dans le README" --body "Closes #1"
```

GitHub CLI indique qu'il crée une pull request de la branche `docs/1-completer-readme` vers `main`, puis affiche son adresse.

| Élément | Rôle |
| --- | --- |
| Branche de départ | La branche courante. C'est pourquoi on l'a poussée avant de lancer la commande. |
| Branche cible | La branche par défaut du dépôt, ici `main`. L'option `--base` permet d'en choisir une autre. |
| `--body "Closes #1"` | Description de la pull request. Le mot-clé `Closes` suivi d'un numéro d'issue relie la pull request à cette issue. |

On consulte la pull request sans quitter le terminal :

```bash
gh pr list
gh pr view
gh pr diff
```

`gh pr view` et `gh pr diff` sont lancées sans numéro : GitHub CLI choisit alors la pull request de la branche courante. `gh pr diff` affiche les modifications proposées, comme le fait l'onglet **Files changed** de l'interface web.

**Fiche de réponses : Q5.**

### 4.3 Fusionner la pull request

```bash
gh pr merge --squash --delete-branch
```

| Option | Rôle |
| --- | --- |
| `--squash` | Regroupe tous les commits de la branche en un seul commit sur `main`. Les deux autres méthodes sont `--merge` (commit de fusion) et `--rebase`. |
| `--delete-branch` | Supprime la branche après la fusion. |

On lit attentivement les lignes que la commande affiche : chacune correspond à une action.

**Fiche de réponses : Q6.**

### 4.4 Vérifier le résultat

```bash
git branch -a
git log --oneline
gh issue view 1
gh pr list --state merged
```

Deux cas peuvent demander une commande de plus :

1. si `git log --oneline` n'affiche qu'un seul commit, le dépôt local n'a pas récupéré la fusion : on lance `git pull`, puis de nouveau `git log --oneline` ;
2. si `git branch -a` affiche encore `remotes/origin/docs/1-completer-readme`, il s'agit d'une référence locale vers une branche distante qui n'existe plus : on la retire avec `git fetch --prune`.

**Fiche de réponses : Q7.**

## Partie 5 : modifier le dépôt et chercher dans l'aide

### 5.1 Modifier les informations du dépôt

```bash
gh repo edit --description "Dépôt d'entraînement à GitHub CLI" --add-topic github-cli
gh repo view
gh browse
```

| Commande | Rôle |
| --- | --- |
| `gh repo edit` | Modifie les réglages du dépôt : ici sa description et ses topics, les mots-clés affichés sur la page du dépôt. |
| `gh browse` | Ouvre la page du dépôt dans le navigateur. Suivie d'un numéro, par exemple `gh browse 1`, la commande ouvre l'issue ou la pull request qui porte ce numéro. |

Dans le navigateur, on constate que la description et le topic ont changé, que le `README.md` contient la nouvelle section, et que l'onglet **Issues** n'affiche plus d'issue ouverte.

### 5.2 Trouver une commande dans l'aide

Pour répondre à la question suivante, on n'exécute aucune des commandes trouvées : on les cherche dans l'aide, avec `gh repo --help`, `gh issue list --help` et `gh pr view --help`.

**Fiche de réponses : Q8.**

### 5.3 Bilan

**Fiche de réponses : Q9.**

On conserve le dépôt `tp-gh-cli` sur son compte : son adresse figure sur la fiche de réponses et il sert à vérifier le travail. L'annexe B indique comment le supprimer une fois la fiche corrigée.

## Pour aller plus loin (facultatif)

Cette section s'adresse à ceux qui ont terminé avant la fin du temps imparti. Elle n'est pas comptée dans les 30 minutes et ne fait l'objet d'aucune question.

### Obtenir un résultat au format JSON

L'option `--json`, suivie d'une liste de champs, remplace l'affichage en tableau par du JSON, exploitable par un script. L'option `--jq` filtre ce JSON :

```bash
gh issue list --state all --json number,title,state
gh pr list --state merged --json number,title --jq '.[].title'
```

La seconde commande n'affiche que les titres des pull requests fusionnées. La liste des champs disponibles se trouve à la fin de l'aide de chaque commande, sous `JSON FIELDS`.

### Publier une release

Une release est une version publiée du projet, attachée à un tag Git :

```bash
gh release create v0.1.0 --title "Version 0.1.0" --generate-notes
gh release list
git fetch --tags origin
git tag
```

Le tag `v0.1.0` n'existe pas encore : GitHub le crée sur le dernier commit de la branche par défaut. L'option `--generate-notes` demande à GitHub de rédiger les notes de version à partir des pull requests fusionnées. `git fetch --tags origin` récupère ensuite le tag dans le dépôt local.

### Créer un raccourci

```bash
gh alias set il 'issue list --state all'
gh il
gh alias list
```

`gh alias set` définit un mot qui remplace une commande complète : `gh il` exécute `gh issue list --state all`.

## Annexe A : mémo des commandes

### Connexion

| Commande | Rôle |
| --- | --- |
| `gh auth login` | Connecter GitHub CLI à son compte GitHub |
| `gh auth status` | Afficher le compte connecté et les autorisations du jeton |
| `gh auth logout` | Déconnecter GitHub CLI du compte |

### Dépôts

| Commande | Rôle |
| --- | --- |
| `gh repo create <nom> --public --add-readme --clone` | Créer un dépôt sur GitHub et le cloner |
| `gh repo create <nom> --private --source=. --push` | Créer un dépôt sur GitHub à partir du dépôt local du dossier courant, et y pousser ses commits |
| `gh repo clone <proprietaire>/<depot>` | Cloner un dépôt |
| `gh repo view` | Afficher la description et le README du dépôt |
| `gh repo list` | Lister les dépôts de son compte |
| `gh repo edit --description "..."` | Modifier les réglages du dépôt |
| `gh repo rename <nouveau-nom>` | Renommer le dépôt |
| `gh repo fork <proprietaire>/<depot>` | Créer une copie d'un dépôt sur son propre compte |
| `gh repo delete <proprietaire>/<depot>` | Supprimer un dépôt |
| `gh browse` | Ouvrir le dépôt dans le navigateur |

### Issues

| Commande | Rôle |
| --- | --- |
| `gh issue create --title "..." --body "..."` | Créer une issue |
| `gh issue list` | Lister les issues ouvertes |
| `gh issue list --state all` | Lister toutes les issues, ouvertes et fermées |
| `gh issue view <numero>` | Afficher une issue |
| `gh issue comment <numero> --body "..."` | Commenter une issue |
| `gh issue edit <numero> --add-label <label>` | Modifier une issue |
| `gh issue close <numero>` | Fermer une issue |
| `gh issue reopen <numero>` | Rouvrir une issue |

### Pull requests

| Commande | Rôle |
| --- | --- |
| `gh pr create --title "..." --body "..."` | Ouvrir une pull request à partir de la branche courante |
| `gh pr list` | Lister les pull requests ouvertes |
| `gh pr view` | Afficher la pull request de la branche courante |
| `gh pr diff` | Afficher les modifications proposées |
| `gh pr checkout <numero>` | Récupérer en local la branche d'une pull request |
| `gh pr review --approve` | Approuver une pull request |
| `gh pr merge --squash --delete-branch` | Fusionner la pull request et supprimer sa branche |
| `gh pr close <numero>` | Fermer une pull request sans la fusionner |

### Autres commandes utiles

| Commande | Rôle |
| --- | --- |
| `gh label list` | Lister les labels du dépôt |
| `gh release create <tag>` | Publier une release |
| `gh run list` | Lister les exécutions de GitHub Actions |
| `gh status` | Afficher ses issues, pull requests et notifications sur l'ensemble de ses dépôts |

## Annexe B : en cas de problème

### Le terminal ne reconnaît pas la commande `gh`

GitHub CLI n'est pas installé, ou le terminal a été ouvert avant l'installation. On installe GitHub CLI (section « Avant de commencer »), puis on ouvre une nouvelle fenêtre de terminal.

### `gh auth login` ne réagit pas aux flèches dans Git Bash

Le terminal par défaut de Git for Windows, MinTTY, gère mal les questions interactives de GitHub CLI. On préfixe la commande avec `winpty` (`winpty gh auth login`), ou on lance la commande dans Windows Terminal ou PowerShell. La connexion est valable pour tous les terminaux du poste.

### Une commande répond qu'il faut d'abord lancer `gh auth login`

GitHub CLI n'est pas connecté. On reprend la section 1.2.

### `gh repo create` répond que le nom existe déjà

Un dépôt `tp-gh-cli` existe déjà sur son compte. On choisit un autre nom, par exemple `tp-gh-cli-2`, et on l'utilise dans la suite du TP à la place de `tp-gh-cli`.

### Une commande `gh issue` ou `gh pr` répond qu'elle n'est pas dans un dépôt Git

Le terminal n'est pas dans le dossier du dépôt. On s'y replace avec `cd tp-gh-cli`.

### `gh issue create` signale que le label est introuvable

Le label demandé n'existe pas dans le dépôt. On vérifie son orthographe avec `gh label list`.

### `gh pr create` demande où pousser la branche

La branche n'a pas été poussée. On interrompt la commande avec `Ctrl+C`, on lance `git push -u origin docs/1-completer-readme`, puis on relance `gh pr create`.

### L'affichage reste bloqué sur un long résultat

Si un pager est configuré sur le poste, GitHub CLI y envoie les résultats trop longs pour l'écran. On fait défiler avec les flèches et on quitte avec la touche `q`.

### Supprimer le dépôt après la correction

La suppression d'un dépôt est définitive. Par sécurité, le jeton de GitHub CLI n'en a pas l'autorisation par défaut. On l'ajoute, puis on supprime le dépôt :

```bash
gh auth refresh -s delete_repo
gh repo delete <compte>/tp-gh-cli
```

`gh auth refresh -s delete_repo` relance la validation par le navigateur, comme en section 1.2, pour ajouter l'autorisation `delete_repo` au jeton. `gh repo delete` demande ensuite de retaper le nom complet du dépôt pour confirmer. Il reste à supprimer le dossier local `tp-gh-cli`.

## Annexe C : sources

1. Manuel de GitHub CLI : https://cli.github.com/manual
2. `gh auth login` : https://cli.github.com/manual/gh_auth_login
3. `gh repo create` : https://cli.github.com/manual/gh_repo_create
4. `gh issue create` : https://cli.github.com/manual/gh_issue_create
5. `gh pr create` : https://cli.github.com/manual/gh_pr_create
6. `gh pr merge` : https://cli.github.com/manual/gh_pr_merge
7. Installation de GitHub CLI : https://github.com/cli/cli#installation
8. Lier une pull request à une issue (mots-clés de fermeture) : https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue
