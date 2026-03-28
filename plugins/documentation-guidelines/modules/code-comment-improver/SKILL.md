---
name: code-comment-improver
description: Use when improving code comments, adding documentation, or reviewing comment quality. Helps write clear, useful comments that explain why, not just what.
---

# Code Comment Improver

## Overview

Transform unclear or missing comments into documentation that genuinely helps developers. This skill helps you write comments that explain the "why" behind code, document edge cases, and make complex logic understandable without stating the obvious.

## When to Use

- Reviewing code with poor or no comments
- Adding documentation to complex functions
- Writing JSDoc/docstrings for APIs
- Explaining non-obvious business logic
- Documenting workarounds and edge cases

## Output Structure

```
COMMENT IMPROVEMENT:

## Original Code
```language
[original code with existing comments]
```

## Improved Code
```language
[code with improved comments]
```

## Changes Made
- [What was added/changed and why]
- [What was removed and why]

---

COMMENT TYPES USED:

### File/Module Header
```
/**
 * [Module purpose]
 *
 * @module [name]
 * @see [related modules]
 */
```

### Function Documentation
```
/**
 * [Brief description]
 *
 * [Detailed explanation if needed]
 *
 * @param {type} name - Description
 * @returns {type} Description
 * @throws {ErrorType} When [condition]
 * @example
 * [usage example]
 */
```

### Inline Comments
```
// [Why this approach, not what it does]
```

### Block Comments
```
/*
 * [Multi-line explanation for complex sections]
 * [Include context, constraints, alternatives considered]
 */
```

### TODO/FIXME
```
// TODO(username): [What needs to be done] - [Ticket/Issue ref]
// FIXME: [What's broken] - [Why it's deferred]
// HACK: [Why this workaround exists] - [When it can be removed]
```
```

## Quick Reference

| Element | Best Practice |
|---------|--------------|
| What to comment | Why, not what |
| Function docs | Params, returns, throws, examples |
| Inline comments | Non-obvious logic only |
| TODOs | Include owner and ticket |
| Edge cases | Always document |
| Magic numbers | Explain or use constants |
| Workarounds | Link to issue, explain when removable |

## Comment Principles

### Comment the Why, Not the What

Bad:
```javascript
// Increment counter
counter++;
```

Good:
```javascript
// Track retry attempts to prevent infinite loops (max 3 retries per spec)
counter++;
```

### Document Edge Cases

```javascript
// Edge case: Empty arrays return null, not empty object
// This matches API v2 behavior for backward compatibility
if (items.length === 0) {
  return null;
}
```

### Explain Business Logic

```javascript
// Orders over $1000 require manager approval per company policy
// See: https://wiki.company.com/order-approval-policy
if (order.total > 1000) {
  await requestManagerApproval(order);
}
```

### Mark Technical Debt

```javascript
// HACK: Manually parsing dates because date-fns doesn't handle
// the legacy API's non-standard format (YYYYDDMM instead of YYYYMMDD)
// Remove when: Legacy API sunset (Q3 2024) - Ticket: TECH-456
```

## Common Mistakes

- **Stating the obvious**: `// Set x to 5` for `x = 5`
- **Outdated comments**: Comment says one thing, code does another
- **Missing context**: "Fix for bug" without saying what bug
- **No parameter docs**: Readers guess what params mean
- **Missing units**: `timeout: 1000` - milliseconds? seconds?
- **Cryptic abbreviations**: Comments should clarify, not confuse

## Examples

### Example 1: JavaScript Function Documentation

**Input**: Improve comments for this authentication function

```javascript
// check login
function checkLogin(user, pass) {
  // hash
  const h = hash(pass);
  // find user
  const u = db.find(user);
  // check
  if (u && u.hash === h) {
    return makeToken(u);
  }
  return null;
}
```

**Output**:
```javascript
/**
 * Authenticates a user and returns a session token.
 *
 * Uses bcrypt for password comparison (timing-attack safe).
 * Failed attempts are logged but not rate-limited here -
 * rate limiting is handled at the middleware layer.
 *
 * @param {string} username - User's login identifier (email or username)
 * @param {string} password - Plaintext password (never logged)
 * @returns {string|null} JWT session token if valid, null if authentication fails
 * @throws {DatabaseError} If database connection fails
 *
 * @example
 * const token = await authenticateUser('alice@example.com', 'password123');
 * if (token) {
 *   res.cookie('session', token);
 * }
 */
async function authenticateUser(username, password) {
  const passwordHash = await hashPassword(password);
  const user = await db.findUserByUsername(username);

  // bcrypt.compare handles null user gracefully (returns false)
  // This prevents timing attacks that could reveal valid usernames
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    return generateSessionToken(user);
  }

  return null;
}
```

### Example 2: Python Class Documentation

