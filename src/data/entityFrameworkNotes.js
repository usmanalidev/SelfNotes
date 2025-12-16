// Entity Framework Category Notes
export const entityFrameworkNotes = [
  {
    id: 40,
    category: 'Entity Framework',
    question: 'What is the difference between Lazy Loading and Eager Loading?',
    answer: `**One-Sentence Definition:** Lazy Loading loads related data on-demand when accessed, while Eager Loading loads related data immediately with the main query.

**The Core Concept:** Lazy Loading is like ordering à la carte - you get the main dish first, then order sides when you want them. Eager Loading is like a combo meal - you get everything at once. Lazy is "just in time," Eager is "all at once."

**Key Points to Remember:**
- Lazy Loading: Loads related entities when accessed (on-demand)
- Eager Loading: Loads related entities in initial query (Include())
- Lazy Loading: Can cause N+1 problem (many queries)
- Eager Loading: Single query with JOINs (better performance)
- Lazy Loading: Requires proxy classes, context must be open
- Eager Loading: Explicit control, better for known relationships

**Quick Comparison:**

| Feature | Lazy Loading | Eager Loading |
|---------|-------------|----------------|
| When Loaded | On access | Initial query |
| Queries | Multiple | Single (with JOIN) |
| Performance | Can be slow (N+1) | Usually faster |
| Control | Automatic | Explicit (Include) |

**Example:**
\`\`\`csharp
// Lazy Loading (default in some scenarios)
var user = context.Users.Find(1);
var orders = user.Orders; // Query executed here (lazy)

// Eager Loading (explicit)
var user = context.Users
    .Include(u => u.Orders)
    .Include(u => u.Profile)
    .FirstOrDefault(u => u.Id == 1);
// All data loaded in one query

// N+1 Problem (Bad)
var users = context.Users.ToList(); // 1 query
foreach (var user in users) {
    var orders = user.Orders; // N queries (one per user)
}

// Solution: Eager Loading
var users = context.Users
    .Include(u => u.Orders)
    .ToList(); // 1 query with JOIN
\`\`\``
  },
  {
    id: 41,
    category: 'Entity Framework',
    question: 'What is the N+1 Problem in Entity Framework?',
    answer: `**One-Sentence Definition:** N+1 problem occurs when you execute 1 query to get a list, then N additional queries (one per item) to load related data, resulting in N+1 total queries.

**The Core Concept:** Imagine ordering 100 pizzas. Instead of one delivery truck bringing all 100 (1 query), you get 100 separate deliveries (N+1 queries). It's inefficient! The solution is to load everything in one go (eager loading).

**Key Points to Remember:**
- Caused by lazy loading in loops
- 1 query for main data + N queries for related data
- Can cause severe performance issues
- Solution: Use Include() for eager loading
- Solution: Use projection to select only needed data
- Solution: Use explicit loading with Load()

**Example:**
\`\`\`csharp
// N+1 Problem (Bad)
var users = context.Users.ToList(); // Query 1: Get all users
foreach (var user in users) {
    Console.WriteLine(user.Orders.Count); // Query 2, 3, 4... N
    // If 100 users, that's 101 queries!
}

// Solution 1: Eager Loading
var users = context.Users
    .Include(u => u.Orders)
    .ToList(); // 1 query with JOIN

// Solution 2: Projection
var userData = context.Users
    .Select(u => new {
        u.Name,
        OrderCount = u.Orders.Count
    })
    .ToList(); // 1 query

// Solution 3: Explicit Loading
var users = context.Users.ToList();
context.Entry(users[0])
    .Collection(u => u.Orders)
    .Load(); // Load when needed, but do it efficiently
\`\`\``
  },
  {
    id: 42,
    category: 'Entity Framework',
    question: 'How to improve performance in Entity Framework?',
    answer: `**One-Sentence Definition:** EF performance can be improved by using proper loading strategies, avoiding unnecessary queries, using compiled queries, and optimizing LINQ expressions.

**The Core Concept:** Think of EF optimization like grocery shopping. Instead of making 10 trips (10 queries), make one trip with a list (eager loading). Buy only what you need (projection), and use a shopping cart efficiently (compiled queries).

**Key Points to Remember:**
- Use eager loading (Include()) instead of lazy loading in loops
- Use projection (Select()) to load only needed columns
- Use compiled queries for repeated queries
- Use AsNoTracking() for read-only operations
- Use async methods (ToListAsync()) for I/O operations
- Avoid SELECT N+1 problems
- Use raw SQL for complex queries when needed
- Batch operations for bulk inserts/updates

**Performance Tips:**

1. **Use AsNoTracking() for read-only:**
\`\`\`csharp
var users = context.Users
    .AsNoTracking() // No change tracking (faster)
    .ToList();
\`\`\`

2. **Use Projection:**
\`\`\`csharp
// Bad: Loads entire entity
var users = context.Users.ToList();

// Good: Loads only needed data
var users = context.Users
    .Select(u => new { u.Id, u.Name })
    .ToList();
\`\`\`

3. **Compiled Queries:**
\`\`\`csharp
private static readonly Func<MyContext, int, User> GetUserById =
    EF.CompileQuery((MyContext context, int id) =>
        context.Users.FirstOrDefault(u => u.Id == id));

// Usage (faster on repeated calls)
var user = GetUserById(context, 1);
\`\`\`

4. **Bulk Operations:**
\`\`\`csharp
// Bad: One query per insert
foreach (var user in users) {
    context.Users.Add(user);
    context.SaveChanges(); // Slow!
}

// Good: Batch insert
context.Users.AddRange(users);
context.SaveChanges(); // One query
\`\`\``
  },
  {
    id: 43,
    category: 'Entity Framework',
    question: 'What is the difference between IQueryable and IEnumerable in EF?',
    answer: `**One-Sentence Definition:** IQueryable builds SQL queries that execute on the database, while IEnumerable executes queries in memory after data is loaded.

**The Core Concept:** IQueryable is like giving a shopping list to the store - they bring only what's on the list (filtered at source). IEnumerable is like buying everything, then filtering at home (filtered in memory). IQueryable is "smart" - it translates LINQ to SQL.

**Key Points to Remember:**
- IQueryable: Deferred execution, builds expression trees, generates SQL
- IEnumerable: Immediate execution (after ToList()), filters in memory
- IQueryable: Better for database queries (filters at DB)
- IEnumerable: Better for in-memory collections
- IQueryable: More efficient (less data transferred)
- IEnumerable: Simpler, but can be slower

**Example:**
\`\`\`csharp
// IQueryable - SQL generated
IQueryable<User> users = context.Users; // No SQL yet
var adults = users.Where(u => u.Age > 18); // Still no SQL
var result = adults.ToList(); // SQL: SELECT * FROM Users WHERE Age > 18

// IEnumerable - in-memory filtering
IEnumerable<User> users = context.Users.ToList(); // SQL: SELECT * FROM Users
var adults = users.Where(u => u.Age > 18); // Filters in memory (all data loaded)

// Be careful with mixing
var users = context.Users.ToList(); // Converts to IEnumerable
var filtered = users.Where(u => u.Age > 18); // In-memory filter
\`\`\``
  }
];

