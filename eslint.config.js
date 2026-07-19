import eslint from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "typescript-eslint";

const enterpriseGlobs = [
  "controllers/**/*.ts",
  "services/**/*.ts",
  "models/**/*.ts",
  "utils/**/*.ts",
  "middleware/**/*.ts",
  "repository/**/*.ts",
  "helpers/**/*.ts",
  "validators/**/*.ts",
  "config/**/*.ts",
  "interfaces/**/*.ts",
  "types/**/*.ts",
];

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "artifacts/**",
      "platform/**",
      "coverage/**",
      "eslint_raw_output.json",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  {
    files: ["src/**/*.ts", "tests/**/*.ts", "scripts/**/*.ts"],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  {
    files: ["sample_subject/src/**/*.ts"],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      "sonarjs/cognitive-complexity": ["error", 15],
    },
  },
  {
    files: enterpriseGlobs,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "error",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-empty": "error",
      "no-unreachable": "error",
      "no-redeclare": "error",
      "no-duplicate-case": "error",
      "no-constant-condition": "error",
      "no-empty-function": "error",
      "no-useless-return": "error",
      "no-extra-semi": "error",
      "@typescript-eslint/no-shadow": "error",
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/cognitive-complexity": ["error", 10],
      "sonarjs/no-nested-switch": "error",
      "sonarjs/no-identical-functions": "warn",
    },
  },
);
