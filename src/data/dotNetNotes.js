// .NET Category Notes - Comprehensive Interview Preparation
export const dotNetNotes = [
  {
    id: 1,
    category: '.NET',
    question: 'What is Dependency Injection in .NET?',
    answer: `**One-Sentence Definition:** Dependency Injection is a design pattern where objects receive their dependencies from an external source rather than creating them internally.

**The Core Concept:** Think of DI like ordering food at a restaurant. Instead of the chef going to the market to buy ingredients (creating dependencies), the ingredients are delivered to the kitchen (injected). The chef just uses what's provided. Similarly, a class doesn't create its dependencies; they're provided by a container.

**Key Points to Remember:**
- Reduces coupling between classes
- Makes code more testable (can inject mock objects)
- Improves maintainability and flexibility
- Built-in support in .NET Core via IServiceProvider
- Three types: Constructor, Property, and Method injection

**Classic Interview Q&A:**
**Q:** Why use Dependency Injection instead of creating objects directly?
**A:** DI promotes loose coupling, makes unit testing easier (can inject mocks), and allows changing implementations without modifying the class. It follows the Dependency Inversion Principle.

**Example:**
\`\`\`csharp
// Without DI - tight coupling
public class UserService {
    private UserRepository _repo = new UserRepository(); // Bad!
}

// With DI - loose coupling
public class UserService {
    private readonly IUserRepository _repo;
    public UserService(IUserRepository repo) {
        _repo = repo; // Injected dependency
    }
}

// Registration in Startup.cs
services.AddScoped<IUserRepository, UserRepository>();
services.AddScoped<UserService>();
\`\`\``
  },
  {
    id: 2,
    category: '.NET',
    question: 'What is the difference between async and await in C#?',
    answer: `**One-Sentence Definition:** async marks a method as asynchronous, and await pauses execution until an async operation completes without blocking the thread.

**The Core Concept:** Imagine you're cooking and waiting for water to boil. Instead of standing there watching (blocking), you can do other tasks (async), and when the water boils, you come back to it (await). The thread is free to do other work while waiting.

**Key Points to Remember:**
- async methods return Task, Task<T>, or void
- await can only be used in async methods
- Doesn't block the calling thread
- Improves application responsiveness
- Use async/await for I/O operations (database, file, network)

**Classic Interview Q&A:**
**Q:** What happens when you await a Task?
**A:** The method execution is suspended, control returns to the caller, and when the Task completes, execution resumes. The thread is not blocked and can handle other requests.

**Example:**
\`\`\`csharp
// Synchronous - blocks thread
public string GetData() {
    return client.GetString("url"); // Blocks!
}

// Asynchronous - doesn't block
public async Task<string> GetDataAsync() {
    return await client.GetStringAsync("url"); // Thread free!
}

// Usage
var data = await GetDataAsync();
\`\`\``
  },
  {
    id: 3,
    category: '.NET',
    question: 'What is the difference between IEnumerable, ICollection, and IList?',
    answer: `**One-Sentence Definition:** These are interfaces representing increasing levels of collection functionality: IEnumerable (read-only iteration), ICollection (add/remove), and IList (index-based access).

**The Core Concept:** Think of a library: IEnumerable lets you browse books (read-only), ICollection lets you add/remove books, and IList lets you find a book by its shelf position (index).

**Key Points to Remember:**
- IEnumerable<T>: Basic iteration, LINQ support, read-only
- ICollection<T>: Adds Count, Add, Remove, Clear
- IList<T>: Adds index access [index], Insert, RemoveAt
- IQueryable<T>: For database queries (deferred execution)
- Choose the least specific interface needed

**Quick Comparison:**

| Feature | IEnumerable | ICollection | IList |
|---------|-------------|-------------|-------|
| Iteration | ✅ | ✅ | ✅ |
| Add/Remove | ❌ | ✅ | ✅ |
| Index Access | ❌ | ❌ | ✅ |
| Count Property | ❌ | ✅ | ✅ |

**Example:**
\`\`\`csharp
IEnumerable<int> nums = new List<int> { 1, 2, 3 };
// Can only iterate
foreach (var n in nums) { }

ICollection<int> coll = new List<int> { 1, 2, 3 };
coll.Add(4); // Can modify

IList<int> list = new List<int> { 1, 2, 3 };
int first = list[0]; // Index access
list.Insert(0, 0);
\`\`\``
  },
  {
    id: 4,
    category: '.NET',
    question: 'What is the difference between IQueryable and IEnumerable?',
    answer: `**One-Sentence Definition:** IEnumerable executes queries in memory, while IQueryable builds SQL queries that execute on the database server.

**The Core Concept:** IEnumerable is like getting all ingredients from the store first, then filtering at home. IQueryable is like giving the store a shopping list and getting only what you need. IQueryable is "lazy" - it doesn't execute until you iterate.

**Key Points to Remember:**
- IEnumerable: In-memory execution, LINQ to Objects
- IQueryable: Deferred execution, LINQ to SQL/Entities
- IQueryable builds expression trees, not immediate queries
- Use IEnumerable for in-memory collections
- Use IQueryable for database queries (Entity Framework)

**Quick Comparison:**

| Feature | IEnumerable | IQueryable |
|---------|-------------|------------|
| Execution | Immediate (in memory) | Deferred (database) |
| Where | Filters in memory | Generates SQL WHERE |
| Best For | Collections, Lists | Database queries |
| Performance | Loads all data first | Filters at database |

**Example:**
\`\`\`csharp
// IEnumerable - loads all, filters in memory
IEnumerable<User> users = db.Users.ToList(); // Executes SQL
var filtered = users.Where(u => u.Age > 18); // Filters in memory

// IQueryable - filters at database
IQueryable<User> users = db.Users; // No SQL yet
var filtered = users.Where(u => u.Age > 18); // Still no SQL
var result = filtered.ToList(); // SQL: SELECT * WHERE Age > 18
\`\`\``
  },
  {
    id: 5,
    category: '.NET',
    question: 'What is .NET Memory Management and Garbage Collection?',
    answer: `**One-Sentence Definition:** .NET automatically manages memory by tracking object lifetimes and freeing unused objects through Garbage Collection (GC).

**The Core Concept:** Think of GC like a janitor who periodically cleans up unused items. When you create objects, they're stored in memory. When no one references them, GC marks them for deletion and frees the memory. You don't manually delete objects like in C++.

**Key Points to Remember:**
- Automatic memory management (no manual delete)
- GC runs automatically when memory pressure occurs
- Three generations: Gen 0 (new objects), Gen 1, Gen 2 (old objects)
- Finalization queue for objects with finalizers
- Managed vs Unmanaged resources (need Dispose for unmanaged)

**Classic Interview Q&A:**
**Q:** What are the three generations in GC?
**A:** Gen 0: Newly allocated objects (most frequent collection). Gen 1: Objects that survived Gen 0 collection. Gen 2: Long-lived objects (least frequent collection). Objects that survive move to next generation.

**Example:**
\`\`\`csharp
// Managed resource - GC handles automatically
public void Method() {
    var obj = new MyClass(); // Allocated in Gen 0
    // When method ends, obj is eligible for GC
}

// Unmanaged resource - need Dispose
public class FileHandler : IDisposable {
    private FileStream _file;
    
    public void Dispose() {
        _file?.Close(); // Manual cleanup
        GC.SuppressFinalize(this);
    }
}
\`\`\``
  },
  {
    id: 6,
    category: '.NET',
    question: 'What is the Repository Pattern?',
    answer: `**One-Sentence Definition:** Repository Pattern is a design pattern that abstracts data access logic, providing a clean interface between business logic and data layer.

**The Core Concept:** Think of a library. You don't go directly to the shelves to get books. You ask the librarian (repository), who knows where everything is. If the library reorganizes (changes database), you still ask the librarian the same way. The repository hides data access complexity.

**Key Points to Remember:**
- Separates business logic from data access
- Makes code testable (can mock repository)
- Centralizes data access logic
- Easy to swap data sources
- Often used with Unit of Work pattern

**Classic Interview Q&A:**
**Q:** Why use Repository Pattern instead of accessing DbContext directly?
**A:** It provides abstraction, makes testing easier (mock repositories), centralizes data access, and allows changing data sources without affecting business logic.

**Example:**
\`\`\`csharp
// Repository Interface
public interface IUserRepository {
    User GetById(int id);
    void Add(User user);
    void Update(User user);
    void Delete(int id);
}

// Implementation
public class UserRepository : IUserRepository {
    private readonly DbContext _context;
    
    public User GetById(int id) {
        return _context.Users.Find(id);
    }
    
    public void Add(User user) {
        _context.Users.Add(user);
    }
}

// Usage in Service
public class UserService {
    private readonly IUserRepository _repo;
    public UserService(IUserRepository repo) {
        _repo = repo;
    }
}
\`\`\``
  },
  {
    id: 7,
    category: '.NET',
    question: 'What is Middleware in ASP.NET Core?',
    answer: `**One-Sentence Definition:** Middleware is software components that form a pipeline to handle HTTP requests and responses in ASP.NET Core.

**The Core Concept:** Imagine a security checkpoint at an airport. Your request goes through multiple stations: authentication (check ID), authorization (check ticket), logging (record entry), then finally reaches your destination. Each station is middleware. They process requests in order and can modify or stop the request.

**Key Points to Remember:**
- Executes in order (first registered, first executed)
- Can modify request/response or short-circuit pipeline
- Examples: Authentication, Authorization, CORS, Logging, Exception Handling
- Configured in Startup.cs or Program.cs
- Use app.Use() for all requests, app.Map() for specific routes

**Classic Interview Q&A:**
**Q:** What is the order of middleware execution?
**A:** Middleware executes in the order it's registered. Request flows down the pipeline, response flows back up. Exception handling middleware should be early, authentication before authorization, and routing near the end.

**Example:**
\`\`\`csharp
// In Program.cs or Startup.cs
app.UseExceptionHandler(); // First - catch errors
app.UseHttpsRedirection();
app.UseAuthentication(); // Before authorization
app.UseAuthorization();
app.UseRouting();
app.MapControllers(); // Last - handle requests

// Custom Middleware
public class LoggingMiddleware {
    private readonly RequestDelegate _next;
    
    public async Task InvokeAsync(HttpContext context) {
        // Before request
        Console.WriteLine($"Request: {context.Request.Path}");
        
        await _next(context); // Call next middleware
        
        // After response
        Console.WriteLine($"Response: {context.Response.StatusCode}");
    }
}
\`\`\``
  },
  {
    id: 8,
    category: '.NET',
    question: 'What is JWT (JSON Web Token) and how does it work?',
    answer: `**One-Sentence Definition:** JWT is a compact, URL-safe token format used for securely transmitting information between parties as JSON objects.

**The Core Concept:** Think of JWT like a concert wristband. When you enter (login), you get a wristband (JWT) that proves you're allowed in. You show it at different areas (API calls) without showing your ID each time. The wristband has encoded information about you and is signed to prevent forgery.

**Key Points to Remember:**
- Three parts: Header, Payload, Signature (separated by dots)
- Stateless authentication (server doesn't store session)
- Contains claims (user info, roles, expiration)
- Signed with secret key to prevent tampering
- Stored in localStorage or cookies

**Classic Interview Q&A:**
**Q:** What happens if a JWT is stolen?
**A:** Since JWTs are stateless, a stolen token is valid until expiration. Solutions: Use short expiration times, implement refresh tokens, use HTTPS, store in httpOnly cookies, and implement token blacklisting/revocation.

**Example:**
\`\`\`csharp
// Generate JWT
var tokenHandler = new JwtSecurityTokenHandler();
var key = Encoding.ASCII.GetBytes("secret-key");
var tokenDescriptor = new SecurityTokenDescriptor {
    Subject = new ClaimsIdentity(new[] {
        new Claim(ClaimTypes.Name, "user123"),
        new Claim(ClaimTypes.Role, "Admin")
    }),
    Expires = DateTime.UtcNow.AddHours(1),
    SigningCredentials = new SigningCredentials(
        new SymmetricSecurityKey(key),
        SecurityAlgorithms.HmacSha256Signature
    )
};
var token = tokenHandler.CreateToken(tokenDescriptor);
var tokenString = tokenHandler.WriteToken(token);

// Validate JWT
var principal = tokenHandler.ValidateToken(tokenString, 
    new TokenValidationParameters {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    }, out SecurityToken validatedToken);
\`\`\``
  }
];
