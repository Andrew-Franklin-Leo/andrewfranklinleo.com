# GitFlow

- `develop`: local development and integration branch. Run it with Docker.
- `feature/<name>`: short-lived feature branches created from `develop`.
- `release/<version>`: stabilization branch merged into `main` and back into `develop`.
- `main`: production branch. Every push deploys the static export to GitHub Pages.

## Local development

```powershell
git switch develop
docker compose up --build
```

Open http://localhost:3000.

## Feature workflow

```powershell
git switch develop
git pull origin develop
git switch -c feature/entity-name
# make and validate changes
git add .
git commit -m "feat: add entity name"
git push -u origin feature/entity-name
```

Open a pull request into `develop`. Merge `develop` into `main` only for a production release.

## GitHub Pages

In repository settings, set Pages to **GitHub Actions**. The `Deploy to GitHub Pages` workflow runs on every push to `main`.
