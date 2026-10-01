# Contribuer au projet

## Règle principale

Personne ne pousse directement sur `main`. Toute modification passe par une branche et une pull request relue et approuvée par au moins une autre personne.

## Nommer sa branche

Format : `type/numero-description`

- `type` : un des types de commit listés plus bas ;
- `numero` : le numéro de l'issue GitHub traitée ;
- `description` : deux à cinq mots, en minuscules, sans accent, séparés par des tirets.

Exemples : `feat/12-recherche-accueil`, `fix/7-titres-sans-markdown`, `docs/4-architecture`.

## Écrire ses messages de commit

Le projet suit la convention [Conventional Commits 1.0.0](https://www.conventionalcommits.org/fr/v1.0.0/).

```text
type(portée facultative): description courte à l'infinitif

Corps facultatif : pourquoi la modification est nécessaire.

Closes #12
```

| Type       | Usage                                                                |
| ---------- | -------------------------------------------------------------------- |
| `feat`     | Nouvelle fonctionnalité ou nouveau contenu visible par l'utilisateur |
| `fix`      | Correction d'un bug                                                  |
| `docs`     | Documentation du projet (README, commentaires, guides)               |
| `style`    | Mise en forme du code sans changement de comportement (espaces...)   |
| `refactor` | Restructuration du code sans changement de comportement              |
| `test`     | Ajout ou correction de tests                                         |
| `chore`    | Maintenance (dépendances, configuration)                             |

Attention : `style` ne désigne pas la feuille de style CSS. Une modification de CSS qui change l'apparence du site est un `feat` ou un `fix`.

## Avant de pousser

```bash
npm run check
```

Le lint, la vérification du format et les tests doivent réussir. Si seule la mise en forme échoue, `npm run format` la corrige.

## Ouvrir une pull request

- une pull request traite une seule issue ;
- son titre respecte le format des messages de commit : il devient le message du commit final, car le dépôt fusionne en _squash and merge_ ;
- sa description est rédigée à partir du modèle proposé et contient `Closes #numero` ;
- on ne fusionne pas une pull request dont la quality gate SonarQube Cloud est en échec.
