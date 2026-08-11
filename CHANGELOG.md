# Changelog

## [2.1.0] - 2026-08-11

### ✨ New Features

- Added React 19 support

### 🗂 Dependencies

- Updated React peer dependencies to `"^17.0.0 || ^18.0.0 || ^19.0.0"`
- Upgraded `react` and `react-dom` devDependencies to `^19.0.0`
- Upgraded `@types/react` and `@types/react-dom` to `^19.0.0`
- Added `@types/prop-types` explicitly (no longer re-exported by `@types/react@19`)
- Upgraded `cypress` to `^15.20.1`
- Upgraded `@cypress/code-coverage` to `^4.0.3`
- Upgraded `@cypress/webpack-dev-server` to `^5.6.3`
- Upgraded `nyc` to `^18.0.0` (required by `@cypress/code-coverage@4`)
- Removed `@cypress/react` (replaced by built-in `cypress/react`)

- Upgraded `eslint` to `^10.8.1`
- Upgraded `@eslint/js` to `^10.0.1`
- Upgraded `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` to `^8.67.0`
- Upgraded `eslint-plugin-cypress` to `^7.0.0` (flat config; requires eslint>=10)
- Upgraded `eslint-plugin-react-hooks` to `^7.1.1`

### 🔧 Improvements

- Switched Cypress test imports from `@cypress/react` to built-in `cypress/react`
- Enabled Babel automatic JSX runtime (`"runtime": "automatic"`)

## [2.0.0] - 2025-10-15

### 🚀 Major Changes

- **BREAKING**: Dropped support for React 16 (now requires React 17+)
- **BREAKING**: Migrated from yarn to npm as the package manager
- **BREAKING**: Updated minimum Node.js requirements due to dependency updates

### ✨ New Features

- Added React 18 support with full compatibility
- Comprehensive test coverage (94% statement coverage)
- Added ESLint with modern flat configuration
- Integrated Cypress code coverage reporting
- Added new test files for complete API coverage

### 🔧 Improvements

- Updated all dependencies to latest versions for security and performance
- Modernized build toolchain (Webpack 5, TypeScript 5, Cypress 15)
- Enhanced error handling and edge case coverage in tests
- Improved development workflow with npm-only setup
- Updated GitHub Actions workflow for modern npm authentication
- Added comprehensive lint rules for code quality

### 🛠 Technical Updates

- **TypeScript**: Updated to 5.0.0 with ES2018 target
- **Webpack**: Updated to 5.102.1 with modern configuration
- **Cypress**: Updated to 15.4.0 with component testing
- **ESLint**: Updated to 9.x with flat configuration format
- **Coverage**: Integrated @cypress/code-coverage with nyc reporting

### 🗂 Dependencies

- Updated React peer dependencies to "^17.0.0 || ^18.0.0"
- Removed all yarn-related files and configuration
- Updated all devDependencies to latest stable versions
- Added babel-plugin-istanbul for test instrumentation

### 📝 Documentation

- Updated README with npm-first installation instructions
- Modernized build and development setup documentation
- Updated all command examples to use npm instead of yarn

### 🔒 Security

- Resolved security vulnerabilities in outdated dependencies
- Updated to secure versions of all development tools

## [1.1.0] - 2021-11-03

### Added

- Re-added Laika component. It can now use the context as well.
- Added this changelog

## [1.0.0] - 2021-11-02

### Changed

- This release is a complete rewrite in TypeScript which replaces the Laika component with a hook that can also optionally read its values from a context.

### Added

- Context
- `useLaika` hook
