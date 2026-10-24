import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// These tests inspect tracked SQL source only. They do NOT query or modify Supabase.
const migrationUrl = (name: string) => new URL(`../../supabase/migrations/${name}`, import.meta.url);
const readMigration = (name: string) => readFileSync(migrationUrl(name), "utf8");

const inquiriesSql = readMigration(
  "20261011052427_sprint05_project_inquiries_schema_private_default_deny.sql",
);
const allowlistSql = readMigration(
  "20261011054845_sprint05_admin_allowlist_private_default_deny.sql",
);
const singleFounderSql = readMigration(
  "20261011055259_sprint05_single_founder_admin_limit.sql",
);
const appliedBaselineSql = [inquiriesSql, allowlistSql, singleFounderSql].join("\n");

describe("Tracked admin database migrations remain deny-by-default", () => {
  it("enables AND forces RLS on confidential project inquiries", () => {
    expect(inquiriesSql).toMatch(
      /alter\s+table\s+public\.project_inquiries\s+enable\s+row\s+level\s+security\s*;/i,
    );
    expect(inquiriesSql).toMatch(
      /alter\s+table\s+public\.project_inquiries\s+force\s+row\s+level\s+security\s*;/i,
    );
  });

  it("revokes direct inquiry table privileges from public API roles", () => {
    expect(inquiriesSql).toMatch(
      /revoke\s+all\s+on\s+table\s+public\.project_inquiries\s+from\s+public\s*,\s*anon\s*,\s*authenticated\s*;/i,
    );
  });

  it("enables AND forces RLS on the founder allowlist", () => {
    expect(allowlistSql).toMatch(
      /alter\s+table\s+ick_private\.admin_members\s+enable\s+row\s+level\s+security\s*;/i,
    );
    expect(allowlistSql).toMatch(
      /alter\s+table\s+ick_private\.admin_members\s+force\s+row\s+level\s+security\s*;/i,
    );
  });

  it("revokes direct allowlist table privileges from public API roles", () => {
    expect(allowlistSql).toMatch(
      /revoke\s+all\s+on\s+table\s+ick_private\.admin_members\s+from\s+public\s*,\s*anon\s*,\s*authenticated\s*;/i,
    );
  });

  it("keeps the founder allowlist disabled by default and bound to auth.users", () => {
    expect(allowlistSql).toMatch(/enabled\s+boolean\s+not\s+null\s+default\s+false/i);
    expect(allowlistSql).toMatch(/references\s+auth\.users\s*\(\s*id\s*\)/i);
    expect(allowlistSql).not.toMatch(/^\s*insert\s+into\s+ick_private\.admin_members\b/im);
  });

  it("preserves the database constraint allowing at most one enabled founder", () => {
    expect(singleFounderSql).toMatch(
      /create\s+unique\s+index\s+if\s+not\s+exists\s+admin_members_single_enabled_idx/i,
    );
    expect(singleFounderSql).toMatch(/where\s+enabled\s+is\s+true/i);
  });

  it("does not introduce an RLS policy granting access in the baseline migrations", () => {
    expect(appliedBaselineSql).not.toMatch(/^\s*create\s+policy\b/im);
  });

  it("does not grant table access to unauthenticated or authenticated clients", () => {
    expect(appliedBaselineSql).not.toMatch(/^\s*grant\s+\S+/im);
  });

  it("keeps the unapproved founder RPC migration absent from this review branch", () => {
    expect(existsSync(migrationUrl("20261011130000_founder_admin_authorization.sql"))).toBe(
      false,
    );
  });
});
