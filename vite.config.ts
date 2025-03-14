import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite"
import { denyImports } from "vite-env-only"

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      ignoredRouteFiles: ["**/*.css, **/*.server.*"],

    }),
    tsconfigPaths(),
    denyImports(
      {client: {
        // specifiers: ["fs-extra", /^node:/, "@prisma/*"],
        // files: ["**/.server/*", "**/*.server.*"],
      },
      server: {
      },}
    ),],
});
