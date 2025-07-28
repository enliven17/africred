import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Security rules
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-optional-chaining": "error",
      "require-atomic-updates": "error",
      
      // Best practices - relaxed for deployment
      "no-console": "off",
      "no-debugger": "error",
      "no-alert": "off",
      "no-var": "error",
      "prefer-const": "off",
      "no-unused-vars": "off",
      
      // TypeScript security - relaxed for deployment
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      
      // React rules - relaxed for deployment
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;
