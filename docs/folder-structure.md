# Folder Structure

This document describes the structure of the `src` folder, which contains the main codebase of the application.

## 📁 src

Root source directory of the project.

---

### 📁 common

Shared code used across multiple parts of the application.

#### 📁 constants

Contains constant values used throughout the application.

#### 📁 interfaces

TypeScript interfaces used for type definitions.

- `index.ts`: Central export file for all interfaces.

#### 📁 models

Domain models representing core entities used in the application's logic.

- `creature.ts`: Defines the `Creature` model.
- `index.ts`: Aggregates and exports models.

#### 📁 types

Generic TypeScript type definitions.

- `index.ts`: Central export file for all types.

---

### 📁 components

Contains reusable React components, organized by feature.

#### 📁 **tests**

Test files related to components.

#### 📁 hooks

Custom React hooks used within components.

#### Component files:

- `board.tsx`: Handles the game board or grid.
- `creature-rect.tsx`: Renders individual creature elements.
- `field-rects.tsx`: Manages the rendering of the entire field.
- `field.tsx`: Handles field layout or logic.
- `game-info.tsx`: Displays game-related data such as generation or population.
- `header.tsx`: Header component of the application.
- `known-forms.tsx`: Displays or handles known creature patterns.

---

### 📁 core

Core logic and utility functions that support the application's functionality.

#### 📁 helper

Utility functions and business logic.

##### 📁 **tests**

Unit tests for helper functions.

##### Files:

- `build-blinker.ts`, `build-block.ts`, `build-boat.ts`, `build-glider.ts`, `build-lightweight-spaceship.ts`, `build-toad.ts`: Functions that build specific creature patterns.
- `creatures-control.ts`: Manages creature state and rules.
- `get-neighbors.ts`: Retrieves neighboring cells.
- `index.ts`: Exports all helper functions.

#### 📁 store

Handles application state management.

- `creatures-store.ts`: Manages the state of all creatures on the board.
- `game-ui-store.ts`: Manages UI-related state such as selection and control status.
- `index.ts`: Central export file for the stores.

---

### 📄 App.tsx / App.css

Root React component and its associated styles.

### 📄 main.tsx

Application entry point. Renders the React app into the DOM.

### 📄 index.css

Global CSS used throughout the application.

### 📄 vite-env.d.ts

Type declarations for the Vite build environment.

---

## 🧪 📁 tests

Contains global tests not tied to a specific module (mentioned earlier).

---

> ✅ This structure promotes a clean separation of concerns:
>
> - `common/` for shared types and definitions
> - `components/` for UI elements
> - `core/` for business logic and utilities
> - `store/` for state management
> - `tests/` for test coverage
