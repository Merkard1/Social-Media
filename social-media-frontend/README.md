### Social Media Frontend

## Description

This is a web application built with React and TypeScript using the Feature Sliced Design (FSD) approach for better structure and scalability. It uses Webpack for building the project and Redux Toolkit for managing state. The app supports multiple languages with i18next and includes a component-driven development environment with Storybook. It also has thorough testing with Jest for unit tests and Loki for visual tests. Continuous integration is set up with GitHub Actions to streamline development and deployment.

## Project Start

```
npm install - install dependencies
npm run start - frontend project in dev mode
```

---

## Scripts

-  `start` - Runs the frontend project with the JSON server.
-  `start:dev` - Starts the frontend project using Webpack dev server on port 3000.
-  `start:dev:server` - Runs the backend server using json-server.
-  `build:prod`: - Builds the project for production mode using Webpack.
-  `build:dev` - Builds the project in development mode (without minification) using Webpack.
-  `lint`: - Runs both TypeScript and SCSS linters concurrently.
-  `lint:fix`: - Fixes linting errors in both TypeScript and SCSS files concurrently.
-  `lint:ts`: - Runs the ESLint linter for .ts and .tsx files.
-  `lint:ts:fix` - Runs the ESLint linter and auto-fixes issues in .ts and .tsx files.
-  `lint:scss` - Runs the Stylelint linter to check .scss files.
-  `lint:scss:fix` - Runs Stylelint and auto-fixes issues in .scss files.
-  `test:unit` - Runs unit tests using Jest with the configuration in jest.config.ts.
-  `test:ui` - Runs visual regression tests using Loki.
-  `test:ui:ci` - Runs Loki tests in CI mode, comparing with reference images and using the Storybook static build.
-  `test:ui:ok` - Approves the new visual snapshots in Loki.
-  `storybook` - Starts the Storybook UI component development environment on port 6006.
-  `storybook:build` - Builds the Storybook for production.
-  `test:ui:json` - Generates a JSON report for visual regression tests.
-  `test:ui:html` - Generates an HTML report for visual regression tests from the JSON report.
-  `test:report` - Runs all visual test report commands.
-  `test:report:ui` - Generates both the JSON and HTML reports for the visual regression tests.
-  `create-slice` - Generates new feature slices based on the FSD methodology.
-  `alias-change` - Updates import aliases across the project by running the alias update script.

---

## Project Architecture

The project is written following the Feature Sliced Design(FSD) methodology.

Link to documentation - [https://feature-sliced.design/docs/get-started/tutorial]

---

## Working with Translations

The project uses the i18next library for handling translations.
Translation files are stored in public/locales.

For convenience, we recommend installing a plugin for webstorm/vscode.

i18next documentation - [https://react.i18next.com/]

---

## Tests

The project uses 3 types of tests:

1. Regular unit tests with jest - `npm run test:unit`
2. Component tests with React Testing Library -`npm run test:unit`
3. Screenshot testing with loki - `npm run test:ui`

More about tests - TODO

---

## Linting

The project uses eslint to check typescript code and stylelint to check style files.

##### Running linters

- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss files with style linter
- `npm run lint:scss:fix` - Fix scss files with style linter

---

## Storybook

In the project, story-cases are described for each component.
Server requests are mocked using storybook-addon-mock.

The file with story cases is created next to the component with the extension .stories.tsx.

You can run Storybook with the command:

- `npm run storybook`

---

## Project Configuration

For development, the project contains 1 config: [Webpack] - `./config/build`

All configuration is stored in /config:

- /config/babel - babel configuration
- /config/build - webpack configuration
- /config/jest - test environment configuration
- /config/storybook - storybook configuration

The scripts folder contains various scripts for refactoring, simplifying code writing, report generation, etc.

---

## CI pipeline

The github actions configuration is located in /.github/workflows.
In CI, all types of tests, project and storybook builds, and linting are run.

---

### Data Handling

Data interaction is done using redux toolkit.
Whenever possible, reusable entities should be normalized using EntityAdapter.

Server requests are made using [RTK query](/src/shared/api/rtkApi.ts)

For asynchronous reducer connection (to avoid pulling them into a common bundle), the
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)
is used.

---

## Features

- [addCommentForm](/social-media-frontend/src/4_features/addCommentForm)
- [articlePageGreeting](/social-media-frontend/src/4_features/articlePageGreeting)
- [articleRating](/social-media-frontend/src/4_features/articleRating)
- [articleRecommendationsList](/social-media-frontend/src/4_features/articleRecommendationsList)
- [ArticleSortSelector](/social-media-frontend/src/4_features/ArticleSortSelector)
- [ArticleTypeTabs](/social-media-frontend/src/4_features/ArticleTypeTabs)
- [ArticleViewSelector](/social-media-frontend/src/4_features/ArticleViewSelector)
- [AuthByUsername](/social-media-frontend/src/4_features/AuthByUsername)
- [avatarDropdown](/social-media-frontend/src/4_features/avatarDropdown)
- [EditableArticleCard](/social-media-frontend/src/4_features/EditableArticleCard)
- [EditableProfileCard](/social-media-frontend/src/4_features/EditableProfileCard)
- [LangSwitcher](/social-media-frontend/src/4_features/LangSwitcher)
- [notificationButton](/social-media-frontend/src/4_features/notificationButton)
- [PageLoader](/social-media-frontend/src/4_features/PageLoader)
- [registration](/social-media-frontend/src/4_features/registration)
- [ScrollRestoration](/social-media-frontend/src/4_features/ScrollRestoration)
- [scrollToTopButton](/social-media-frontend/src/4_features/scrollToTopButton)
- [ThemeSwitcher](/social-media-frontend/src/4_features/ThemeSwitcher)
- [uiDesignSwitcher](/social-media-frontend/src/4_features/uiDesignSwitcher)
- [UserSearch](/social-media-frontend/src/4_features/UserSearch)

---

## Entities

- [Article](/social-media-frontend/src/5_entities/Article)
- [Auth](/social-media-frontend/src/5_entities/Auth)
- [Chat](/social-media-frontend/src/5_entities/Chat)
- [Comment](/social-media-frontend/src/5_entities/Comment)
- [Country](/social-media-frontend/src/5_entities/Country)
- [Currency](/social-media-frontend/src/5_entities/Currency)
- [Message](/social-media-frontend/src/5_entities/Message)
- [Notification](/social-media-frontend/src/5_entities/Notification)
- [Profile](/social-media-frontend/src/5_entities/Profile)
- [Rating](/social-media-frontend/src/5_entities/Rating)
- [User](/social-media-frontend/src/5_entities/User)

