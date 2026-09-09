import ts from "typescript";
import path from "path";
import fs from "fs";

const ALLOWED_REACT_PROPS = new Set([
  "className", "children", "disabled", "onClick", "onChange",
  "value", "defaultValue", "type", "placeholder", "name", "id", "autoFocus"
]);

const DEFAULT_DESCRIPTIONS = {
  className: "Additional CSS classes to apply to the component.",
  children: "The content or child elements rendered inside.",
  disabled: "Whether the component is disabled and prevents user interaction.",
  asChild: "Delegate rendering to the immediate child element, merging props and behavior.",
  render: "Custom render function or React element to replace the default DOM element.",
  variant: "Visual appearance and hierarchy style variant.",
  size: "Size preset determining height, padding, and font size.",
  value: "Controlled value of the component.",
  defaultValue: "Uncontrolled initial default value.",
  onValueChange: "Callback fired when the value changes.",
  open: "Controlled open state for overlays, drawers, and disclosures.",
  defaultOpen: "Uncontrolled default open state.",
  onOpenChange: "Callback fired when the open state transitions.",
  placeholder: "Placeholder text displayed when no value is entered.",
  required: "Whether the field is required for valid form submission.",
  readOnly: "Whether the input value is read-only and immutable.",
  name: "Name of the element used for form submission.",
  id: "Unique HTML element identifier.",
  showCloseButton: "Whether to render the built-in close / dismiss button.",
  type: "HTML button or input type attribute.",
  onClick: "Standard mouse click event handler.",
  onChange: "Standard change event handler.",
  style: "Inline CSS styles applied to the element.",
  autoFocus: "Automatically focus the element when mounted.",
  multiple: "Whether multiple options or panels can be selected simultaneously.",
  orientation: "Layout orientation of the component (horizontal or vertical)."
  ,mode: "Selection mode of the calendar ('single', 'range', or 'multiple').",
  selected: "The currently selected date, date range, or array of dates.",
  onSelect: "Callback fired when a date or date range selection is made.",
  month: "Controlled month to display in the calendar view.",
  defaultMonth: "Initial month displayed when uncontrolled.",
  onMonthChange: "Callback fired when the visible month changes.",
  numberOfMonths: "Number of months displayed side-by-side.",
  minDate: "Minimum selectable date constraint.",
  maxDate: "Maximum selectable date constraint.",
  weekStartsOn: "Day of the week to start on (0 = Sunday, 1 = Monday).",
  locale: "BCP 47 language tag for date and weekday localization.",
  showOutsideDays: "Whether to render days belonging to adjacent months.",
  fixedWeeks: "Whether to always render a 6-week (42-day) grid to prevent height jumps.",
  clearable: "Whether to show a clear button when a date is selected.",
  closeOnSelect: "Whether to automatically close the popover upon selecting a date.",
  calendarProps: "Additional props passed directly to the underlying Calendar component.",
  buttonVariant: "Visual button variant for the date picker trigger.",
  buttonSize: "Button size preset for the date picker trigger.",
  format: "Custom date formatting function.",
  formatRange: "Custom date range formatting function.",
  presets: "Quick selection preset options for date ranges."
};

function cleanTypeString(typeStr) {
  if (!typeStr) return "any";

  if (typeStr === "ReactNode" || (typeStr.includes("ReactElement") && (typeStr.includes("Iterable<ReactNode>") || typeStr.includes("ReactPortal")))) {
    return "React.ReactNode";
  }

  // Remove internal JSX Element constructor noise
  if (typeStr.includes("JSXElementConstructor")) {
    return "React.ReactElement";
  }

  // Remove undefined and null
  let cleaned = typeStr
    .replace(/ \| undefined/g, "")
    .replace(/undefined \| /g, "")
    .replace(/ \| null/g, "")
    .replace(/null \| /g, "")
    .trim();

  // Clean double parenthesis around function types: ((event: ...)) -> (event: ...)
  if (cleaned.startsWith("((") && cleaned.endsWith("))")) {
    cleaned = cleaned.slice(1, -1);
  }

  if (cleaned === "ReactNode") return "React.ReactNode";
  if (cleaned === "") return "any";
  return cleaned;
}

