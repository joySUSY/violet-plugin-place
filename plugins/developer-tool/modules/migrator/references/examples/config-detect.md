# Example 4: Auto-Detect Config in Current Directory

## Scenario

Use migrate.toml from current directory

## Current Directory Structure

```
./
├── migrate.toml
├── src/           (will be ignored)
└── package.json   (will be ignored)
```

## Config File

`./migrate.toml`:

```toml
repo = "https://github.com/org/api-gateway"
crate = "api_gateway"
project-dir = "."
```

## Execution

```bash
# Auto-detects ./migrate.toml
migrate
```

## Expected Output

```text
Auto-detected configuration: ./migrate.toml

Migrating: api-gateway
Scratch: ./temp
Crates: ./crates
Crate: api_gateway

Pipeline executing...

[All steps complete]

✓ Migration successful!
Output: ./crates/api_gateway
```

## Result

Convenient migration using auto-detected config
