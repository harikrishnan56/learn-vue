# Giraffe Game

A fun and interactive game built with Vue 3 and Vite.

**Live Link:** [https://giraff-game-comini.vercel.app/](https://giraff-game-comini.vercel.app/)

## Project Setup

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/hk-vk/giraff-game-comini
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

The development of the Giraffe Game followed an iterative and component-driven approach:

-   **Initial Component Prototyping:** The process began with creating the foundational Vue components necessary for the game's core functionality.
-   **Refinement through Abstraction:** Early on, it was observed that several components shared similar structures or behaviors. This led to a refactoring phase where common patterns were abstracted into reusable, modular components. This involved carefully dividing UI elements and logic into distinct components to improve maintainability and reduce code duplication.
-   **Enhancing User Experience with Animations:** To create a more dynamic and engaging experience, animations were incorporated using Vue's built-in `<Transition>` components. Effects like "fade", "slide-up", and "slide" are used to provide smooth visual feedback for user interactions and changes in game state. These transitions are defined using standard CSS within the component styles or global stylesheets.
-   **State Management with Pinia:** Pinia was chosen for centralized state management, providing a clear and organized way to handle shared game data, such as the current stage and task configurations.
-   **Utility-First Styling with Tailwind CSS:** Tailwind CSS facilitates rapid UI development and ensures a consistent visual style across the application.

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
