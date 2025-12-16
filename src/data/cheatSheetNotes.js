// Cheat Sheet Category - Quick Reference Notes
export const cheatSheetNotes = [
  {
    id: 100,
    category: 'Cheat Sheet',
    question: 'C# Quick Reference - Value vs Reference Types',
    answer: `**Value Types:** int, float, bool, struct, enum → Stack
**Reference Types:** class, interface, delegate, array, string → Heap

**Key Difference:** Value types copy by value, reference types copy by reference.`
  },
  {
    id: 101,
    category: 'Cheat Sheet',
    question: 'C# Quick Reference - const vs readonly vs static',
    answer: `**const:** Compile-time constant, must initialize at declaration, implicitly static
**readonly:** Runtime constant, can set in constructor, per-instance
**static:** Belongs to class, shared across instances`
  },
  {
    id: 102,
    category: 'Cheat Sheet',
    question: 'C# Quick Reference - ref vs out',
    answer: `**ref:** Variable must be initialized, method can read/write
**out:** Variable doesn't need init, method MUST assign before return`
  },
  {
    id: 103,
    category: 'Cheat Sheet',
    question: 'C# Quick Reference - var vs dynamic',
    answer: `**var:** Compile-time type inference, strongly typed, IntelliSense works
**dynamic:** Runtime type resolution, no compile-time checking, slower`
  },
  {
    id: 104,
    category: 'Cheat Sheet',
    question: 'C# Quick Reference - String vs StringBuilder',
    answer: `**String:** Immutable, creates new objects (slow in loops)
**StringBuilder:** Mutable, modifies buffer (fast in loops)`
  },
  {
    id: 105,
    category: 'Cheat Sheet',
    question: 'C# Quick Reference - Abstract Class vs Interface',
    answer: `**Abstract Class:** Fields, constructors, single inheritance, concrete methods
**Interface:** No fields, multiple inheritance, method signatures only (C# 8.0+ default impl)`
  },
  {
    id: 106,
    category: 'Cheat Sheet',
    question: 'C# Quick Reference - Compile-time vs Runtime Polymorphism',
    answer: `**Compile-time:** Method overloading (same name, different params)
**Runtime:** Method overriding (virtual/override keywords)`
  },
  {
    id: 107,
    category: 'Cheat Sheet',
    question: 'SQL Quick Reference - JOIN Types',
    answer: `**INNER JOIN:** Only matching rows from both tables
**LEFT JOIN:** All rows from left + matches from right (NULL if no match)
**RIGHT JOIN:** All rows from right + matches from left
**FULL OUTER:** All rows from both tables`
  },
  {
    id: 108,
    category: 'Cheat Sheet',
    question: 'SQL Quick Reference - WHERE vs HAVING',
    answer: `**WHERE:** Filters rows before GROUP BY, cannot use aggregates
**HAVING:** Filters groups after GROUP BY, can use aggregates (COUNT, SUM)`
  },
  {
    id: 109,
    category: 'Cheat Sheet',
    question: 'SQL Quick Reference - Stored Procedure vs Function',
    answer: `**Stored Procedure:** Can return multiple values, can do DML, called with EXEC
**Function:** Must return single value, read-only, used in SELECT statements`
  },
  {
    id: 110,
    category: 'Cheat Sheet',
    question: 'SQL Quick Reference - Primary Key vs Foreign Key',
    answer: `**Primary Key:** Unique identifier, not NULL, one per table, clustered index
**Foreign Key:** References another table's PK, can be NULL, maintains relationships`
  },
  {
    id: 111,
    category: 'Cheat Sheet',
    question: '.NET Quick Reference - IEnumerable vs IQueryable',
    answer: `**IEnumerable:** In-memory execution, LINQ to Objects, immediate
**IQueryable:** Database execution, LINQ to SQL, deferred, builds expression trees`
  },
  {
    id: 112,
    category: 'Cheat Sheet',
    question: '.NET Quick Reference - async/await',
    answer: `**async:** Marks method as asynchronous
**await:** Pauses execution until task completes, doesn't block thread
**Use for:** I/O operations (database, file, network)`
  },
  {
    id: 113,
    category: 'Cheat Sheet',
    question: 'Entity Framework Quick Reference - Lazy vs Eager Loading',
    answer: `**Lazy Loading:** Loads on-demand, can cause N+1 problem
**Eager Loading:** Loads with Include(), single query, better performance`
  },
  {
    id: 114,
    category: 'Cheat Sheet',
    question: 'MVC Quick Reference - ViewData vs ViewBag vs TempData',
    answer: `**ViewData:** Dictionary, requires casting, same request
**ViewBag:** Dynamic wrapper, no casting, same request
**TempData:** Survives redirects, stored in session`
  },
  {
    id: 115,
    category: 'Cheat Sheet',
    question: 'MVC Quick Reference - Session vs Cookie',
    answer: `**Session:** Server-side storage, more secure, uses memory
**Cookie:** Client-side storage, 4KB limit, sent with requests`
  },
  {
    id: 116,
    category: 'Cheat Sheet',
    question: 'SOLID Principles Quick Reference',
    answer: `**S - Single Responsibility:** One reason to change
**O - Open/Closed:** Open for extension, closed for modification
**L - Liskov Substitution:** Derived classes substitutable for base
**I - Interface Segregation:** Don't depend on unused interfaces
**D - Dependency Inversion:** Depend on abstractions, not concretions`
  },
  {
    id: 117,
    category: 'Cheat Sheet',
    question: 'Design Patterns Quick Reference',
    answer: `**Factory:** Creates objects without specifying exact class
**Repository:** Abstracts data access logic
**Singleton:** One instance, global access
**Dependency Injection:** Objects receive dependencies from external source`
  },
  {
    id: 118,
    category: 'Cheat Sheet',
    question: 'JSON vs XML Quick Reference',
    answer: `**JSON:** Lightweight, easy to parse, widely used in APIs, less verbose
**XML:** More verbose, supports attributes, namespaces, better for complex documents`
  },
  {
    id: 119,
    category: 'Cheat Sheet',
    question: 'Stack vs Queue Quick Reference',
    answer: `**Stack:** LIFO (Last In First Out), like stack of plates, Push/Pop
**Queue:** FIFO (First In First Out), like line of people, Enqueue/Dequeue`
  },
  {
    id: 120,
    category: 'Cheat Sheet',
    question: 'Serialize vs Deserialize Quick Reference',
    answer: `**Serialize:** Convert object to string/bytes (Object → JSON/XML)
**Deserialize:** Convert string/bytes to object (JSON/XML → Object)`
  },
  {
    id: 121,
    category: 'Cheat Sheet',
    question: 'Tuple Quick Reference',
    answer: `**Tuple:** Lightweight data structure to hold multiple values
**Example:** var person = (Name: "John", Age: 30);
**Use for:** Returning multiple values, temporary data grouping`
  },
  {
    id: 122,
    category: 'Cheat Sheet',
    question: 'LINQ Extension Methods Quick Reference',
    answer: `**Where:** Filters collection
**Select:** Projects/transforms elements
**First/FirstOrDefault:** Gets first element
**Any/All:** Checks if any/all match condition
**Count:** Counts elements
**OrderBy/ThenBy:** Sorts collection`
  },
  {
    id: 123,
    category: 'Cheat Sheet',
    question: 'Delegates Quick Reference',
    answer: `**Delegate:** Type-safe function pointer
**Func<T>:** Delegate that returns a value
**Action<T>:** Delegate that returns void
**Predicate<T>:** Delegate that returns bool
**Event:** Encapsulated delegate with add/remove`
  },
  {
    id: 124,
    category: 'Cheat Sheet',
    question: 'Generics Quick Reference',
    answer: `**Generics:** Code that works with any type
**Benefits:** Type safety, performance, code reuse
**Example:** List<T>, Dictionary<TKey, TValue>
**Constraints:** where T : class, where T : IComparable`
  },
  {
    id: 125,
    category: 'Cheat Sheet',
    question: 'Memory Management Quick Reference',
    answer: `**Stack:** Value types, method calls, fast, automatic
**Heap:** Reference types, objects, slower, GC managed
**GC Generations:** Gen 0 (new), Gen 1, Gen 2 (old)
**Dispose:** For unmanaged resources (files, connections)`
  },
  {
    id: 126,
    category: 'Cheat Sheet',
    question: 'JWT Quick Reference',
    answer: `**JWT:** JSON Web Token for authentication
**Parts:** Header.Payload.Signature
**Stateless:** No server-side session storage
**If Stolen:** Valid until expiration (use short expiry, refresh tokens)`
  },
  {
    id: 127,
    category: 'Cheat Sheet',
    question: 'Middleware Quick Reference',
    answer: `**Middleware:** Components in request pipeline
**Order Matters:** First registered, first executed
**Examples:** Authentication, Authorization, CORS, Logging
**Configure:** In Program.cs or Startup.cs`
  },
  {
    id: 128,
    category: 'Cheat Sheet',
    question: 'Action Filters Quick Reference',
    answer: `**Types:** Authorization, Action, Result, Exception filters
**Execution Order:** Authorization → Action → Result → Exception
**Built-in:** [Authorize], [AllowAnonymous], [ValidateAntiForgeryToken]
**Custom:** Implement IActionFilter, IAuthorizationFilter`
  },
  {
    id: 129,
    category: 'Cheat Sheet',
    question: 'Routing Quick Reference',
    answer: `**Convention-based:** Define in Startup.cs, pattern: {controller}/{action}/{id}
**Attribute routing:** [Route] on controller/action
**Constraints:** {id:int}, {name:alpha}
**Defaults:** {controller=Home}`
  },
  {
    id: 130,
    category: 'Cheat Sheet',
    question: 'Entity Framework Performance Quick Reference',
    answer: `**Use Include():** Eager loading, avoid N+1
**Use AsNoTracking():** Read-only operations
**Use Projection:** Select only needed columns
**Compiled Queries:** For repeated queries
**Batch Operations:** AddRange() instead of loop`
  }
];