**Input**: Improve comments for this data processing class

```python
class DataProcessor:
    def __init__(self, data):
        self.data = data
        self.cache = {}

    def process(self):
        # process data
        results = []
        for item in self.data:
            # skip bad
            if not item.get('valid'):
                continue
            # transform
            transformed = self._transform(item)
            results.append(transformed)
        return results

    def _transform(self, item):
        # check cache
        if item['id'] in self.cache:
            return self.cache[item['id']]
        # do transform
        result = {
            'id': item['id'],
            'value': item['raw'] * 1.1  # adjust
        }
        self.cache[item['id']] = result
        return result
```

**Output**:
```python
"""
Data processing pipeline for financial transaction records.

This module handles the ETL process for raw transaction data,
applying business rules and caching for performance.

Example:
    processor = DataProcessor(raw_transactions)
    cleaned_data = processor.process()
    save_to_warehouse(cleaned_data)
"""


class DataProcessor:
    """
    Processes raw transaction data with validation and transformation.

    Uses an in-memory cache to avoid reprocessing duplicate transaction IDs,
    which commonly occur in batch imports from the legacy system.

    Attributes:
        data: Raw transaction records to process
        cache: Memoization cache keyed by transaction ID

    Note:
        Cache is not thread-safe. Use separate instances for parallel processing.
    """

    def __init__(self, data: list[dict]) -> None:
        self.data = data
        self.cache: dict[str, dict] = {}

    def process(self) -> list[dict]:
        """
        Process all valid transactions and return transformed results.

        Invalid records (missing 'valid' flag or valid=False) are silently
        skipped. This matches the legacy system behavior - invalid records
        are handled by a separate reconciliation process.

        Returns:
            List of transformed transaction records
        """
        results = []
        for item in self.data:
            if not item.get('valid'):
                continue

            transformed = self._transform(item)
            results.append(transformed)

        return results

    def _transform(self, item: dict) -> dict:
        """
        Transform a single transaction record.

        Applies the 10% fee adjustment required by the 2023 pricing update.
        Results are cached by ID to handle duplicate records in batch imports.

        Args:
            item: Raw transaction with 'id' and 'raw' fields

        Returns:
            Transformed record with adjusted value
        """
        if item['id'] in self.cache:
            return self.cache[item['id']]

        # 1.1 multiplier = 10% processing fee (see BILLING-2023-Q4 spec)
        result = {
            'id': item['id'],
            'value': item['raw'] * 1.1,
        }

        self.cache[item['id']] = result
        return result
```

### Example 3: React Component Documentation

**Input**: Improve comments for this React component

```jsx
function UserList({ users, onSelect }) {
  const [filter, setFilter] = useState('');

  // filter users
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p>No users</p>
      ) : (
        <ul>
          {filtered.map(user => (
            <li key={user.id} onClick={() => onSelect(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Output**:
```jsx
/**
 * Searchable list of users with click-to-select functionality.
 *
 * Renders an input for filtering and a list of matching users.
 * Filter is case-insensitive and matches anywhere in the user's name.
 *
 * @component
 * @example
 * <UserList
 *   users={[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]}
 *   onSelect={(user) => console.log('Selected:', user.name)}
 * />
 */
function UserList({ users, onSelect }) {
  const [filter, setFilter] = useState('');

  /*
   * Case-insensitive substring search.
   *
   * Note: For large lists (1000+ users), consider debouncing the filter
   * or using a virtualized list. Current implementation is optimized for
   * typical team sizes (< 500 users).
   */
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="user-list">
      <input
        type="text"
        placeholder="Search users..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        aria-label="Filter users by name"
      />

      {filteredUsers.length === 0 ? (
        // Show empty state - distinguishes "no matches" from "no users"
        <p className="user-list__empty">
          {filter ? 'No matching users' : 'No users available'}
        </p>
      ) : (
        <ul className="user-list__items" role="listbox">
          {filteredUsers.map(user => (
            <li
              key={user.id}
              onClick={() => onSelect(user)}
              role="option"
              tabIndex={0}
              // Keyboard support for accessibility
              onKeyDown={e => e.key === 'Enter' && onSelect(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

UserList.propTypes = {
  /** Array of user objects with id and name */
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  /** Callback fired when a user is selected */
  onSelect: PropTypes.func.isRequired,
};
```

## Quality Checklist

- [ ] Comments explain WHY, not WHAT
- [ ] Function docs include params, returns, throws
- [ ] Edge cases are documented
- [ ] Business logic has context/links
- [ ] Magic numbers are explained
- [ ] TODOs have owner and ticket reference
- [ ] Workarounds explain when removable
- [ ] No obvious/redundant comments
- [ ] Comments are accurate (match code behavior)
- [ ] Examples provided for complex functions
