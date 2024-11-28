# Typescript

TypeScript est un superset de JavaScript. Cela signifie qu'il est basé sur JavaScript mais ajoute des fonctionnalités supplémentaires, notamment :

- Typage statique
- Vérification des erreurs à la compilation
- Prise en charge des fonctionnalités modernes de JavaScript
- Système de classes et d'interfaces

Pour initialiser TypeScript dans un projet, il suffit d'installer les bibliothèques nécessaires en tant que dépendances de développement. Cela permet d'exécuter les fichiers TypeScript directement dans Node.js. Voici la commande à utiliser :

```
npm install --save-dev typescript ts-node ts-node-dev @types/node
```

Une fois l'installation terminée, il suffit d'exécuter la commande suivante pour initialiser le fichier de configuration de TypeScript :

```
npx tsc --init
```

Cette commande génère un fichier `tsconfig.json` contenant les configurations par défaut fournies par TypeScript. Vous pouvez ensuite modifier ce fichier en fonction des besoins spécifiques de votre projet. Par exemple :

```json
{
   "compilerOptions": {
      "target": "ESNext",
      "module": "CommonJS",
      "strict": true,
      "esModuleInterop": true,
      "outDir": "./dist",
      "rootDir": "./src"
   },
   "include": ["src/**/*"],
   "exclude": ["node_modules"]
}
```

> Vous pouvez trouver la liste de toutes les configurations de typescript <a href="https://www.typescriptlang.org/tsconfig/">ici</a>

Enfin, ajoutez les scripts suivants dans le fichier package.json. Ces scripts vous permettront de réaliser un build ou de démarrer le projet en mode développement :

```json
...
 "scripts": {
      "test": "jest",
      "start:build": "tsc -p .",
      "start:dev": "ts-node-dev --respawn --transpile-only  src/index.ts",
      "start:prod": "tsc -p . && NODE_ENV=prod node dist/index.js"
   },
...
```

- test : Exécute les tests unitaires à l’aide de Jest.
- start:build : Effectue le build du projet en convertissant les fichiers TypeScript en fichiers JavaScript natifs dans un dossier configuré avec `outDir`.
- start:dev : Démarre l’application en mode développement.
- start:prod : Lance l’application en mode production. Ce script est utilisé lorsque le projet est déployé sur un serveur.

Pour chaque bibliothèque installée dans le projet, TypeScript nécessite un fichier de déclaration de types. Si ce fichier n'est pas présent, vous rencontrerez des erreurs lors du build. Heureusement, la plupart des bibliothèques incluent déjà leurs fichiers de déclaration par défaut, ce qui vous évite de vous en soucier.

Cependant, pour certaines bibliothèques, vous devrez installer manuellement leurs fichiers de déclaration. Ces derniers sont généralement préfixés par `@types`. Par exemple, pour la bibliothèque express, le fichier de déclaration correspondant est `@types/express`. Il suffit alors de l'installer avec la commande suivante :

```
npm i --save-dev @types/express
```

Pour la suite de ce guide, voici la liste des fichiers de déclaration à installer :

```
npm i --save-dev @babel/core @babel/preset-env @babel/preset-typescript @types/bcrypt @types/cors @types/express @types/express-fileupload @types/ip @types/jest @types/jsonwebtoken @types/sharp babel-jest
```

Vous remarquerez que certaines bibliothèques liées à Babel sont mentionnées dans la commande. Celles-ci sont principalement utilisées pour la transpilation et la configuration du projet TypeScript, afin d'assurer sa compatibilité avec des versions spécifiques de Node.js.

# Jest

Jest est un framework de tests en JavaScript. Il est principalement utilisé pour tester des applications React mais fonctionne également très bien avec d'autres frameworks ou bibliothèques JavaScript.

## Installer Jest

Pour installer Jest, Ajoutez Jest comme dépendance de développement:

```
npm install --save-dev jest @types/jest ts-jest
```

## Configurer Jest

Créez un fichier de configuration Jest (optionnel). Par défaut, Jest fonctionne sans configuration, mais vous pouvez personnaliser son comportement.

Si vous voulez générer un fichier de configuration :

```
npx jest --init
```

Cela vous posera quelques questions pour personnaliser les options, et générera un fichier `jest.config.js`.

## Configurer votre projet pour ECMAScript

Pour utiliser Jest avec ECMAScript Modules (ESM), vous devez configurer Jest pour gérer correctement les modules ESM

### Utiliser l'import/export dans vos fichiers

Vous devez utiliser les syntaxes import et export au lieu de require et module.exports :

```js
// src/addition.ts
export default function addition(a: number, b: number) {
   return a + b;
}
```

### Autoriser l'usage de typescript

Ajouter `@babel/preset-typescript` dans la liste des presets dans le fichir `babel.config.cjs`.

```js
// babel.config.cjs
module.exports = {
   presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"],
}
```

## Ajouter un script pour exécuter Jest

Dans votre package.json, ajoutez une commande dans la section "scripts" :

```json
"scripts": {
  "test": "jest"
}
```

Cela vous permettra de lancer les tests avec la commande npm test.

## Créer des fichiers de tests

Créez un fichier de test avec une extension `.test.js` ou `.spec.js.` Par exemple :

Créez un fichier `addition.js` pour la fonction à tester :

```js
// src/addition.ts
export default function addition(a: number, b: number) {
   return a + b;
}
```

```js
// tests/addition.test.js
const addition = require("./addition")

test("addition de 1 et 2 doit donner 3", () => {
   expect(addition(1, 2)).toBe(3)
})

test("addition de -1 et 1 doit donner 0", () => {
   expect(addition(-1, 1)).toBe(0)
})
```

## Exécuter les tests

Lancez vos tests avec la commande suivante :

```
npm test
```

## Résultat attendu

Si tout fonctionne, Jest exécutera vos tests et affichera un message comme :

```yaml
 PASS  ./addition.test.js
 ✓ addition de 1 et 2 doit donner 3 (5 ms)
 ✓ addition de -1 et 1 doit donner 0

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```