function parseCvaDefaultVariants(fileContent) {
  const result = {};
  const cvaRegex = /const\s+(\w+Variants)\s*=\s*cva\([\s\S]*?defaultVariants:\s*\{([\s\S]*?)\}/g;
  let match;

  while ((match = cvaRegex.exec(fileContent)) !== null) {
    const variantName = match[1];
    const defaultsBody = match[2];
    const defaults = {};
    const pairRegex = /(\w+):\s*["']([^"']+)["']/g;
    let pairMatch;
    while ((pairMatch = pairRegex.exec(defaultsBody)) !== null) {
      defaults[pairMatch[1]] = `"${pairMatch[2]}"`;
    }
    result[variantName] = defaults;
  }
  return result;
}

export function generateApiDocs() {
  const configFile = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, ".");
  const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
  const checker = program.getTypeChecker();

  const uiDir = path.resolve("src/components/ui");
  const files = fs.readdirSync(uiDir).filter(f => f.endsWith(".tsx")).sort();

  const components = {};
  const byFile = {};

  for (const file of files) {
    const fileSlug = file.replace(".tsx", "");
    const filePath = path.join(uiDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const cvaDefaults = parseCvaDefaultVariants(fileContent);

    const sf = program.getSourceFile(filePath);
    if (!sf) continue;

    const mod = checker.getSymbolAtLocation(sf);
    if (!mod) continue;

    const exports = checker.getExportsOfModule(mod);
    const fileComponentNames = [];

    for (const exp of exports) {
      const name = exp.getName();
      if (!/^[A-Z]/.test(name) || name.endsWith("Props") || name.endsWith("Variants")) {
        continue;
      }

      const type = checker.getTypeOfSymbolAtLocation(exp, sf);
      const sigs = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
      if (sigs.length === 0) continue;

      const param = sigs[0].getParameters()[0];
      if (!param) continue;

      const propsType = checker.getTypeOfSymbolAtLocation(param, sf);
      const allProperties = checker.getPropertiesOfType(propsType);

      const componentDoc = ts.displayPartsToString(exp.getDocumentationComment(checker));

      const propItems = [];

      for (const prop of allProperties) {
        const propName = prop.getName();
        if (propName === "ref" || propName === "key") continue;

        const decls = prop.getDeclarations() || [];
        const isFromReact = decls.some(d => d.getSourceFile().fileName.includes("@types/react/"));

        if (isFromReact && !ALLOWED_REACT_PROPS.has(propName)) {
          continue;
        }

        const propDecl = decls[0] || sf;
        const rawPropType = checker.getTypeOfSymbolAtLocation(prop, propDecl);
        const typeString = cleanTypeString(checker.typeToString(rawPropType));

        const isOptional = (prop.flags & ts.SymbolFlags.Optional) !== 0 ||
          checker.typeToString(rawPropType).includes("undefined");

        // Extract default value
        let defaultValue = null;

        // Check JSDoc @default tag
        const jsDocTags = prop.getJsDocTags();
        const defaultTag = jsDocTags.find(t => t.name === "default");
        if (defaultTag) {
          defaultValue = defaultTag.text?.map(x => x.text).join("").trim() || null;
        }

        // Check CVA defaults
        if (!defaultValue) {
          for (const defaults of Object.values(cvaDefaults)) {
            if (defaults[propName]) {
              defaultValue = defaults[propName];
              break;
            }
          }
        }

        // Common defaults in GalaUI / Base UI
        if (!defaultValue) {
          if (propName === "showCloseButton") defaultValue = "true";
          if (propName === "modal") defaultValue = "true";
          if (propName === "disabled") defaultValue = "false";
          if (propName === "multiple") defaultValue = "false";
          if (propName === "required") defaultValue = "false";
          if (propName === "readOnly") defaultValue = "false";
        }

        // Extract description
        let description = ts.displayPartsToString(prop.getDocumentationComment(checker)).trim();
        if (!description && DEFAULT_DESCRIPTIONS[propName]) {
          description = DEFAULT_DESCRIPTIONS[propName];
        }

        propItems.push({
          name: propName,
          type: typeString,
          defaultValue,
          required: !isOptional,
          description: description || `Configures the ${propName} of the component.`,
        });
      }

      // Sort props:
      // 1. Specific/interactive props (variant, size, value, open, etc.)
      // 2. Action / form props (disabled, onChange, onClick, etc.)
      // 3. Common props (className, children, render, asChild)
      const priorityOrder = {
        variant: 1,
        size: 2,
        value: 3,
        defaultValue: 4,
        onValueChange: 5,
        open: 6,
        defaultOpen: 7,
        onOpenChange: 8,
        disabled: 10,
        required: 11,
        placeholder: 12,
        name: 13,
        id: 14,
        showCloseButton: 15,
        className: 90,
        children: 91,
        render: 92,
        asChild: 93,
        style: 94,
      };

      propItems.sort((a, b) => {
        const pA = priorityOrder[a.name] ?? 50;
        const pB = priorityOrder[b.name] ?? 50;
        if (pA !== pB) return pA - pB;
        return a.name.localeCompare(b.name);
      });

      components[name] = {
        name,
        file,
        description: componentDoc || undefined,
        props: propItems,
      };

      fileComponentNames.push(name);
    }

    // Set subcomponents on the root/primary component (first one in file)
    if (fileComponentNames.length > 1) {
      const rootName = fileComponentNames[0];
      if (components[rootName]) {
        components[rootName].subcomponents = fileComponentNames.slice(1);
      }
    }

    byFile[fileSlug] = fileComponentNames;
  }

  return { components, byFile };
}

// When executed directly as a script
const data = generateApiDocs();
const outDir = path.resolve("docs/data");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outDir, "api-reference.json"),
  JSON.stringify(data, null, 2),
  "utf-8"
);

const tsContent = `// Auto-generated by scripts/generate-api-docs.mjs - do not edit directly
import apiData from "./api-reference.json";

export interface PropItem {
  name: string;
  type: string;
  defaultValue: string | null;
  required: boolean;
  description: string;
}

export interface ComponentApiDoc {
  name: string;
  file: string;
  description?: string;
  subcomponents?: string[];
  props: PropItem[];
}

export interface ApiReferenceData {
  components: Record<string, ComponentApiDoc>;
  byFile: Record<string, string[]>;
}

export const apiReferenceData = apiData as ApiReferenceData;
`;

fs.writeFileSync(
  path.join(outDir, "api-reference.ts"),
  tsContent,
  "utf-8"
);

console.log(`Successfully generated API reference for ${Object.keys(data.components).length} components across ${Object.keys(data.byFile).length} files.`);
