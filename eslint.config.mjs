const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  tseslint.config({
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  }),

  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    plugins: ["jest"],
    env: { "jest/globals": true },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];

export default eslintConfig;
