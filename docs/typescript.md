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
 "scripts": {
      "test": "jest",
      "start:build": "tsc -p .",
      "start:dev": "ts-node-dev --respawn --transpile-only  src/index.ts",
      "start:prod": "tsc -p . && NODE_ENV=prod node dist/index.js"
   },
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
