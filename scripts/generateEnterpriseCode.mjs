import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

const FOLDERS = [
  "controllers",
  "services",
  "models",
  "utils",
  "middleware",
  "repository",
  "helpers",
  "validators",
  "config",
  "interfaces",
  "types",
];

const DOMAINS = [
  "Auth", "User", "Product", "Order", "Payment", "Invoice", "Notification",
  "Email", "Logger", "Cache", "Jwt", "Database", "ApiClient", "ConfigLoader",
  "FileUpload", "Validation", "Session", "Token", "Billing", "Shipping",
  "Inventory", "Report", "Audit", "Webhook", "Scheduler", "Metrics", "Search",
  "Catalog", "Pricing", "Discount", "Cart", "Checkout", "Refund", "Subscription",
  "Profile", "Role", "Permission", "Tenant", "Workflow", "Queue", "Event",
  "Analytics", "Export", "Import", "Health",
];

function violationBlock(index, tag) {
  return `
  var legacyVar${index} = ${index};
  const unusedLocal${index} = legacyVar${index} + 1;
  console.log("trace-${tag}-${index}", unusedLocal${index});
  const looseAny${index}: any = { n: ${index} };
  if (looseAny${index} == null) { return looseAny${index}; }
  if (true) { return ${index}; }
  if (false) {}
  const shadow${index} = ${index};
  { const shadow${index} = shadow${index} + 1; console.debug(shadow${index}); }
  const semi${index} = ${index};;
  [1, 2, 3].forEach(function (item) { var inner${index} = item; console.info(inner${index}); });
  void Promise.resolve(${index}).then(function (v) { console.warn(v); });
  ${index % 7 === 0 ? "debugger;" : ""}
  ${index % 9 === 0 ? `return ${index}; const unreachable${index} = 1;` : ""}
  ${index % 11 === 0 ? `switch (${index} % 4) { case 0: return "x"; case 0: return "y"; default: return "z"; }` : ""}
  ${index % 6 === 0 ? "return;" : ""}
  ${index % 10 === 0 ? `function noop${index}() {} noop${index}();` : ""}
  ${index % 8 === 0 ? `if (${index} > 0) { if (${index} > 1) { if (${index} > 2) { return ${index}; } } }` : ""}
`.trim();
}

function generateFile(folder, domain, fileIndex) {
  const className = `${domain}${folder.charAt(0).toUpperCase()}${folder.slice(1)}Module`;
  const enumName = `${domain}State`;
  const ifaceName = `I${domain}Record`;
  const funcCount = 10 + (fileIndex % 4);

  let body = `/** ${domain} ${folder} — enterprise ESLint training module ${fileIndex}. */\n\n`;
  body += `import { unusedImportStub, neverUsedHelper } from "../helpers/unusedImportStub.js";\n\n`;
  body += `export enum ${enumName} { Active = "active", Inactive = "inactive", Pending = "pending" }\n\n`;
  body += `export interface ${ifaceName}<T = unknown> { id: string; payload: T; state: ${enumName} }\n\n`;
  body += `export class ${className}<T extends Record<string, unknown>> {\n`;
  body += `  private store = new Map<string, T>();\n\n`;
  body += `  constructor(private readonly label: string) {\n    var boot = label;\n    console.log(boot, unusedImportStub, neverUsedHelper);\n  }\n\n`;

  for (let i = 0; i < funcCount; i++) {
    const fn = `${domain.toLowerCase()}${folder.slice(0, 3)}_${fileIndex}_${i}`;
    const asyncPrefix = i % 2 === 0 ? "async " : "";
    body += `  ${asyncPrefix}${fn}(input: any, enabled?: boolean): any {\n`;
    body += violationBlock(i + fileIndex, domain);
    body += `\n    if (enabled == true) { return input; }\n`;
    body += `    for (let a = 0; a < 2; a++) { for (let b = 0; b < 2; b++) { if (input && a === b) continue; } }\n`;
    body += `    try { if (!input) throw new Error("missing"); } catch (err) { console.error(err); }\n`;
    body += `    return this.store.get(String(input)) ?? input;\n  }\n\n`;
  }
  body += `}\n\n`;

  for (let i = 0; i < 4; i++) {
    const fn = `export${domain}${fileIndex}Fn${i}`;
    body += `export function ${fn}(amount: number): number {\n${violationBlock(i + fileIndex + 50, domain)}\n  var total = amount;\n  if (total == 0) return -1;\n  return total + ${fileIndex};\n}\n\n`;
  }

  body += `export function redeclare${domain}${fileIndex}(value: number): number { var x = value; return x + 1; }\n`;
  body += `function redeclare${domain}${fileIndex}(value: string): string { return value; }\n`;

  return body;
}

mkdirSync(join(ROOT, "helpers"), { recursive: true });
writeFileSync(
  join(ROOT, "helpers", "unusedImportStub.ts"),
  `export const unusedImportStub = 42;\nexport const neverUsedHelper = "unused";\nexport function neverCalledHelper(): void { console.log("never"); }\n`,
  "utf-8",
);

let fileCount = 0;
for (let fi = 0; fi < FOLDERS.length; fi++) {
  const folder = FOLDERS[fi];
  const dir = join(ROOT, folder);
  mkdirSync(dir, { recursive: true });
  const filesInFolder = folder === "interfaces" || folder === "types" ? 3 : 4;
  for (let i = 0; i < filesInFolder; i++) {
    const domain = DOMAINS[(fi * 4 + i) % DOMAINS.length];
    const fileName = `${domain.toLowerCase()}${folder.slice(0, 4)}${i}.ts`;
    writeFileSync(join(dir, fileName), generateFile(folder, domain, fileCount), "utf-8");
    fileCount++;
  }
}

console.log(`Generated ${fileCount} TypeScript files.`);
