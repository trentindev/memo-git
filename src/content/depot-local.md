# Travailler dans un dépôt local

## Récupérer un projet existant

La commande `git clone` copie un dépôt distant sur son poste, avec tout son historique :

```bash
git clone https://github.com/proprietaire/projet.git
```

## Enregistrer une modification

On commence toujours par regarder l'état du dépôt :

```bash
git status
```

On ajoute ensuite les fichiers modifiés à la zone de préparation, puis on crée le commit :

```bash
git add chemin/du/fichier.md
git commit -m "docs: corriger une faute dans l'introduction"
```

## Consulter l'historique

- `git log --oneline` affiche un commit par ligne ;
- `git log --oneline --graph --all` dessine aussi les branches ;
- `git diff` montre les modifications qui ne sont pas encore dans la zone de préparation ;
- `git diff --staged` montre celles qui y sont.

Étape suivante : [les branches](#/page/branches).
