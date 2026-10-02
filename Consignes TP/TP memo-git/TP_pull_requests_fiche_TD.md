# Fiche de TD : travailler en équipe avec les pull requests

Nom et prénom :

Numéro de contributeur (1 à 5) :

Compte GitHub :

Adresse du dépôt :

Adresse du projet SonarQube Cloud :

On répond à chaque question au moment où le document de TP l'indique. Quand une question demande de copier un résultat de commande, on le colle dans un bloc de code.

Sous chaque réponse, on indique les difficultés rencontrées à cette étape : commande qui a échoué, message d'erreur, consigne mal comprise, aide reçue d'un coéquipier. S'il n'y en a pas eu, on écrit « Aucune ».

La fiche est individuelle. Si le TP se poursuit sur une autre séance, on la conserve et on la complète à la reprise.

## Partie 1 : préparer son poste et réaliser sa première pull request

### Q1 (section 1.3)

Copier le résultat de `git remote -v`. Quel nom Git donne-t-il au dépôt distant ? Pourquoi la même adresse apparaît-elle sur deux lignes, suivies de `(fetch)` et `(push)` ?

Réponse :

Difficultés rencontrées :

### Q2 (section 1.4)

a) D'après `CONTRIBUTING.md`, quel nom de branche faut-il créer pour corriger le bug décrit dans l'issue #7 « Titres sans syntaxe Markdown sur l'accueil » ?

b) D'après `README.md`, pourquoi installe-t-on les outils avec `npm ci` plutôt qu'avec `npm install` ?

Réponse :

Difficultés rencontrées :

### Q3 (section 1.6)

Que fait l'option `-u` de `git push -u origin docs/13-contributeur-prenom` ? Quelle commande suffira pour les pushs suivants sur cette branche ?

Réponse :

Difficultés rencontrées :

### Q4 (section 1.7)

Pourquoi la description de cette pull request contient-elle `Refs #13` et non `Closes #13` ? Que se passerait-il avec `Closes #13` ?

Réponse :

Difficultés rencontrées :

### Q5 (section 1.7)

Toutes les pull requests de la partie 1 modifient le même fichier, `CONTRIBUTEURS.md`. Pourquoi aucune n'entre-t-elle en conflit avec les autres ?

Réponse :

Difficultés rencontrées :

### Q6 (section 1.8)

Copier le résultat de `git log --oneline -8`. Retrouver le commit de sa pull request : a-t-il la même empreinte que le commit créé sur sa branche en section 1.6 (comparer avec l'onglet **Commits** de sa pull request) ? Expliquer pourquoi.

Réponse :

Difficultés rencontrées :

### Q7 (section 1.8)

Pourquoi `git branch -d` refuse-t-il de supprimer la branche, alors que sa pull request a bien été fusionnée ?

Réponse :

Difficultés rencontrées :

## Partie 2 : développer une feature et la faire relire

### Q8 (section 2.1)

Quelle feature a-t-on choisie (numéro, intitulé, niveau, zone) ? Pourquoi la règle des zones empêche-t-elle les conflits entre les pull requests de la partie 2 ?

Réponse :

Difficultés rencontrées :

### Q9 (section 2.2)

Écrire le nom de sa branche et expliquer chacune de ses trois parties.

Réponse :

Difficultés rencontrées :

### Q10 (section 2.3)

Copier le résultat de `git log --oneline main..HEAD`. Pour chaque commit, justifier le type choisi.

Réponse :

Difficultés rencontrées :

### Q11 (section 2.5)

Pour chaque pull request relue dans cette partie, indiquer le statut de la quality gate et le nombre de nouveaux problèmes. Pour chaque problème : l'identifiant de la règle, la qualité logicielle touchée et la gravité. Si aucune pull request relue n'a de problème, expliquer pourquoi la condition de couverture de tests n'a pas fait échouer la quality gate.

Réponse :

Difficultés rencontrées :

### Q12 (section 2.5)

Recopier une remarque qu'on a rédigée en tant que reviewer. Quel type de review a-t-on soumis (**Comment**, **Approve** ou **Request changes**), et pourquoi ?

Réponse :

Difficultés rencontrées :

### Q13 (section 2.6)

a) Que devient la pull request quand l'auteur pousse un nouveau commit sur sa branche après une review ?

b) Pourquoi faut-il faire `git pull` sur sa branche après avoir appliqué une suggestion dans GitHub ? Que se passerait-il au push suivant sans ce `git pull` ?

Réponse :

Difficultés rencontrées :

## Partie 3 : seconde feature et résolution de conflits

### Q14 (section 3.2)

Copier le résultat de `git merge origin/main`. S'il y a un conflit, quels fichiers sont concernés ? S'il n'y en a pas, expliquer pourquoi.

Réponse :

Difficultés rencontrées :

### Q15 (section 3.3)

Décrire la résolution choisie pour chaque fichier en conflit et la justifier. Pourquoi lance-t-on `npm run check` avant de commiter la résolution ?

Réponse :

Difficultés rencontrées :

### Q16 (section 3.4)

a) Pourquoi lance-t-on `git fetch origin` avant `git merge origin/main` ?

b) Pourquoi intègre-t-on `main` dans sa branche, au lieu de fusionner sa branche dans `main` en local puis de pousser `main` ?

Réponse :

Difficultés rencontrées :

### Q17 (section 3.5, facultative)

Comparer l'historique de sa branche après un `git merge origin/main` et après un `git rebase origin/main`. Pourquoi utilise-t-on `--force-with-lease` plutôt que `--force` ?

Réponse :

Difficultés rencontrées :

## Bilan

### Q18

a) Le dépôt fusionne en squash and merge. Que montre `git log --oneline --graph -20` sur `main` ? Citer un avantage et un inconvénient de cette méthode de fusion.

b) Citer deux vérifications que SonarQube Cloud a faites à la place des reviewers, et deux vérifications qu'il ne peut pas faire.

c) Quelles features a-t-on livrées, et de quel niveau ? Quels coéquipiers a-t-on relus ? Qu'a-t-on essayé pour la première fois pendant ce TP ?

Réponse :

Difficultés rencontrées :
