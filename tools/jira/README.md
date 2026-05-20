# Deprecated — use `tools/atlassian/` instead

This single-product kit has been superseded by `tools/atlassian/`,
which installs Jira and/or Confluence from one combined template
(multi-select feature picker + scopes computed from the selection).

`tools/jira/` is kept in the repo as a deprecation tombstone so
tenants that already imported the v1 catalog don't break. The
catalog can list both entries — `atlassian` is the new preferred
one. New imports / fresh tenants should pick `atlassian`.

## What to do

- **Fresh install** (Jira only): pick `atlassian` in the Web-UI
  Wizard, leave only `Jira` checked. The result is equivalent to
  the v1 `jira` kit, just installed via the v2 template DSL.
- **Adding Confluence later**: re-apply `atlassian` with both boxes
  checked — the OAuth scopes get updated, the Confluence tool pack
  is installed, the existing Jira tools stay. Then re-Connect under
  Connected Accounts so the consent screen acknowledges the new
  scopes.
- **Already using `jira`**: keep it. To switch to `atlassian` you'd
  re-apply that template; the substituted documents overwrite the
  earlier ones in place. The settings (client_secret, access_token,
  cloud_id, …) are reused.

Will be removed in v3 of `vance-kits`.
