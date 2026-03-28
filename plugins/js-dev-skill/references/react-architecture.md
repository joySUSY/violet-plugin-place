# ⚛️ React & Next.js Architecture (现代React架构)

The React ecosystem has shifted radically. Client-side Single Page Applications (SPAs) are legacy. The Server Component era is here.
> *客户端单页应用（SPA）已成历史，服务端组件（RSC）是未来航向。*

## 1. React Server Components (RSC) vs Client Components

By default (in Next.js App Router), all components are Server Components. They run on the server, have zero JavaScript bundle size, and can directly query databases.

- **Server Components (Default):**
  - Use for: Fetching data, accessing backend secrets (`process.env.DB_PASS`), rendering heavy Markdown, SEO structure.
  - Cannot use: `useState`, `onClick`, `useEffect`, browser APIs (`window.location`).

- **Client Components (`"use client"`):**
  - Pushed to the very edge of the tree (The Leaves).
  - Use for: Interactivity (buttons, inputs), browser APIs, hooks.
  - *Golden Rule:* Never put `"use client"` at the root layout. Only import it where the button click actually happens.

## 2. The Death of `useEffect` (终结 useEffect)

`useEffect` is the most abused hook in React. It causes infinite loops, memory leaks, and cascading UI waterfalls. 

- **Data Fetching:** Do not fetch in `useEffect`. Use Server Components (`await fetch()`), or React Query (`useQuery`) on the client.
- **Derived State:** If a value can be computed, do it during render.
  - *Bad:* 
    ```typescript
    const [fullName, setFullName] = useState("");
    useEffect(() => { setFullName(first + last) }, [first, last]);
    ```
  - *Elite:*
    ```typescript
    const fullName = `${first} ${last}`; // Calculated instantly, no double-render.
    ```
- **When to actually use `useEffect`?** Only for synchronizing with an external non-React system. (e.g., subscribing to a WebSocket, or initiating a Three.js canvas).

## 3. Server Actions (Next.js Vercel Ecosystem)

The modern way to mutate data. No need to write manual API routes (`/pages/api/submit`).

```typescript
// app/actions.ts
'use server'
import { db } from '@/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts'); // Tell Next.js to purge cache for this page
}
```

## 4. The Vercel Mindset: Edge & Caching

- Vercel caches everything aggressively by default.
- If data must be real-time, explicitly opt out: `export const dynamic = "force-dynamic";`.
- Use the Edge Runtime for blazing fast middleware (Auth checking before the page loads).
