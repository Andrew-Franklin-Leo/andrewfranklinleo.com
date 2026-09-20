# andrewfranklinleo.com

An entity-driven intellectual operating system built with Next.js. The root site and project microsites share one Markdown entity registry.

## Local development with Docker

```powershell
git switch develop
docker compose up --build
```

Open http://localhost:3000.

Run checks without Docker:

```powershell
npm ci
npm run lint
npx tsc --noEmit
npm run build
```

## GitFlow

- `develop`: local development and integration.
- `feature/<name>`: short-lived branches from `develop`.
- `release/<version>`: stabilization before production.
- `main`: production branch; pushes deploy to GitHub Pages.

See [`.github/GITFLOW.md`](.github/GITFLOW.md) for the workflow.

## GitHub Pages

The `Deploy to GitHub Pages` workflow runs on pushes to `main`. In GitHub repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.

The repository is configured as a static Next.js export. The workflow sets `GITHUB_PAGES=true`, which applies the project path `/andrewfranklinleo.com`. A custom domain can later remove the need for that project-path deployment.

## Content

Add Markdown entities to [`content/`](content). Each entity has validated frontmatter and can belong to multiple microsites through `siteIds`.

Microsite routes use the path pattern:

```text
/projects/<site-slug>/<section>/<entity-slug>
```

## Repository setup

The configured remote is:

```text
https://github.com/Andrew-Franklin-Leo/andrewfranklinleo.com.git
```

The remote currently responds with `Repository not found` from this environment. Confirm the repository exists and that the authenticated GitHub account has access before pushing.
