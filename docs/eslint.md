<a href="https://eslint.org/">ESLint</a> est un outil d'analyse statique (ou linter) pour le code JavaScript (et TypeScript). Il est conçu pour identifier les erreurs, les mauvaises pratiques et les incohérences dans le code, en se basant sur un ensemble de règles configurables.

# Pourquoi utiliser ESLint ?

- Détection des erreurs : Repère les erreurs de syntaxe ou de logique dans le code avant même son exécution.
- Respect des standards : Aide à maintenir une cohérence dans le style et la structure du code (ex : indentation, usage des guillemets, etc.).
- Meilleures pratiques : Encourage l'écriture d'un code plus sûr et plus maintenable.
- Personnalisation : Permet de définir ses propres règles ou d'adopter des standards prédéfinis, comme Airbnb ou Google.

# Installer eslint

Installer ESLint en tant que dépendance de développement:

```
npm install eslint --save-dev
```

Installer le plugin TypeScript pour ESLint:

```
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

- @typescript-eslint/parser : Permet à ESLint de comprendre le code TypeScript.
- @typescript-eslint/eslint-plugin : Ajoute des règles spécifiques à TypeScript

# Initialiser ESLint

Lancez la commande suivante pour générer un fichier de configuration interactif :

```
npx eslint --init
```

Cette commande vous demandera quelques question question et crée un fichier de configuration (`.eslintrc`), qui peut être au format JSON, YAML, ou JavaScript, en fonction de vos préférences. Ce fichier contient les règles, plugins et paramètres nécessaires pour linting dans votre projet.

## Ajouter les scripts pour exécuter eslint

Dans votre `package.json`, ajoutez ces deux commandes dans la section "scripts" :

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
}
```

- `lint`: Exécute ESLint pour analyser tous les fichiers du projet et signaler les erreurs.
- `lint:fix`: Exécute ESLint pour analyser et corriger automatiquement les erreurs corrigibles.

Exemple de commande:

```
npm run lint
```

Cette commande identifie les erreurs, avertissements ou violations de règles définies dans le fichier `eslint.config.mjs`
