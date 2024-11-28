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

Dans cet exemple, `npm run lint` sera exécuté à chaque fois qu'un commit est effectué. Si le linting échoue, le commit sera annulé.

# Husky, prettier, eslint & jest

Maintenant que nous comprenons l'utilité de Husky, nous pouvons le configurer de manière à ce que, chaque fois qu'une personne tente d'effectuer un commit, un processus de vérification soit lancé. Ce processus inclura le linting du code ainsi que l'exécution des tests unitaires. Si l'un de ces contrôles échoue, le commit sera annulé.

Dans le fichier `pre-commit`, nous aurons ces 3 commandes

```
npx prettier --write .
npm run lint
npm run test
```

Cependant, un problème se pose avec la commande `npx prettier --write .`, car elle effectue des modifications sur le code. Ces changements devront être ajoutés au dernier commit avant de finaliser. Pour résoudre cela, voici le contenu amélioré du hook :

```
npx prettier --write --ignore-unknown $(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
eslint $(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
npm run test
git add .
```

Remarquez les paramètres suivants : `$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')`
Ces arguments permettent de limiter les vérifications aux fichiers modifiés et ajoutés (en staging) uniquement. Cette approche est importante pour optimiser les performances en évitant d'appliquer le linting ou les corrections sur l'ensemble des fichiers du projet. Ainsi, seules les modifications en cours de commit seront analysées.
