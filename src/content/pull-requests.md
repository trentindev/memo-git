# Les pull requests

Une pull request (PR) est une **demande d'intégration** : on propose de fusionner les commits d'une branche dans une autre, généralement `main`. Elle est propre aux plateformes comme GitHub : Git lui-même ne connaît pas cette notion.

## Le cycle de vie d'une pull request

- on pousse sa branche sur le dépôt distant avec `git push -u origin nom-de-branche` ;
- on ouvre la pull request sur GitHub et on désigne un ou plusieurs _reviewers_ ;
- les reviewers relisent le code, commentent et demandent des modifications si besoin ;
- l'auteur corrige en poussant de nouveaux commits sur la même branche : la pull request se met à jour toute seule ;
- une fois la pull request approuvée, on la fusionne et on supprime la branche.

## Ce qu'on vérifie pendant une review

- le code fait ce que l'issue demande, ni plus ni moins ;
- le code est lisible et respecte les conventions du projet ;
- les tests passent et couvrent le nouveau comportement ;
- les messages de commit respectent la convention de l'équipe.

Une review porte sur **le code, jamais sur la personne**. On formule ses remarques comme des propositions argumentées.
