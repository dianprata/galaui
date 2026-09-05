# Contributing to GalaUI

Thank you for your interest in contributing to **GalaUI**! We welcome community contributions to keep this component library accessible, modern, and reliable.

To maintain high code quality and smooth collaboration, we follow a standard open-source branch-and-PR workflow.

---

## 🧭 Overview of the Workflow

```
1. Branch from main       2. Commit changes         3. Open PR & CI Checks       4. Review & Merge        5. Release to npm
 (feat/fix/docs/...)   ->  (Conventional Commits) ->   (Type check, Build, Pack) ->   (Squash to main)    ->  (Tag & GitHub Release)
```

---

## 🌿 1. Branching Strategy

- **`main`**: The production and release branch. Protected against direct pushes. All changes land here strictly via Pull Requests.
- **Feature & Fix Branches**: Always create a separate branch from the latest `main`:
  - `feat/<feature-name>`: New component, prop, or feature (e.g. `feat/color-picker`)
  - `fix/<issue-name>`: Bug fix or patch (e.g. `fix/dialog-focus-trap`)
  - `docs/<topic>`: Documentation additions or fixes (e.g. `docs/mobile-toc-sticky`)
  - `refactor/<scope>`: Restructuring code without API/behavior changes
  - `codex/<task-name>`: Automated or AI-assisted development tasks

### Creating a branch:

```bash
# 1. Update your local main
git checkout main
git pull origin main

# 2. Create and switch to your work branch
git checkout -b feat/my-new-feature
```

---

## 🛠️ 2. Development & Local Verification

Before committing, make sure all verification checks pass locally:

```bash
# Start Vite development server
npm run dev

# Type check library
npx tsc --project tsconfig.build.json --noEmit

# Build library package (@galaui/react)
npm run build:lib

# Build documentation / workbench app
npm run build:app

# Verify package tarball (ensures published files are clean)
npm pack --dry-run
```

---

## 📝 3. Commit Message Guidelines (Conventional Commits)

We strictly follow the **[Conventional Commits](https://www.conventionalcommits.org/)** specification:

```
<type>(<scope>): <short description>

[Optional: Detailed body]
[Optional: Issue footer]
```

### Allowed Types:
- `feat`: A new feature or component for the user.
- `fix`: A bug fix.
- `docs`: Documentation updates only.
- `style`: Code formatting or styling that does not alter logic.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: Code change that improves performance.
- `test`: Adding or correcting tests.
- `chore`: Tooling, build pipeline, or dependency updates.

### Rules:
1. **Scope**: Specific component or module name (e.g., `button`, `dialog`, `docs`, `tokens`).
2. **Subject**: Imperative, present tense (`add` not `added` or `adds`), lowercase first letter, no trailing period, under 50 characters.

**Examples**:
```bash
feat(button): add icon-only size variant
fix(drawer): prevent backdrop click propagation
docs(toc): make mobile table of contents full-width sticky
chore(deps): update @base-ui/react to v1.7.0
```

---

## 🚀 4. Pull Request (PR) Flow

1. **Push your branch**:
   ```bash
   git push origin feat/my-new-feature
   ```
2. **Open a Pull Request** against the `main` branch on GitHub.
3. **Fill out the PR Template**: Describe the purpose, link relevant issues (`Closes #123`), and attach screenshots if applicable.
4. **Automated CI**: GitHub Actions (`.github/workflows/ci.yml`) will automatically run:
   - TypeScript verification
   - Library build (`npm run build:lib`)
   - Workbench app build (`npm run build:app`)
   - Package contents verification (`npm pack --dry-run`)
5. **Code Review**: Address any review feedback with additional commits on the same branch.
6. **Merge**: Once approved and CI is green, the PR is merged via **Squash and Merge** into `main` to keep a clean linear history.

---

## 📦 5. Release & Publishing Flow

Releases are published automatically to npm using GitHub Actions (`.github/workflows/release.yml`):

1. **Version Bump**: When ready for a release, bump the version in `package.json` following [Semantic Versioning](https://semver.org/):
   - **Patch** (`0.1.x`): Bug fixes and non-breaking tweaks.
   - **Minor** (`0.x.0`): New components or backwards-compatible features.
   - **Major** (`x.0.0`): Breaking changes.
2. **Create a GitHub Release**:
   - Tag format: `vX.Y.Z` (e.g. `v0.1.3`).
   - Fill in the release notes generated from merged pull requests.
3. **Automated Publishing**:
   - The `release.yml` workflow automatically builds the library and publishes `@galaui/react` to the npm registry with provenance.
