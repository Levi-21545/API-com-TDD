import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser }, env: { jest: true } },
  pluginJs.configs.recommended,
];
