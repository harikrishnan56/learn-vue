# Giraffe Game

A fun and interactive game built with Vue 3 and Vite.

**Live Link:** [https://giraff-game-comini.vercel.app/](https://giraff-game-comini.vercel.app/)

## Project Setup

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd giraff-game
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

4.  **Build for production:**
    ```sh
    npm run build
    ```

5.  **Run tests:**
    ```sh
    # Unit tests
    npm run test:unit

    # End-to-End tests (install Playwright browsers first if needed)
    # npx playwright install
    npm run test:e2e
    ```

## Folder Structure

The project follows a standard Vue 3 + Vite project structure:

-   `public/`: Contains static assets that are copied directly to the build output directory.
-   `src/`: Contains the main application source code.
    -   `assets/`: Static assets like images, fonts, etc., that are processed by Vite.
    -   `components/`: Reusable Vue components.
        -   `__tests__/`: Unit tests for components.
        -   `giraffe/`: Components specifically related to the giraffe character/gameplay.
        -   `icons/`: SVG icon components.
    -   `router/`: Vue Router configuration for defining application routes.
    -   `stores/`: Pinia stores for state management.
    -   `views/`: Vue components that represent application pages/views.
-   `e2e/`: End-to-end tests written with Playwright.
-   `index.html`: The main HTML file that serves as the entry point for the application.
-   `vite.config.ts`: Vite configuration file.
-   `tailwind.config.js`: Tailwind CSS configuration.
-   `tsconfig.*.json`: TypeScript configuration files.

## Design Approach

The Giraffe Game is designed with a focus on:

-   **Modularity:** Components are kept small and focused, promoting reusability and maintainability.
-   **Reactivity:** Vue 3's Composition API and Pinia are used for efficient state management and reactive UI updates.
-   **User Experience:** The game aims to be intuitive and engaging, with clear visual feedback and smooth transitions.
-   **Scalability:** The structure allows for easy addition of new levels, features, and game mechanics.
-   **Styling:** Tailwind CSS is utilized for rapid UI development with utility-first classes, ensuring consistency and responsiveness.
-   **Testing:** Unit tests (Vitest) and E2E tests (Playwright) are included to ensure code quality and application stability.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
