# Tool Templates — `vance-kits/tools/`

One-way kits (`artifact: true`) that ship a `template.yaml` sibling of
`kit.yaml`. The `template.yaml` declares an input schema; the kit's
documents use `{{var:fieldName}}` placeholders that are substituted at
apply-time. PASSWORD inputs land in encrypted settings, not inline
documents.

Currently included:

| Path | What |
|---|---|
| `atlassian/` | Combined Atlassian kit — Jira + / or Confluence via OAuth 2.0 (3LO) + REST API. Multi-select feature picker (v2 template DSL). |
| `jira/` | **Deprecated**, superseded by `atlassian/`. See `jira/README.md`. |
| `imap-mailbox/` | Read-only IMAP (user + app-password) |
| `smtp-sender/` | Outbound SMTP (user + app-password) |

## Template DSL — what `template.yaml` can carry

v1 features:

- `inputs:` — flat list, types `string | password | boolean | integer | select`
- `postInstall: { kind: oauth-connect, provider: <id>, message: … }`

v2 additions (used by `atlassian/`):

- `inputs[].type: multiselect` with `choices: [{value, label, default}]` — installs a checkbox grid in the Web-UI Wizard; submitted as a JSON array
- `derived:` — server-computed variables. Only `kind: union` so far: gathers `base` + per-choice contribution lists into a deduplicated list, renders as a JSON array (also valid as YAML flow sequence)
- `documents:` — opt-in filter overlay. Documents listed with `requires: <feature>` are only installed when at least one of `requires` is in the multi-select selection. Documents not listed are installed unconditionally (backward-compat).

Apply-time invariants:

- PASSWORD inputs MUST have `target.kind: setting` — secrets never flow into inline documents
- PASSWORD inputs are structurally excluded from the `.applied.yaml` audit blob (see `<project>/_vance/tool-templates/<name>.applied.yaml`)
- Re-apply overwrites the applied-state document; no history

## Bootstrap the catalog in a tenant

### Easiest: via anus (recommended)

```bash
anus tool-templates import --tenant acme
```

Default repo is `https://github.com/mhus/vance-kits.git`, default ref
`main`. Override either with `--git <url>` / `--ref <branch-or-tag>`,
or pass `--token <pat>` for private repos. The command scans the
repo's `tools/*/template.yaml` files, builds a `ToolTemplateCatalogDto`
and writes it to `_tenant/config/tool-templates.yaml`. Refuses to run
if a catalog already exists — use `tool-templates update --mode
merge|overwrite` (with optional `--dry-run`) for that.

Inspect with:

```bash
anus tool-templates show --tenant acme
```

### Manual: REST PUT directly

If you can't use anus (e.g. testing the wire format), the same shape
is accepted by the admin endpoint:

```bash
JWT=$(curl -s -X POST http://localhost:9990/brain/acme/access/wile.coyote \
    -H "Content-Type: application/json" \
    -d '{"password":"acme-rocket"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

curl -s -X PUT "http://localhost:9990/brain/acme/admin/tool-templates/catalog" \
    -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
    -d '{
      "version": 1,
      "templates": [
        {
          "name": "atlassian",
          "title": "Atlassian (Jira + Confluence)",
          "description": "OAuth 2.0 (3LO) + REST API. Multi-select Jira/Confluence.",
          "category": "developer-tools",
          "source": { "url": "<vance-kits-repo-url>", "path": "tools/atlassian" }
        }
      ]
    }'
```

For local dev, point `source.url` at the workspace path
(`file:///Users/.../vance-kits-wb/repos/vance-kits`) — the
`KitResolver` accepts local clones.

## Installing a template via chat (Eddie/Arthur)

> „richte mir Jira ein"  /  „richte mir Atlassian ein"

Eddie:

1. `find_tools(query="tool_template")` → finds `tool_template_list / describe / apply`
2. `invoke_tool(tool_template_list, {})` → catalog
3. `invoke_tool(tool_template_describe, {name: "atlassian"})` → input schema; sees `features` as a multi-select with choices `[jira, confluence]`
4. ASK_USER for clientId + clientSecret + which products (Jira / Confluence / both)
5. `invoke_tool(tool_template_apply, {name: "atlassian", projectId: "_tenant", inputs: {features: ["jira"], clientId: "...", clientSecret: "..."}})`
6. ANSWER: "now open Connected Accounts and click Connect Atlassian"

The multi-select value can be passed as either a JSON array (`["jira", "confluence"]`)
or a comma-separated string (`"jira,confluence"`). The applier accepts both
and validates each value against the declared `choices`.

See `manuals/tool-installation.md` (model-facing) for the full recipe.

## Installing via REST directly

```bash
curl -s -X POST "http://localhost:9990/brain/acme/admin/tool-templates/atlassian/apply" \
    -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
    -d '{
      "projectId": "_tenant",
      "inputs": {
        "features": ["jira", "confluence"],
        "clientId": "<from-atlassian-console>",
        "clientSecret": "<from-atlassian-console>"
      }
    }'
```

Returns `{templateName, installer: {documentsAdded, settingsAdded, …}, postInstall: {kind: "oauth-connect", provider: "atlassian", message: …}}`.

## Adding your own template

1. Create `<service>/kit.yaml` with `artifact: true`
2. Create `<service>/template.yaml` with `name`, `inputs` (plus optionally `derived:`, `documents:`, `postInstall:`)
3. Create `<service>/documents/...` files using `{{var:fieldName}}` placeholders
4. Push to a git repo
5. Add an entry to the tenant catalog (`anus tool-templates import` or PUT)

Validation rules (enforced by `KitYamlMapper.parseTemplate`):
- PASSWORD inputs **must** have `target.kind: setting` (no inline secrets)
- SELECT and MULTI_SELECT inputs **must** have non-empty `choices`
- MULTI_SELECT inputs **must not** have `target.kind: setting`
- Input `name`s must be unique; choice `value`s within an input must be unique
- `{{var:X}}` references in documents must match an input or derived name
- `derived[].from` must reference a declared multi-select input
- `derived[].perChoice` keys must be values of the referenced input's choices
- `documents[].path` must be a relative path inside `documents/` (no traversal)
- `documents[].requires` values must be choices of some multi-select input
