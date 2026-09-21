---
name: Render pnpm compatibility
description: Package-manager compatibility constraint for Render builds and dependency build-script approvals.
---

Pin Corepack to pnpm 10 while the workspace dependency policy uses `onlyBuiltDependencies`.

**Why:** pnpm 12 ignores the pnpm 10 `onlyBuiltDependencies` setting and blocks required dependency scripts such as esbuild during Render installs, even when the old allowlist appears correctly configured.

**How to apply:** When changing the pnpm major version, migrate the build-script policy to that version's supported format and reproduce Render's Corepack plus frozen-lockfile installation locally before deployment.