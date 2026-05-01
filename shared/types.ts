/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

// drizzle/schema re-export disabled: suddeco-landing has no DB and no
// drizzle-orm dependency. The schema file is leftover scaffolding from the
// fork and the import path uses `drizzle-orm/mysql-core` (Suddeco is
// Postgres). Per NEVER-DELETE rule, the file stays on disk but is no longer
// pulled into the type graph. Re-enable when landing actually wires a DB.
// export type * from "../drizzle/schema";
export * from "./_core/errors";
