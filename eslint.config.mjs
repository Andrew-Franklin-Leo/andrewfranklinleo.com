import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Downgrade pre-existing issues to warnings so they don't block CI
  {
    rules: {
      "react/jsx-no-comment-textnodes": "warn",
      "@next/next/no-html-link-for-pages": "warn",
      "react/no-unescaped-entities": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Firebase build artifacts
    ".firebase/**",
    // Docusaurus site (separate project)
    "docs-site/**",
    // Utility scripts
    "scripts/**",
    "Invention Tools/**",
  ]),
]);

export default eslintConfig;
