export default [
  {
    ignores: ["node_modules/**", "dist/**"],
// runs on any js or jsx file
    files: ["**/*.js", "**/*.jsx"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
