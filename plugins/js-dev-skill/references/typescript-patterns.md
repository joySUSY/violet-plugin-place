# 🔒 Elite TypeScript Patterns (高阶类型模式)

TypeScript allows you to push business logic failures from Runtime to Compile time. 
> *TypeScript 的核心价值：将运行时的业务灾难前置到编译阶段。*

## 1. Discriminated Unions (可辨识联合类型)

The most powerful pattern in TS. It prevents you from accessing state that shouldn't exist.

- *Bad (Optional soup):*
```typescript
interface RequestShape {
  status: 'loading' | 'success' | 'error';
  data?: Payload; // Is data here when loading? Maybe?
  error?: Error;
}
```

- *Elite (Discriminated):*
```typescript
type RequestShape = 
  | { status: 'loading' } // If loading, you CANNOT access data. The compiler stops you.
  | { status: 'success', data: Payload }
  | { status: 'error', error: Error };
```

## 2. Exhaustiveness Checking (穷尽检查)

When using a Discriminated Union in a `switch` statement, ensure that future engineers don't forget to handle new cases by using the `never` type.

```typescript
function handleRequest(req: RequestShape) {
  switch (req.status) {
    case 'loading': return <Spinner />;
    case 'success': return <Data res={req.data} />;
    case 'error': return <Error fallback={req.error} />;
    default:
      // If someone adds a 'retrying' status to the type above, 
      // the compiler will throw an error here immediately.
      const _exhaustiveCheck: never = req; 
      return _exhaustiveCheck;
  }
}
```

## 3. Runtime Validation: The API Boundary (运行时边界防御)

TypeScript *disappears* at runtime. If an API sends you a string instead of a number, `interface User` will not save you. App crashes.
> *TS 是不防弹的。在所有外部数据输入口，必须进行 Zod 运行时校验。*

```typescript
import { z } from 'zod';

// Define the runtime schema
const UserSchema = z.object({
  id: z.string().uuid(),
  age: z.number().min(18),
});

// Extract the compile-time type
type User = z.infer<typeof UserSchema>;

// Validate raw JSON from network
const safeUser = UserSchema.parse(await res.json()); 
```

## 4. Omit and Pick (类型复用)

Never write the same type twice. 
- Creating a form to submit a new user? Don't write a new interface without an ID. Use `Omit`.
```typescript
type CreateUserDTO = Omit<User, 'id' | 'createdAt'>;
type UserSummary = Pick<User, 'id' | 'name'>;
```
