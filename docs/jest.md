Jest est un framework de tests en JavaScript. Il est principalement utilisé pour tester des applications React mais fonctionne également très bien avec d'autres frameworks ou bibliothèques JavaScript.

# Installer Jest

Pour installer Jest, Ajoutez Jest comme dépendance de développement:

```
npm install --save-dev jest @types/jest ts-jest
```

# Configurer Jest

Créez un fichier de configuration Jest (optionnel). Par défaut, Jest fonctionne sans configuration, mais vous pouvez personnaliser son comportement.

Si vous voulez générer un fichier de configuration :

```
npx jest --init
```

Cela vous posera quelques questions pour personnaliser les options, et générera un fichier `jest.config.js`.

# Configurer votre projet pour ECMAScript

Pour utiliser Jest avec ECMAScript Modules (ESM), vous devez configurer Jest pour gérer correctement les modules ESM

## Utiliser l'import/export dans vos fichiers

Vous devez utiliser les syntaxes import et export au lieu de require et module.exports :

```js
// src/addition.ts
export default function addition(a: number, b: number) {
   return a + b;
}
```

## Autoriser l'usage de typescript

Ajouter `@babel/preset-typescript` dans la liste des presets dans le fichir `babel.config.cjs`.

```js
// babel.config.cjs
module.exports = {
   presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"],
}
```

# Ajouter un script pour exécuter Jest

Dans votre `package.json`, ajoutez une commande dans la section "scripts" :

```json
"scripts": {
  "test": "jest"
}
```

Cela vous permettra de lancer les tests avec la commande npm test.

# Créer des fichiers de tests

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

# Exécuter les tests

Lancez vos tests avec la commande suivante :

```
npm test
```

# Résultat attendu

Si tout fonctionne, Jest exécutera vos tests et affichera un message comme :

```yaml
 PASS  ./addition.test.js
 ✓ addition de 1 et 2 doit donner 3 (5 ms)
 ✓ addition de -1 et 1 doit donner 0

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```
