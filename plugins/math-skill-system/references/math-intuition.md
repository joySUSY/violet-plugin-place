# 🧠 Mathematical Intuition & Logic (数学直觉与逻辑)

Code is just applied discrete mathematics. When you hit a complex algorithms problem, step away from the keyboard and write the equation first.

## 1. Propositional Logic in Code (命题逻辑的应用)

Complex `if/else` ladders are usually visual representations of un-simplified Boolean algebra.

- **De Morgan's Laws (德摩根定律):** Use this to simplify inverted constraints.
  - `!(A && B)` is exactly equivalent to `!A || !B`.
  - `!(A || B)` is exactly equivalent to `!A && !B`.
  
  *Bad (Hard to read):*
  `if (!(user.isAdmin() && user.isActive())) { return; }`
  
  *Elite (Flattened):*
  `if (!user.isAdmin() || !user.isActive()) { return; }`

## 2. Algorithmic Reduction via Math (基于数学的算法降维)

Before writing an algorithm, ask: "Is there a closed-form math solution for this?"

- **Problem:** Find the sum of all numbers from 1 to N.
  - *Brute Force (O(N)):* `let sum = 0; for(let i=1; i<=N; i++) sum+=i;`
  - *Mathematical (O(1)):* `let sum = (N * (N + 1)) / 2;`

- **Problem:** Determine if a 2D point lies inside a Polygon.
  - *Engineering guess:* Check bounds iteratively.
  - *Mathematical standard:* Use the **Ray Casting Algorithm** (Count how many times a horizontal line from the point intersects the polygon edges. Odd = inside, Even = outside).

## 3. Geometric Primitives (几何图元)

When dealing with UI layouts, game engines, or mapping, rely on standard vector math.
- **Dot Product:** Used to find the angle between two vectors, or determine if an object is "in front" of the player.
- **Cross Product:** Used to find the normal vector (the 3D direction pointing perpendicularly away from the surface). Crucial for calculating light reflection in 3D.
