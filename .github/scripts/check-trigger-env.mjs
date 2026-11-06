// Fails when a variable the tasks need is missing from Trigger.dev production.
// Trigger.dev has its own environment, separate from Vercel. Prints names only.
import { envvars } from "@trigger.dev/sdk";

const PROJECT_REF = "proj_yjzqjdmwcponnojesbcw"; // same as trigger.config.ts

const REQUIRED = [
  // Storage: ee/features/storage/config.ts throws without these
  "NEXT_PRIVATE_UPLOAD_BUCKET",
  "NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID",
  "NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY",
  "NEXT_PRIVATE_ARCHIVE_BUCKET",
  // Database: prisma/schema/schema.prisma
  "POSTGRES_PRISMA_URL",
  "POSTGRES_PRISMA_URL_NON_POOLING",
  // Document conversion: lib/trigger/convert-files.ts
  "NEXT_PRIVATE_CONVERSION_BASE_URL",
  "NEXT_PRIVATE_INTERNAL_AUTH_TOKEN",
  // Calls back to the app: lib/trigger/pdf-to-image-route.ts
  "INTERNAL_API_KEY",
  "NEXT_PUBLIC_BASE_URL",
  "NEXTAUTH_URL",
  "REVALIDATE_TOKEN",
];

let present;
try {
  const vars = await envvars.list(PROJECT_REF, "prod");
  present = new Set(vars.map((v) => v.name));
} catch (error) {
  console.error(`Could not read Trigger.dev variables: ${error.message}`);
  process.exit(1);
}

const missing = REQUIRED.filter((name) => !present.has(name));
if (missing.length > 0) {
  console.error(`Missing from Trigger.dev production:\n  ${missing.join("\n  ")}`);
  process.exit(1);
}
console.log(`All ${REQUIRED.length} required variables are set.`);
