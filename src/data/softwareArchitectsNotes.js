// Software Architects Category Notes
export const softwareArchitectsNotes = [
  {
    id: 8000,
    category: 'Software Architects',
    question: 'How do you decide between a monolith, modular monolith, and microservices for a new system?',
    answer: `**One-Sentence Definition:** Choose monolith for small teams and simple systems, modular monolith for medium complexity with future flexibility, and microservices for large-scale systems with independent teams and high scalability needs.

**The Core Concept:** Think of it like choosing a house. A monolith is like a studio apartment - everything in one room, simple but limited. A modular monolith is like a house with separate rooms - still one building but organized. Microservices are like a neighborhood - each house is independent, but you need roads (networking) to connect them.

**Decision Factors:**

**1. Team Size:**
- **Monolith**: Best for small teams (1-5 developers)
- **Modular Monolith**: Good for medium teams (5-15 developers)
- **Microservices**: Needed for large teams (15+ developers)

**2. System Complexity:**
- **Monolith**: Simple applications, single business domain
- **Modular Monolith**: Medium complexity, multiple domains but related
- **Microservices**: High complexity, multiple independent domains

**3. Scalability Requirements:**
- **Monolith**: Scale the whole application together
- **Modular Monolith**: Can scale modules independently within limits
- **Microservices**: Scale each service independently based on demand

**4. Deployment Frequency:**
- **Monolith**: Deploy entire application together
- **Modular Monolith**: Deploy modules independently but within same deployment
- **Microservices**: Deploy services completely independently

**Example Decision Tree:**
\`\`\`
Start with Monolith
    ↓
Is team growing? → Yes → Consider Modular Monolith
    ↓
Is system complex? → Yes → Consider Microservices
    ↓
Need independent scaling? → Yes → Microservices
    ↓
Otherwise → Stay with current architecture
\`\`\`

**Real-World Example:**
- **E-commerce startup**: Start with monolith (simple, fast to build)
- **Growing e-commerce**: Move to modular monolith (separate payment, inventory, shipping modules)
- **Large e-commerce platform**: Use microservices (payment service, inventory service, shipping service, each scaled independently)`
  },
  {
    id: 8001,
    category: 'Software Architects',
    question: 'What are the trade-offs between layered, vertical slice, and hexagonal architectures?',
    answer: `**One-Sentence Definition:** Layered architecture organizes by technical concerns (UI, Business, Data), vertical slice organizes by features end-to-end, and hexagonal architecture isolates business logic from external dependencies.

**The Core Concept:** Think of organizing a restaurant. Layered is like organizing by job type (all chefs together, all waiters together). Vertical slice is like organizing by complete meals (one team handles appetizer to dessert). Hexagonal is like having a core kitchen (business logic) with multiple doors (adapters) for different ways to interact.

**Layered Architecture:**

**Structure:**
\`\`\`
┌─────────────┐
│ Presentation│ (UI Layer)
├─────────────┤
│   Business  │ (Business Logic)
├─────────────┤
│    Data     │ (Data Access)
└─────────────┘
\`\`\`

**Pros:**
- Simple to understand
- Clear separation of concerns
- Easy for beginners

**Cons:**
- Changes often affect multiple layers
- Business logic can leak into other layers
- Hard to test in isolation
- Can create "anemic domain models"

**Vertical Slice Architecture:**

**Structure:**
\`\`\`
Feature: Create Order
├── UI (Order Form)
├── Business Logic (Order Processing)
└── Data (Order Repository)

Feature: Process Payment
├── UI (Payment Form)
├── Business Logic (Payment Processing)
└── Data (Payment Repository)
\`\`\`

**Pros:**
- Changes are isolated to one feature
- Easier to test complete features
- Teams can work independently
- Better for domain-driven design

**Cons:**
- Can have code duplication
- Requires discipline to maintain
- More complex folder structure

**Hexagonal Architecture (Ports and Adapters):**

**Structure:**
\`\`\`
        ┌──────────────┐
        │   Business   │
        │    Logic     │
        │   (Core)     │
        └──────────────┘
         ↙    ↓    ↘
    Primary  Ports  Secondary
    Adapters        Adapters
    (UI)            (Database, APIs)
\`\`\`

**Pros:**
- Business logic is independent
- Easy to test (mock adapters)
- Can swap implementations easily
- Technology-agnostic core

**Cons:**
- More initial setup
- Can be overkill for simple apps
- Requires understanding of patterns

**When to Use Each:**

- **Layered**: Simple CRUD applications, learning projects
- **Vertical Slice**: Feature-rich applications, multiple teams, domain-driven design
- **Hexagonal**: Complex business logic, need to swap technologies, high testability requirements`
  },
  {
    id: 8002,
    category: 'Software Architects',
    question: 'How do you apply the Principle of Least Surprises when designing components?',
    answer: `**One-Sentence Definition:** The Principle of Least Surprises means designing components so they behave exactly as users and developers expect, following conventions and avoiding unexpected behaviors.

**The Core Concept:** Think of a door handle. If it's a handle, you pull. If it's a flat plate, you push. The design tells you how to use it without instructions. Software should work the same way - intuitive and predictable.

**Key Guidelines:**

**1. Follow Naming Conventions:**
- Use clear, descriptive names
- Follow language and framework conventions
- Avoid abbreviations unless widely understood

**Example:**
\`\`\`csharp
// Good - Clear and expected
public void SaveUser(User user)
public bool IsValidEmail(string email)
public List<Order> GetOrdersByDate(DateTime date)

// Bad - Surprising names
public void DoIt(User u)  // What does "it" mean?
public bool Check(string e)  // Check what?
\`\`\`

**2. Consistent Return Types:**
- Similar methods should return similar types
- Don't mix null returns with exceptions
- Be consistent with error handling

**Example:**
\`\`\`csharp
// Good - Consistent pattern
public User? GetUserById(int id)  // Returns null if not found
public Order? GetOrderById(int id)  // Same pattern

// Bad - Inconsistent
public User GetUserById(int id)  // Throws exception if not found
public Order? GetOrderById(int id)  // Returns null - different behavior!
\`\`\`

**3. Predictable Method Behavior:**
- Methods should do what their names suggest
- Avoid side effects in query methods
- Don't hide important operations

**Example:**
\`\`\`csharp
// Good - Does exactly what name says
public bool ValidateEmail(string email)
{
    return email.Contains("@") && email.Contains(".");
}

// Bad - Surprising side effect
public bool ValidateEmail(string email)
{
    SendWelcomeEmail(email);  // Surprise! This also sends email!
    return email.Contains("@");
}
\`\`\`

**4. Follow Framework Patterns:**
- Use framework conventions (like MVC, Repository pattern)
- Don't reinvent common patterns
- Follow established design patterns

**Example:**
\`\`\`csharp
// Good - Follows Repository pattern
public interface IUserRepository
{
    User GetById(int id);
    void Add(User user);
    void Update(User user);
    void Delete(int id);
}

// Bad - Custom pattern that surprises developers
public interface IUserRepository
{
    User Fetch(int id);  // Why "Fetch" instead of "Get"?
    void Store(User user);  // Is this Add or Update?
}
\`\`\`

**5. Clear Error Messages:**
- Error messages should explain what went wrong
- Provide actionable information
- Use consistent error format

**Example:**
\`\`\`csharp
// Good - Clear and helpful
throw new ArgumentException("Email cannot be empty. Please provide a valid email address.");

// Bad - Vague and unhelpful
throw new Exception("Error occurred.");
\`\`\`

**6. Consistent Parameter Order:**
- Similar methods should have similar parameter order
- Follow language conventions

**Example:**
\`\`\`csharp
// Good - Consistent order
public void UpdateUser(int id, User user)
public void UpdateOrder(int id, Order order)
public void UpdateProduct(int id, Product product)

// Bad - Inconsistent
public void UpdateUser(int id, User user)
public void UpdateOrder(Order order, int id)  // Different order!
\`\`\`

**Benefits:**
- Easier to learn and use
- Fewer bugs (less guessing)
- Faster development
- Better code reviews
- Reduced documentation needs`
  },
  {
    id: 8003,
    category: 'Software Architects',
    question: 'How do you avoid accidental complexity when scaling a system?',
    answer: `**One-Sentence Definition:** Avoid accidental complexity by keeping the system simple, using proven patterns, avoiding premature optimization, and only adding complexity when you have a real problem to solve.

**The Core Concept:** Think of building a house. You don't install a complex security system, smart home automation, and backup generators on day one. You add them when you actually need them. Software should work the same way - start simple, add complexity only when necessary.

**What is Accidental Complexity?**

**Essential Complexity:** Complexity that's inherent to the problem (e.g., handling millions of users requires distributed systems)

**Accidental Complexity:** Complexity we add unnecessarily (e.g., using microservices for a 100-user application)

**Common Sources of Accidental Complexity:**

**1. Premature Optimization:**
- Adding caching before you know you need it
- Using complex algorithms when simple ones work
- Over-engineering for future needs that may never come

**Example:**
\`\`\`csharp
// Bad - Premature optimization
public class UserService
{
    private IMemoryCache _cache;
    private IDistributedCache _distributedCache;
    private IRedisCache _redisCache;
    
    public User GetUser(int id)
    {
        // Complex caching logic for 100 users!
        if (_memoryCache.TryGetValue(id, out User user))
            return user;
        if (_distributedCache.TryGetValue(id, out user))
            return user;
        // ... more complexity
    }
}

// Good - Simple first
public class UserService
{
    public User GetUser(int id)
    {
        return _repository.GetById(id);  // Simple, works for now
    }
}
\`\`\`

**2. Over-Architecting:**
- Using microservices when monolith works
- Adding too many layers
- Creating abstractions before you need them

**Example:**
\`\`\`csharp
// Bad - Too many abstractions
public interface IUserRepository
{
    Task<User> GetByIdAsync(int id);
}
public interface IUserRepositoryFactory
{
    IUserRepository Create();
}
public class UserRepositoryFactory : IUserRepositoryFactory
{
    public IUserRepository Create() { }
}
// ... more layers

// Good - Simple and direct
public class UserRepository
{
    public User GetById(int id)
    {
        return _context.Users.Find(id);
    }
}
\`\`\`

**3. Technology Overload:**
- Using too many different technologies
- Adding new frameworks without removing old ones
- Mixing too many patterns

**Example:**
\`\`\`
Bad Stack:
- React + Angular + Vue (why all three?)
- SQL Server + MongoDB + Redis + Elasticsearch (for simple app)
- RabbitMQ + Kafka + Azure Service Bus (pick one!)

Good Stack:
- One frontend framework
- One database (add more only when needed)
- One messaging system
\`\`\`

**4. Over-Abstracting:**
- Creating interfaces for everything
- Adding layers "just in case"
- Making things "flexible" that don't need to be

**Example:**
\`\`\`csharp
// Bad - Unnecessary abstraction
public interface IEmailSender
{
    void Send(string to, string subject, string body);
}
public class SmtpEmailSender : IEmailSender { }
public class SendGridEmailSender : IEmailSender { }
// But you only use one and never change!

// Good - Simple, add abstraction when needed
public class EmailService
{
    public void SendEmail(string to, string subject, string body)
    {
        // Direct implementation
    }
}
\`\`\`

**Strategies to Avoid Accidental Complexity:**

**1. YAGNI Principle (You Aren't Gonna Need It):**
- Don't add features until you need them
- Don't create abstractions until you have multiple implementations
- Don't optimize until you have performance problems

**2. Start Simple:**
- Begin with the simplest solution
- Use proven, well-understood patterns
- Avoid cutting-edge tech unless necessary

**3. Measure Before Optimizing:**
- Profile your application
- Identify real bottlenecks
- Only optimize what's actually slow

**4. Refactor Incrementally:**
- Add complexity gradually
- Refactor when patterns emerge
- Don't rewrite everything at once

**5. Use Standard Patterns:**
- Follow established design patterns
- Use framework conventions
- Don't invent new patterns unnecessarily

**Example Scaling Path:**
\`\`\`
Stage 1: Simple Monolith
  ↓ (when you have performance issues)
Stage 2: Add Caching
  ↓ (when database is slow)
Stage 3: Add Read Replicas
  ↓ (when you need independent scaling)
Stage 4: Extract Services
  ↓ (when services grow)
Stage 5: Microservices
\`\`\`

**Key Takeaway:** Complexity should solve real problems, not theoretical ones. Add it when you have evidence you need it, not because you think you might need it someday.`
  },
  {
    id: 8004,
    category: 'Software Architects',
    question: 'How do you choose between synchronous and asynchronous communication?',
    answer: `**One-Sentence Definition:** Use synchronous communication when you need immediate responses and tight coupling is acceptable, and asynchronous communication when operations can be delayed, you need better scalability, or you want to decouple services.

**The Core Concept:** Think of ordering food. Synchronous is like a drive-through - you wait in line, place your order, wait for it, and get it immediately. Asynchronous is like ordering delivery - you place the order, go about your day, and get notified when it arrives. Both work, but for different situations.

**Synchronous Communication:**

**How It Works:**
- Client sends request and waits for response
- Blocking operation - client is idle until response arrives
- Direct request-response pattern

**Example:**
\`\`\`csharp
// Synchronous HTTP call
public class OrderService
{
    public Order CreateOrder(OrderRequest request)
    {
        // Wait for payment service response
        var paymentResult = _paymentService.ProcessPayment(request.Payment);
        
        // Wait for inventory service response
        var inventoryResult = _inventoryService.ReserveItems(request.Items);
        
        // Only then create order
        return _repository.CreateOrder(request);
    }
}
\`\`\`

**When to Use Synchronous:**
- ✅ Need immediate response
- ✅ Simple request-response pattern
- ✅ Operations are fast (< 100ms)
- ✅ Tight coupling is acceptable
- ✅ Need to know result immediately
- ✅ Error handling is straightforward

**Pros:**
- Simple to implement and understand
- Easy error handling
- Immediate feedback
- Direct flow control

**Cons:**
- Blocks caller until response
- Poor scalability (threads waiting)
- Tight coupling between services
- Cascading failures (one slow service blocks all)

**Asynchronous Communication:**

**How It Works:**
- Client sends request and continues working
- Non-blocking operation
- Uses messages, events, or callbacks

**Example:**
\`\`\`csharp
// Asynchronous with messaging
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        // Create order immediately
        var order = _repository.CreateOrder(request);
        
        // Send messages (don't wait)
        _messageBus.Publish(new PaymentRequested(order.Id, request.Payment));
        _messageBus.Publish(new InventoryReservationRequested(order.Id, request.Items));
        
        // Return immediately, processing happens in background
    }
}

// Separate handlers process messages
public class PaymentHandler
{
    public void Handle(PaymentRequested message)
    {
        _paymentService.ProcessPayment(message.Payment);
        _messageBus.Publish(new PaymentProcessed(message.OrderId));
    }
}
\`\`\`

**When to Use Asynchronous:**
- ✅ Operations take time (> 1 second)
- ✅ Don't need immediate response
- ✅ Need high scalability
- ✅ Want to decouple services
- ✅ Long-running processes
- ✅ Batch processing

**Pros:**
- Better scalability (no threads waiting)
- Loose coupling between services
- Resilient to failures (messages can retry)
- Can handle high throughput
- Services can work independently

**Cons:**
- More complex to implement
- Harder error handling
- Eventual consistency
- Need message infrastructure
- Debugging is harder

**Decision Matrix:**

**Use Synchronous When:**
\`\`\`
- User needs immediate feedback (UI interactions)
- Simple CRUD operations
- Fast operations (< 100ms)
- Tight consistency required
- Simple error handling needed
\`\`\`

**Use Asynchronous When:**
\`\`\`
- Long-running operations (minutes/hours)
- High volume processing
- Services should be independent
- Can tolerate eventual consistency
- Need to handle bursts of traffic
\`\`\`

**Hybrid Approach:**

Many systems use both:

**Example E-commerce System:**
\`\`\`csharp
// Synchronous - User needs immediate feedback
public OrderResponse PlaceOrder(OrderRequest request)
{
    // Validate immediately
    var validation = ValidateOrder(request);
    if (!validation.IsValid)
        return new OrderResponse { Error = validation.Error };
    
    // Create order record synchronously
    var order = _repository.CreateOrder(request);
    
    // Send async messages for background processing
    _messageBus.Publish(new OrderCreated(order.Id));
    
    // Return immediately
    return new OrderResponse { OrderId = order.Id, Status = "Processing" };
}

// Asynchronous handlers process in background
- Send confirmation email
- Update inventory
- Process payment
- Generate shipping label
\`\`\`

**Common Patterns:**

**1. Request-Reply Pattern (Synchronous):**
- HTTP REST APIs
- RPC calls
- Direct method calls

**2. Message Queue Pattern (Asynchronous):**
- RabbitMQ
- Azure Service Bus
- AWS SQS

**3. Event-Driven Pattern (Asynchronous):**
- Event sourcing
- Pub/Sub
- Event streaming (Kafka)

**Key Takeaway:** Start with synchronous for simplicity. Move to asynchronous when you have real problems: slow operations, scalability issues, or need for decoupling. Don't over-engineer with async from the start.`
  },
  {
    id: 8005,
    category: 'Software Architects',
    question: 'How do you design idempotent operations for systems with retries?',
    answer: `**One-Sentence Definition:** Idempotent operations are operations that can be performed multiple times without changing the result, which is essential for handling retries, network failures, and duplicate requests safely.

**The Core Concept:** Think of turning on a light switch. Whether you flip it once or ten times, the result is the same - the light is on. An idempotent operation works the same way - calling it multiple times produces the same outcome as calling it once.

**Why Idempotency Matters:**

**1. Network Failures:**
- Client sends request but doesn't receive response
- Client retries, but original request might have succeeded
- Without idempotency, you might process payment twice!

**2. Duplicate Messages:**
- Message queue might deliver message twice
- Webhook might be called multiple times
- Need to handle duplicates safely

**3. User Actions:**
- User clicks "Submit" button multiple times
- Browser refresh after form submission
- Need to prevent duplicate orders

**Designing Idempotent Operations:**

**1. Use Idempotency Keys:**
- Client generates unique key for each operation
- Server checks if key was already processed
- Returns same result if key exists

**Example:**
\`\`\`csharp
public class OrderService
{
    public OrderResult CreateOrder(OrderRequest request, string idempotencyKey)
    {
        // Check if we already processed this key
        var existing = _repository.GetByKey(idempotencyKey);
        if (existing != null)
        {
            return existing.Result;  // Return same result
        }
        
        // Process order
        var order = _repository.CreateOrder(request);
        var result = new OrderResult { OrderId = order.Id };
        
        // Store idempotency key
        _repository.SaveIdempotencyKey(idempotencyKey, result);
        
        return result;
    }
}
\`\`\`

**2. Use Natural Keys:**
- Use business identifiers that are naturally unique
- Example: Order number, transaction ID, user email

**Example:**
\`\`\`csharp
// Bad - Not idempotent
public void UpdateUserBalance(int userId, decimal amount)
{
    var user = _repository.GetUser(userId);
    user.Balance += amount;  // Adds every time!
    _repository.Save(user);
}

// Good - Idempotent using transaction ID
public void UpdateUserBalance(int userId, decimal amount, string transactionId)
{
    // Check if transaction already processed
    if (_repository.TransactionExists(transactionId))
        return;  // Already processed, do nothing
    
    var user = _repository.GetUser(userId);
    user.Balance += amount;
    _repository.Save(user);
    _repository.SaveTransaction(transactionId);
}
\`\`\`

**3. Use Conditional Updates:**
- Only update if current state matches expected state
- Use version numbers or timestamps

**Example:**
\`\`\`csharp
// Idempotent update using version
public void UpdateOrderStatus(int orderId, string newStatus, int expectedVersion)
{
    var order = _repository.GetOrder(orderId);
    
    // Only update if version matches (prevents concurrent updates)
    if (order.Version != expectedVersion)
    {
        throw new ConcurrencyException("Order was modified by another process");
    }
    
    order.Status = newStatus;
    order.Version++;
    _repository.Save(order);
}
\`\`\`

**4. Use "Set" Instead of "Add":**
- Set final value instead of incrementing
- Example: Set balance to $100 instead of adding $10

**Example:**
\`\`\`csharp
// Bad - Not idempotent
public void AddPoints(int userId, int points)
{
    var user = _repository.GetUser(userId);
    user.Points += points;  // Adds every time!
    _repository.Save(user);
}

// Good - Idempotent
public void SetPoints(int userId, int points, string operationId)
{
    if (_repository.OperationExists(operationId))
        return;  // Already processed
    
    var user = _repository.GetUser(userId);
    user.Points = points;  // Sets to specific value
    _repository.Save(user);
    _repository.SaveOperation(operationId);
}
\`\`\`

**5. Use Upsert Operations:**
- Insert if doesn't exist, update if exists
- Database handles idempotency

**Example:**
\`\`\`csharp
// Idempotent upsert
public void SaveUser(User user)
{
    // If user exists, update; if not, insert
    _repository.Upsert(user);
}

// SQL equivalent
// INSERT INTO Users (Id, Name, Email) 
// VALUES (@id, @name, @email)
// ON DUPLICATE KEY UPDATE Name = @name, Email = @email
\`\`\`

**HTTP Methods and Idempotency:**

**Idempotent Methods:**
- **GET**: Always safe, returns same result
- **PUT**: Replaces resource, same result if called multiple times
- **DELETE**: Deletes resource, same result if called multiple times

**Non-Idempotent Methods:**
- **POST**: Creates new resource each time
- **PATCH**: May have different results

**Making POST Idempotent:**
\`\`\`csharp
// POST with idempotency key
[HttpPost]
public IActionResult CreateOrder([FromBody] OrderRequest request, 
    [FromHeader(Name = "Idempotency-Key")] string idempotencyKey)
{
    var result = _orderService.CreateOrder(request, idempotencyKey);
    return Ok(result);
}
\`\`\`

**Best Practices:**

1. **Always use idempotency keys for critical operations** (payments, orders)
2. **Store keys with results** to return same response
3. **Set expiration** for idempotency keys (e.g., 24 hours)
4. **Use natural keys when possible** (order number, transaction ID)
5. **Document idempotency** in API documentation
6. **Test retry scenarios** to ensure idempotency works

**Key Takeaway:** Design operations to be idempotent from the start. It's much harder to add idempotency later. Use idempotency keys for critical operations, and always return the same result for the same input.`
  },
  {
    id: 8006,
    category: 'Software Architects',
    question: 'How would you prevent race conditions in a high-throughput workflow?',
    answer: `**One-Sentence Definition:** Prevent race conditions by using locks, transactions, optimistic concurrency control, message queues with single consumers, or distributed locks for high-throughput systems.

**The Core Concept:** Think of a race condition like two people trying to withdraw money from the same bank account at the same time. Without protection, both might see $100, withdraw $50, and leave $50 instead of $0. You need a way to ensure only one operation happens at a time.

**What is a Race Condition?**

A race condition occurs when the outcome depends on the timing of events. Multiple threads or processes access shared resources simultaneously, leading to unpredictable results.

**Example Race Condition:**
\`\`\`csharp
// Bad - Race condition
public void UpdateInventory(int productId, int quantity)
{
    var product = _repository.GetProduct(productId);
    product.Stock -= quantity;  // Two requests might read same value!
    _repository.Save(product);
}

// Scenario:
// Request 1: Reads Stock = 10
// Request 2: Reads Stock = 10 (before Request 1 saves)
// Request 1: Saves Stock = 8 (10 - 2)
// Request 2: Saves Stock = 7 (10 - 3)
// Result: Stock = 7, but should be 5!
\`\`\`

**Prevention Strategies:**

**1. Database Transactions with Locking:**

**Pessimistic Locking:**
\`\`\`csharp
// Lock row during transaction
public void UpdateInventory(int productId, int quantity)
{
    using var transaction = _context.Database.BeginTransaction();
    
    // Lock row for update
    var product = _context.Products
        .Where(p => p.Id == productId)
        .FirstOrDefault();
    
    // Lock is held until transaction completes
    product.Stock -= quantity;
    _context.SaveChanges();
    transaction.Commit();
}

// SQL equivalent
// BEGIN TRANSACTION
// SELECT * FROM Products WHERE Id = @id FOR UPDATE
// UPDATE Products SET Stock = Stock - @quantity WHERE Id = @id
// COMMIT
\`\`\`

**Optimistic Locking:**
\`\`\`csharp
// Use version number to detect conflicts
public void UpdateInventory(int productId, int quantity, int expectedVersion)
{
    var product = _repository.GetProduct(productId);
    
    // Check version hasn't changed
    if (product.Version != expectedVersion)
    {
        throw new ConcurrencyException("Product was modified");
    }
    
    product.Stock -= quantity;
    product.Version++;
    _repository.Save(product);
}

// Retry logic
public void UpdateInventoryWithRetry(int productId, int quantity)
{
    int maxRetries = 3;
    for (int i = 0; i < maxRetries; i++)
    {
        try
        {
            var product = _repository.GetProduct(productId);
            UpdateInventory(productId, quantity, product.Version);
            return;  // Success
        }
        catch (ConcurrencyException)
        {
            if (i == maxRetries - 1) throw;
            Thread.Sleep(100);  // Wait before retry
        }
    }
}
\`\`\`

**2. Atomic Operations:**

**Database Atomic Operations:**
\`\`\`csharp
// Use atomic SQL operations
public void UpdateInventory(int productId, int quantity)
{
    // Atomic - database handles locking
    _context.Database.ExecuteSqlRaw(
        "UPDATE Products SET Stock = Stock - {0} WHERE Id = {1}",
        quantity, productId);
}

// Or using Entity Framework
var product = _context.Products.Find(productId);
_context.Entry(product)
    .Property(p => p.Stock)
    .OriginalValue = product.Stock;
product.Stock -= quantity;
_context.SaveChanges();
\`\`\`

**3. Message Queues with Single Consumer:**

**Sequential Processing:**
\`\`\`csharp
// Process messages one at a time per partition
public class InventoryProcessor
{
    public void ProcessMessage(InventoryUpdateMessage message)
    {
        // Only one consumer processes messages for this product
        // Messages are partitioned by product ID
        UpdateInventory(message.ProductId, message.Quantity);
    }
}

// Queue configuration
// Partition by ProductId ensures same product processed sequentially
var consumer = new MessageConsumer();
consumer.Subscribe("inventory-updates", 
    partitionKey: message.ProductId);
\`\`\`

**4. Distributed Locks:**

**Using Redis Distributed Lock:**
\`\`\`csharp
public class InventoryService
{
    private readonly IDistributedLock _lock;
    
    public void UpdateInventory(int productId, int quantity)
    {
        var lockKey = $"inventory:{productId}";
        
        // Acquire lock
        if (_lock.TryAcquire(lockKey, TimeSpan.FromSeconds(10)))
        {
            try
            {
                var product = _repository.GetProduct(productId);
                product.Stock -= quantity;
                _repository.Save(product);
            }
            finally
            {
                _lock.Release(lockKey);
            }
        }
        else
        {
            throw new Exception("Could not acquire lock");
        }
    }
}
\`\`\`

**5. Event Sourcing:**

**Store Events Instead of State:**
\`\`\`csharp
// Instead of updating state, append events
public void UpdateInventory(int productId, int quantity)
{
    var @event = new InventoryReducedEvent
    {
        ProductId = productId,
        Quantity = quantity,
        Timestamp = DateTime.UtcNow
    };
    
    // Append event (always succeeds)
    _eventStore.Append(@event);
}

// Rebuild state from events
public int GetCurrentStock(int productId)
{
    var events = _eventStore.GetEvents(productId);
    return events
        .OfType<InventoryReducedEvent>()
        .Sum(e => e.Quantity);
}
\`\`\`

**6. Idempotent Operations:**

**Make Operations Safe to Retry:**
\`\`\`csharp
public void UpdateInventory(int productId, int quantity, string operationId)
{
    // Check if operation already processed
    if (_repository.OperationExists(operationId))
        return;  // Already processed
    
    var product = _repository.GetProduct(productId);
    product.Stock -= quantity;
    _repository.Save(product);
    _repository.SaveOperation(operationId);
}
\`\`\`

**Choosing the Right Strategy:**

**For Single Server:**
- Use database transactions with locking
- Use optimistic concurrency control

**For Distributed Systems:**
- Use distributed locks (Redis, etcd)
- Use message queues with partitioning
- Use event sourcing

**For High Throughput:**
- Use atomic database operations
- Use message queues (sequential processing)
- Minimize lock duration

**For Low Latency:**
- Use optimistic locking with retries
- Use event sourcing (append-only)
- Avoid distributed locks when possible

**Best Practices:**

1. **Minimize lock duration** - Lock only what you need
2. **Use appropriate granularity** - Lock at the right level (row vs table)
3. **Handle timeouts** - Set reasonable timeout for locks
4. **Monitor deadlocks** - Log and alert on deadlock situations
5. **Test concurrency** - Load test with concurrent requests
6. **Use idempotency** - Make operations safe to retry

**Key Takeaway:** Choose the right strategy based on your system. For single-server applications, use database transactions. For distributed systems, use distributed locks or message queues. Always test with concurrent load to ensure race conditions are prevented.`
  },
  {
    id: 8007,
    category: 'Software Architects',
    question: 'How do you decide when to use queues, streams, or direct calls?',
    answer: `**One-Sentence Definition:** Use direct calls for immediate responses and tight coupling, queues for asynchronous processing and decoupling, and streams for real-time event processing and high-volume data flows.

**The Core Concept:** Think of communication methods like different ways to send messages. Direct calls are like phone calls - immediate but you wait. Queues are like email - send and continue, process later. Streams are like a live news feed - continuous flow of events in real-time.

**Direct Calls (Synchronous):**

**What They Are:**
- Immediate request-response pattern
- Client waits for response
- Tight coupling between services

**Example:**
\`\`\`csharp
// Direct HTTP call
public class OrderService
{
    public Order CreateOrder(OrderRequest request)
    {
        // Wait for payment service
        var payment = _paymentService.ProcessPayment(request.Payment);
        
        // Wait for inventory service
        var inventory = _inventoryService.ReserveItems(request.Items);
        
        // Create order
        return _repository.CreateOrder(request);
    }
}
\`\`\`

**When to Use:**
- ✅ Need immediate response
- ✅ Simple request-response pattern
- ✅ Operations are fast (< 100ms)
- ✅ Tight coupling is acceptable
- ✅ Need synchronous flow control

**Pros:**
- Simple to implement
- Easy error handling
- Immediate feedback
- Direct flow control

**Cons:**
- Blocks caller
- Poor scalability
- Tight coupling
- Cascading failures

**Message Queues (Asynchronous):**

**What They Are:**
- Messages stored in queue
- Producer sends, consumer processes later
- Decoupled communication

**Example:**
\`\`\`csharp
// Using message queue
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        var order = _repository.CreateOrder(request);
        
        // Send messages (don't wait)
        _queue.Send("payment-requests", new PaymentRequest
        {
            OrderId = order.Id,
            Payment = request.Payment
        });
        
        _queue.Send("inventory-requests", new InventoryRequest
        {
            OrderId = order.Id,
            Items = request.Items
        });
    }
}

// Separate consumer processes messages
public class PaymentProcessor
{
    public void ProcessMessage(PaymentRequest message)
    {
        _paymentService.ProcessPayment(message.Payment);
        _queue.Send("payment-completed", new PaymentCompleted
        {
            OrderId = message.OrderId
        });
    }
}
\`\`\`

**When to Use:**
- ✅ Long-running operations
- ✅ Need decoupling
- ✅ Can tolerate eventual consistency
- ✅ Need to handle bursts
- ✅ Background processing

**Pros:**
- Decoupled services
- Better scalability
- Resilient to failures
- Can handle high volume

**Cons:**
- More complex
- Eventual consistency
- Harder debugging
- Need message infrastructure

**Streams (Event Streaming):**

**What They Are:**
- Continuous flow of events
- Multiple consumers can subscribe
- Events are immutable and ordered

**Example:**
\`\`\`csharp
// Event streaming with Kafka
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        var order = _repository.CreateOrder(request);
        
        // Publish event to stream
        _eventStream.Publish("orders", new OrderCreatedEvent
        {
            OrderId = order.Id,
            CustomerId = request.CustomerId,
            Items = request.Items,
            Timestamp = DateTime.UtcNow
        });
    }
}

// Multiple consumers can subscribe
public class InventoryService
{
    public void OnOrderCreated(OrderCreatedEvent @event)
    {
        ReserveItems(@event.Items);
    }
}

public class NotificationService
{
    public void OnOrderCreated(OrderCreatedEvent @event)
    {
        SendConfirmationEmail(@event.CustomerId);
    }
}
\`\`\`

**When to Use:**
- ✅ Real-time event processing
- ✅ Multiple consumers needed
- ✅ High-volume event flow
- ✅ Event sourcing
- ✅ Need event replay
- ✅ Time-series data

**Pros:**
- Real-time processing
- Multiple consumers
- Event replay capability
- High throughput
- Event history

**Cons:**
- More complex setup
- Eventual consistency
- Need stream infrastructure
- Harder to debug

**Decision Matrix:**

**Use Direct Calls When:**
\`\`\`
- Need immediate response
- Simple operations (< 100ms)
- Tight coupling acceptable
- Synchronous flow needed
- Simple error handling
\`\`\`

**Use Queues When:**
\`\`\`
- Long-running operations
- Need decoupling
- Background processing
- Can handle eventual consistency
- Need to handle bursts
- One-to-one communication
\`\`\`

**Use Streams When:**
\`\`\`
- Real-time event processing
- Multiple consumers
- High-volume events
- Event sourcing
- Need event history
- One-to-many communication
\`\`\`

**Hybrid Approach:**

Many systems use all three:

**Example E-commerce System:**
\`\`\`csharp
// Direct call - User needs immediate feedback
public OrderResponse PlaceOrder(OrderRequest request)
{
    // Validate synchronously
    var validation = ValidateOrder(request);
    if (!validation.IsValid)
        return new OrderResponse { Error = validation.Error };
    
    // Create order record
    var order = _repository.CreateOrder(request);
    
    // Publish event to stream (multiple consumers)
    _eventStream.Publish("orders", new OrderCreatedEvent(order));
    
    // Send to queue for background processing
    _queue.Send("order-processing", new OrderProcessingMessage(order.Id));
    
    return new OrderResponse { OrderId = order.Id };
}

// Stream consumers (real-time)
- InventoryService: Reserve items immediately
- NotificationService: Send confirmation email

// Queue consumers (background)
- PaymentProcessor: Process payment
- ShippingService: Generate shipping label
\`\`\`

**Technology Examples:**

**Direct Calls:**
- HTTP REST APIs
- gRPC
- RPC frameworks

**Message Queues:**
- RabbitMQ
- Azure Service Bus
- AWS SQS
- ActiveMQ

**Event Streams:**
- Apache Kafka
- AWS Kinesis
- Azure Event Hubs
- Redis Streams

**Key Takeaway:** Start with direct calls for simplicity. Add queues when you need decoupling or background processing. Use streams when you need real-time events or multiple consumers. Most production systems use a combination of all three based on different use cases.`
  },
  {
    id: 8008,
    category: 'Software Architects',
    question: 'What\'s the role of sagas in long-running workflows?',
    answer: `**One-Sentence Definition:** Sagas are patterns for managing long-running distributed transactions by breaking them into smaller, compensatable steps, ensuring eventual consistency across multiple services without using distributed transactions.

**The Core Concept:** Think of a saga like planning a trip with multiple bookings. You book a flight, then a hotel, then a car. If the car booking fails, you need to cancel the hotel and flight. A saga manages this sequence of operations and handles rollbacks if something goes wrong.

**The Problem with Distributed Transactions:**

**Traditional ACID Transactions Don't Work:**
- Services have their own databases
- Can't use two-phase commit across services
- Network partitions can cause locks
- Poor performance and availability

**Example Problem:**
\`\`\`csharp
// This doesn't work across services
using var transaction = BeginDistributedTransaction();
try
{
    _paymentService.ProcessPayment();  // Service A
    _inventoryService.ReserveItems();  // Service B
    _shippingService.CreateShipment(); // Service C
    transaction.Commit();
}
catch
{
    transaction.Rollback();  // Can't rollback across services!
}
\`\`\`

**What is a Saga?**

A saga is a sequence of local transactions, each with a compensating action. If any step fails, previous steps are compensated (rolled back) in reverse order.

**Types of Sagas:**

**1. Choreography-Based Saga (Event-Driven):**

Each service publishes events, and other services react to them. No central coordinator.

**Example:**
\`\`\`csharp
// Order Service
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        var order = _repository.CreateOrder(request);
        
        // Publish event
        _eventBus.Publish(new OrderCreatedEvent
        {
            OrderId = order.Id,
            CustomerId = request.CustomerId,
            Amount = request.Amount
        });
    }
    
    public void Handle(PaymentFailedEvent @event)
    {
        // Compensate: Cancel order
        var order = _repository.GetOrder(@event.OrderId);
        order.Status = "Cancelled";
        _repository.Save(order);
        
        _eventBus.Publish(new OrderCancelledEvent { OrderId = @event.OrderId });
    }
}

// Payment Service
public class PaymentService
{
    public void Handle(OrderCreatedEvent @event)
    {
        try
        {
            ProcessPayment(@event.CustomerId, @event.Amount);
            _eventBus.Publish(new PaymentSucceededEvent { OrderId = @event.OrderId });
        }
        catch
        {
            _eventBus.Publish(new PaymentFailedEvent { OrderId = @event.OrderId });
        }
    }
    
    public void Handle(OrderCancelledEvent @event)
    {
        // Compensate: Refund payment
        RefundPayment(@event.OrderId);
    }
}

// Inventory Service
public class InventoryService
{
    public void Handle(OrderCreatedEvent @event)
    {
        ReserveItems(@event.OrderId, @event.Items);
        _eventBus.Publish(new ItemsReservedEvent { OrderId = @event.OrderId });
    }
    
    public void Handle(OrderCancelledEvent @event)
    {
        // Compensate: Release reserved items
        ReleaseItems(@event.OrderId);
    }
}
\`\`\`

**Pros:**
- Decoupled services
- No single point of failure
- Services are autonomous

**Cons:**
- Hard to understand flow
- Difficult to debug
- Services need to know about compensation

**2. Orchestration-Based Saga (Centralized):**

A central orchestrator coordinates the saga, telling each service what to do.

**Example:**
\`\`\`csharp
// Saga Orchestrator
public class OrderSagaOrchestrator
{
    public async Task ProcessOrder(OrderRequest request)
    {
        var sagaId = Guid.NewGuid();
        var steps = new List<SagaStep>();
        
        try
        {
            // Step 1: Create Order
            var order = await _orderService.CreateOrder(request);
            steps.Add(new SagaStep { Service = "Order", Action = "Create", Data = order.Id });
            
            // Step 2: Process Payment
            await _paymentService.ProcessPayment(order.Id, request.Payment);
            steps.Add(new SagaStep { Service = "Payment", Action = "Process", Data = order.Id });
            
            // Step 3: Reserve Inventory
            await _inventoryService.ReserveItems(order.Id, request.Items);
            steps.Add(new SagaStep { Service = "Inventory", Action = "Reserve", Data = order.Id });
            
            // Step 4: Create Shipment
            await _shippingService.CreateShipment(order.Id);
            steps.Add(new SagaStep { Service = "Shipping", Action = "Create", Data = order.Id });
            
            // All steps succeeded
            await _orderService.CompleteOrder(order.Id);
        }
        catch (Exception ex)
        {
            // Compensate in reverse order
            await Compensate(steps);
            throw;
        }
    }
    
    private async Task Compensate(List<SagaStep> steps)
    {
        // Reverse order for compensation
        for (int i = steps.Count - 1; i >= 0; i--)
        {
            var step = steps[i];
            try
            {
                switch (step.Service)
                {
                    case "Shipping":
                        await _shippingService.CancelShipment(step.Data);
                        break;
                    case "Inventory":
                        await _inventoryService.ReleaseItems(step.Data);
                        break;
                    case "Payment":
                        await _paymentService.RefundPayment(step.Data);
                        break;
                    case "Order":
                        await _orderService.CancelOrder(step.Data);
                        break;
                }
            }
            catch (Exception ex)
            {
                // Log compensation failure
                _logger.LogError(ex, "Compensation failed for {Service}", step.Service);
            }
        }
    }
}
\`\`\`

**Pros:**
- Centralized control
- Easy to understand flow
- Easier to debug
- Can visualize workflow

**Cons:**
- Single point of failure (orchestrator)
- Additional service to maintain
- Can become bottleneck

**Saga Patterns:**

**1. Compensating Transaction Pattern:**
Each step has a compensating action that undoes the work.

**Example:**
\`\`\`csharp
// Each service implements compensation
public interface ICompensatable
{
    Task Execute();
    Task Compensate();
}

public class PaymentService : ICompensatable
{
    public async Task Execute()
    {
        // Process payment
        await ProcessPayment();
    }
    
    public async Task Compensate()
    {
        // Refund payment
        await RefundPayment();
    }
}
\`\`\`

**2. Timeout Pattern:**
Set timeouts for each step. If timeout expires, compensate.

**Example:**
\`\`\`csharp
public async Task ProcessStepWithTimeout(Func<Task> action, TimeSpan timeout)
{
    var cts = new CancellationTokenSource(timeout);
    try
    {
        await action();
    }
    catch (OperationCanceledException)
    {
        // Timeout - need to compensate
        throw new SagaTimeoutException();
    }
}
\`\`\`

**3. Idempotency:**
Make saga steps idempotent so retries are safe.

**Example:**
\`\`\`csharp
public async Task ProcessPayment(string orderId, string sagaId)
{
    // Check if already processed
    if (await _repository.SagaStepExists(sagaId, "Payment"))
    {
        return;  // Already processed
    }
    
    await ProcessPayment(orderId);
    await _repository.SaveSagaStep(sagaId, "Payment");
}
\`\`\`

**When to Use Sagas:**

**Use Sagas When:**
- ✅ Long-running workflows across services
- ✅ Need eventual consistency
- ✅ Can't use distributed transactions
- ✅ Operations can be compensated
- ✅ Services are independent

**Don't Use Sagas When:**
- ❌ Need strong consistency
- ❌ Can't compensate operations (e.g., sending email)
- ❌ Simple single-service operations
- ❌ Can use regular transactions

**Best Practices:**

1. **Design compensatable operations** - Every step should have a compensation
2. **Make steps idempotent** - Safe to retry
3. **Set timeouts** - Prevent sagas from hanging
4. **Log everything** - For debugging and auditing
5. **Handle compensation failures** - What if compensation itself fails?
6. **Use state machine** - Track saga state clearly
7. **Monitor sagas** - Alert on stuck or failed sagas

**Key Takeaway:** Sagas are essential for managing distributed workflows. Use choreography for simple, decoupled flows. Use orchestration for complex workflows that need central control. Always design compensatable operations and make steps idempotent.`
  },
  {
    id: 8009,
    category: 'Software Architects',
    question: 'How do you design for exactly-once or effectively-once processing guarantees?',
    answer: `**One-Sentence Definition:** Exactly-once processing ensures each message is processed exactly once, while effectively-once processing accepts that duplicates might occur but ensures the system behaves as if each message was processed once through idempotency.

**The Core Concept:** Think of processing messages like delivering mail. Exactly-once is like registered mail - guaranteed delivery, no duplicates, no losses. Effectively-once is like regular mail - might get duplicates, but you handle them (throw away duplicates) so the result is the same as if delivered once.

**The Challenge:**

**Why Exactly-Once is Hard:**
- Network failures cause retries
- Message queues might deliver duplicates
- Processing might fail partway through
- Need coordination between producer, queue, and consumer

**Three Scenarios to Handle:**
1. **At-least-once**: Message might be delivered multiple times
2. **At-most-once**: Message might be lost
3. **Exactly-once**: Message delivered and processed exactly once (ideal but hard)

**Exactly-Once Processing:**

**Requirements:**
- Producer sends message exactly once
- Queue delivers message exactly once
- Consumer processes message exactly once
- All must coordinate together

**Approach 1: Distributed Transactions (Hard):**

**Using Two-Phase Commit:**
\`\`\`csharp
// Producer with transaction
using var transaction = BeginDistributedTransaction();
try
{
    // Write to database
    _repository.Save(order);
    
    // Send message (in same transaction)
    _messageQueue.Send("order-created", order);
    
    transaction.Commit();  // Both succeed or both fail
}
catch
{
    transaction.Rollback();
}
\`\`\`

**Problems:**
- Poor performance
- Locks resources
- Doesn't work well at scale
- Complex to implement

**Approach 2: Idempotent Producer:**

**Generate unique message IDs:**
\`\`\`csharp
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        var order = _repository.CreateOrder(request);
        var messageId = GenerateMessageId(order.Id);
        
        // Store message ID before sending
        _repository.SaveMessageId(messageId);
        
        // Send message (can retry safely)
        _messageQueue.Send("order-created", new OrderCreatedMessage
        {
            MessageId = messageId,
            OrderId = order.Id
        });
    }
    
    private string GenerateMessageId(int orderId)
    {
        return $"order-{orderId}-{DateTime.UtcNow:yyyyMMddHHmmss}";
    }
}
\`\`\`

**Approach 3: Transactional Outbox Pattern:**

**Write to database and outbox in same transaction:**
\`\`\`csharp
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        using var transaction = _context.Database.BeginTransaction();
        try
        {
            // Save order
            var order = new Order { /* ... */ };
            _context.Orders.Add(order);
            
            // Save to outbox (same transaction)
            var outboxMessage = new OutboxMessage
            {
                MessageId = Guid.NewGuid(),
                EventType = "OrderCreated",
                Payload = JsonSerializer.Serialize(new OrderCreatedEvent(order)),
                Status = "Pending"
            };
            _context.OutboxMessages.Add(outboxMessage);
            
            _context.SaveChanges();
            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
}

// Separate process reads outbox and sends messages
public class OutboxProcessor
{
    public async Task ProcessOutbox()
    {
        var messages = _context.OutboxMessages
            .Where(m => m.Status == "Pending")
            .Take(100)
            .ToList();
        
        foreach (var message in messages)
        {
            try
            {
                // Send to message queue
                await _messageQueue.Send(message.EventType, message.Payload);
                
                // Mark as sent
                message.Status = "Sent";
                message.SentAt = DateTime.UtcNow;
                _context.SaveChanges();
            }
            catch
            {
                // Retry later
            }
        }
    }
}
\`\`\`

**Effectively-Once Processing (Recommended):**

**Accept At-Least-Once, Make Processing Idempotent:**

This is the practical approach - accept that messages might be duplicated, but make processing idempotent so duplicates don't cause problems.

**Implementation:**

**1. Idempotent Consumer:**
\`\`\`csharp
public class OrderProcessor
{
    public async Task ProcessMessage(OrderCreatedMessage message)
    {
        // Check if already processed
        if (await _repository.MessageProcessed(message.MessageId))
        {
            return;  // Already processed, ignore duplicate
        }
        
        // Process message
        await ProcessOrder(message.OrderId);
        
        // Mark as processed
        await _repository.MarkMessageProcessed(message.MessageId);
    }
}
\`\`\`

**2. Use Natural Keys:**
\`\`\`csharp
public class PaymentProcessor
{
    public async Task ProcessMessage(PaymentRequestMessage message)
    {
        // Use order ID as natural key
        var existing = await _repository.GetPaymentByOrderId(message.OrderId);
        if (existing != null)
        {
            return;  // Already processed
        }
        
        // Process payment
        var payment = await ProcessPayment(message);
        await _repository.SavePayment(payment);
    }
}
\`\`\`

**3. Idempotent Operations:**
\`\`\`csharp
// Make operations idempotent
public class InventoryService
{
    public async Task ReserveItems(string orderId, List<Item> items)
    {
        // Check if already reserved
        var reservation = await _repository.GetReservation(orderId);
        if (reservation != null)
        {
            return;  // Already reserved
        }
        
        // Reserve items
        foreach (var item in items)
        {
            await _repository.ReserveItem(item.ProductId, item.Quantity, orderId);
        }
        
        await _repository.SaveReservation(new Reservation
        {
            OrderId = orderId,
            Items = items
        });
    }
}
\`\`\`

**Message Queue Configuration:**

**Kafka (Idempotent Producer):**
\`\`\`csharp
// Enable idempotent producer
var producerConfig = new ProducerConfig
{
    EnableIdempotence = true,
    Acks = Acks.All,
    MaxInFlightRequestsPerConnection = 1
};

var producer = new ProducerBuilder<string, string>(producerConfig).Build();
\`\`\`

**RabbitMQ (Consumer Acknowledgments):**
\`\`\`csharp
// Acknowledge only after processing
channel.BasicConsume(queue: "orders",
    autoAck: false,  // Manual acknowledgment
    consumer: consumer);

// In consumer
public void HandleMessage(OrderMessage message)
{
    try
    {
        ProcessOrder(message);
        channel.BasicAck(deliveryTag, multiple: false);
    }
    catch
    {
        // Reject and requeue
        channel.BasicNack(deliveryTag, multiple: false, requeue: true);
    }
}
\`\`\`

**Best Practices:**

**1. Use Message IDs:**
- Generate unique ID for each message
- Store IDs to detect duplicates

**2. Make Operations Idempotent:**
- Check if already processed
- Use natural keys when possible
- Return same result for same input

**3. Use Transactional Outbox:**
- Write to database and outbox atomically
- Separate process sends messages
- Ensures at-least-once delivery

**4. Handle Failures Gracefully:**
- Retry with exponential backoff
- Dead letter queue for failed messages
- Monitor and alert on failures

**5. Test Duplicate Scenarios:**
- Send same message twice
- Verify idempotency works
- Test failure and retry scenarios

**Comparison:**

**Exactly-Once:**
- ✅ Guaranteed no duplicates
- ❌ Complex to implement
- ❌ Poor performance
- ❌ Doesn't scale well

**Effectively-Once:**
- ✅ Simple to implement
- ✅ Good performance
- ✅ Scales well
- ✅ Practical for most cases
- ⚠️ Requires idempotent design

**Key Takeaway:** Exactly-once is theoretically perfect but hard to achieve in practice. Effectively-once (at-least-once delivery with idempotent processing) is the recommended approach. Design your system to handle duplicates gracefully through idempotency, and you'll get the benefits of exactly-once with much simpler implementation.`
  },
  {
    id: 8010,
    category: 'Software Architects',
    question: 'How do you handle partial failures in distributed systems?',
    answer: `**One-Sentence Definition:** Handle partial failures by implementing circuit breakers, retries with exponential backoff, timeouts, graceful degradation, bulkheads, and health checks to isolate failures and prevent cascading system-wide outages.

**The Core Concept:** Think of a distributed system like a team working on a project. If one person gets sick (partial failure), the team should continue working. You need isolation (bulkheads), backup plans (fallbacks), and ways to detect problems early (health checks) so one failure doesn't bring down everything.

**What are Partial Failures?**

Partial failures occur when some components of a distributed system fail while others continue working. Unlike monolithic systems that fail completely, distributed systems can have:
- One service down while others work
- Network partitions
- Slow responses from some services
- Database connection issues

**Key Strategies:**

**1. Circuit Breaker Pattern:**

Prevents cascading failures by stopping calls to failing services.

**Example:**
\`\`\`csharp
public class CircuitBreaker
{
    private CircuitState _state = CircuitState.Closed;
    private int _failureCount = 0;
    private DateTime _lastFailureTime;
    private const int FailureThreshold = 5;
    private const int TimeoutSeconds = 60;
    
    public async Task<T> ExecuteAsync<T>(Func<Task<T>> operation)
    {
        if (_state == CircuitState.Open)
        {
            // Check if timeout expired
            if (DateTime.UtcNow - _lastFailureTime > TimeSpan.FromSeconds(TimeoutSeconds))
            {
                _state = CircuitState.HalfOpen;  // Try again
            }
            else
            {
                throw new CircuitBreakerOpenException("Circuit is open");
            }
        }
        
        try
        {
            var result = await operation();
            
            // Success - reset failure count
            if (_state == CircuitState.HalfOpen)
            {
                _state = CircuitState.Closed;
                _failureCount = 0;
            }
            
            return result;
        }
        catch (Exception ex)
        {
            _failureCount++;
            _lastFailureTime = DateTime.UtcNow;
            
            if (_failureCount >= FailureThreshold)
            {
                _state = CircuitState.Open;  // Open circuit
            }
            
            throw;
        }
    }
}

// Usage
var circuitBreaker = new CircuitBreaker();
try
{
    var result = await circuitBreaker.ExecuteAsync(() => 
        _paymentService.ProcessPayment(request));
}
catch (CircuitBreakerOpenException)
{
    // Use fallback or cached response
    return GetCachedPaymentResult();
}
\`\`\`

**2. Retry with Exponential Backoff:**

Retry failed operations with increasing delays.

**Example:**
\`\`\`csharp
public async Task<T> RetryWithBackoffAsync<T>(
    Func<Task<T>> operation, 
    int maxRetries = 3)
{
    int retryCount = 0;
    
    while (retryCount < maxRetries)
    {
        try
        {
            return await operation();
        }
        catch (Exception ex) when (retryCount < maxRetries - 1)
        {
            retryCount++;
            var delay = TimeSpan.FromSeconds(Math.Pow(2, retryCount));
            await Task.Delay(delay);
        }
    }
    
    throw new Exception("Max retries exceeded");
}

// Usage
var result = await RetryWithBackoffAsync(() => 
    _externalApi.GetData());
\`\`\`

**3. Timeouts:**

Set timeouts to prevent hanging requests.

**Example:**
\`\`\`csharp
public async Task<T> ExecuteWithTimeoutAsync<T>(
    Func<Task<T>> operation, 
    TimeSpan timeout)
{
    using var cts = new CancellationTokenSource(timeout);
    
    try
    {
        return await operation();
    }
    catch (OperationCanceledException)
    {
        throw new TimeoutException("Operation timed out");
    }
}

// Usage
var result = await ExecuteWithTimeoutAsync(
    () => _slowService.ProcessData(),
    TimeSpan.FromSeconds(5));
\`\`\`

**4. Graceful Degradation:**

Provide fallback functionality when services fail.

**Example:**
\`\`\`csharp
public class OrderService
{
    public async Task<OrderResult> CreateOrder(OrderRequest request)
    {
        try
        {
            // Try to process payment
            var payment = await _paymentService.ProcessPayment(request.Payment);
            return new OrderResult { Status = "Completed", Payment = payment };
        }
        catch (PaymentServiceException)
        {
            // Fallback: Create order with pending payment
            var order = await _repository.CreateOrder(request);
            await _queue.Send("pending-payments", new PendingPayment
            {
                OrderId = order.Id,
                Payment = request.Payment
            });
            
            return new OrderResult 
            { 
                Status = "PendingPayment", 
                OrderId = order.Id 
            };
        }
    }
    
    public async Task<ProductDetails> GetProductDetails(int productId)
    {
        try
        {
            return await _productService.GetDetails(productId);
        }
        catch
        {
            // Fallback: Return cached or basic data
            return await _cache.GetProductDetails(productId) 
                ?? new ProductDetails { Id = productId, Name = "Product" };
        }
    }
}
\`\`\`

**5. Bulkhead Pattern:**

Isolate resources to prevent one failure from affecting others.

**Example:**
\`\`\`csharp
// Separate thread pools for different operations
public class BulkheadService
{
    private readonly SemaphoreSlim _paymentSemaphore = new(10);  // Max 10 concurrent
    private readonly SemaphoreSlim _inventorySemaphore = new(20);  // Max 20 concurrent
    
    public async Task ProcessPayment(PaymentRequest request)
    {
        await _paymentSemaphore.WaitAsync();
        try
        {
            // Process payment - isolated from inventory operations
            await _paymentService.Process(request);
        }
        finally
        {
            _paymentSemaphore.Release();
        }
    }
    
    public async Task ReserveInventory(InventoryRequest request)
    {
        await _inventorySemaphore.WaitAsync();
        try
        {
            // Process inventory - isolated from payment operations
            await _inventoryService.Reserve(request);
        }
        finally
        {
            _inventorySemaphore.Release();
        }
    }
}
\`\`\`

**6. Health Checks:**

Monitor service health and remove unhealthy instances.

**Example:**
\`\`\`csharp
public class HealthCheckService
{
    public async Task<HealthStatus> CheckHealth(string serviceName)
    {
        try
        {
            var response = await _httpClient.GetAsync($"{serviceName}/health");
            if (response.IsSuccessStatusCode)
            {
                return HealthStatus.Healthy;
            }
            return HealthStatus.Unhealthy;
        }
        catch
        {
            return HealthStatus.Unhealthy;
        }
    }
    
    public async Task RemoveUnhealthyServices()
    {
        var services = await _serviceRegistry.GetAllServices();
        
        foreach (var service in services)
        {
            var health = await CheckHealth(service.Name);
            if (health == HealthStatus.Unhealthy)
            {
                await _serviceRegistry.MarkUnhealthy(service);
                // Remove from load balancer
                await _loadBalancer.RemoveService(service);
            }
        }
    }
}
\`\`\`

**7. Timeout and Cancellation:**

Use cancellation tokens to cancel long-running operations.

**Example:**
\`\`\`csharp
public async Task<T> ExecuteWithCancellationAsync<T>(
    Func<CancellationToken, Task<T>> operation,
    TimeSpan timeout)
{
    using var cts = new CancellationTokenSource(timeout);
    
    try
    {
        return await operation(cts.Token);
    }
    catch (OperationCanceledException)
    {
        throw new TimeoutException("Operation was cancelled");
    }
}

// Usage
var result = await ExecuteWithCancellationAsync(
    async (ct) => await _slowService.ProcessData(ct),
    TimeSpan.FromSeconds(10));
\`\`\`

**8. Dead Letter Queues:**

Handle messages that fail repeatedly.

**Example:**
\`\`\`csharp
public class MessageProcessor
{
    private const int MaxRetries = 3;
    
    public async Task ProcessMessage(Message message)
    {
        int retryCount = 0;
        
        while (retryCount < MaxRetries)
        {
            try
            {
                await ProcessMessageInternal(message);
                return;  // Success
            }
            catch (Exception ex)
            {
                retryCount++;
                if (retryCount >= MaxRetries)
                {
                    // Send to dead letter queue
                    await _deadLetterQueue.Send(message, ex);
                }
                else
                {
                    // Retry with delay
                    await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, retryCount)));
                }
            }
        }
    }
}
\`\`\`

**Best Practices:**

1. **Fail Fast**: Detect failures quickly and stop calling failing services
2. **Isolate Failures**: Use bulkheads to prevent cascading failures
3. **Provide Fallbacks**: Always have a degraded mode of operation
4. **Monitor Everything**: Track failure rates, response times, and health
5. **Set Reasonable Timeouts**: Don't wait forever for responses
6. **Use Retries Wisely**: Only retry idempotent operations
7. **Circuit Breakers**: Use circuit breakers for external dependencies
8. **Health Checks**: Regularly check service health and remove unhealthy instances

**Key Takeaway:** Partial failures are inevitable in distributed systems. Design for them from the start by implementing circuit breakers, retries, timeouts, graceful degradation, and health checks. The goal is to isolate failures and keep the system operational even when some components fail.`
  },
  {
    id: 8011,
    category: 'Software Architects',
    question: 'What patterns help maintain consistency across multiple services?',
    answer: `**One-Sentence Definition:** Maintain consistency across services using eventual consistency patterns like saga, event sourcing, CQRS, two-phase commit (for strong consistency), distributed transactions, and compensation transactions.

**The Core Concept:** Think of consistency like keeping multiple copies of a document in sync. Strong consistency is like everyone reading the same document at the same time (hard to scale). Eventual consistency is like updates spreading gradually - everyone will have the latest version eventually, but not instantly.

**The Consistency Challenge:**

In distributed systems, services have their own databases. Maintaining consistency across them is challenging because:
- Can't use traditional ACID transactions across services
- Network partitions can cause inconsistencies
- Services might be temporarily unavailable
- Need to balance consistency with availability and performance

**Consistency Models:**

**1. Strong Consistency:**
- All nodes see same data at same time
- Like everyone reading same document simultaneously
- Hard to achieve in distributed systems
- Sacrifices availability

**2. Eventual Consistency:**
- All nodes will eventually have same data
- Like updates spreading gradually
- Better availability and performance
- Accepts temporary inconsistencies

**Patterns for Consistency:**

**1. Saga Pattern (Eventual Consistency):**

Sequence of local transactions with compensation.

**Example:**
\`\`\`csharp
public class OrderSaga
{
    public async Task ProcessOrder(OrderRequest request)
    {
        var steps = new List<SagaStep>();
        
        try
        {
            // Step 1: Create order
            var order = await _orderService.CreateOrder(request);
            steps.Add(new SagaStep { Service = "Order", Action = "Create" });
            
            // Step 2: Process payment
            await _paymentService.ProcessPayment(order.Id, request.Payment);
            steps.Add(new SagaStep { Service = "Payment", Action = "Process" });
            
            // Step 3: Reserve inventory
            await _inventoryService.ReserveItems(order.Id, request.Items);
            steps.Add(new SagaStep { Service = "Inventory", Action = "Reserve" });
            
            // All succeeded
            await _orderService.CompleteOrder(order.Id);
        }
        catch
        {
            // Compensate in reverse order
            await Compensate(steps);
        }
    }
    
    private async Task Compensate(List<SagaStep> steps)
    {
        for (int i = steps.Count - 1; i >= 0; i--)
        {
            switch (steps[i].Service)
            {
                case "Inventory":
                    await _inventoryService.ReleaseItems(steps[i].OrderId);
                    break;
                case "Payment":
                    await _paymentService.RefundPayment(steps[i].OrderId);
                    break;
                case "Order":
                    await _orderService.CancelOrder(steps[i].OrderId);
                    break;
            }
        }
    }
}
\`\`\`

**2. Event Sourcing (Eventual Consistency):**

Store events instead of current state, rebuild state from events.

**Example:**
\`\`\`csharp
// Store events
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        var @event = new OrderCreatedEvent
        {
            OrderId = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            Items = request.Items,
            Timestamp = DateTime.UtcNow
        };
        
        _eventStore.Append(@event);
    }
    
    public void UpdateOrderStatus(int orderId, string status)
    {
        var @event = new OrderStatusChangedEvent
        {
            OrderId = orderId,
            NewStatus = status,
            Timestamp = DateTime.UtcNow
        };
        
        _eventStore.Append(@event);
    }
}

// Rebuild state from events
public class OrderProjection
{
    public Order GetOrder(int orderId)
    {
        var events = _eventStore.GetEvents(orderId);
        
        var order = new Order { Id = orderId };
        foreach (var @event in events)
        {
            ApplyEvent(order, @event);
        }
        
        return order;
    }
    
    private void ApplyEvent(Order order, IEvent @event)
    {
        switch (@event)
        {
            case OrderCreatedEvent e:
                order.CustomerId = e.CustomerId;
                order.Items = e.Items;
                order.Status = "Created";
                break;
            case OrderStatusChangedEvent e:
                order.Status = e.NewStatus;
                break;
        }
    }
}
\`\`\`

**3. CQRS (Command Query Responsibility Segregation):**

Separate read and write models for better consistency.

**Example:**
\`\`\`csharp
// Write side (commands)
public class OrderCommandService
{
    public void CreateOrder(OrderRequest request)
    {
        var order = new Order
        {
            Id = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            Items = request.Items,
            Status = "Created"
        };
        
        _writeRepository.Save(order);
        
        // Publish event for read side
        _eventBus.Publish(new OrderCreatedEvent(order));
    }
}

// Read side (queries)
public class OrderQueryService
{
    public OrderView GetOrder(int orderId)
    {
        // Read from optimized read model
        return _readRepository.GetOrderView(orderId);
    }
    
    public List<OrderView> GetOrdersByCustomer(int customerId)
    {
        return _readRepository.GetOrdersByCustomer(customerId);
    }
}

// Event handler updates read model
public class OrderEventHandler
{
    public void Handle(OrderCreatedEvent @event)
    {
        // Update read model asynchronously
        var orderView = new OrderView
        {
            OrderId = @event.OrderId,
            CustomerId = @event.CustomerId,
            Status = @event.Status
        };
        
        _readRepository.Save(orderView);
    }
}
\`\`\`

**4. Two-Phase Commit (Strong Consistency):**

Coordinator manages distributed transaction across services.

**Example:**
\`\`\`csharp
public class TwoPhaseCommitCoordinator
{
    public async Task<bool> ExecuteTransaction(List<ITransactionParticipant> participants)
    {
        // Phase 1: Prepare
        var prepared = new List<ITransactionParticipant>();
        
        foreach (var participant in participants)
        {
            try
            {
                if (await participant.Prepare())
                {
                    prepared.Add(participant);
                }
                else
                {
                    // Abort all
                    await AbortAll(prepared);
                    return false;
                }
            }
            catch
            {
                await AbortAll(prepared);
                return false;
            }
        }
        
        // Phase 2: Commit (all prepared successfully)
        foreach (var participant in prepared)
        {
            await participant.Commit();
        }
        
        return true;
    }
    
    private async Task AbortAll(List<ITransactionParticipant> participants)
    {
        foreach (var participant in participants)
        {
            await participant.Abort();
        }
    }
}
\`\`\`

**5. Distributed Locks:**

Use locks to ensure only one operation happens at a time.

**Example:**
\`\`\`csharp
public class DistributedLockService
{
    public async Task ExecuteWithLock(string lockKey, Func<Task> operation)
    {
        var lockAcquired = await _distributedLock.TryAcquireAsync(lockKey, TimeSpan.FromSeconds(10));
        
        if (!lockAcquired)
        {
            throw new LockAcquisitionException("Could not acquire lock");
        }
        
        try
        {
            await operation();
        }
        finally
        {
            await _distributedLock.ReleaseAsync(lockKey);
        }
    }
}

// Usage
await _lockService.ExecuteWithLock($"order-{orderId}", async () =>
{
    var order = await _repository.GetOrder(orderId);
    order.Status = "Processing";
    await _repository.Save(order);
});
\`\`\`

**6. Outbox Pattern:**

Ensure messages are sent exactly once by storing them in database.

**Example:**
\`\`\`csharp
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        using var transaction = _context.Database.BeginTransaction();
        try
        {
            // Save order
            var order = new Order { /* ... */ };
            _context.Orders.Add(order);
            
            // Save to outbox (same transaction)
            var outboxMessage = new OutboxMessage
            {
                MessageId = Guid.NewGuid(),
                EventType = "OrderCreated",
                Payload = JsonSerializer.Serialize(new OrderCreatedEvent(order)),
                Status = "Pending"
            };
            _context.OutboxMessages.Add(outboxMessage);
            
            _context.SaveChanges();
            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
}

// Separate process sends messages
public class OutboxProcessor
{
    public async Task ProcessOutbox()
    {
        var messages = _context.OutboxMessages
            .Where(m => m.Status == "Pending")
            .ToList();
        
        foreach (var message in messages)
        {
            await _messageQueue.Send(message.EventType, message.Payload);
            message.Status = "Sent";
            _context.SaveChanges();
        }
    }
}
\`\`\`

**Choosing the Right Pattern:**

**For Strong Consistency:**
- Two-phase commit (small scale)
- Distributed locks (specific operations)

**For Eventual Consistency:**
- Saga pattern (workflows)
- Event sourcing (audit trail needed)
- CQRS (read/write separation)
- Outbox pattern (message delivery)

**Best Practices:**

1. **Accept Eventual Consistency**: Strong consistency is hard and expensive
2. **Use Sagas for Workflows**: Break down into compensatable steps
3. **Event Sourcing for Audit**: When you need complete history
4. **CQRS for Scale**: Separate read and write models
5. **Idempotency**: Make operations safe to retry
6. **Monitor Consistency**: Track and alert on inconsistencies
7. **Design for Failure**: Assume services will fail

**Key Takeaway:** In distributed systems, perfect consistency is expensive and often unnecessary. Use eventual consistency patterns (saga, event sourcing, CQRS) for most cases. Reserve strong consistency (two-phase commit, distributed locks) for critical operations where it's absolutely required.`
  },
  {
    id: 8012,
    category: 'Software Architects',
    question: 'How do you design a resilient system that survives external dependency failures?',
    answer: `**One-Sentence Definition:** Design resilient systems by implementing circuit breakers, fallbacks, caching, timeouts, retries, health checks, and graceful degradation to handle external dependency failures without crashing the entire system.

**The Core Concept:** Think of your system like a house with multiple power sources. If the main power fails (external dependency down), you have a generator (fallback) that kicks in. You also have circuit breakers to prevent damage, and you can turn off non-essential appliances (graceful degradation) to keep essential systems running.

**Why External Dependencies Fail:**

External dependencies can fail due to:
- Network issues
- Service outages
- Rate limiting
- Timeouts
- Invalid responses
- Maintenance windows

**Key Resilience Patterns:**

**1. Circuit Breaker:**

Prevents calling failing services repeatedly.

**Example:**
\`\`\`csharp
public class PaymentServiceClient
{
    private readonly CircuitBreaker _circuitBreaker;
    
    public async Task<PaymentResult> ProcessPayment(PaymentRequest request)
    {
        return await _circuitBreaker.ExecuteAsync(async () =>
        {
            return await _httpClient.PostAsync("/api/payments", request);
        });
    }
}

// Circuit breaker implementation
public class CircuitBreaker
{
    private CircuitState _state = CircuitState.Closed;
    private int _failureCount = 0;
    private DateTime _lastFailureTime;
    
    public async Task<T> ExecuteAsync<T>(Func<Task<T>> operation)
    {
        if (_state == CircuitState.Open)
        {
            if (DateTime.UtcNow - _lastFailureTime > TimeSpan.FromMinutes(1))
            {
                _state = CircuitState.HalfOpen;  // Try again
            }
            else
            {
                throw new CircuitBreakerOpenException();
            }
        }
        
        try
        {
            var result = await operation();
            _failureCount = 0;
            _state = CircuitState.Closed;
            return result;
        }
        catch
        {
            _failureCount++;
            _lastFailureTime = DateTime.UtcNow;
            
            if (_failureCount >= 5)
            {
                _state = CircuitState.Open;  // Open circuit
            }
            
            throw;
        }
    }
}
\`\`\`

**2. Fallback Mechanisms:**

Provide alternative behavior when external service fails.

**Example:**
\`\`\`csharp
public class ProductService
{
    public async Task<ProductDetails> GetProductDetails(int productId)
    {
        try
        {
            // Try external API
            return await _externalProductApi.GetProduct(productId);
        }
        catch (Exception ex)
        {
            // Fallback 1: Try cache
            var cached = await _cache.GetAsync<ProductDetails>($"product-{productId}");
            if (cached != null)
            {
                return cached;
            }
            
            // Fallback 2: Try database
            var dbProduct = await _repository.GetProduct(productId);
            if (dbProduct != null)
            {
                return MapToProductDetails(dbProduct);
            }
            
            // Fallback 3: Return default
            return new ProductDetails
            {
                Id = productId,
                Name = "Product Unavailable",
                Price = 0,
                Available = false
            };
        }
    }
}
\`\`\`

**3. Caching:**

Cache responses to reduce dependency on external services.

**Example:**
\`\`\`csharp
public class ExchangeRateService
{
    public async Task<decimal> GetExchangeRate(string from, string to)
    {
        var cacheKey = $"rate-{from}-{to}";
        
        // Try cache first
        var cached = await _cache.GetAsync<decimal>(cacheKey);
        if (cached.HasValue)
        {
            return cached.Value;
        }
        
        try
        {
            // Get from external API
            var rate = await _externalApi.GetExchangeRate(from, to);
            
            // Cache for 1 hour
            await _cache.SetAsync(cacheKey, rate, TimeSpan.FromHours(1));
            
            return rate;
        }
        catch
        {
            // If external API fails, try to use stale cache
            var staleCache = await _cache.GetAsync<decimal>($"stale-{cacheKey}");
            if (staleCache.HasValue)
            {
                // Use stale data with warning
                _logger.LogWarning("Using stale exchange rate data");
                return staleCache.Value;
            }
            
            throw;
        }
    }
}
\`\`\`

**4. Timeouts:**

Set timeouts to prevent hanging on slow external services.

**Example:**
\`\`\`csharp
public class ExternalServiceClient
{
    private readonly HttpClient _httpClient;
    private readonly TimeSpan _timeout = TimeSpan.FromSeconds(5);
    
    public async Task<T> CallWithTimeoutAsync<T>(string endpoint)
    {
        using var cts = new CancellationTokenSource(_timeout);
        
        try
        {
            var response = await _httpClient.GetAsync(endpoint, cts.Token);
            return await response.Content.ReadFromJsonAsync<T>();
        }
        catch (OperationCanceledException)
        {
            throw new TimeoutException($"Service call timed out after {_timeout.TotalSeconds} seconds");
        }
    }
}
\`\`\`

**5. Retry with Exponential Backoff:**

Retry failed calls with increasing delays.

**Example:**
\`\`\`csharp
public class ResilientHttpClient
{
    public async Task<T> GetWithRetryAsync<T>(string url, int maxRetries = 3)
    {
        int retryCount = 0;
        
        while (retryCount < maxRetries)
        {
            try
            {
                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadFromJsonAsync<T>();
            }
            catch (HttpRequestException ex) when (retryCount < maxRetries - 1)
            {
                retryCount++;
                var delay = TimeSpan.FromSeconds(Math.Pow(2, retryCount));
                await Task.Delay(delay);
            }
        }
        
        throw new Exception("Max retries exceeded");
    }
}
\`\`\`

**6. Health Checks:**

Monitor external service health and remove unhealthy instances.

**Example:**
\`\`\`csharp
public class HealthCheckService
{
    public async Task<bool> IsHealthy(string serviceUrl)
    {
        try
        {
            var response = await _httpClient.GetAsync($"{serviceUrl}/health");
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }
    
    public async Task MonitorServices()
    {
        var services = await _serviceRegistry.GetAllServices();
        
        foreach (var service in services)
        {
            var isHealthy = await IsHealthy(service.Url);
            
            if (!isHealthy)
            {
                await _serviceRegistry.MarkUnhealthy(service);
                // Remove from load balancer
                await _loadBalancer.RemoveService(service);
            }
        }
    }
}
\`\`\`

**7. Graceful Degradation:**

Reduce functionality when external services fail.

**Example:**
\`\`\`csharp
public class OrderService
{
    public async Task<OrderResult> CreateOrder(OrderRequest request)
    {
        var result = new OrderResult();
        
        // Essential: Create order
        var order = await _repository.CreateOrder(request);
        result.OrderId = order.Id;
        
        // Non-essential: Try to send email
        try
        {
            await _emailService.SendConfirmation(order.CustomerId);
            result.EmailSent = true;
        }
        catch
        {
            // Degrade gracefully - order still created
            result.EmailSent = false;
            _logger.LogWarning("Failed to send confirmation email");
        }
        
        // Non-essential: Try to update analytics
        try
        {
            await _analyticsService.TrackOrder(order);
        }
        catch
        {
            // Degrade gracefully - analytics failure doesn't affect order
            _logger.LogWarning("Failed to track order in analytics");
        }
        
        return result;
    }
}
\`\`\`

**8. Bulkhead Pattern:**

Isolate external service calls to prevent cascading failures.

**Example:**
\`\`\`csharp
public class BulkheadService
{
    private readonly SemaphoreSlim _paymentSemaphore = new(5);  // Max 5 concurrent
    private readonly SemaphoreSlim _shippingSemaphore = new(10);  // Max 10 concurrent
    
    public async Task ProcessPayment(PaymentRequest request)
    {
        await _paymentSemaphore.WaitAsync();
        try
        {
            await _paymentService.Process(request);
        }
        finally
        {
            _paymentSemaphore.Release();
        }
    }
    
    public async Task CreateShipment(ShipmentRequest request)
    {
        await _shippingSemaphore.WaitAsync();
        try
        {
            await _shippingService.Create(request);
        }
        finally
        {
            _shippingSemaphore.Release();
        }
    }
}
\`\`\`

**9. Rate Limiting Protection:**

Handle rate limiting from external services gracefully.

**Example:**
\`\`\`csharp
public class RateLimitedClient
{
    private readonly RateLimiter _rateLimiter;
    
    public async Task<T> CallWithRateLimitAsync<T>(Func<Task<T>> operation)
    {
        await _rateLimiter.WaitAsync();  // Wait if rate limited
        
        try
        {
            return await operation();
        }
        catch (RateLimitException ex)
        {
            // Wait and retry
            await Task.Delay(ex.RetryAfter);
            return await operation();
        }
    }
}
\`\`\`

**Best Practices:**

1. **Always Have Fallbacks**: Never depend solely on external services
2. **Cache Aggressively**: Reduce calls to external services
3. **Set Timeouts**: Don't wait forever for responses
4. **Use Circuit Breakers**: Stop calling failing services
5. **Monitor Health**: Track external service availability
6. **Graceful Degradation**: Keep core functionality working
7. **Isolate Failures**: Use bulkheads to prevent cascading
8. **Retry Wisely**: Only retry idempotent operations
9. **Log Everything**: Track failures for debugging
10. **Test Failure Scenarios**: Simulate external service failures

**Key Takeaway:** Design your system to assume external dependencies will fail. Implement circuit breakers, fallbacks, caching, and graceful degradation. The goal is to keep your system operational even when external services are down, degraded, or slow.`
  },
  {
    id: 8013,
    category: 'Software Architects',
    question: 'What\'s your approach to detecting and isolating slow services?',
    answer: `**One-Sentence Definition:** Detect and isolate slow services by implementing monitoring, distributed tracing, health checks, performance metrics, circuit breakers, timeouts, and automatic removal of slow instances from load balancers.

**The Core Concept:** Think of detecting slow services like monitoring traffic. You have speed cameras (monitoring) that detect slow cars (slow services), traffic alerts (alerts), and you can route around slow areas (circuit breakers). The goal is to identify problems quickly and prevent them from affecting the whole system.

**Why Services Become Slow:**

- High load or resource exhaustion
- Database connection pool exhaustion
- Network latency issues
- Memory leaks or garbage collection pauses
- External dependency slowdowns
- Inefficient algorithms or queries

**Detection Strategies:**

**1. Performance Monitoring:**

Track response times, throughput, and error rates.

**Example:**
\`\`\`csharp
public class PerformanceMonitor
{
    public async Task<T> MonitorAsync<T>(string operationName, Func<Task<T>> operation)
    {
        var stopwatch = Stopwatch.StartNew();
        try
        {
            var result = await operation();
            stopwatch.Stop();
            
            // Log metrics
            _metrics.RecordDuration(operationName, stopwatch.ElapsedMilliseconds);
            _metrics.IncrementCounter($"{operationName}.success");
            
            // Alert if slow
            if (stopwatch.ElapsedMilliseconds > 1000)
            {
                _alertService.SendAlert($"Slow operation: {operationName} took {stopwatch.ElapsedMilliseconds}ms");
            }
            
            return result;
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            _metrics.IncrementCounter($"{operationName}.error");
            _metrics.RecordDuration(operationName, stopwatch.ElapsedMilliseconds);
            throw;
        }
    }
}

// Usage
var result = await _monitor.MonitorAsync("GetUser", () => 
    _userService.GetUser(userId));
\`\`\`

**2. Distributed Tracing:**

Track requests across multiple services.

**Example:**
\`\`\`csharp
public class TracingService
{
    public async Task<T> TraceAsync<T>(string operationName, Func<Task<T>> operation)
    {
        var traceId = Guid.NewGuid().ToString();
        var span = _tracer.StartSpan(operationName, traceId);
        
        try
        {
            var result = await operation();
            span.Finish(Status.Ok);
            return result;
        }
        catch (Exception ex)
        {
            span.Finish(Status.Error, ex);
            throw;
        }
    }
}

// Usage - trace spans multiple services
public async Task<Order> CreateOrder(OrderRequest request)
{
    return await _tracer.TraceAsync("CreateOrder", async () =>
    {
        var user = await _tracer.TraceAsync("GetUser", () => 
            _userService.GetUser(request.UserId));
        
        var payment = await _tracer.TraceAsync("ProcessPayment", () => 
            _paymentService.Process(request.Payment));
        
        return await _tracer.TraceAsync("SaveOrder", () => 
            _repository.SaveOrder(request));
    });
}
\`\`\`

**3. Health Checks with Performance:**

Check health and measure response time.

**Example:**
\`\`\`csharp
public class HealthCheckService
{
    public async Task<HealthStatus> CheckHealth(string serviceUrl)
    {
        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            var response = await _httpClient.GetAsync($"{serviceUrl}/health");
            stopwatch.Stop();
            
            var responseTime = stopwatch.ElapsedMilliseconds;
            
            if (response.IsSuccessStatusCode)
            {
                if (responseTime > 500)
                {
                    return new HealthStatus
                    {
                        IsHealthy = true,
                        IsSlow = true,
                        ResponseTime = responseTime,
                        Status = "Degraded"
                    };
                }
                
                return new HealthStatus
                {
                    IsHealthy = true,
                    IsSlow = false,
                    ResponseTime = responseTime,
                    Status = "Healthy"
                };
            }
            
            return new HealthStatus
            {
                IsHealthy = false,
                ResponseTime = responseTime,
                Status = "Unhealthy"
            };
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            return new HealthStatus
            {
                IsHealthy = false,
                ResponseTime = stopwatch.ElapsedMilliseconds,
                Status = "Unreachable",
                Error = ex.Message
            };
        }
    }
}
\`\`\`

**4. Timeout Detection:**

Detect services that exceed timeout thresholds.

**Example:**
\`\`\`csharp
public class TimeoutMonitor
{
    private readonly TimeSpan _timeout = TimeSpan.FromSeconds(5);
    
    public async Task<T> CallWithTimeoutDetection<T>(string serviceName, Func<Task<T>> operation)
    {
        using var cts = new CancellationTokenSource(_timeout);
        
        try
        {
            var result = await operation();
            return result;
        }
        catch (OperationCanceledException)
        {
            // Service timed out - mark as slow
            _serviceRegistry.MarkSlow(serviceName);
            _alertService.SendAlert($"Service {serviceName} timed out");
            throw new TimeoutException($"Service {serviceName} exceeded timeout");
        }
    }
}
\`\`\`

**Isolation Strategies:**

**1. Circuit Breaker:**

Stop calling slow services automatically.

**Example:**
\`\`\`csharp
public class CircuitBreaker
{
    private CircuitState _state = CircuitState.Closed;
    private int _slowRequestCount = 0;
    private const int SlowThreshold = 3;  // 3 slow requests open circuit
    private const int SlowRequestThreshold = 1000;  // 1000ms = slow
    
    public async Task<T> ExecuteAsync<T>(Func<Task<T>> operation)
    {
        if (_state == CircuitState.Open)
        {
            throw new CircuitBreakerOpenException("Circuit is open");
        }
        
        var stopwatch = Stopwatch.StartNew();
        try
        {
            var result = await operation();
            stopwatch.Stop();
            
            // Check if slow
            if (stopwatch.ElapsedMilliseconds > SlowRequestThreshold)
            {
                _slowRequestCount++;
                
                if (_slowRequestCount >= SlowThreshold)
                {
                    _state = CircuitState.Open;  // Open circuit for slow service
                    _alertService.SendAlert("Circuit opened due to slow responses");
                }
            }
            else
            {
                _slowRequestCount = 0;  // Reset on fast response
            }
            
            return result;
        }
        catch
        {
            throw;
        }
    }
}
\`\`\`

**2. Load Balancer Health Checks:**

Remove slow instances from load balancer.

**Example:**
\`\`\`csharp
public class LoadBalancerHealthMonitor
{
    public async Task MonitorAndIsolate()
    {
        var instances = await _loadBalancer.GetInstances();
        
        foreach (var instance in instances)
        {
            var health = await CheckInstanceHealth(instance);
            
            if (health.IsSlow || !health.IsHealthy)
            {
                // Remove from load balancer
                await _loadBalancer.RemoveInstance(instance);
                _alertService.SendAlert($"Removed slow instance: {instance.Id}");
            }
        }
    }
    
    private async Task<HealthStatus> CheckInstanceHealth(ServiceInstance instance)
    {
        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            var response = await _httpClient.GetAsync($"{instance.Url}/health");
            stopwatch.Stop();
            
            return new HealthStatus
            {
                IsHealthy = response.IsSuccessStatusCode,
                IsSlow = stopwatch.ElapsedMilliseconds > 500,
                ResponseTime = stopwatch.ElapsedMilliseconds
            };
        }
        catch
        {
            return new HealthStatus { IsHealthy = false };
        }
    }
}
\`\`\`

**3. Request Throttling:**

Limit requests to slow services.

**Example:**
\`\`\`csharp
public class ThrottledServiceClient
{
    private readonly SemaphoreSlim _throttle = new(5);  // Max 5 concurrent
    
    public async Task<T> CallWithThrottle<T>(Func<Task<T>> operation)
    {
        await _throttle.WaitAsync();
        try
        {
            return await operation();
        }
        finally
        {
            _throttle.Release();
        }
    }
}
\`\`\`

**4. Automatic Scaling:**

Scale up slow services automatically.

**Example:**
\`\`\`csharp
public class AutoScaler
{
    public async Task MonitorAndScale()
    {
        var services = await _serviceRegistry.GetAllServices();
        
        foreach (var service in services)
        {
            var metrics = await _metricsService.GetMetrics(service.Name);
            
            // If average response time > 1 second
            if (metrics.AverageResponseTime > 1000)
            {
                // Scale up
                await _scalingService.ScaleUp(service, 1);
                _logger.LogInformation($"Scaled up {service.Name} due to slow performance");
            }
            
            // If average response time < 100ms and instances > 1
            if (metrics.AverageResponseTime < 100 && service.InstanceCount > 1)
            {
                // Scale down
                await _scalingService.ScaleDown(service, 1);
            }
        }
    }
}
\`\`\`

**5. Bulkhead Pattern:**

Isolate slow services to prevent affecting others.

**Example:**
\`\`\`csharp
public class BulkheadService
{
    private readonly SemaphoreSlim _slowServiceSemaphore = new(2);  // Limit to 2 concurrent
    
    public async Task CallSlowService(Func<Task> operation)
    {
        await _slowServiceSemaphore.WaitAsync();
        try
        {
            await operation();
        }
        finally
        {
            _slowServiceSemaphore.Release();
        }
    }
}
\`\`\`

**Monitoring Dashboard:**

Track key metrics:
- Response time (p50, p95, p99)
- Throughput (requests per second)
- Error rate
- Active connections
- Resource usage (CPU, memory)

**Best Practices:**

1. **Set Baselines**: Know what "normal" looks like
2. **Monitor Continuously**: Check health every few seconds
3. **Alert on Thresholds**: Alert when response time exceeds threshold
4. **Isolate Quickly**: Remove slow instances from load balancer
5. **Use Circuit Breakers**: Stop calling slow services automatically
6. **Track Percentiles**: Monitor p95 and p99, not just average
7. **Distributed Tracing**: Understand where time is spent
8. **Auto-Scale**: Scale up slow services automatically
9. **Log Everything**: Track slow requests for analysis
10. **Test Scenarios**: Simulate slow services in testing

**Key Takeaway:** Detect slow services early through monitoring, health checks, and distributed tracing. Isolate them quickly using circuit breakers, load balancer removal, and bulkheads. The goal is to prevent slow services from affecting the entire system and to automatically recover when services return to normal performance.`
  },
  {
    id: 8014,
    category: 'Software Architects',
    question: 'How do you design caching layers (L1/L2) to avoid stale data and thundering herds?',
    answer: `**One-Sentence Definition:** Design multi-level caching (L1 in-memory, L2 distributed) with cache invalidation strategies, TTL expiration, cache warming, and request coalescing to prevent stale data and thundering herd problems when cache expires.

**The Core Concept:** Think of caching like a library system. L1 cache is like your personal bookshelf (fast, local). L2 cache is like the library's main collection (shared, larger). When a popular book is returned (cache expires), you don't want everyone rushing to the librarian at once (thundering herd). You want a system that handles requests efficiently.

**What are L1 and L2 Caches?**

**L1 Cache (Local/In-Memory):**
- Fastest, closest to application
- Limited size, application-specific
- Lost when application restarts
- Example: In-memory dictionary, local cache

**L2 Cache (Distributed/Shared):**
- Slower than L1, but shared across instances
- Larger capacity, survives restarts
- Example: Redis, Memcached, distributed cache

**Cache Architecture:**

**Example:**
\`\`\`csharp
public class MultiLevelCache
{
    private readonly IMemoryCache _l1Cache;  // In-memory
    private readonly IDistributedCache _l2Cache;  // Redis
    
    public async Task<T> GetAsync<T>(string key) where T : class
    {
        // Check L1 first
        if (_l1Cache.TryGetValue(key, out T l1Value))
        {
            return l1Value;
        }
        
        // Check L2
        var l2Value = await _l2Cache.GetStringAsync(key);
        if (l2Value != null)
        {
            var value = JsonSerializer.Deserialize<T>(l2Value);
            
            // Populate L1 for next time
            _l1Cache.Set(key, value, TimeSpan.FromMinutes(5));
            
            return value;
        }
        
        // Cache miss - get from source
        return null;
    }
    
    public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory) where T : class
    {
        // Try cache first
        var cached = await GetAsync<T>(key);
        if (cached != null)
        {
            return cached;
        }
        
        // Get from source
        var value = await factory();
        
        // Store in both caches
        await SetAsync(key, value);
        
        return value;
    }
    
    public async Task SetAsync<T>(string key, T value) where T : class
    {
        // Set in L2 (distributed)
        var serialized = JsonSerializer.Serialize(value);
        await _l2Cache.SetStringAsync(key, serialized, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
        });
        
        // Set in L1 (local)
        _l1Cache.Set(key, value, TimeSpan.FromMinutes(5));
    }
}
\`\`\`

**Preventing Stale Data:**

**1. Cache Invalidation:**

Invalidate cache when data changes.

**Example:**
\`\`\`csharp
public class ProductService
{
    public async Task UpdateProduct(Product product)
    {
        // Update database
        await _repository.UpdateProduct(product);
        
        // Invalidate cache
        await _cache.RemoveAsync($"product-{product.Id}");
        await _cache.RemoveAsync("products-list");  // Invalidate list cache
        
        // Optionally: Update cache with new data
        await _cache.SetAsync($"product-{product.Id}", product);
    }
    
    public async Task<Product> GetProduct(int id)
    {
        return await _cache.GetOrSetAsync($"product-{id}", async () =>
        {
            return await _repository.GetProduct(id);
        });
    }
}
\`\`\`

**2. TTL (Time To Live):**

Set expiration times for cache entries.

**Example:**
\`\`\`csharp
public class CacheService
{
    public async Task SetWithTTL<T>(string key, T value, TimeSpan ttl)
    {
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = ttl
        };
        
        await _cache.SetStringAsync(key, JsonSerializer.Serialize(value), options);
    }
    
    // Different TTLs for different data types
    public async Task CacheProduct(Product product)
    {
        // Products change rarely - longer TTL
        await SetWithTTL($"product-{product.Id}", product, TimeSpan.FromHours(1));
    }
    
    public async Task CachePrice(decimal price, int productId)
    {
        // Prices change more often - shorter TTL
        await SetWithTTL($"price-{productId}", price, TimeSpan.FromMinutes(5));
    }
}
\`\`\`

**3. Version-Based Caching:**

Use version numbers to detect stale data.

**Example:**
\`\`\`csharp
public class VersionedCache
{
    public async Task<Product> GetProduct(int id)
    {
        var cacheKey = $"product-{id}";
        var versionKey = $"product-{id}-version";
        
        // Get cached version
        var cachedVersion = await _cache.GetStringAsync(versionKey);
        
        // Get current version from database
        var currentVersion = await _repository.GetProductVersion(id);
        
        if (cachedVersion == currentVersion.ToString())
        {
            // Version matches - use cache
            return await _cache.GetAsync<Product>(cacheKey);
        }
        
        // Version changed - refresh cache
        var product = await _repository.GetProduct(id);
        await _cache.SetAsync(cacheKey, product);
        await _cache.SetStringAsync(versionKey, currentVersion.ToString());
        
        return product;
    }
}
\`\`\`

**Preventing Thundering Herd:**

**1. Request Coalescing:**

Combine multiple requests for same key into one.

**Example:**
\`\`\`csharp
public class CoalescingCache
{
    private readonly ConcurrentDictionary<string, Task<object>> _pendingRequests = new();
    
    public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory) where T : class
    {
        // Check cache first
        var cached = await _cache.GetAsync<T>(key);
        if (cached != null)
        {
            return cached;
        }
        
        // Check if request is already pending
        if (_pendingRequests.TryGetValue(key, out var pendingTask))
        {
            // Wait for existing request
            return (T)await pendingTask;
        }
        
        // Create new request
        var task = factory();
        _pendingRequests[key] = task;
        
        try
        {
            var value = await task;
            
            // Cache the result
            await _cache.SetAsync(key, value);
            
            return value;
        }
        finally
        {
            _pendingRequests.TryRemove(key, out _);
        }
    }
}
\`\`\`

**2. Cache Warming:**

Pre-populate cache before expiration.

**Example:**
\`\`\`csharp
public class CacheWarmer
{
    public async Task WarmCache()
    {
        // Get popular products
        var popularProducts = await _repository.GetPopularProducts();
        
        foreach (var product in popularProducts)
        {
            // Pre-populate cache
            await _cache.SetAsync($"product-{product.Id}", product);
        }
        
        // Schedule refresh before expiration
        var refreshTime = DateTime.UtcNow.AddMinutes(50);  // Refresh 10 min before 1 hour TTL
        _scheduler.Schedule(() => WarmCache(), refreshTime);
    }
}
\`\`\`

**3. Staggered Expiration:**

Use random TTL to prevent simultaneous expiration.

**Example:**
\`\`\`csharp
public class StaggeredCache
{
    private readonly Random _random = new();
    
    public async Task SetWithStaggeredTTL<T>(string key, T value, TimeSpan baseTTL)
    {
        // Add random jitter to TTL
        var jitter = TimeSpan.FromSeconds(_random.Next(0, 300));  // 0-5 minutes
        var ttl = baseTTL.Add(jitter);
        
        await _cache.SetAsync(key, value, ttl);
    }
    
    // Usage
    public async Task CacheProduct(Product product)
    {
        // Base TTL: 1 hour, with random 0-5 min jitter
        await SetWithStaggeredTTL($"product-{product.Id}", product, TimeSpan.FromHours(1));
    }
}
\`\`\`

**4. Lock-Based Refresh:**

Use distributed lock to allow only one refresh.

**Example:**
\`\`\`csharp
public class LockBasedCache
{
    public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory) where T : class
    {
        // Check cache
        var cached = await _cache.GetAsync<T>(key);
        if (cached != null)
        {
            return cached;
        }
        
        // Try to acquire lock for refresh
        var lockKey = $"lock-{key}";
        var lockAcquired = await _distributedLock.TryAcquireAsync(lockKey, TimeSpan.FromSeconds(10));
        
        if (lockAcquired)
        {
            try
            {
                // Double-check cache (another instance might have refreshed)
                cached = await _cache.GetAsync<T>(key);
                if (cached != null)
                {
                    return cached;
                }
                
                // Refresh cache
                var value = await factory();
                await _cache.SetAsync(key, value);
                
                return value;
            }
            finally
            {
                await _distributedLock.ReleaseAsync(lockKey);
            }
        }
        else
        {
            // Another instance is refreshing - wait a bit and retry
            await Task.Delay(100);
            return await GetOrSetAsync(key, factory);
        }
    }
}
\`\`\`

**5. Background Refresh:**

Refresh cache in background before expiration.

**Example:**
\`\`\`csharp
public class BackgroundRefreshCache
{
    public async Task<T> GetAsync<T>(string key, Func<Task<T>> factory) where T : class
    {
        var cached = await _cache.GetAsync<T>(key);
        
        if (cached != null)
        {
            // Check if near expiration
            var ttl = await _cache.GetTTLAsync(key);
            if (ttl < TimeSpan.FromMinutes(1))
            {
                // Refresh in background (don't wait)
                _ = Task.Run(async () =>
                {
                    var value = await factory();
                    await _cache.SetAsync(key, value);
                });
            }
            
            return cached;
        }
        
        // Cache miss - get from source
        var value = await factory();
        await _cache.SetAsync(key, value);
        
        return value;
    }
}
\`\`\`

**Best Practices:**

1. **Multi-Level Caching**: Use L1 for speed, L2 for sharing
2. **Invalidate on Write**: Always invalidate when data changes
3. **Set Appropriate TTLs**: Balance freshness vs performance
4. **Use Request Coalescing**: Prevent duplicate requests
5. **Stagger Expiration**: Add jitter to prevent thundering herd
6. **Cache Warming**: Pre-populate popular data
7. **Monitor Cache Hit Rate**: Track cache effectiveness
8. **Use Versioning**: Detect stale data automatically
9. **Background Refresh**: Refresh before expiration
10. **Handle Cache Failures**: Fallback to source if cache fails

**Key Takeaway:** Design multi-level caching with proper invalidation and TTL strategies. Prevent thundering herd through request coalescing, staggered expiration, and lock-based refresh. The goal is to maximize cache hits while ensuring data freshness and preventing system overload when cache expires.`
  },
  {
    id: 8015,
    category: 'Software Architects',
    question: 'What are the signals that a system needs vertical scaling vs horizontal scaling?',
    answer: `**One-Sentence Definition:** Use vertical scaling (bigger machines) when you have single-threaded bottlenecks, memory constraints, or can't distribute the workload, and horizontal scaling (more machines) when you have stateless services, need high availability, or want to scale incrementally.

**The Core Concept:** Think of scaling like expanding a business. Vertical scaling is like giving one employee more tools and a bigger desk (upgrade the server). Horizontal scaling is like hiring more employees (add more servers). Choose based on whether the problem is the employee's capacity or the number of employees needed.

**What is Vertical Scaling?**

Scaling up - adding more resources (CPU, RAM, storage) to existing machines.

**Example:**
- Current: 4 CPU cores, 8GB RAM
- Scaled: 16 CPU cores, 64GB RAM
- Same number of servers, but each is more powerful

**What is Horizontal Scaling?**

Scaling out - adding more machines to handle the load.

**Example:**
- Current: 1 server with 4 CPU cores
- Scaled: 4 servers, each with 4 CPU cores
- More servers, same individual capacity

**Signals for Vertical Scaling:**

**1. Single-Threaded Bottlenecks:**
- One CPU core maxed out while others idle
- Application can't use multiple cores effectively
- Sequential processing required

**Example:**
\`\`\`csharp
// Single-threaded processing
public void ProcessLargeFile(string filePath)
{
    // This runs on one core, can't parallelize
    var data = File.ReadAllLines(filePath);
    foreach (var line in data)
    {
        ProcessLine(line);  // Sequential processing
    }
}
\`\`\`

**2. Memory Constraints:**
- Application runs out of memory
- Need to load large datasets into memory
- In-memory caching requires more RAM

**Example:**
\`\`\`csharp
// Memory-intensive operation
public void ProcessLargeDataset()
{
    // Loads entire dataset into memory
    var data = _repository.GetAllData();  // 10GB of data
    var processed = ProcessInMemory(data);
}
\`\`\`

**3. Database Performance:**
- Database queries are slow due to limited resources
- Need more CPU for complex queries
- Need more RAM for query cache

**4. Monolithic Architecture:**
- Can't easily split into multiple instances
- Stateful application
- Tight coupling between components

**5. Cost of Redesign:**
- Cheaper to upgrade hardware than redesign
- Application not designed for horizontal scaling
- Quick fix needed

**Signals for Horizontal Scaling:**

**1. Stateless Services:**
- Services don't maintain state between requests
- Can run multiple instances independently
- Load can be distributed evenly

**Example:**
\`\`\`csharp
// Stateless service - perfect for horizontal scaling
public class OrderService
{
    public Order CreateOrder(OrderRequest request)
    {
        // No state stored, can run on any instance
        var order = new Order { /* ... */ };
        _repository.Save(order);  // State in database
        return order;
    }
}
\`\`\`

**2. High Availability Requirements:**
- Need redundancy for fault tolerance
- Can't afford single point of failure
- Need to survive server failures

**3. Traffic Spikes:**
- Unpredictable load patterns
- Need to scale up and down quickly
- Cost-effective to add/remove instances

**4. Geographic Distribution:**
- Need servers in multiple regions
- Reduce latency for global users
- Compliance requirements

**5. Cost Efficiency:**
- Cheaper to use multiple smaller instances
- Pay for what you use
- Can scale down during low traffic

**Decision Matrix:**

**Choose Vertical Scaling When:**
\`\`\`
✓ Single-threaded bottlenecks
✓ Memory constraints
✓ Database performance issues
✓ Monolithic architecture
✓ Quick fix needed
✓ Application can't be distributed
\`\`\`

**Choose Horizontal Scaling When:**
\`\`\`
✓ Stateless services
✓ High availability needed
✓ Traffic spikes
✓ Geographic distribution
✓ Cost efficiency important
✓ Can distribute workload
\`\`\`

**Hybrid Approach:**

Many systems use both strategies:

**Example:**
\`\`\`csharp
// Application servers - horizontal scaling
Load Balancer
    ├── App Server 1 (4 cores, 8GB)
    ├── App Server 2 (4 cores, 8GB)
    └── App Server 3 (4 cores, 8GB)

// Database server - vertical scaling
Database Server (32 cores, 256GB RAM)
\`\`\`

**Monitoring Signals:**

**Vertical Scaling Needed:**
- CPU usage consistently > 80% on all cores
- Memory usage > 90%
- Disk I/O maxed out
- Database connection pool exhausted
- Response time increasing despite low traffic

**Horizontal Scaling Needed:**
- CPU usage high but can distribute load
- Request queue growing
- High error rate due to overload
- Need redundancy
- Traffic growing linearly

**Example Monitoring:**
\`\`\`csharp
public class ScalingMonitor
{
    public ScalingRecommendation AnalyzeMetrics(ServerMetrics metrics)
    {
        // Check for vertical scaling signals
        if (metrics.CpuUsage > 80 && metrics.AllCoresUsed)
        {
            return new ScalingRecommendation
            {
                Type = ScalingType.Vertical,
                Reason = "All CPU cores maxed out",
                Action = "Upgrade to more powerful server"
            };
        }
        
        if (metrics.MemoryUsage > 90)
        {
            return new ScalingRecommendation
            {
                Type = ScalingType.Vertical,
                Reason = "Memory exhausted",
                Action = "Add more RAM"
            };
        }
        
        // Check for horizontal scaling signals
        if (metrics.RequestQueueLength > 1000 && metrics.CpuUsage < 50)
        {
            return new ScalingRecommendation
            {
                Type = ScalingType.Horizontal,
                Reason = "High request queue, CPU available",
                Action = "Add more server instances"
            };
        }
        
        return null;
    }
}
\`\`\`

**Best Practices:**

1. **Start with Vertical**: Easier and cheaper initially
2. **Design for Horizontal**: Build stateless services from start
3. **Monitor Continuously**: Track metrics to make informed decisions
4. **Use Auto-Scaling**: Automatically scale based on metrics
5. **Test Scaling**: Load test to understand bottlenecks
6. **Consider Costs**: Compare vertical vs horizontal costs
7. **Plan for Both**: Most systems need both strategies

**Key Takeaway:** Vertical scaling is simpler but has limits. Horizontal scaling is more flexible but requires stateless design. Monitor your system to identify bottlenecks - CPU/memory constraints suggest vertical scaling, while request queues and stateless services suggest horizontal scaling. Most production systems use a combination of both.`
  },
  {
    id: 8016,
    category: 'Software Architects',
    question: 'How do you design read-heavy workloads for maximum throughput?',
    answer: `**One-Sentence Definition:** Design read-heavy workloads by implementing read replicas, caching layers, CDN for static content, database query optimization, connection pooling, and read/write separation to maximize throughput and minimize latency.

**The Core Concept:** Think of a read-heavy system like a library. Instead of everyone going to the main library (database), you have multiple copies (replicas), local branches (cache), and digital copies (CDN). The goal is to serve as many readers as possible without overwhelming the main source.

**Characteristics of Read-Heavy Workloads:**

- Many more reads than writes (e.g., 100:1 ratio)
- Need to serve many concurrent readers
- Low latency requirements
- High availability needed
- Can tolerate slightly stale data

**Key Strategies:**

**1. Read Replicas:**

Create multiple copies of database for reads.

**Example:**
\`\`\`csharp
public class ReadReplicaService
{
    private readonly IDbConnection _writeDb;  // Master
    private readonly List<IDbConnection> _readReplicas;  // Slaves
    
    public async Task<T> ReadAsync<T>(Func<IDbConnection, Task<T>> query)
    {
        // Route reads to replica (round-robin or random)
        var replica = GetReadReplica();
        return await query(replica);
    }
    
    public async Task WriteAsync<T>(Func<IDbConnection, Task<T>> command)
    {
        // Always write to master
        return await command(_writeDb);
    }
    
    private IDbConnection GetReadReplica()
    {
        // Round-robin selection
        var index = _replicaIndex++ % _readReplicas.Count;
        return _readReplicas[index];
    }
}

// Usage
var product = await _service.ReadAsync(async db => 
    await db.QueryFirstAsync<Product>("SELECT * FROM Products WHERE Id = @id", new { id }));

await _service.WriteAsync(async db => 
    await db.ExecuteAsync("UPDATE Products SET Price = @price WHERE Id = @id", 
        new { price, id }));
\`\`\`

**2. Multi-Level Caching:**

Cache at multiple levels for maximum efficiency.

**Example:**
\`\`\`csharp
public class CachedProductService
{
    private readonly IMemoryCache _l1Cache;  // Application memory
    private readonly IDistributedCache _l2Cache;  // Redis
    private readonly IProductRepository _repository;
    
    public async Task<Product> GetProduct(int id)
    {
        // L1: Check application memory cache
        if (_l1Cache.TryGetValue($"product-{id}", out Product l1Product))
        {
            return l1Product;
        }
        
        // L2: Check distributed cache
        var l2Product = await _l2Cache.GetAsync<Product>($"product-{id}");
        if (l2Product != null)
        {
            // Populate L1
            _l1Cache.Set($"product-{id}", l2Product, TimeSpan.FromMinutes(5));
            return l2Product;
        }
        
        // L3: Database (read replica)
        var product = await _repository.GetProduct(id);
        
        // Populate both caches
        await _l2Cache.SetAsync($"product-{id}", product, TimeSpan.FromHours(1));
        _l1Cache.Set($"product-{id}", product, TimeSpan.FromMinutes(5));
        
        return product;
    }
}
\`\`\`

**3. CDN for Static Content:**

Serve static content from edge locations.

**Example:**
\`\`\`csharp
public class ContentService
{
    public string GetProductImageUrl(int productId)
    {
        // Serve from CDN instead of application server
        return $"https://cdn.example.com/products/{productId}.jpg";
    }
    
    public string GetStaticAssetUrl(string assetName)
    {
        // CSS, JS, images from CDN
        return $"https://cdn.example.com/assets/{assetName}";
    }
}
\`\`\`

**4. Database Query Optimization:**

Optimize queries for read performance.

**Example:**
\`\`\`csharp
// Bad - N+1 query problem
public async Task<List<Order>> GetOrdersWithProducts(int customerId)
{
    var orders = await _repository.GetOrders(customerId);
    
    foreach (var order in orders)
    {
        // Query for each order - slow!
        order.Products = await _repository.GetProducts(order.Id);
    }
    
    return orders;
}

// Good - Single query with join
public async Task<List<Order>> GetOrdersWithProducts(int customerId)
{
    // Single query with join
    var sql = @"
        SELECT o.*, p.*
        FROM Orders o
        INNER JOIN OrderProducts op ON o.Id = op.OrderId
        INNER JOIN Products p ON op.ProductId = p.Id
        WHERE o.CustomerId = @customerId";
    
    return await _repository.QueryAsync<Order>(sql, new { customerId });
}

// Use indexes
// CREATE INDEX idx_customer_orders ON Orders(CustomerId);
// CREATE INDEX idx_order_products ON OrderProducts(OrderId);
\`\`\`

**5. Connection Pooling:**

Reuse database connections efficiently.

**Example:**
\`\`\`csharp
// Connection string with pooling
var connectionString = "Server=localhost;Database=Products;Pooling=true;Min Pool Size=10;Max Pool Size=100;";

public class ProductRepository
{
    private readonly string _connectionString;
    
    public async Task<Product> GetProduct(int id)
    {
        // Connection is reused from pool
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        
        return await connection.QueryFirstAsync<Product>(
            "SELECT * FROM Products WHERE Id = @id", 
            new { id });
    }
}
\`\`\`

**6. Materialized Views:**

Pre-compute expensive queries.

**Example:**
\`\`\`csharp
// Create materialized view
// CREATE MATERIALIZED VIEW ProductSalesSummary AS
// SELECT 
//     ProductId,
//     SUM(Quantity) as TotalSold,
//     SUM(Amount) as TotalRevenue,
//     COUNT(*) as OrderCount
// FROM OrderItems
// GROUP BY ProductId;

public class ProductSalesService
{
    public async Task<ProductSalesSummary> GetSalesSummary(int productId)
    {
        // Query materialized view instead of aggregating on-the-fly
        return await _repository.QueryFirstAsync<ProductSalesSummary>(
            "SELECT * FROM ProductSalesSummary WHERE ProductId = @id",
            new { id = productId });
    }
}
\`\`\`

**7. Read/Write Separation (CQRS):**

Separate read and write models.

**Example:**
\`\`\`csharp
// Write side - optimized for writes
public class OrderCommandService
{
    public async Task CreateOrder(OrderRequest request)
    {
        var order = new Order
        {
            Id = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            Items = request.Items
        };
        
        await _writeRepository.Save(order);
        
        // Publish event for read side
        await _eventBus.Publish(new OrderCreatedEvent(order));
    }
}

// Read side - optimized for reads
public class OrderQueryService
{
    public async Task<OrderView> GetOrder(int orderId)
    {
        // Read from optimized read model (denormalized)
        return await _readRepository.GetOrderView(orderId);
    }
    
    public async Task<List<OrderView>> GetOrdersByCustomer(int customerId)
    {
        // Fast query on read-optimized table
        return await _readRepository.GetOrdersByCustomer(customerId);
    }
}

// Read model updater
public class OrderViewUpdater
{
    public async Task Handle(OrderCreatedEvent @event)
    {
        // Update denormalized read model
        var orderView = new OrderView
        {
            OrderId = @event.OrderId,
            CustomerId = @event.CustomerId,
            CustomerName = await GetCustomerName(@event.CustomerId),
            TotalAmount = @event.Items.Sum(i => i.Price * i.Quantity),
            ItemCount = @event.Items.Count
        };
        
        await _readRepository.Save(orderView);
    }
}
\`\`\`

**8. Pagination:**

Limit result sets to reduce load.

**Example:**
\`\`\`csharp
public class PaginatedProductService
{
    public async Task<PagedResult<Product>> GetProducts(int page, int pageSize)
    {
        // Use cursor-based pagination for better performance
        var sql = @"
            SELECT * FROM Products
            WHERE Id > @cursor
            ORDER BY Id
            LIMIT @pageSize";
        
        var products = await _repository.QueryAsync<Product>(sql, new 
        { 
            cursor = page * pageSize,
            pageSize 
        });
        
        return new PagedResult<Product>
        {
            Items = products,
            Page = page,
            PageSize = pageSize,
            HasMore = products.Count == pageSize
        };
    }
}
\`\`\`

**9. Denormalization:**

Store redundant data to avoid joins.

**Example:**
\`\`\`csharp
// Normalized (requires joins)
public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    // Need to join to get customer name
}

// Denormalized (no joins needed)
public class OrderView
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }  // Denormalized
    public string CustomerEmail { get; set; }  // Denormalized
    // No join needed for reads
}
\`\`\`

**10. Query Result Caching:**

Cache query results, not just individual records.

**Example:**
\`\`\`csharp
public class CachedQueryService
{
    public async Task<List<Product>> GetPopularProducts()
    {
        return await _cache.GetOrSetAsync("popular-products", async () =>
        {
            // Expensive query - cache the result
            return await _repository.GetPopularProducts();
        }, TimeSpan.FromMinutes(10));
    }
}
\`\`\`

**Best Practices:**

1. **Use Read Replicas**: Distribute read load across multiple databases
2. **Cache Aggressively**: Cache at multiple levels
3. **Optimize Queries**: Use indexes, avoid N+1 queries
4. **Denormalize Read Models**: Store redundant data for faster reads
5. **Use CDN**: Serve static content from edge locations
6. **Implement CQRS**: Separate read and write models
7. **Connection Pooling**: Reuse database connections
8. **Pagination**: Limit result sets
9. **Materialized Views**: Pre-compute expensive aggregations
10. **Monitor Performance**: Track query times and cache hit rates

**Key Takeaway:** Design read-heavy systems with multiple layers of optimization: read replicas for database load distribution, multi-level caching for speed, CDN for static content, query optimization for efficiency, and CQRS for read/write separation. The goal is to serve maximum reads with minimum latency while protecting the write database.`
  },
  {
    id: 8017,
    category: 'Software Architects',
    question: 'What patterns help reduce database load without harming consistency?',
    answer: `**One-Sentence Definition:** Reduce database load using caching, read replicas, materialized views, denormalization, write-behind caching, connection pooling, and query optimization while maintaining consistency through cache invalidation, eventual consistency patterns, and proper transaction handling.

**The Core Concept:** Think of reducing database load like managing a busy restaurant. Instead of the chef (database) handling every order, you have waiters (cache) who remember common orders, a menu board (materialized views) with popular items, and multiple serving stations (read replicas). But you still need the chef to ensure food quality (consistency).

**Why Reduce Database Load?**

- Databases are often the bottleneck
- Expensive to scale databases
- High latency for remote databases
- Connection limits
- Cost of database resources

**Patterns to Reduce Load:**

**1. Caching with Invalidation:**

Cache data but invalidate on updates.

**Example:**
\`\`\`csharp
public class CachedProductService
{
    public async Task<Product> GetProduct(int id)
    {
        // Try cache first
        var cached = await _cache.GetAsync<Product>($"product-{id}");
        if (cached != null)
        {
            return cached;
        }
        
        // Cache miss - get from database
        var product = await _repository.GetProduct(id);
        
        // Cache for 1 hour
        await _cache.SetAsync($"product-{id}", product, TimeSpan.FromHours(1));
        
        return product;
    }
    
    public async Task UpdateProduct(Product product)
    {
        // Update database
        await _repository.UpdateProduct(product);
        
        // Invalidate cache to maintain consistency
        await _cache.RemoveAsync($"product-{id}");
        
        // Optionally: Update cache with new data
        await _cache.SetAsync($"product-{id}", product, TimeSpan.FromHours(1));
    }
}
\`\`\`

**2. Read Replicas:**

Route reads to replicas, writes to master.

**Example:**
\`\`\`csharp
public class ReadReplicaService
{
    private readonly IDbConnection _master;
    private readonly List<IDbConnection> _replicas;
    
    public async Task<T> ReadAsync<T>(Func<IDbConnection, Task<T>> query)
    {
        // Read from replica (reduces load on master)
        var replica = GetReplica();
        return await query(replica);
    }
    
    public async Task WriteAsync<T>(Func<IDbConnection, Task<T>> command)
    {
        // Write to master (maintains consistency)
        return await command(_master);
    }
}
\`\`\`

**3. Materialized Views:**

Pre-compute expensive queries.

**Example:**
\`\`\`csharp
// Create materialized view
// CREATE MATERIALIZED VIEW DailySalesSummary AS
// SELECT 
//     DATE(OrderDate) as SaleDate,
//     SUM(Amount) as TotalSales,
//     COUNT(*) as OrderCount
// FROM Orders
// GROUP BY DATE(OrderDate);

public class SalesService
{
    public async Task<DailySalesSummary> GetDailySales(DateTime date)
    {
        // Query materialized view instead of aggregating
        return await _repository.QueryFirstAsync<DailySalesSummary>(
            "SELECT * FROM DailySalesSummary WHERE SaleDate = @date",
            new { date });
    }
    
    public async Task RefreshMaterializedView()
    {
        // Refresh periodically to maintain consistency
        await _repository.ExecuteAsync("REFRESH MATERIALIZED VIEW DailySalesSummary");
    }
}
\`\`\`

**4. Write-Behind Caching:**

Cache writes and flush to database asynchronously.

**Example:**
\`\`\`csharp
public class WriteBehindCache
{
    private readonly ConcurrentDictionary<string, object> _writeCache = new();
    private readonly Timer _flushTimer;
    
    public void Write(string key, object value)
    {
        // Write to cache immediately
        _writeCache[key] = value;
        
        // Flush to database asynchronously
        _ = Task.Run(async () => await FlushToDatabase(key, value));
    }
    
    private async Task FlushToDatabase(string key, object value)
    {
        // Batch writes for efficiency
        await _repository.Save(key, value);
        _writeCache.TryRemove(key, out _);
    }
    
    public async Task FlushAll()
    {
        // Flush all pending writes
        var items = _writeCache.ToList();
        foreach (var item in items)
        {
            await _repository.Save(item.Key, item.Value);
            _writeCache.TryRemove(item.Key, out _);
        }
    }
}
\`\`\`

**5. Connection Pooling:**

Reuse connections to reduce overhead.

**Example:**
\`\`\`csharp
// Connection string with pooling
var connectionString = 
    "Server=localhost;Database=Products;" +
    "Pooling=true;" +
    "Min Pool Size=10;" +
    "Max Pool Size=100;" +
    "Connection Timeout=30;";

public class ProductRepository
{
    public async Task<Product> GetProduct(int id)
    {
        // Connection reused from pool
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        
        return await connection.QueryFirstAsync<Product>(
            "SELECT * FROM Products WHERE Id = @id", 
            new { id });
    }
}
\`\`\`

**6. Query Optimization:**

Optimize queries to reduce database work.

**Example:**
\`\`\`csharp
// Bad - N+1 queries
public async Task<List<Order>> GetOrders(int customerId)
{
    var orders = await _repository.GetOrders(customerId);
    
    foreach (var order in orders)
    {
        // Query for each order
        order.Items = await _repository.GetOrderItems(order.Id);
    }
    
    return orders;
}

// Good - Single query with join
public async Task<List<Order>> GetOrders(int customerId)
{
    var sql = @"
        SELECT o.*, oi.*
        FROM Orders o
        LEFT JOIN OrderItems oi ON o.Id = oi.OrderId
        WHERE o.CustomerId = @customerId";
    
    return await _repository.QueryAsync<Order>(sql, new { customerId });
}

// Use indexes
// CREATE INDEX idx_customer_orders ON Orders(CustomerId);
\`\`\`

**7. Denormalization:**

Store redundant data to avoid joins.

**Example:**
\`\`\`csharp
// Normalized (requires joins)
public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    // Need join to get customer name
}

// Denormalized read model
public class OrderView
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }  // Denormalized
    public string CustomerEmail { get; set; }  // Denormalized
    // No join needed - reduces database load
}

// Update both when customer changes
public async Task UpdateCustomer(Customer customer)
{
    await _repository.UpdateCustomer(customer);
    
    // Update denormalized data
    await _repository.UpdateOrderViews(customer.Id, customer.Name, customer.Email);
}
\`\`\`

**8. Batch Operations:**

Group multiple operations into batches.

**Example:**
\`\`\`csharp
public class BatchRepository
{
    public async Task SaveBatch(List<Product> products)
    {
        // Single database round-trip instead of many
        var sql = @"
            INSERT INTO Products (Id, Name, Price)
            VALUES (@Id, @Name, @Price)";
        
        await _connection.ExecuteAsync(sql, products);
    }
    
    public async Task UpdateBatch(List<Product> products)
    {
        // Batch update
        var sql = @"
            UPDATE Products
            SET Name = @Name, Price = @Price
            WHERE Id = @Id";
        
        await _connection.ExecuteAsync(sql, products);
    }
}
\`\`\`

**9. Event Sourcing:**

Store events instead of current state.

**Example:**
\`\`\`csharp
// Instead of updating state, append events
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        var @event = new OrderCreatedEvent
        {
            OrderId = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            Items = request.Items,
            Timestamp = DateTime.UtcNow
        };
        
        // Append event (write-only, very fast)
        _eventStore.Append(@event);
    }
}

// Rebuild state from events (can be cached)
public class OrderProjection
{
    public Order GetOrder(int orderId)
    {
        // Can cache this projection
        var events = _eventStore.GetEvents(orderId);
        return RebuildFromEvents(events);
    }
}
\`\`\`

**10. CQRS (Command Query Responsibility Segregation):**

Separate read and write models.

**Example:**
\`\`\`csharp
// Write side - optimized for writes
public class OrderCommandService
{
    public async Task CreateOrder(OrderRequest request)
    {
        var order = new Order { /* ... */ };
        await _writeRepository.Save(order);
        
        // Publish event
        await _eventBus.Publish(new OrderCreatedEvent(order));
    }
}

// Read side - optimized for reads (can be cached)
public class OrderQueryService
{
    public async Task<OrderView> GetOrder(int orderId)
    {
        // Read from optimized read model
        return await _readRepository.GetOrderView(orderId);
    }
}

// Update read model asynchronously
public class OrderViewUpdater
{
    public async Task Handle(OrderCreatedEvent @event)
    {
        // Update read model (can be batched)
        var orderView = MapToView(@event);
        await _readRepository.Save(orderView);
    }
}
\`\`\`

**Maintaining Consistency:**

**1. Cache Invalidation:**
- Invalidate cache on updates
- Use version numbers
- Set appropriate TTLs

**2. Eventual Consistency:**
- Accept temporary inconsistencies
- Use sagas for workflows
- Replicate asynchronously

**3. Read-After-Write Consistency:**
- Route reads to master after writes
- Use version numbers
- Wait for replication

**Best Practices:**

1. **Cache Aggressively**: But invalidate on updates
2. **Use Read Replicas**: Distribute read load
3. **Optimize Queries**: Use indexes, avoid N+1
4. **Denormalize Carefully**: Update all copies
5. **Batch Operations**: Reduce round-trips
6. **Connection Pooling**: Reuse connections
7. **Materialized Views**: Pre-compute aggregations
8. **Monitor Consistency**: Track replication lag
9. **Test Scenarios**: Verify consistency under load
10. **Document Trade-offs**: Know what consistency you're sacrificing

**Key Takeaway:** Reduce database load through caching, read replicas, materialized views, and denormalization. Maintain consistency through proper cache invalidation, eventual consistency patterns, and careful design. The key is balancing performance with consistency requirements - use strong consistency where needed, eventual consistency where acceptable.`
  },
  {
    id: 8018,
    category: 'Software Architects',
    question: 'How do you approach hot partition problems?',
    answer: `**One-Sentence Definition:** Solve hot partition problems by redistributing data using better partition keys, adding more partitions, implementing write sharding, using caching for hot partitions, and load balancing requests across partitions to prevent single partitions from becoming bottlenecks.

**The Core Concept:** Think of hot partitions like a popular restaurant table. Everyone wants to sit at the window table (hot partition), creating a bottleneck. The solution is to add more window tables (more partitions), use a reservation system (better partition keys), or redirect people to other good tables (load balancing).

**What is a Hot Partition?**

A hot partition is a partition (shard) that receives significantly more traffic than others, becoming a bottleneck and limiting system performance.

**Example:**
\`\`\`csharp
// Bad partition key - all recent orders go to one partition
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        // Partitioning by date - all today's orders go to one partition!
        var partitionKey = DateTime.UtcNow.Date.ToString("yyyy-MM-dd");
        var order = new Order
        {
            Id = Guid.NewGuid(),
            PartitionKey = partitionKey,  // Hot partition!
            Data = request
        };
        
        await _repository.Save(order);
    }
}
\`\`\`

**Causes of Hot Partitions:**

1. **Poor Partition Key Choice**: All data goes to one partition
2. **Skewed Data Distribution**: Some partitions have more data
3. **Time-Based Partitioning**: Recent data creates hot partitions
4. **Popular Entities**: Frequently accessed items in one partition
5. **Sequential Keys**: Auto-incrementing IDs create hot partitions

**Solutions:**

**1. Better Partition Keys:**

Choose partition keys that distribute data evenly.

**Example:**
\`\`\`csharp
// Bad - Time-based (creates hot partition)
var partitionKey = DateTime.UtcNow.Date.ToString("yyyy-MM-dd");

// Good - Hash of user ID (distributes evenly)
var partitionKey = HashUserId(request.UserId) % numberOfPartitions;

// Good - Composite key
var partitionKey = $"{request.UserId}-{request.CategoryId}";

public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        // Use hash of user ID for even distribution
        var partitionKey = GetPartitionKey(request.UserId);
        
        var order = new Order
        {
            Id = Guid.NewGuid(),
            PartitionKey = partitionKey,
            Data = request
        };
        
        await _repository.Save(order);
    }
    
    private string GetPartitionKey(int userId)
    {
        // Hash user ID and modulo number of partitions
        var hash = userId.GetHashCode();
        var partition = Math.Abs(hash) % _numberOfPartitions;
        return $"partition-{partition}";
    }
}
\`\`\`

**2. Write Sharding:**

Distribute writes across multiple partitions.

**Example:**
\`\`\`csharp
public class ShardedOrderService
{
    private readonly int _numberOfShards = 10;
    
    public async Task CreateOrder(OrderRequest request)
    {
        // Determine shard based on order ID
        var shardId = GetShardId(request.OrderId);
        
        // Write to specific shard
        await _shards[shardId].SaveOrder(request);
    }
    
    private int GetShardId(Guid orderId)
    {
        // Use hash of order ID to determine shard
        var hash = orderId.GetHashCode();
        return Math.Abs(hash) % _numberOfShards;
    }
    
    public async Task<Order> GetOrder(Guid orderId)
    {
        // Determine which shard has the order
        var shardId = GetShardId(orderId);
        
        // Read from specific shard
        return await _shards[shardId].GetOrder(orderId);
    }
}
\`\`\`

**3. Add More Partitions:**

Increase number of partitions to spread load.

**Example:**
\`\`\`csharp
public class PartitionManager
{
    private int _numberOfPartitions = 4;
    
    public async Task AddPartitions(int count)
    {
        // Create new partitions
        for (int i = 0; i < count; i++)
        {
            await _database.CreatePartition($"partition-{_numberOfPartitions + i}");
        }
        
        _numberOfPartitions += count;
        
        // Redistribute data
        await RedistributeData();
    }
    
    private async Task RedistributeData()
    {
        // Move data from hot partitions to new partitions
        var hotPartitions = await IdentifyHotPartitions();
        
        foreach (var partition in hotPartitions)
        {
            var data = await _database.GetDataFromPartition(partition);
            
            // Redistribute to new partitions
            foreach (var item in data)
            {
                var newPartition = GetPartitionKey(item.Id);
                await _database.MoveToPartition(item, newPartition);
            }
        }
    }
}
\`\`\`

**4. Caching Hot Partitions:**

Cache frequently accessed partitions.

**Example:**
\`\`\`csharp
public class CachedPartitionService
{
    public async Task<T> GetFromPartition<T>(string partitionKey, string itemKey)
    {
        // Check cache first
        var cacheKey = $"{partitionKey}:{itemKey}";
        var cached = await _cache.GetAsync<T>(cacheKey);
        if (cached != null)
        {
            return cached;
        }
        
        // Get from partition
        var item = await _partitionStore.Get<T>(partitionKey, itemKey);
        
        // Cache for hot partitions
        if (IsHotPartition(partitionKey))
        {
            await _cache.SetAsync(cacheKey, item, TimeSpan.FromMinutes(10));
        }
        
        return item;
    }
    
    private bool IsHotPartition(string partitionKey)
    {
        // Check if partition is hot based on metrics
        var metrics = _metricsService.GetPartitionMetrics(partitionKey);
        return metrics.RequestRate > _hotPartitionThreshold;
    }
}
\`\`\`

**5. Load Balancing:**

Distribute requests across partitions.

**Example:**
\`\`\`csharp
public class LoadBalancedPartitionService
{
    public async Task<T> GetData<T>(string key)
    {
        // Try multiple partitions (round-robin or random)
        var partitions = GetAvailablePartitions();
        var partition = SelectPartition(partitions, key);
        
        try
        {
            return await _partitionStore.Get<T>(partition, key);
        }
        catch
        {
            // Try next partition if first fails
            var nextPartition = GetNextPartition(partitions, partition);
            return await _partitionStore.Get<T>(nextPartition, key);
        }
    }
    
    private string SelectPartition(List<string> partitions, string key)
    {
        // Consistent hashing for even distribution
        var hash = key.GetHashCode();
        var index = Math.Abs(hash) % partitions.Count;
        return partitions[index];
    }
}
\`\`\`

**6. Composite Partition Keys:**

Use multiple fields for better distribution.

**Example:**
\`\`\`csharp
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        // Composite partition key: UserId + CategoryId
        var partitionKey = $"{request.UserId}-{request.CategoryId}";
        
        var order = new Order
        {
            Id = Guid.NewGuid(),
            PartitionKey = partitionKey,
            Data = request
        };
        
        await _repository.Save(order);
    }
}
\`\`\`

**7. Time-Based Partitioning with Rotation:**

Rotate partitions to prevent hot partitions.

**Example:**
\`\`\`csharp
public class RotatingPartitionService
{
    public string GetPartitionKey(DateTime timestamp)
    {
        // Partition by hour instead of day
        // Creates 24 partitions that rotate
        var hour = timestamp.Hour;
        return $"partition-hour-{hour}";
    }
    
    public async Task ArchiveOldPartitions()
    {
        // Archive partitions older than 7 days
        var cutoff = DateTime.UtcNow.AddDays(-7);
        var oldPartitions = await _database.GetPartitionsOlderThan(cutoff);
        
        foreach (var partition in oldPartitions)
        {
            await _database.ArchivePartition(partition);
        }
    }
}
\`\`\`

**8. Monitoring and Alerting:**

Detect hot partitions early.

**Example:**
\`\`\`csharp
public class PartitionMonitor
{
    public async Task MonitorPartitions()
    {
        var partitions = await _database.GetAllPartitions();
        
        foreach (var partition in partitions)
        {
            var metrics = await _metricsService.GetPartitionMetrics(partition);
            
            // Check for hot partition
            if (metrics.RequestRate > _hotPartitionThreshold)
            {
                _alertService.SendAlert($"Hot partition detected: {partition}");
                
                // Auto-mitigate: Add cache, redistribute load
                await MitigateHotPartition(partition);
            }
        }
    }
    
    private async Task MitigateHotPartition(string partition)
    {
        // Enable aggressive caching
        await _cacheService.EnableCaching(partition);
        
        // Redistribute some load
        await _loadBalancer.RedistributeLoad(partition);
    }
}
\`\`\`

**Best Practices:**

1. **Choose Good Partition Keys**: Distribute data evenly
2. **Monitor Partition Health**: Track request rates per partition
3. **Use Consistent Hashing**: Even distribution
4. **Cache Hot Partitions**: Reduce load on hot partitions
5. **Add Partitions Dynamically**: Scale as needed
6. **Avoid Time-Based Keys**: Unless you rotate them
7. **Use Composite Keys**: Better distribution
8. **Load Balance**: Distribute requests evenly
9. **Alert on Hot Partitions**: Detect early
10. **Test Distribution**: Verify even distribution

**Key Takeaway:** Prevent hot partitions by choosing partition keys that distribute data evenly (hash-based, composite keys), using write sharding, adding more partitions, and caching hot partitions. Monitor partition health and redistribute load when hot partitions are detected. The goal is even distribution of data and requests across all partitions.`
  },
  {
    id: 8019,
    category: 'Software Architects',
    question: 'How do you handle high-volume write workloads?',
    answer: `**One-Sentence Definition:** Handle high-volume write workloads by implementing batching, asynchronous processing, write-behind caching, partitioning, connection pooling, bulk inserts, message queues, and database optimizations to maximize write throughput and minimize latency.

**The Core Concept:** Think of high-volume writes like a busy post office. Instead of processing each letter individually (slow), you batch letters by destination (batching), use multiple counters (partitioning), have people drop letters in boxes (async), and process them in bulk later (write-behind). The goal is to handle maximum volume efficiently.

**Characteristics of High-Volume Write Workloads:**

- Many writes per second (thousands to millions)
- Need to persist data reliably
- Low latency requirements
- High availability needed
- Can tolerate slight delays

**Key Strategies:**

**1. Batching:**

Group multiple writes into batches.

**Example:**
\`\`\`csharp
public class BatchWriter
{
    private readonly List<Order> _batch = new();
    private readonly int _batchSize = 100;
    private readonly Timer _flushTimer;
    
    public void WriteOrder(Order order)
    {
        lock (_batch)
        {
            _batch.Add(order);
            
            // Flush when batch is full
            if (_batch.Count >= _batchSize)
            {
                _ = Task.Run(() => FlushBatch());
            }
        }
    }
    
    private async Task FlushBatch()
    {
        List<Order> batchToFlush;
        
        lock (_batch)
        {
            batchToFlush = new List<Order>(_batch);
            _batch.Clear();
        }
        
        if (batchToFlush.Count > 0)
        {
            // Bulk insert
            await _repository.BulkInsert(batchToFlush);
        }
    }
    
    // Flush periodically
    public void StartPeriodicFlush(TimeSpan interval)
    {
        _flushTimer = new Timer(async _ => await FlushBatch(), 
            null, interval, interval);
    }
}

// Usage
var writer = new BatchWriter();
writer.StartPeriodicFlush(TimeSpan.FromSeconds(5));

// Writes are batched automatically
for (int i = 0; i < 1000; i++)
{
    writer.WriteOrder(new Order { /* ... */ });
}
\`\`\`

**2. Asynchronous Processing:**

Process writes asynchronously without blocking.

**Example:**
\`\`\`csharp
public class AsyncWriteService
{
    private readonly Channel<Order> _writeChannel;
    
    public AsyncWriteService()
    {
        // Create unbounded channel for writes
        _writeChannel = Channel.CreateUnbounded<Order>();
        
        // Start background processor
        _ = Task.Run(ProcessWrites);
    }
    
    public async Task WriteOrder(Order order)
    {
        // Non-blocking write to channel
        await _writeChannel.Writer.WriteAsync(order);
    }
    
    private async Task ProcessWrites()
    {
        await foreach (var order in _writeChannel.Reader.ReadAllAsync())
        {
            // Process write asynchronously
            await _repository.SaveOrder(order);
        }
    }
}
\`\`\`

**3. Write-Behind Caching:**

Cache writes and flush to database asynchronously.

**Example:**
\`\`\`csharp
public class WriteBehindCache
{
    private readonly ConcurrentDictionary<string, object> _writeCache = new();
    private readonly Timer _flushTimer;
    
    public void Write(string key, object value)
    {
        // Write to cache immediately (fast)
        _writeCache[key] = value;
        
        // Flush to database asynchronously
        _ = Task.Run(async () => await FlushToDatabase(key, value));
    }
    
    private async Task FlushToDatabase(string key, object value)
    {
        try
        {
            await _repository.Save(key, value);
            _writeCache.TryRemove(key, out _);
        }
        catch (Exception ex)
        {
            // Retry later or send to dead letter queue
            _logger.LogError(ex, "Failed to flush {Key} to database", key);
        }
    }
    
    public void StartPeriodicFlush(TimeSpan interval)
    {
        _flushTimer = new Timer(async _ => await FlushAll(), 
            null, interval, interval);
    }
    
    private async Task FlushAll()
    {
        var items = _writeCache.ToList();
        foreach (var item in items)
        {
            await FlushToDatabase(item.Key, item.Value);
        }
    }
}
\`\`\`

**4. Partitioning/Sharding:**

Distribute writes across multiple partitions.

**Example:**
\`\`\`csharp
public class ShardedWriteService
{
    private readonly int _numberOfShards = 10;
    private readonly List<IDbConnection> _shards;
    
    public async Task WriteOrder(Order order)
    {
        // Determine shard based on order ID
        var shardId = GetShardId(order.Id);
        
        // Write to specific shard
        await _shards[shardId].ExecuteAsync(
            "INSERT INTO Orders (Id, Data) VALUES (@Id, @Data)",
            order);
    }
    
    private int GetShardId(Guid orderId)
    {
        // Hash order ID to determine shard
        var hash = orderId.GetHashCode();
        return Math.Abs(hash) % _numberOfShards;
    }
}
\`\`\`

**5. Bulk Inserts:**

Use bulk insert operations instead of individual inserts.

**Example:**
\`\`\`csharp
public class BulkInsertService
{
    public async Task BulkInsertOrders(List<Order> orders)
    {
        // Single database round-trip for all orders
        var sql = @"
            INSERT INTO Orders (Id, CustomerId, Amount, OrderDate)
            VALUES (@Id, @CustomerId, @Amount, @OrderDate)";
        
        await _connection.ExecuteAsync(sql, orders);
    }
    
    // Using SqlBulkCopy for even better performance
    public async Task BulkInsertOrdersFast(List<Order> orders)
    {
        using var bulkCopy = new SqlBulkCopy(_connectionString);
        bulkCopy.DestinationTableName = "Orders";
        bulkCopy.BatchSize = 1000;
        
        var dataTable = ConvertToDataTable(orders);
        await bulkCopy.WriteToServerAsync(dataTable);
    }
}
\`\`\`

**6. Message Queues:**

Use message queues for asynchronous writes.

**Example:**
\`\`\`csharp
public class QueuedWriteService
{
    public async Task WriteOrder(Order order)
    {
        // Send to queue (non-blocking)
        await _messageQueue.Send("order-writes", order);
    }
}

// Separate consumer processes writes
public class OrderWriteConsumer
{
    public async Task ProcessMessage(Order order)
    {
        // Batch process multiple orders
        await _batchWriter.AddOrder(order);
    }
    
    public async Task ProcessBatch(List<Order> orders)
    {
        // Bulk insert batch
        await _repository.BulkInsert(orders);
    }
}
\`\`\`

**7. Connection Pooling:**

Reuse database connections efficiently.

**Example:**
\`\`\`csharp
// Connection string with pooling
var connectionString = 
    "Server=localhost;Database=Orders;" +
    "Pooling=true;" +
    "Min Pool Size=20;" +
    "Max Pool Size=200;" +
    "Connection Timeout=30;";

public class OrderRepository
{
    public async Task SaveOrder(Order order)
    {
        // Connection reused from pool
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        
        await connection.ExecuteAsync(
            "INSERT INTO Orders (Id, Data) VALUES (@Id, @Data)",
            order);
    }
}
\`\`\`

**8. Database Optimizations:**

Optimize database for writes.

**Example:**
\`\`\`csharp
// Disable indexes during bulk insert (then rebuild)
public async Task BulkInsertWithOptimization(List<Order> orders)
{
    // Disable indexes
    await _connection.ExecuteAsync("ALTER INDEX ALL ON Orders DISABLE");
    
    try
    {
        // Bulk insert
        await BulkInsertOrders(orders);
    }
    finally
    {
        // Rebuild indexes
        await _connection.ExecuteAsync("ALTER INDEX ALL ON Orders REBUILD");
    }
}

// Use minimal logging for bulk operations
public async Task BulkInsertMinimalLogging(List<Order> orders)
{
    await _connection.ExecuteAsync("ALTER TABLE Orders SET RECOVERY BULK_LOGGED");
    
    try
    {
        await BulkInsertOrders(orders);
    }
    finally
    {
        await _connection.ExecuteAsync("ALTER TABLE Orders SET RECOVERY FULL");
    }
}
\`\`\`

**9. Event Sourcing:**

Append events instead of updating state.

**Example:**
\`\`\`csharp
public class EventSourcedOrderService
{
    public async Task CreateOrder(OrderRequest request)
    {
        var @event = new OrderCreatedEvent
        {
            OrderId = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            Items = request.Items,
            Timestamp = DateTime.UtcNow
        };
        
        // Append event (very fast, append-only)
        await _eventStore.Append(@event);
    }
    
    // Events can be batched
    public async Task AppendBatch(List<IEvent> events)
    {
        // Bulk append events
        await _eventStore.AppendBatch(events);
    }
}
\`\`\`

**10. Write Deduplication:**

Prevent duplicate writes using idempotency.

**Example:**
\`\`\`csharp
public class IdempotentWriteService
{
    public async Task WriteOrder(Order order, string idempotencyKey)
    {
        // Check if already written
        if (await _repository.OrderExists(idempotencyKey))
        {
            return;  // Already written, skip
        }
        
        // Write order
        await _repository.SaveOrder(order);
        
        // Store idempotency key
        await _repository.SaveIdempotencyKey(idempotencyKey, order.Id);
    }
}
\`\`\`

**Best Practices:**

1. **Batch Writes**: Group multiple writes into batches
2. **Use Async Processing**: Don't block on writes
3. **Partition Data**: Distribute writes across shards
4. **Bulk Operations**: Use bulk inserts when possible
5. **Connection Pooling**: Reuse database connections
6. **Message Queues**: Decouple writes from processing
7. **Write-Behind Caching**: Cache writes, flush asynchronously
8. **Optimize Database**: Tune for write performance
9. **Monitor Throughput**: Track write rates and latency
10. **Handle Failures**: Implement retry and dead letter queues

**Key Takeaway:** Handle high-volume writes by batching operations, processing asynchronously, using write-behind caching, partitioning data, and optimizing database operations. The goal is to maximize write throughput while maintaining reliability and acceptable latency.`
  },
  {
    id: 8020,
    category: 'Software Architects',
    question: 'How do you pick between relational vs document database?',
    answer: `**One-Sentence Definition:** Choose relational databases for structured data with relationships, ACID transactions, and complex queries, and document databases for flexible schemas, hierarchical data, horizontal scaling, and when you need to store entire documents together.

**The Core Concept:** Think of databases like filing systems. Relational databases are like a filing cabinet with organized folders and cross-references (tables and relationships). Document databases are like a filing system where each document is self-contained in its own folder (documents with embedded data). Choose based on how your data is structured and how you need to access it.

**Relational Databases (SQL):**

**Characteristics:**
- Structured schema with tables, rows, columns
- Relationships between tables (foreign keys)
- ACID transactions
- SQL for queries
- Normalized data structure

**Example:**
\`\`\`csharp
// Relational database structure
public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public Customer Customer { get; set; }  // Relationship
    public List<OrderItem> Items { get; set; }  // Relationship
}

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

// SQL query with joins
var sql = @"
    SELECT o.*, c.Name, c.Email, oi.*
    FROM Orders o
    INNER JOIN Customers c ON o.CustomerId = c.Id
    INNER JOIN OrderItems oi ON o.Id = oi.OrderId
    WHERE o.Id = @orderId";
\`\`\`

**When to Use Relational:**
- ✅ Structured data with clear relationships
- ✅ Need ACID transactions
- ✅ Complex queries with joins
- ✅ Data integrity is critical
- ✅ Well-defined schema
- ✅ Need referential integrity

**Document Databases (NoSQL):**

**Characteristics:**
- Flexible schema (schemaless)
- Store documents (JSON-like)
- No relationships (embedded data)
- Horizontal scaling
- Eventual consistency

**Example:**
\`\`\`csharp
// Document database structure
public class OrderDocument
{
    public string Id { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    
    // Embedded customer data
    public CustomerInfo Customer { get; set; }
    
    // Embedded items
    public List<OrderItemInfo> Items { get; set; }
}

public class CustomerInfo
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
}

public class OrderItemInfo
{
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

// Document query (no joins needed)
var order = await _documentDb.GetById<OrderDocument>(orderId);
// All data is in one document
\`\`\`

**When to Use Document:**
- ✅ Flexible, changing schema
- ✅ Hierarchical data structures
- ✅ Need horizontal scaling
- ✅ Read entire document at once
- ✅ Denormalized data is acceptable
- ✅ Fast writes

**Decision Matrix:**

**Choose Relational When:**
\`\`\`
✓ Structured data with relationships
✓ Need ACID transactions
✓ Complex queries with joins
✓ Data integrity critical
✓ Well-defined schema
✓ Need referential integrity
✓ Reporting and analytics
\`\`\`

**Choose Document When:**
\`\`\`
✓ Flexible, changing schema
✓ Hierarchical data
✓ Need horizontal scaling
✓ Read entire document together
✓ Denormalized data OK
✓ Fast writes needed
✓ Content management
✓ User profiles
\`\`\`

**Hybrid Approach:**

Many systems use both:

**Example:**
\`\`\`csharp
// Use relational for transactional data
public class OrderService
{
    public async Task CreateOrder(OrderRequest request)
    {
        // Store in relational DB for transactions
        var order = new Order
        {
            CustomerId = request.CustomerId,
            Items = request.Items
        };
        await _relationalDb.Save(order);
        
        // Store in document DB for fast reads
        var orderDoc = new OrderDocument
        {
            Id = order.Id.ToString(),
            Customer = await GetCustomerInfo(request.CustomerId),
            Items = request.Items.Select(i => new OrderItemInfo
            {
                ProductName = await GetProductName(i.ProductId),
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };
        await _documentDb.Save(orderDoc);
    }
    
    public async Task<OrderDocument> GetOrderForDisplay(int orderId)
    {
        // Fast read from document DB (no joins)
        return await _documentDb.GetById<OrderDocument>(orderId.ToString());
    }
}
\`\`\`

**Comparison:**

**Relational Advantages:**
- ACID transactions
- Data integrity
- Complex queries
- Mature ecosystem
- Strong consistency

**Relational Disadvantages:**
- Fixed schema
- Hard to scale horizontally
- Joins can be slow
- Schema changes are difficult

**Document Advantages:**
- Flexible schema
- Easy horizontal scaling
- Fast reads (no joins)
- Good for hierarchical data
- Easy to evolve

**Document Disadvantages:**
- No ACID transactions
- Data duplication
- Limited query capabilities
- Eventual consistency
- No relationships

**Real-World Examples:**

**Relational Database Use Cases:**
- E-commerce (orders, customers, products)
- Banking (transactions, accounts)
- ERP systems
- Financial reporting
- Inventory management

**Document Database Use Cases:**
- Content management
- User profiles
- Product catalogs
- Logging and events
- Social media feeds
- IoT data

**Best Practices:**

1. **Start with Relational**: If unsure, start with relational
2. **Use Document for Specific Needs**: When you need flexibility or scale
3. **Consider Hybrid**: Use both for different purposes
4. **Evaluate Query Patterns**: How will you access data?
5. **Consider Team Skills**: What does your team know?
6. **Plan for Scale**: Will you need horizontal scaling?
7. **Test Performance**: Benchmark both options
8. **Consider Costs**: Licensing, hosting, maintenance

**Key Takeaway:** Choose relational databases for structured data with relationships and ACID requirements. Choose document databases for flexible schemas, hierarchical data, and horizontal scaling needs. Many production systems use both - relational for transactional data, document for content and fast reads. The key is matching the database to your data structure and access patterns.`
  },
  {
    id: 8021,
    category: 'Software Architects',
    question: 'When would you use distributed transactions vs eventual consistency?',
    answer: `**One-Sentence Definition:** Use distributed transactions (two-phase commit) for operations requiring strong consistency across services, and eventual consistency for operations that can tolerate temporary inconsistencies in exchange for better availability, performance, and scalability.

**The Core Concept:** Think of consistency like synchronizing watches. Distributed transactions are like everyone setting their watch at exactly the same time (strong consistency, but complex). Eventual consistency is like everyone's watch will be correct eventually, but not necessarily at the same moment (simpler, but temporary differences).

**What are Distributed Transactions?**

Transactions that span multiple services/databases, ensuring all operations succeed or all fail together (ACID across services).

**Example:**
\`\`\`csharp
// Two-phase commit pattern
public class DistributedTransactionCoordinator
{
    public async Task<bool> ExecuteTransaction(List<ITransactionParticipant> participants)
    {
        // Phase 1: Prepare
        var prepared = new List<ITransactionParticipant>();
        
        foreach (var participant in participants)
        {
            try
            {
                if (await participant.Prepare())
                {
                    prepared.Add(participant);
                }
                else
                {
                    // Abort all
                    await AbortAll(prepared);
                    return false;
                }
            }
            catch
            {
                await AbortAll(prepared);
                return false;
            }
        }
        
        // Phase 2: Commit (all prepared successfully)
        foreach (var participant in prepared)
        {
            await participant.Commit();
        }
        
        return true;
    }
    
    private async Task AbortAll(List<ITransactionParticipant> participants)
    {
        foreach (var participant in participants)
        {
            await participant.Abort();
        }
    }
}

// Usage
var coordinator = new DistributedTransactionCoordinator();
var participants = new List<ITransactionParticipant>
{
    new PaymentService(),
    new InventoryService(),
    new ShippingService()
};

var success = await coordinator.ExecuteTransaction(participants);
\`\`\`

**What is Eventual Consistency?**

System will eventually become consistent, but temporary inconsistencies are acceptable.

**Example:**
\`\`\`csharp
// Eventual consistency with events
public class OrderService
{
    public async Task CreateOrder(OrderRequest request)
    {
        // Create order (local transaction)
        var order = await _orderRepository.CreateOrder(request);
        
        // Publish events (asynchronous)
        await _eventBus.Publish(new OrderCreatedEvent(order));
        await _eventBus.Publish(new PaymentRequestedEvent(order));
        await _eventBus.Publish(new InventoryReservationRequestedEvent(order));
        
        // Order is created, but payment and inventory will be processed eventually
        return order;
    }
}

// Separate services process events eventually
public class PaymentService
{
    public async Task Handle(OrderCreatedEvent @event)
    {
        // Process payment (eventually)
        await ProcessPayment(@event.OrderId);
    }
}

public class InventoryService
{
    public async Task Handle(OrderCreatedEvent @event)
    {
        // Reserve inventory (eventually)
        await ReserveItems(@event.OrderId);
    }
}
\`\`\`

**When to Use Distributed Transactions:**

**1. Financial Operations:**
- Money transfers
- Payment processing
- Account balances
- Critical financial data

**Example:**
\`\`\`csharp
// Money transfer requires strong consistency
public class MoneyTransferService
{
    public async Task TransferMoney(int fromAccount, int toAccount, decimal amount)
    {
        // Must be atomic - both succeed or both fail
        using var transaction = BeginDistributedTransaction();
        try
        {
            await _accountService.Debit(fromAccount, amount);
            await _accountService.Credit(toAccount, amount);
            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
}
\`\`\`

**2. Critical Data Integrity:**
- Medical records
- Legal documents
- Regulatory compliance
- Audit requirements

**3. Small Scale:**
- Few services involved
- Low latency acceptable
- Can tolerate locks

**When to Use Eventual Consistency:**

**1. High Availability Needed:**
- Can't afford downtime
- Need to handle network partitions
- Services should work independently

**Example:**
\`\`\`csharp
// Order creation - eventual consistency OK
public class OrderService
{
    public async Task CreateOrder(OrderRequest request)
    {
        // Create order immediately
        var order = await _orderRepository.CreateOrder(request);
        
        // Send events (will be processed eventually)
        await _eventBus.Publish(new OrderCreatedEvent(order));
        
        // Return immediately - order will be fully processed eventually
        return order;
    }
}
\`\`\`

**2. Performance Critical:**
- Need low latency
- High throughput required
- Can't wait for all services

**3. Large Scale:**
- Many services involved
- Geographic distribution
- High volume

**4. Can Tolerate Temporary Inconsistencies:**
- User profiles
- Product catalogs
- Social media feeds
- Analytics data

**Comparison:**

**Distributed Transactions:**
- ✅ Strong consistency
- ✅ ACID guarantees
- ✅ Data integrity
- ❌ Poor performance
- ❌ Complex to implement
- ❌ Doesn't scale well
- ❌ Single point of failure
- ❌ Locks resources

**Eventual Consistency:**
- ✅ High availability
- ✅ Better performance
- ✅ Scales well
- ✅ Simpler to implement
- ✅ Resilient to failures
- ❌ Temporary inconsistencies
- ❌ No ACID guarantees
- ❌ Need to handle conflicts

**Saga Pattern (Alternative to Distributed Transactions):**

Use sagas for eventual consistency with compensation.

**Example:**
\`\`\`csharp
public class OrderSaga
{
    public async Task ProcessOrder(OrderRequest request)
    {
        var steps = new List<SagaStep>();
        
        try
        {
            // Step 1: Create order
            var order = await _orderService.CreateOrder(request);
            steps.Add(new SagaStep { Service = "Order", Action = "Create" });
            
            // Step 2: Process payment
            await _paymentService.ProcessPayment(order.Id, request.Payment);
            steps.Add(new SagaStep { Service = "Payment", Action = "Process" });
            
            // Step 3: Reserve inventory
            await _inventoryService.ReserveItems(order.Id, request.Items);
            steps.Add(new SagaStep { Service = "Inventory", Action = "Reserve" });
        }
        catch
        {
            // Compensate in reverse order
            await Compensate(steps);
        }
    }
    
    private async Task Compensate(List<SagaStep> steps)
    {
        for (int i = steps.Count - 1; i >= 0; i--)
        {
            switch (steps[i].Service)
            {
                case "Inventory":
                    await _inventoryService.ReleaseItems(steps[i].OrderId);
                    break;
                case "Payment":
                    await _paymentService.RefundPayment(steps[i].OrderId);
                    break;
                case "Order":
                    await _orderService.CancelOrder(steps[i].OrderId);
                    break;
            }
        }
    }
}
\`\`\`

**Decision Framework:**

**Use Distributed Transactions When:**
\`\`\`
✓ Financial operations
✓ Critical data integrity
✓ Small number of services
✓ Can tolerate performance impact
✓ Strong consistency required
✓ Can't accept inconsistencies
\`\`\`

**Use Eventual Consistency When:**
\`\`\`
✓ High availability needed
✓ Performance critical
✓ Large scale
✓ Can tolerate temporary inconsistencies
✓ Many services involved
✓ Geographic distribution
✓ Need to scale
\`\`\`

**Best Practices:**

1. **Default to Eventual Consistency**: Use it unless you have strong reasons not to
2. **Use Distributed Transactions Sparingly**: Only for critical operations
3. **Implement Sagas**: For eventual consistency with compensation
4. **Handle Conflicts**: Design for conflict resolution
5. **Monitor Consistency**: Track replication lag
6. **Document Trade-offs**: Know what consistency you're accepting
7. **Test Scenarios**: Test under failure conditions
8. **Provide User Feedback**: Show "processing" states

**Key Takeaway:** Use distributed transactions only when strong consistency is absolutely required (financial operations, critical data). For most cases, use eventual consistency for better availability, performance, and scalability. Implement sagas for eventual consistency with compensation when you need to handle failures gracefully. The key is matching consistency requirements to business needs.`
  },
  {
    id: 8022,
    category: 'Software Architects',
    question: 'How do you design an audit-friendly system without killing performance?',
    answer: `**One-Sentence Definition:** Design audit-friendly systems by using event sourcing, append-only logs, asynchronous audit writes, separate audit tables, change data capture, and audit-specific databases to track changes without impacting main system performance.

**The Core Concept:** Think of auditing like security cameras. You don't want cameras slowing down normal operations, so you record everything in the background (async), store recordings separately (audit database), and only review when needed. The goal is complete audit trail without impacting performance.

**Why Audit-Friendly Design Matters:**

- Regulatory compliance (SOX, HIPAA, GDPR)
- Security and fraud detection
- Debugging and troubleshooting
- Business intelligence
- Legal requirements

**Key Strategies:**

**1. Event Sourcing:**

Store events instead of current state.

**Example:**
\`\`\`csharp
// Event sourcing - natural audit trail
public class OrderService
{
    public void CreateOrder(OrderRequest request)
    {
        var @event = new OrderCreatedEvent
        {
            OrderId = Guid.NewGuid(),
            CustomerId = request.CustomerId,
            Items = request.Items,
            CreatedBy = GetCurrentUser(),
            Timestamp = DateTime.UtcNow
        };
        
        // Append event (append-only, very fast)
        _eventStore.Append(@event);
    }
    
    public void UpdateOrderStatus(int orderId, string newStatus, string reason)
    {
        var @event = new OrderStatusChangedEvent
        {
            OrderId = orderId,
            OldStatus = GetCurrentStatus(orderId),
            NewStatus = newStatus,
            ChangedBy = GetCurrentUser(),
            Reason = reason,
            Timestamp = DateTime.UtcNow
        };
        
        _eventStore.Append(@event);
    }
}

// Complete audit trail from events
public class AuditService
{
    public List<AuditEntry> GetAuditTrail(int orderId)
    {
        var events = _eventStore.GetEvents(orderId);
        
        return events.Select(e => new AuditEntry
        {
            EventType = e.GetType().Name,
            User = e.CreatedBy,
            Timestamp = e.Timestamp,
            Changes = e.GetChanges()
        }).ToList();
    }
}
\`\`\`

**2. Append-Only Audit Log:**

Write audit records asynchronously.

**Example:**
\`\`\`csharp
public class AuditService
{
    private readonly Channel<AuditEntry> _auditChannel;
    
    public AuditService()
    {
        _auditChannel = Channel.CreateUnbounded<AuditEntry>();
        _ = Task.Run(ProcessAuditEntries);
    }
    
    public void LogAudit(string entityType, int entityId, string action, object changes)
    {
        var entry = new AuditEntry
        {
            EntityType = entityType,
            EntityId = entityId,
            Action = action,
            Changes = JsonSerializer.Serialize(changes),
            User = GetCurrentUser(),
            Timestamp = DateTime.UtcNow,
            IpAddress = GetClientIp()
        };
        
        // Non-blocking write to channel
        _auditChannel.Writer.TryWrite(entry);
    }
    
    private async Task ProcessAuditEntries()
    {
        var batch = new List<AuditEntry>();
        
        await foreach (var entry in _auditChannel.Reader.ReadAllAsync())
        {
            batch.Add(entry);
            
            // Batch write every 100 entries or 5 seconds
            if (batch.Count >= 100)
            {
                await FlushBatch(batch);
                batch.Clear();
            }
        }
    }
    
    private async Task FlushBatch(List<AuditEntry> batch)
    {
        // Bulk insert to audit database
        await _auditRepository.BulkInsert(batch);
    }
}

// Usage - non-blocking
public class OrderService
{
    public async Task UpdateOrder(Order order)
    {
        var oldOrder = await _repository.GetOrder(order.Id);
        
        // Update order (main operation)
        await _repository.UpdateOrder(order);
        
        // Log audit (async, non-blocking)
        _auditService.LogAudit("Order", order.Id, "Update", new
        {
            Old = oldOrder,
            New = order
        });
    }
}
\`\`\`

**3. Separate Audit Database:**

Store audit data in separate database.

**Example:**
\`\`\`csharp
public class AuditRepository
{
    private readonly IDbConnection _auditDb;  // Separate database
    
    public async Task LogAudit(AuditEntry entry)
    {
        // Write to audit database (doesn't affect main DB)
        await _auditDb.ExecuteAsync(@"
            INSERT INTO AuditLog (EntityType, EntityId, Action, Changes, User, Timestamp, IpAddress)
            VALUES (@EntityType, @EntityId, @Action, @Changes, @User, @Timestamp, @IpAddress)",
            entry);
    }
    
    public async Task<List<AuditEntry>> GetAuditTrail(string entityType, int entityId)
    {
        return await _auditDb.QueryAsync<AuditEntry>(@"
            SELECT * FROM AuditLog
            WHERE EntityType = @entityType AND EntityId = @entityId
            ORDER BY Timestamp DESC",
            new { entityType, entityId });
    }
}
\`\`\`

**4. Change Data Capture (CDC):**

Capture database changes automatically.

**Example:**
\`\`\`csharp
// Database triggers capture changes
// CREATE TRIGGER OrderAuditTrigger
// AFTER INSERT, UPDATE, DELETE ON Orders
// FOR EACH ROW
// BEGIN
//     INSERT INTO AuditLog (TableName, Action, OldData, NewData, User, Timestamp)
//     VALUES ('Orders', @action, @old, @new, USER(), NOW());
// END;

public class ChangeCaptureService
{
    public async Task ProcessChanges()
    {
        // Read from database transaction log
        var changes = await _database.GetTransactionLogChanges();
        
        foreach (var change in changes)
        {
            // Write to audit database asynchronously
            await _auditRepository.LogChange(change);
        }
    }
}
\`\`\`

**5. Audit Tables with Indexes:**

Optimize audit tables for queries.

**Example:**
\`\`\`csharp
// Optimized audit table
// CREATE TABLE AuditLog (
//     Id BIGINT IDENTITY(1,1) PRIMARY KEY,
//     EntityType NVARCHAR(50) NOT NULL,
//     EntityId INT NOT NULL,
//     Action NVARCHAR(50) NOT NULL,
//     Changes NVARCHAR(MAX),
//     User NVARCHAR(100),
//     Timestamp DATETIME2 NOT NULL,
//     IpAddress NVARCHAR(50)
// );

// Indexes for common queries
// CREATE INDEX idx_audit_entity ON AuditLog(EntityType, EntityId, Timestamp);
// CREATE INDEX idx_audit_user ON AuditLog(User, Timestamp);
// CREATE INDEX idx_audit_timestamp ON AuditLog(Timestamp);

public class OptimizedAuditRepository
{
    public async Task<List<AuditEntry>> GetAuditTrail(string entityType, int entityId)
    {
        // Fast query using indexes
        return await _auditDb.QueryAsync<AuditEntry>(@"
            SELECT * FROM AuditLog
            WHERE EntityType = @entityType AND EntityId = @entityId
            ORDER BY Timestamp DESC",
            new { entityType, entityId });
    }
}
\`\`\`

**6. Snapshot + Changes:**

Store snapshots periodically, log changes.

**Example:**
\`\`\`csharp
public class SnapshotAuditService
{
    public async Task SaveSnapshot(string entityType, int entityId, object entity)
    {
        // Save snapshot periodically (e.g., daily)
        var snapshot = new Snapshot
        {
            EntityType = entityType,
            EntityId = entityId,
            Data = JsonSerializer.Serialize(entity),
            Timestamp = DateTime.UtcNow
        };
        
        await _auditRepository.SaveSnapshot(snapshot);
    }
    
    public async Task<AuditTrail> GetAuditTrail(string entityType, int entityId)
    {
        // Get latest snapshot
        var snapshot = await _auditRepository.GetLatestSnapshot(entityType, entityId);
        
        // Get changes since snapshot
        var changes = await _auditRepository.GetChangesSince(
            entityType, entityId, snapshot.Timestamp);
        
        return new AuditTrail
        {
            Snapshot = snapshot,
            Changes = changes
        };
    }
}
\`\`\`

**7. Immutable Audit Records:**

Never update or delete audit records.

**Example:**
\`\`\`csharp
// Audit table - append only, never update/delete
public class ImmutableAuditRepository
{
    public async Task LogAudit(AuditEntry entry)
    {
        // Always insert, never update
        await _auditDb.ExecuteAsync(@"
            INSERT INTO AuditLog (EntityType, EntityId, Action, Changes, User, Timestamp)
            VALUES (@EntityType, @EntityId, @Action, @Changes, @User, @Timestamp)",
            entry);
    }
    
    // No Update or Delete methods - audit is immutable
}
\`\`\`

**Performance Optimizations:**

**1. Asynchronous Writes:**
- Don't block main operations
- Use message queues or channels
- Batch writes

**2. Separate Database:**
- Don't impact main database
- Can scale independently
- Different optimization strategies

**3. Indexes:**
- Index audit tables properly
- Support common query patterns
- Balance write vs read performance

**4. Archiving:**
- Archive old audit data
- Keep hot data accessible
- Move cold data to cheaper storage

**Example:**
\`\`\`csharp
public class AuditArchiver
{
    public async Task ArchiveOldAuditData()
    {
        var cutoffDate = DateTime.UtcNow.AddYears(-2);
        
        // Move old data to archive
        var oldEntries = await _auditRepository.GetEntriesOlderThan(cutoffDate);
        await _archiveRepository.BulkInsert(oldEntries);
        await _auditRepository.DeleteEntriesOlderThan(cutoffDate);
    }
}
\`\`\`

**Best Practices:**

1. **Async Audit Logging**: Never block main operations
2. **Separate Database**: Isolate audit from main system
3. **Append-Only**: Never update or delete audit records
4. **Index Properly**: Support common query patterns
5. **Batch Writes**: Group audit entries for efficiency
6. **Archive Old Data**: Keep hot data accessible
7. **Immutable Records**: Audit should be tamper-proof
8. **Complete Context**: Log who, what, when, why
9. **Performance Monitoring**: Track audit impact
10. **Compliance**: Meet regulatory requirements

**Key Takeaway:** Design audit-friendly systems by logging asynchronously, using separate databases, implementing event sourcing or append-only logs, and optimizing for both writes and reads. The goal is complete audit trail without impacting main system performance. Use async writes, batching, and separate infrastructure to ensure auditing doesn't slow down operations.`
  },
  {
    id: 8023,
    category: 'Software Architects',
    question: 'What\'s your strategy for schema evolution without downtime?',
    answer: `**One-Sentence Definition:** Evolve database schemas without downtime by using backward-compatible changes, feature flags, dual-write patterns, gradual migrations, versioned schemas, and blue-green deployments to ensure zero-downtime updates.

**The Core Concept:** Think of schema evolution like renovating a building while people are still using it. You can't shut everything down, so you work in phases: add new rooms (new columns), keep old rooms working (backward compatibility), move people gradually (data migration), and only remove old rooms (drop columns) when everyone has moved out.

**Why Schema Evolution is Challenging:**

- Applications depend on schema structure
- Data migration can take time
- Multiple services might use same database
- Need to maintain availability
- Rollback must be possible

**Key Strategies:**

**1. Backward-Compatible Changes:**

Add new columns without breaking existing code.

**Example:**
\`\`\`csharp
// Step 1: Add new column as nullable
// ALTER TABLE Orders ADD COLUMN NewField NVARCHAR(100) NULL;

public class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public string NewField { get; set; }  // New, nullable
}

// Step 2: Deploy application that can handle both old and new
public class OrderService
{
    public async Task<Order> GetOrder(int id)
    {
        var order = await _repository.GetOrder(id);
        
        // Handle missing new field gracefully
        if (string.IsNullOrEmpty(order.NewField))
        {
            order.NewField = GetDefaultValue();  // Provide default
        }
        
        return order;
    }
}

// Step 3: Populate new field gradually
public async Task MigrateData()
{
    var orders = await _repository.GetOrdersWithoutNewField();
    foreach (var order in orders)
    {
        order.NewField = CalculateNewField(order);
        await _repository.UpdateOrder(order);
    }
}

// Step 4: Make field NOT NULL (after all data migrated)
// ALTER TABLE Orders ALTER COLUMN NewField NVARCHAR(100) NOT NULL;
\`\`\`

**2. Feature Flags:**

Control new schema usage with feature flags.

**Example:**
\`\`\`csharp
public class OrderService
{
    public async Task<Order> GetOrder(int id)
    {
        var order = await _repository.GetOrder(id);
        
        // Use feature flag to control new schema usage
        if (_featureFlags.IsEnabled("NewOrderSchema"))
        {
            // Use new schema
            return await GetOrderWithNewSchema(id);
        }
        else
        {
            // Use old schema
            return await GetOrderWithOldSchema(id);
        }
    }
    
    public async Task CreateOrder(OrderRequest request)
    {
        if (_featureFlags.IsEnabled("NewOrderSchema"))
        {
            // Write to new schema
            await CreateOrderWithNewSchema(request);
        }
        else
        {
            // Write to old schema
            await CreateOrderWithOldSchema(request);
        }
    }
}
\`\`\`

**3. Dual-Write Pattern:**

Write to both old and new schemas during migration.

**Example:**
\`\`\`csharp
public class DualWriteService
{
    public async Task CreateOrder(OrderRequest request)
    {
        // Write to old schema
        var oldOrder = MapToOldSchema(request);
        await _oldRepository.Save(oldOrder);
        
        // Also write to new schema
        var newOrder = MapToNewSchema(request);
        await _newRepository.Save(newOrder);
    }
    
    public async Task<Order> GetOrder(int id)
    {
        // Read from new schema (preferred)
        try
        {
            return await _newRepository.GetOrder(id);
        }
        catch
        {
            // Fallback to old schema
            return await _oldRepository.GetOrder(id);
        }
    }
    
    // Gradually migrate data
    public async Task MigrateOrders()
    {
        var oldOrders = await _oldRepository.GetUnmigratedOrders();
        
        foreach (var oldOrder in oldOrders)
        {
            var newOrder = MapToNewSchema(oldOrder);
            await _newRepository.Save(newOrder);
            await _oldRepository.MarkAsMigrated(oldOrder.Id);
        }
    }
}
\`\`\`

**4. Versioned Schemas:**

Support multiple schema versions simultaneously.

**Example:**
\`\`\`csharp
// Schema versioning
public class OrderV1
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public decimal Amount { get; set; }
}

public class OrderV2
{
    public int Id { get; set; }
    public int CustomerId { get; set; }  // Changed from CustomerName
    public decimal Amount { get; set; }
    public string Currency { get; set; }  // New field
}

public class VersionedOrderService
{
    public async Task<Order> GetOrder(int id)
    {
        // Check schema version
        var version = await _schemaVersionService.GetVersion(id);
        
        if (version == 2)
        {
            return await _repositoryV2.GetOrder(id);
        }
        else
        {
            var orderV1 = await _repositoryV1.GetOrder(id);
            return MapToCurrentSchema(orderV1);
        }
    }
    
    public async Task CreateOrder(OrderRequest request)
    {
        // Always create with latest version
        var order = MapToV2(request);
        await _repositoryV2.Save(order);
    }
}
\`\`\`

**5. Gradual Migration:**

Migrate data in small batches.

**Example:**
\`\`\`csharp
public class GradualMigrationService
{
    public async Task MigrateOrders()
    {
        // Migrate in small batches
        const int batchSize = 100;
        
        while (true)
        {
            var orders = await _oldRepository.GetUnmigratedOrders(batchSize);
            
            if (orders.Count == 0)
            {
                break;  // Migration complete
            }
            
            foreach (var order in orders)
            {
                try
                {
                    // Migrate to new schema
                    var newOrder = MapToNewSchema(order);
                    await _newRepository.Save(newOrder);
                    await _oldRepository.MarkAsMigrated(order.Id);
                }
                catch (Exception ex)
                {
                    // Log error, continue with next
                    _logger.LogError(ex, "Failed to migrate order {OrderId}", order.Id);
                }
            }
            
            // Small delay to avoid overwhelming system
            await Task.Delay(TimeSpan.FromSeconds(1));
        }
    }
}
\`\`\`

**6. Blue-Green Deployment:**

Deploy new version alongside old, switch when ready.

**Example:**
\`\`\`csharp
// Blue environment (current)
// Green environment (new)

public class BlueGreenDeployment
{
    public async Task DeployNewVersion()
    {
        // Step 1: Deploy new application to green environment
        await _deploymentService.DeployToGreen();
        
        // Step 2: Run database migrations on green database
        await _migrationService.RunMigrations("green");
        
        // Step 3: Test green environment
        await _testService.ValidateGreen();
        
        // Step 4: Switch traffic to green
        await _loadBalancer.SwitchToGreen();
        
        // Step 5: Monitor green environment
        await _monitoringService.MonitorGreen();
        
        // Step 6: If issues, switch back to blue
        if (await _monitoringService.HasIssues())
        {
            await _loadBalancer.SwitchToBlue();
        }
    }
}
\`\`\`

**7. Expand-Contract Pattern:**

Expand schema, migrate, then contract.

**Example:**
\`\`\`csharp
// Step 1: Expand - Add new columns
// ALTER TABLE Orders ADD COLUMN NewCustomerId INT NULL;
// ALTER TABLE Orders ADD COLUMN OldCustomerName NVARCHAR(100) NULL;  // Keep old

// Step 2: Migrate data
public async Task MigrateCustomerData()
{
    var orders = await _repository.GetOrders();
    foreach (var order in orders)
    {
        order.NewCustomerId = await GetCustomerId(order.OldCustomerName);
        await _repository.UpdateOrder(order);
    }
}

// Step 3: Contract - Remove old columns (after all apps updated)
// ALTER TABLE Orders DROP COLUMN OldCustomerName;
\`\`\`

**Migration Checklist:**

**Before Migration:**
1. Backup database
2. Test migration on staging
3. Plan rollback strategy
4. Notify team
5. Schedule during low traffic

**During Migration:**
1. Monitor performance
2. Watch for errors
3. Have rollback plan ready
4. Migrate in batches
5. Verify data integrity

**After Migration:**
1. Verify all data migrated
2. Test application functionality
3. Monitor for issues
4. Remove old schema (if applicable)
5. Update documentation

**Best Practices:**

1. **Always Backward Compatible**: Add, don't change
2. **Use Feature Flags**: Control rollout
3. **Dual Write**: Write to both during migration
4. **Gradual Migration**: Small batches
5. **Version Schemas**: Support multiple versions
6. **Test Thoroughly**: Test on staging first
7. **Monitor Closely**: Watch for issues
8. **Plan Rollback**: Always have escape plan
9. **Document Changes**: Keep migration log
10. **Zero-Downtime**: Never require downtime

**Key Takeaway:** Evolve schemas without downtime by making backward-compatible changes, using feature flags, implementing dual-write patterns, migrating data gradually, and supporting multiple schema versions. The key is to add new structures while keeping old ones working, migrate data in small batches, and only remove old structures when everything has moved. Always have a rollback plan and test thoroughly before production.`
  }
];

