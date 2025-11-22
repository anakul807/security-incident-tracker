export default [
  {
    ignores: ["node_modules/**", "dist/**"],

    files: ["**/*.js", "**/*.jsx"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
