# Tool Templates — `vance-kits/tools/`

One-way kits (`artifact: true`) that ship a `template.yaml` sibling of
`kit.yaml`. The `template.yaml` declares an input schema; the kit's
documents use `{{var:fieldName}}` placeholders that are substituted at
apply-time. PASSWORD inputs land in encrypted settings, not inline
documents.

Currently included:

| Path | What |
|---|---|
| `jira/` | Atlassian Jira via OAuth 2.0 (3LO) + REST API |
| `imap-mailbox/` | Read-only IMAP (user + app-password) |
| `smtp-sender/` | Outbound SMTP (user + app-password) |

## Bootstrap the catalog in a tenant

After `mvn install` of the brain and a fresh-mongo start:

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
          "name": "jira",
          "title": "Atlassian Jira",
          "description": "OAuth 2.0 (3LO) + REST API. Standard plan reaches.",
          "category": "developer-tools",
          "source": { "url": "<vance-kits-repo-url>", "path": "tools/jira" }
        },
        {
          "name": "imap-mailbox",
          "title": "IMAP Mailbox (read-only)",
          "description": "Read-only IMAP via user + app-password.",
          "category": "communication",
          "source": { "url": "<vance-kits-repo-url>", "path": "tools/imap-mailbox" }
        },
        {
          "name": "smtp-sender",
          "title": "SMTP sender",
          "description": "Outbound mail (transactional). user + app-password.",
          "category": "communication",
          "source": { "url": "<vance-kits-repo-url>", "path": "tools/smtp-sender" }
        }
      ]
    }'
```

For local dev, point `source.url` at the workspace path
(`file:///Users/.../vance-kits-wb/repos/vance-kits`) — the
`KitResolver` accepts local clones.

## Installing a template via chat (Eddie/Arthur)

> „richte mir Jira ein"

Eddie:

1. `find_tools(query="tool_template")` → finds `tool_template_list / describe / apply`
2. `invoke_tool(tool_template_list, {})` → catalog
3. `invoke_tool(tool_template_describe, {name: "jira"})` → input schema
4. ASK_USER for clientId + clientSecret
5. `invoke_tool(tool_template_apply, {name: "jira", projectId: "_tenant", inputs: {...}})`
6. ANSWER: "now open Connected Accounts and click Connect Atlassian"

See `manuals/tool-installation.md` (model-facing) for the full recipe.

## Installing via REST directly

```bash
curl -s -X POST "http://localhost:9990/brain/acme/admin/tool-templates/jira/apply" \
    -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
    -d '{
      "projectId": "_tenant",
      "inputs": {
        "clientId": "<from-atlassian-console>",
        "clientSecret": "<from-atlassian-console>"
      }
    }'
```

Returns `{templateName, installer: {documentsAdded, settingsAdded, …}, postInstall: {kind: "oauth-connect", provider: "atlassian", message: …}}`.

## Adding your own template

1. Create `<service>/kit.yaml` with `artifact: true`
2. Create `<service>/template.yaml` with `name`, `inputs` (and optionally `postInstall`)
3. Create `<service>/documents/...` files using `{{var:fieldName}}` placeholders
4. Push to a git repo
5. Add an entry to the tenant catalog (PUT, see above)

Validation rules (enforced by `KitYamlMapper.parseTemplate`):
- PASSWORD inputs **must** have `target.kind: setting` (no inline secrets)
- SELECT inputs **must** have non-empty `choices`
- Input `name`s must be unique
- `{{var:X}}` references in documents must match an input name
