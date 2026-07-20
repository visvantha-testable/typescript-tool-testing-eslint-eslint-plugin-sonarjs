import { verifyEslintSonarjsJson } from "./verifyEslintSonarjsJson.js";

const idx = process.argv.indexOf("--json");
const path = idx >= 0 ? process.argv[idx + 1] : "eslint_sonarjs.json";
process.exit(verifyEslintSonarjsJson(path));
