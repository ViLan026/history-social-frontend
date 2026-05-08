import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import boundaries from "eslint-plugin-boundaries";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      boundaries,
    },

    settings: {
      "boundaries/include": ["src/**/*"],

      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/components/ui/**/*",
            "src/components/layout/**/*",
            "src/components/shared/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/constants/**/*",
            "src/providers/**/*",
            "src/styles/**/*",
            "src/types/**/*",
          ],
        },

        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"],
        },

        {
          mode: "full",
          type: "app",
          pattern: ["src/app/**/*"],
        },
      ],
    },

    rules: {
      "boundaries/no-unknown": "error",

      "boundaries/no-unknown-files": "error",

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",

          rules: [
            {
              from: ["shared"],
              allow: ["shared"],
            },

            {
              from: ["feature"],
              allow: [
                "shared",
                "feature",
              ],
            },

            {
              from: ["app"],
              allow: [
                "shared",
                "feature",
                "app",
              ],
            },
          ],
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;