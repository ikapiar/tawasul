// eslint.config.js
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    // Global ignores
    {
        ignores: [
            "vfs/",
            "assets/",
            "node_modules/",
            "dist/",
            "build/",
            "public/",
            "coverage/",
            "**/*.config.js",
            "**/*.config.mjs",
            "**/*.config.cjs",
        ],
    },

    // Base ESLint recommended rules
    eslintJs.configs.recommended,

    // TypeScript recommended rules
    // This automatically applies to .ts, .tsx, .mts, .cts files
    ...tseslint.configs.recommended

    // You can add your own custom rules object here if needed
    // {
    //   rules: {
    //     "no-console": "warn"
    //   }
    // }
);