<a href="https://typicode.github.io/husky/">Husky</a> est un outil qui permet d'ajouter des hooks Git à un projet, ce qui vous permet de lancer des scripts automatiquement à des moments clés du cycle de vie de Git, tels que lors des commits, des pushs ou des merges. L'idée est d'automatiser certaines actions avant que des changements ne soient envoyés à votre dépôt Git, comme exécuter des tests, formater le code ou effectuer des vérifications de lint.

# Installer husky

our ajouter Husky à votre projet, vous devez d'abord l'installer via npm :

```
npm install husky --save-dev
```

Ensuite, vous initialisez Husky dans votre projet :

```
npx husky init
```

Cela crée un dossier `.husky/` dans votre projet où les hooks seront stockés.

# Ajouter un hook pre-commit

Par exemple, pour exécuter des tests avec jest ou exécuter eslint avant chaque commit, vous pouvez configurer un hook `pre-commit` :

```
npx husky add .husky/pre-commit "npm test"
```

Cela va créer un fichier .husky/pre-commit avec le contenu suivant :

```
npm run lint
```

Dans cet exemple, npm run lint sera exécuté à chaque fois qu'un commit est effectué. Si le linting échoue, le commit sera annulé.

# Husky, prettier, eslint & jest

Maintenant que nous avons compris l'utilite de husky nous pouvons le configurer de sorte que a chaque fois que quelq'un va essayer d'effectue un commit, on va lancer le lint d'abord et les tests unitaires si cela ne passe pas, le commit sera annule

```

```
