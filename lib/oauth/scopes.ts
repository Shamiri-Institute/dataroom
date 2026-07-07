// Shamiri stub: the OAuth scope registry lives in upstream's private EE repo.
// The public tokens UI only needs the list of granular scope identifiers for
// validation; the fork's tokens API does not enforce scopes.
export const GRANULAR_SCOPES = [
  "documents:read",
  "documents:write",
  "links:read",
  "links:write",
  "datarooms:read",
  "datarooms:write",
  "analytics:read",
  "visitors:read",
] as const;
