# Les branches

Une branche est un **pointeur mobile vers un commit**. Créer une branche ne copie aucun fichier : Git crée simplement un nouveau pointeur, ce qui rend l'opération instantanée.

## Créer une branche et s'y placer

```bash
git switch -c feat/12-recherche-accueil
```

L'option `-c` crée la branche puis s'y place. Sans cette option, `git switch` se place sur une branche existante.

## Nommer une branche

Le nom d'une branche décrit le travail qu'elle contient. Dans ce projet, le format est `type/numero-description`, par exemple `fix/7-titres-sans-markdown` :

- le **type** reprend les types de messages de commit (`feat`, `fix`, `docs`...) ;
- le **numéro** est celui de l'issue GitHub traitée ;
- la **description** tient en quelques mots, en minuscules, séparés par des tirets.

## Rester à jour avec la branche principale

Pendant qu'on travaille, d'autres modifications sont fusionnées dans `main`. On les intègre à sa branche avec :

```bash
git fetch origin
git merge origin/main
```

Si les mêmes lignes ont été modifiées des deux côtés, Git signale un **conflit** qu'il faut résoudre à la main avant de terminer la fusion.

Étape suivante : [les pull requests](#/page/pull-requests).
