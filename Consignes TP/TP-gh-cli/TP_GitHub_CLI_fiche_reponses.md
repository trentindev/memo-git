# Fiche de réponses : piloter GitHub depuis le terminal avec GitHub CLI

Nom et prénom :

Compte GitHub :

Adresse du dépôt créé pendant le TP :

Système d'exploitation et terminal utilisés :

On répond à chaque question au moment où le document de TP l'indique. Quand une question demande de copier un résultat de commande, on le colle dans un bloc de code.

À la fin de chaque partie, on indique les difficultés rencontrées : commande qui a échoué, message d'erreur, consigne mal comprise. S'il n'y en a pas eu, on écrit « Aucune ».

La fiche est individuelle.

## Partie 1 : vérifier l'installation et se connecter

### Q1 (section 1.2)

a) Copier le résultat de `gh --version` et celui de `gh auth status`. On copie le résultat tel qu'il s'affiche, avec le jeton masqué par des astérisques.

b) D'après `gh auth status`, quel protocole est utilisé pour les opérations Git ? Quelles autorisations la ligne `Token scopes` liste-t-elle ?

Réponse :

Difficultés rencontrées dans la partie 1 :

## Partie 2 : créer un dépôt et l'explorer

### Q2 (section 2.1)

a) Copier les lignes affichées par `gh repo create`.

b) Sans GitHub CLI, quelles étapes aurait-il fallu enchaîner, dans l'interface web de GitHub puis dans le terminal, pour obtenir le même résultat ?

Réponse :

### Q3 (section 2.2)

a) Copier le résultat de `git remote -v`. Sous quel nom le dépôt GitHub est-il déclaré, et avec quel protocole ? À quel moment du TP ce protocole a-t-il été choisi ?

b) Copier le résultat de `git log --oneline`. On n'a lancé aucune commande `git commit` : d'où vient ce commit ?

Réponse :

Difficultés rencontrées dans la partie 2 :

## Partie 3 : gérer une issue

### Q4 (section 3.2)

a) Copier le résultat de `gh issue list`. Quelle information chaque colonne donne-t-elle ?

b) Que désigne la valeur `@me` passée à l'option `--assignee` ? Quel avantage a-t-elle par rapport au nom du compte écrit en toutes lettres ?

Réponse :

Difficultés rencontrées dans la partie 3 :

## Partie 4 : ouvrir et fusionner une pull request

### Q5 (section 4.2)

a) Copier l'adresse affichée par `gh pr create`. Quel numéro la pull request porte-t-elle ? Pourquoi ne porte-t-elle pas le numéro 1, alors que c'est la première pull request du dépôt ?

b) Que va produire la mention `Closes #1` au moment de la fusion ?

Réponse :

### Q6 (section 4.3)

Copier les lignes affichées par `gh pr merge --squash --delete-branch`. Lister les actions que la commande a réalisées, en précisant pour chacune si elle a eu lieu sur GitHub ou dans le dépôt local.

Réponse :

### Q7 (section 4.4)

a) Copier le résultat de `git log --oneline`. Combien de commits la branche `main` contient-elle ? Quel est le message du dernier, et d'où vient le numéro placé entre parenthèses à la fin ?

b) D'après `gh issue view 1`, dans quel état se trouve l'issue #1 ? On n'a lancé aucune commande pour la fermer : expliquer ce qui s'est passé.

Réponse :

Difficultés rencontrées dans la partie 4 :

## Partie 5 : modifier le dépôt et chercher dans l'aide

### Q8 (section 5.2)

Compléter le tableau en cherchant dans l'aide de GitHub CLI. On n'exécute pas ces commandes.

| Besoin | Commande |
| --- | --- |
| Cloner le dépôt `Hello-World` du compte `octocat` | |
| Renommer le dépôt courant en `bac-a-sable` | |
| Lister uniquement les issues fermées du dépôt courant | |
| Ouvrir la pull request numéro 2 dans le navigateur | |

### Q9 (section 5.3)

a) Pour chacune des actions suivantes, indiquer si on la réalise avec `git` ou avec `gh`, et justifier en une phrase la règle qui permet de trancher.

| Action | Outil |
| --- | --- |
| Créer une branche | |
| Créer un dépôt sur GitHub | |
| Enregistrer une modification dans l'historique | |
| Envoyer une branche sur le dépôt distant | |
| Ouvrir une pull request | |
| Commenter une issue | |

b) Citer une situation où GitHub CLI fait gagner du temps par rapport à l'interface web, et une situation où l'interface web reste préférable.

Réponse :

Difficultés rencontrées dans la partie 5 :
