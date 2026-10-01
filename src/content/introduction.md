# Introduction à Git

Git est un **système de gestion de versions décentralisé**. Il enregistre l'historique des modifications d'un ensemble de fichiers et permet à plusieurs personnes de travailler en parallèle sur le même projet.

## Pourquoi décentralisé

Chaque développeur possède une copie complète du dépôt, historique compris. On peut donc consulter l'historique, créer des branches et enregistrer des versions sans connexion réseau. Le dépôt distant (par exemple sur GitHub) sert de point d'échange entre les membres de l'équipe.

## Les trois zones de travail

- le **répertoire de travail** : les fichiers tels qu'on les voit et qu'on les modifie ;
- la **zone de préparation** (_staging area_ ou _index_) : les modifications sélectionnées pour le prochain commit ;
- le **dépôt** : l'historique des commits, stocké dans le dossier `.git`.

## Configurer son identité

Chaque commit enregistre le nom et l'adresse e-mail de son auteur. On les configure une fois pour toutes :

```bash
git config --global user.name "Prénom Nom"
git config --global user.email "adresse@exemple.fr"
```

Pour aller plus loin : [le livre Pro Git](https://git-scm.com/book/fr/v2).
