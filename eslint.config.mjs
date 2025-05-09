import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["scripts/**/*.js"], languageOptions: { globals: globals.browser } },
]);