<a href="https://prettier.io/">Prettier</a> est un outil de formatage de code qui permet de rendre le code plus lisible et cohérent en appliquant des règles de style automatiques. Contrairement à ESLint, qui se concentre sur la détection des erreurs et des problèmes de qualité de code, Prettier formate le code en suivant un ensemble de règles préconfigurées (ou personnalisées) pour garantir un style uniforme.

# Avantages de Prettier

- Gain de temps : Pas besoin de discuter du style de code dans l’équipe.
- Automatisation : Formatage automatique du code sans intervention manuelle.
- Cohérence : Garantit une uniformité du code dans tout le projet.

# Exemple de formatage avant/après

Avant Prettier :

```js
const sum = (a, b) => {
   return a + b
}
```

Après Prettier :

```js
const sum = (a, b) => {
   return a + b
}
```

# Installation et utilisation

## Installation

Pour installer Prettier dans un projet Node.js :

```
npm install --save-dev prettier
```

## Commandes de base

Pour formater un fichier spécifique :

```
npx prettier --write yourfile.js
```

Pour formater tous les fichiers du projet :

```
npx prettier --write .
```

# Configuration

Voici un exemple de fichier de configuration pour Prettier, généralement appelé `.prettierrc`. Ce fichier permet de définir les règles de formatage pour votre projet.

```json
{
   "semi": true, // Ajoute un point-virgule à la fin des déclarations
   "singleQuote": true, // Utilise des guillemets simples au lieu des doubles
   "tabWidth": 2, // Définit l'indentation à 2 espaces
   "trailingComma": "es5", // Ajoute une virgule après le dernier élément dans les objets et les tableaux (comme en ES5)
   "printWidth": 80, // Limite les lignes à 80 caractères
   "bracketSpacing": true, // Ajoute des espaces entre les accolades dans les objets
   "arrowParens": "always" // Force l'utilisation des parenthèses autour des arguments dans les fonctions fléchées
}
```

> Vous pouvez trouver la liste de toutes les configurations de typescript <a href="https://prettier.io/docs/en/options">ici</a>
