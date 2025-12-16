// General Questions Category Notes - From Zero To Mastery
export const generalQuestionsNotes = [
  {
    id: 200,
    category: 'General Questions',
    question: 'What is .NET, and how does it work?',
    answer: `**One-Sentence Definition:** .NET is a cross-platform framework developed by Microsoft for building web, desktop, mobile, and cloud applications that supports multiple programming languages.

**The Core Concept:** Think of .NET as a universal translator. You write code in C# (or other .NET languages), and instead of compiling directly to machine code, it first compiles into an intermediate language (CIL). Then the CLR translates this into machine code at runtime, allowing your code to run on different operating systems without rewriting it.

**Key Points to Remember:**
- Cross-platform framework (Windows, Linux, macOS)
- Supports multiple languages (C#, F#, VB.NET)
- Compiles to Common Intermediate Language (CIL)
- Common Language Runtime (CLR) executes the code
- Just-In-Time (JIT) compiler converts CIL to machine code
- Base Class Library (BCL) provides reusable components

**Key Components:**
- **CLR (Common Language Runtime)** – Executes .NET applications and manages memory, security, and performance
- **Base Class Library (BCL)** – Collection of reusable libraries for file handling, collections, and more
- **JIT (Just-In-Time) Compiler** – Converts CIL into optimized machine code at runtime

**Why Interviewers Ask This:**
Interviewers want to see if you understand the architecture of .NET, how it differs from traditional compiled languages, and how the CLR enables cross-platform execution.

**Example:**
\`\`\`csharp
// Your C# code
public class Program {
    public static void Main() {
        Console.WriteLine("Hello, .NET!");
    }
}

// Compiles to CIL (Common Intermediate Language)
// Then CLR's JIT compiler converts to machine code at runtime
\`\`\``
  },
  {
    id: 201,
    category: 'General Questions',
    question: 'What is the CLR, and why is it important?',
    answer: `**One-Sentence Definition:** The Common Language Runtime (CLR) is the execution environment for .NET applications that provides automatic memory management, security, and performance optimizations.

**The Core Concept:** Think of CLR as a smart manager for your application. It doesn't just run your code - it watches over it, manages memory automatically, ensures security, and optimizes performance. It's like having a personal assistant that handles all the tedious tasks so you can focus on writing code.

**Key Points to Remember:**
- Executes .NET applications
- Provides automatic memory management (Garbage Collection)
- Enforces security policies
- JIT compilation for performance
- Exception handling
- Type safety verification

**How It Works:**
1. Code written in C# compiles into Common Intermediate Language (CIL)
2. Just-In-Time (JIT) compiler translates CIL into machine code at runtime
3. Garbage Collector (GC) automatically manages memory by reclaiming unused objects
4. CLR enforces security policies and prevents unauthorized memory access

**Why Interviewers Ask This:**
Since the CLR is the core of the .NET runtime, interviewers want to see if you understand how .NET applications execute and how features like JIT compilation and garbage collection improve performance.

**Example:**
\`\`\`csharp
// When you write this:
Person p = new Person();

// CLR handles:
// 1. Memory allocation
// 2. Type safety checking
// 3. Security verification
// 4. Automatic cleanup when object is no longer needed
\`\`\``
  },
  {
    id: 202,
    category: 'General Questions',
    question: 'What are the differences between .NET Framework, .NET Core, and .NET 5+?',
    answer: `**One-Sentence Definition:** .NET Framework is Windows-only legacy framework, .NET Core is the first cross-platform version, and .NET 5+ is the unified modern framework that replaces both.

**The Core Concept:** Think of .NET's evolution like smartphones. .NET Framework was like the first iPhone - revolutionary but limited to one platform (Windows). .NET Core was like Android - cross-platform and flexible. .NET 5+ is like modern smartphones - unified, powerful, and works everywhere.

**Key Differences:**

| Feature | .NET Framework | .NET Core | .NET 5+ |
|---------|---------------|-----------|---------|
| Platform | Windows only | Cross-platform | Cross-platform |
| Updates | No major updates | Active development | Active development |
| Use Cases | Legacy enterprise apps | Modern cloud apps | All application types |
| Performance | Good | Better | Best |
| Docker Support | Limited | Full support | Full support |

**Key Points:**
- **.NET Framework** – Windows-only, supports WinForms, WPF, and older ASP.NET Web Forms. Still used in enterprise applications but no longer receives major updates
- **.NET Core** – First cross-platform version, optimized for cloud and high-performance applications. Supports Docker, Kubernetes, and microservices
- **.NET 5+** – Replaces .NET Core, unifying desktop, mobile, cloud, and AI under a single framework. Latest LTS version is .NET 8 (2023), latest STS is .NET 9 (2024)

**Why Interviewers Ask This:**
Understanding these versions helps developers choose the right .NET stack for different projects and shows awareness of how .NET has evolved from a Windows-only to a modern cross-platform framework.

**Example:**
\`\`\`csharp
// .NET 5+ - Modern unified approach
// One framework for all platforms
dotnet new webapi -n MyApi
dotnet new blazor -n MyBlazorApp
dotnet new maui -n MyMobileApp
\`\`\``
  },
  {
    id: 203,
    category: 'General Questions',
    question: 'What is CIL (Common Intermediate Language)?',
    answer: `**One-Sentence Definition:** CIL is an intermediate language that .NET code compiles to before being executed by the CLR, enabling cross-platform compatibility and language interoperability.

**The Core Concept:** Think of CIL as a universal language. Just like how English is used as a common language for international communication, CIL is the common language that all .NET languages (C#, F#, VB.NET) speak. This allows them to work together seamlessly.

**Key Points to Remember:**
- Intermediate step between source code and machine code
- Enables cross-platform compatibility
- Allows language interoperability
- All .NET languages compile to CIL
- CLR converts CIL to machine code at runtime

**How It Works:**
1. You write code in C# (or F#, VB.NET)
2. Compiler converts it to CIL
3. CIL is platform-independent
4. CLR's JIT compiler converts CIL to platform-specific machine code

**Why Interviewers Ask This:**
Understanding CIL shows that you grasp how .NET code executes and why .NET applications are cross-platform and language-agnostic.

**Example:**
\`\`\`csharp
// C# Source Code
public int Add(int a, int b) {
    return a + b;
}

// Compiles to CIL (simplified):
.method public int32 Add(int32 a, int32 b) {
    ldarg.0    // Load first argument
    ldarg.1    // Load second argument
    add        // Add them
    ret        // Return result
}

// Then JIT compiler converts to machine code
\`\`\``
  },
  {
    id: 204,
    category: 'General Questions',
    question: 'What is the difference between managed and unmanaged code?',
    answer: `**One-Sentence Definition:** Managed code runs inside the CLR with automatic memory management and safety features, while unmanaged code runs outside the CLR and requires manual memory management.

**The Core Concept:** Think of managed code as living in a gated community with security guards (CLR) watching over you, while unmanaged code is like living in the wild where you're responsible for everything yourself. Managed code is safer but slightly less flexible; unmanaged code is more powerful but riskier.

**Key Differences:**

| Feature | Managed Code | Unmanaged Code |
|---------|-------------|----------------|
| Memory Management | Automatic (GC) | Manual |
| Safety | Type-safe, secure | No automatic safety |
| Execution | Inside CLR | Outside CLR |
| Languages | C#, F#, VB.NET | C, C++ |
| Performance | Slightly slower | Faster (no overhead) |
| Risk | Lower (memory leaks rare) | Higher (memory leaks common) |

**Managed Code:**
- Runs inside the CLR
- Automatic memory management (Garbage Collector)
- Type safety and security enforcement
- Exception handling
- Example: C# code

**Unmanaged Code:**
- Runs outside the CLR
- Manual memory management (malloc/free)
- No automatic safety features
- Direct system access
- Example: C/C++ code, P/Invoke calls

**Why Interviewers Ask This:**
Interviewers want to see if you understand how the CLR manages memory and execution, know the risks and benefits of using unmanaged code, and are familiar with P/Invoke and COM Interop.

**Example:**
\`\`\`csharp
// Managed Code (C#)
Person p = new Person(); // CLR manages memory
// No need to free memory - GC handles it

// Unmanaged Code (C/C++ via P/Invoke)
[DllImport("user32.dll")]
public static extern int MessageBox(IntPtr hWnd, string text, string caption, uint type);
// Manual memory management required in the native code
\`\`\``
  },
  {
    id: 205,
    category: 'General Questions',
    question: 'What is garbage collection in .NET, and how does it work?',
    answer: `**One-Sentence Definition:** Garbage collection is an automatic memory management system in .NET that frees memory used by objects that are no longer referenced, preventing memory leaks.

**The Core Concept:** Think of garbage collection like an automatic cleaning service. When you're done using objects (like throwing away trash), you don't need to manually clean up - the garbage collector automatically comes around, identifies what's no longer needed, and frees up that memory for reuse.

**Key Points to Remember:**
- Automatic memory management
- Prevents memory leaks
- Runs automatically when needed
- Three generations (Gen 0, Gen 1, Gen 2)
- Non-deterministic (you can't predict exactly when it runs)
- Can cause brief pauses in execution

**How Garbage Collection Works:**
1. **Marking** – GC scans memory to identify which objects are still referenced (reachable)
2. **Sweeping** – GC identifies unreachable objects (garbage)
3. **Compacting** – GC moves remaining objects together to free contiguous memory blocks

**Three Generations:**
- **Gen 0** – Newly allocated objects (collected most frequently)
- **Gen 1** – Objects that survived Gen 0 collection
- **Gen 2** – Long-lived objects (collected least frequently)

**Why Interviewers Ask This:**
Understanding garbage collection is crucial because it affects application performance. Interviewers want to know if you understand when GC runs, how it impacts performance, and how to optimize for it.

**Example:**
\`\`\`csharp
// Object creation
var person = new Person { Name = "John" };
// Object is allocated in Gen 0

// When person goes out of scope or is set to null
person = null;
// Object becomes eligible for garbage collection

// GC runs automatically (you can't control exactly when)
// If object survived, it moves to Gen 1, then Gen 2

// Force GC (not recommended in production)
GC.Collect();
GC.WaitForPendingFinalizers();
\`\`\``
  },
  {
    id: 206,
    category: 'General Questions',
    question: 'How does async/await work under the hood in C#?',
    answer: `**One-Sentence Definition:** async/await uses state machines to transform asynchronous methods, allowing execution to pause at await points and resume when the awaited task completes, without blocking threads.

**The Core Concept:** Think of async/await like ordering food at a restaurant. When you order (await), you don't stand there blocking the counter - you sit down (method pauses), do other things (thread is free), and when your food is ready (task completes), you're notified and continue eating (method resumes).

**Key Points to Remember:**
- Compiler transforms async methods into state machines
- await doesn't block the thread
- Execution pauses and resumes automatically
- Continuations handle resuming execution
- No new threads created by default
- State machine tracks method progress

**How It Works:**
1. Compiler transforms async method into a state machine class
2. Each await point becomes a state in the state machine
3. When await is reached, method pauses and returns control
4. Continuation is registered to resume when task completes
5. When task completes, continuation runs and method resumes

**What Happens at Compile Time:**
\`\`\`csharp
// Your code:
public async Task<int> FetchDataAsync() {
    await Task.Delay(1000);
    return 42;
}

// Compiler transforms to state machine:
public Task<int> FetchDataAsync() {
    var stateMachine = new FetchDataStateMachine();
    stateMachine.MoveNext(); // Starts execution
    return stateMachine.Task;
}
\`\`\`

**Does async/await Create Threads?**
No, async/await does **not** create new threads by itself. It schedules tasks asynchronously and resumes execution when ready. If needed, Task.Run() can be used to run tasks on background threads.

**Common Pitfalls:**
- **Blocking calls** (.Result, .Wait()) – Can cause deadlocks
- **Excessive Task.Run()** – Unnecessary thread switching
- **Ignoring ConfigureAwait(false)** – Unnecessary context switches in libraries

**Why Interviewers Ask This:**
Interviewers want to see if you understand how C# manages asynchronous execution, can explain state machines and continuations, and know why async/await doesn't create new threads but schedules tasks efficiently.`
  },
  {
    id: 207,
    category: 'General Questions',
    question: 'What are some best practices for working with Entity Framework Core?',
    answer: `**One-Sentence Definition:** EF Core best practices include using AsNoTracking() for read-only queries, optimizing with projections, avoiding N+1 problems, using transactions, and leveraging connection pooling.

**The Core Concept:** Think of EF Core best practices like driving efficiently. You don't want to waste fuel (memory/CPU), you want to take the fastest route (optimized queries), and you want to be safe (transactions). Following best practices ensures your database operations are fast, efficient, and reliable.

**Key Best Practices:**

**1. Use AsNoTracking() for Read-Only Queries**
\`\`\`csharp
// Good: No change tracking overhead
var users = dbContext.Users.AsNoTracking().ToList();

// Bad: Unnecessary tracking for read-only data
var users = dbContext.Users.ToList();
\`\`\`

**2. Optimize Queries with Projection**
\`\`\`csharp
// Good: Only fetch needed fields
var names = dbContext.Users.Select(u => u.Name).ToList();

// Bad: Fetch entire entities when only name is needed
var users = dbContext.Users.ToList();
var names = users.Select(u => u.Name).ToList();
\`\`\`

**3. Avoid Lazy Loading (N+1 Problem)**
\`\`\`csharp
// Bad: N+1 queries
var users = dbContext.Users.ToList();
foreach (var user in users) {
    var orders = user.Orders; // Query executed here (N queries)
}

// Good: Eager loading
var users = dbContext.Users.Include(u => u.Orders).ToList();
\`\`\`

**4. Use Transactions for Multiple Operations**
\`\`\`csharp
using var transaction = dbContext.Database.BeginTransaction();
try {
    dbContext.Users.Add(new User { Name = "John" });
    dbContext.Orders.Add(new Order { UserId = 1 });
    dbContext.SaveChanges();
    transaction.Commit();
} catch {
    transaction.Rollback();
}
\`\`\`

**5. Leverage Connection Pooling**
\`\`\`csharp
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString, sqlOptions =>
        sqlOptions.EnableRetryOnFailure()));
\`\`\`

**Why Interviewers Ask This:**
Interviewers ask about EF Core best practices to see if you understand common pitfalls and how to optimize database queries. They want to know if you can balance performance, security, and maintainability when working with relational databases.`
  }
];

