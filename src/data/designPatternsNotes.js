// Design Patterns Category Notes - Comprehensive with Deep Explanations
export const designPatternsNotes = [
  {
    id: 5000,
    category: 'Design Patterns',
    question: 'What are SOLID Principles?',
    answer: `**One-Sentence Definition:** SOLID is a set of five object-oriented design principles that make software more maintainable, flexible, and understandable.

**The Core Concept:** Think of SOLID as building rules for a house. Each principle ensures your code structure is solid and won't collapse when you need to make changes. They're like architectural guidelines that prevent code rot.

**Key Points to Remember:**

**S - Single Responsibility Principle:**
- A class should have only one reason to change
- Each class should do one thing well
- Example: User class handles user data, not email sending

**O - Open/Closed Principle:**
- Open for extension, closed for modification
- Add new features by extending, not modifying existing code
- Example: Use interfaces/abstract classes for extensibility

**L - Liskov Substitution Principle:**
- Derived classes must be substitutable for their base classes
- Child classes shouldn't break parent class behavior
- Example: Square shouldn't inherit from Rectangle if it breaks behavior

**I - Interface Segregation Principle:**
- Clients shouldn't depend on interfaces they don't use
- Create specific interfaces instead of one large interface
- Example: IReadable and IWritable instead of one IFileOperations

**D - Dependency Inversion Principle:**
- Depend on abstractions, not concretions
- High-level modules shouldn't depend on low-level modules
- Example: Depend on IRepository, not SqlRepository

**Deep Example:**
\`\`\`csharp
// Violates SRP - does too much
class User {
    public void Save() { }
    public void SendEmail() { } // Wrong responsibility
    public void GenerateReport() { } // Wrong responsibility
}

// Follows SRP
class User {
    public void Save() { }
}
class EmailService {
    public void SendEmail() { }
}
class ReportGenerator {
    public void GenerateReport() { }
}

// Dependency Inversion
// Bad: Depends on concrete class
class UserService {
    private SqlRepository _repo = new SqlRepository();
}

// Good: Depends on abstraction
class UserService {
    private IRepository _repo;
    public UserService(IRepository repo) {
        _repo = repo;
    }
}

// Interface Segregation
// Bad: Large interface
interface IWorker {
    void Work();
    void Eat();
    void Sleep();
}

// Good: Segregated interfaces
interface IWorkable {
    void Work();
}
interface IEatable {
    void Eat();
}
interface ISleepable {
    void Sleep();
}
\`\`\``
  },
  {
    id: 5001,
    category: 'Design Patterns',
    question: 'What is the Factory Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Factory Pattern creates objects without specifying the exact class, delegating object creation to a factory method.

**The Core Concept:** Think of a car factory. You don't build cars yourself - you tell the factory "I want a sedan" and it gives you the right car. The factory knows how to create different types. Similarly, Factory Pattern hides object creation complexity.

**When to Use:**
- When object creation logic is complex
- When you want to decouple object creation from usage
- When you need to create objects based on conditions
- When you want to centralize object creation logic
- When you need to support multiple product types

**Types of Factory Patterns:**

1. **Simple Factory:** Static method that creates objects based on parameters
2. **Factory Method:** Subclasses decide which class to instantiate
3. **Abstract Factory:** Creates families of related objects

**Deep Example - Factory Method Pattern:**
\`\`\`csharp
// Product Interface
public interface IPayment {
    void ProcessPayment(decimal amount);
    bool ValidatePayment();
}

// Concrete Products
public class CreditCardPayment : IPayment {
    public void ProcessPayment(decimal amount) {
        Console.WriteLine($"Processing credit card payment: {amount}");
    }
    public bool ValidatePayment() {
        return true;
    }
}

public class PayPalPayment : IPayment {
    public void ProcessPayment(decimal amount) {
        Console.WriteLine($"Processing PayPal payment: {amount}");
    }
    public bool ValidatePayment() {
        return true;
    }
}

// Creator Abstract Class
public abstract class PaymentFactory {
    // Factory Method - subclasses implement this
    public abstract IPayment CreatePayment();
    
    // Template method using factory method
    public void ProcessOrder(decimal amount) {
        var payment = CreatePayment();
        if (payment.ValidatePayment()) {
            payment.ProcessPayment(amount);
        }
    }
}

// Concrete Creators
public class CreditCardFactory : PaymentFactory {
    public override IPayment CreatePayment() {
        return new CreditCardPayment();
    }
}

public class PayPalFactory : PaymentFactory {
    public override IPayment CreatePayment() {
        return new PayPalPayment();
    }
}

// Usage
PaymentFactory factory = new CreditCardFactory();
factory.ProcessOrder(100.00m); // Uses CreditCardPayment

factory = new PayPalFactory();
factory.ProcessOrder(50.00m); // Uses PayPalPayment
\`\`\`

**Benefits:**
- Loose coupling between creator and products
- Single Responsibility Principle (creation logic separated)
- Open/Closed Principle (add new products without modifying existing code)
- Centralized object creation logic`
  },
  {
    id: 5002,
    category: 'Design Patterns',
    question: 'What is the Repository Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Repository Pattern abstracts data access logic, providing a collection-like interface for accessing domain objects.

**The Core Concept:** Think of a library. You don't go directly to shelves. You ask the librarian (repository) who knows where everything is. If the library reorganizes (changes database), you still ask the librarian the same way. Repository hides data access complexity.

**When to Use:**
- When you want to separate business logic from data access
- When you need to make code testable (mock repositories)
- When you might change data sources (SQL to NoSQL)
- When you want to centralize data access logic
- When working with Domain-Driven Design (DDD)

**Deep Example with Unit of Work:**
\`\`\`csharp
// Generic Repository Interface
public interface IRepository<T> where T : class {
    T GetById(int id);
    IEnumerable<T> GetAll();
    IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    void Delete(int id);
}

// Generic Repository Implementation
public class Repository<T> : IRepository<T> where T : class {
    protected readonly DbContext _context;
    protected readonly DbSet<T> _dbSet;
    
    public Repository(DbContext context) {
        _context = context;
        _dbSet = context.Set<T>();
    }
    
    public T GetById(int id) {
        return _dbSet.Find(id);
    }
    
    public IEnumerable<T> GetAll() {
        return _dbSet.ToList();
    }
    
    public IEnumerable<T> Find(Expression<Func<T, bool>> predicate) {
        return _dbSet.Where(predicate).ToList();
    }
    
    public void Add(T entity) {
        _dbSet.Add(entity);
    }
    
    public void Update(T entity) {
        _dbSet.Update(entity);
    }
    
    public void Delete(T entity) {
        _dbSet.Remove(entity);
    }
    
    public void Delete(int id) {
        var entity = GetById(id);
        if (entity != null) {
            Delete(entity);
        }
    }
}

// Unit of Work Pattern
public interface IUnitOfWork : IDisposable {
    IRepository<User> Users { get; }
    IRepository<Order> Orders { get; }
    int SaveChanges();
}

public class UnitOfWork : IUnitOfWork {
    private readonly DbContext _context;
    private IRepository<User> _users;
    private IRepository<Order> _orders;
    
    public UnitOfWork(DbContext context) {
        _context = context;
    }
    
    public IRepository<User> Users {
        get {
            return _users ??= new Repository<User>(_context);
        }
    }
    
    public IRepository<Order> Orders {
        get {
            return _orders ??= new Repository<Order>(_context);
        }
    }
    
    public int SaveChanges() {
        return _context.SaveChanges();
    }
    
    public void Dispose() {
        _context?.Dispose();
    }
}

// Usage in Service
public class UserService {
    private readonly IUnitOfWork _unitOfWork;
    
    public UserService(IUnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
    }
    
    public void CreateUserWithOrder(User user, Order order) {
        _unitOfWork.Users.Add(user);
        _unitOfWork.Orders.Add(order);
        _unitOfWork.SaveChanges(); // Single transaction
    }
}
\`\`\`

**Benefits:**
- Testability (mock repositories)
- Flexibility (change data source easily)
- Maintainability (centralized data access)
- Separation of concerns`
  },
  {
    id: 5003,
    category: 'Design Patterns',
    question: 'What is the Singleton Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Singleton ensures a class has only one instance and provides global access to it.

**The Core Concept:** Think of a company's CEO - there's only one CEO, and everyone accesses the same person. Singleton is like that - one instance shared by everyone. Useful for things like database connections, logging, configuration.

**When to Use:**
- When you need exactly one instance (database connection, logger, cache)
- When you need global access point
- When instance creation is expensive
- When you need to control access to shared resource

**When NOT to Use:**
- When you need multiple instances
- When you need testability (hard to mock)
- When you need dependency injection (DI containers handle this better)
- When you need thread-safety with mutable state

**Deep Example - Thread-Safe Singleton:**
\`\`\`csharp
// Method 1: Double-Check Locking (Thread-Safe)
public class Logger {
    private static Logger _instance;
    private static readonly object _lock = new object();
    private readonly List<string> _logs = new List<string>();
    
    // Private constructor prevents instantiation
    private Logger() { }
    
    public static Logger GetInstance() {
        // First check (no lock) - performance optimization
        if (_instance == null) {
            lock (_lock) {
                // Second check (with lock) - thread safety
                if (_instance == null) {
                    _instance = new Logger();
                }
            }
        }
        return _instance;
    }
    
    public void Log(string message) {
        _logs.Add($"{DateTime.Now}: {message}");
    }
    
    public IEnumerable<string> GetLogs() {
        return _logs;
    }
}

// Method 2: Lazy<T> (Recommended - Thread-Safe by Default)
public class Logger {
    private static readonly Lazy<Logger> _instance = 
        new Lazy<Logger>(() => new Logger(), LazyThreadSafetyMode.ExecutionAndPublication);
    
    private Logger() { }
    
    public static Logger GetInstance() => _instance.Value;
    
    public void Log(string message) {
        Console.WriteLine(message);
    }
}

// Method 3: Static Constructor (Thread-Safe, Eager Loading)
public class Logger {
    private static readonly Logger _instance = new Logger();
    
    // Static constructor ensures thread-safe initialization
    static Logger() { }
    
    private Logger() { }
    
    public static Logger GetInstance() => _instance;
}

// Usage
var logger1 = Logger.GetInstance();
var logger2 = Logger.GetInstance();
Console.WriteLine(logger1 == logger2); // True - same instance
\`\`\`

**Common Pitfalls:**
- Not thread-safe in multi-threaded environments
- Difficult to unit test (static dependency)
- Can hide dependencies (hard to see what class uses it)
- Violates Single Responsibility Principle (manages both instance and business logic)

**Better Alternative - Dependency Injection:**
\`\`\`csharp
// Instead of Singleton, use DI container
services.AddSingleton<ILogger, Logger>();
// Container manages single instance, but allows testing
\`\`\``
  },
  {
    id: 5004,
    category: 'Design Patterns',
    question: 'What is the Strategy Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.

**The Core Concept:** Think of navigation apps. You can choose different strategies: fastest route, shortest route, avoid tolls. The app (context) uses the strategy you choose. Strategy Pattern lets you switch algorithms at runtime.

**When to Use:**
- When you have multiple ways to perform a task
- When you want to avoid conditional statements (if/switch)
- When algorithms should be interchangeable
- When you want to isolate algorithm implementation

**Deep Example:**
\`\`\`csharp
// Strategy Interface
public interface ISortStrategy {
    void Sort(List<int> list);
}

// Concrete Strategies
public class QuickSortStrategy : ISortStrategy {
    public void Sort(List<int> list) {
        Console.WriteLine("Sorting using QuickSort");
        // QuickSort implementation
        list.Sort();
    }
}

public class MergeSortStrategy : ISortStrategy {
    public void Sort(List<int> list) {
        Console.WriteLine("Sorting using MergeSort");
        // MergeSort implementation
        list.Sort();
    }
}

public class BubbleSortStrategy : ISortStrategy {
    public void Sort(List<int> list) {
        Console.WriteLine("Sorting using BubbleSort");
        // BubbleSort implementation
        for (int i = 0; i < list.Count; i++) {
            for (int j = 0; j < list.Count - 1; j++) {
                if (list[j] > list[j + 1]) {
                    var temp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                }
            }
        }
    }
}

// Context Class
public class Sorter {
    private ISortStrategy _strategy;
    
    public Sorter(ISortStrategy strategy) {
        _strategy = strategy;
    }
    
    public void SetStrategy(ISortStrategy strategy) {
        _strategy = strategy;
    }
    
    public void SortList(List<int> list) {
        _strategy.Sort(list);
    }
}

// Usage
var numbers = new List<int> { 5, 2, 8, 1, 9 };

var sorter = new Sorter(new QuickSortStrategy());
sorter.SortList(numbers); // Uses QuickSort

sorter.SetStrategy(new MergeSortStrategy());
sorter.SortList(numbers); // Switches to MergeSort

// Real-world: Payment Processing
public interface IPaymentStrategy {
    void ProcessPayment(decimal amount);
}

public class CreditCardStrategy : IPaymentStrategy {
    public void ProcessPayment(decimal amount) {
        Console.WriteLine($"Processing {amount} via Credit Card");
    }
}

public class PayPalStrategy : IPaymentStrategy {
    public void ProcessPayment(decimal amount) {
        Console.WriteLine($"Processing {amount} via PayPal");
    }
}

public class PaymentProcessor {
    private IPaymentStrategy _strategy;
    
    public PaymentProcessor(IPaymentStrategy strategy) {
        _strategy = strategy;
    }
    
    public void Process(decimal amount) {
        _strategy.ProcessPayment(amount);
    }
}
\`\`\`

**Benefits:**
- Eliminates conditional statements
- Open/Closed Principle (add new strategies without modifying context)
- Runtime algorithm selection
- Isolates algorithm implementation`
  },
  {
    id: 5005,
    category: 'Design Patterns',
    question: 'What is the Observer Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Observer Pattern defines a one-to-many dependency between objects, so when one object changes state, all dependents are notified automatically.

**The Core Concept:** Think of a news subscription. When news is published (subject), all subscribers (observers) are automatically notified. You don't check for news - you're notified when it happens. Observer Pattern works the same way.

**When to Use:**
- When change to one object requires changing multiple objects
- When objects should be loosely coupled
- When you need event-driven architecture
- When you need publish-subscribe mechanism

**Deep Example:**
\`\`\`csharp
// Observer Interface
public interface IObserver {
    void Update(string message);
}

// Subject Interface
public interface ISubject {
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}

// Concrete Subject
public class NewsAgency : ISubject {
    private List<IObserver> _observers = new List<IObserver>();
    private string _news;
    
    public string News {
        get => _news;
        set {
            _news = value;
            Notify(); // Notify all observers when news changes
        }
    }
    
    public void Attach(IObserver observer) {
        _observers.Add(observer);
    }
    
    public void Detach(IObserver observer) {
        _observers.Remove(observer);
    }
    
    public void Notify() {
        foreach (var observer in _observers) {
            observer.Update(_news);
        }
    }
}

// Concrete Observers
public class NewsChannel : IObserver {
    private string _name;
    
    public NewsChannel(string name) {
        _name = name;
    }
    
    public void Update(string message) {
        Console.WriteLine($"{_name} received: {message}");
    }
}

// Usage
var agency = new NewsAgency();
var channel1 = new NewsChannel("CNN");
var channel2 = new NewsChannel("BBC");

agency.Attach(channel1);
agency.Attach(channel2);

agency.News = "Breaking: New technology announced";
// Output:
// CNN received: Breaking: New technology announced
// BBC received: Breaking: New technology announced

agency.Detach(channel1);
agency.News = "Update: Technology details released";
// Output:
// BBC received: Update: Technology details released

// Real-world: Stock Market
public class Stock : ISubject {
    private string _symbol;
    private decimal _price;
    private List<IObserver> _investors = new List<IObserver>();
    
    public Stock(string symbol, decimal price) {
        _symbol = symbol;
        _price = price;
    }
    
    public decimal Price {
        get => _price;
        set {
            if (_price != value) {
                _price = value;
                Notify();
            }
        }
    }
    
    public void Attach(IObserver observer) {
        _investors.Add(observer);
    }
    
    public void Detach(IObserver observer) {
        _investors.Remove(observer);
    }
    
    public void Notify() {
        foreach (var investor in _investors) {
            investor.Update($"{_symbol} price changed to {_price}");
        }
    }
}

public class Investor : IObserver {
    private string _name;
    
    public Investor(string name) {
        _name = name;
    }
    
    public void Update(string message) {
        Console.WriteLine($"{_name}: {message}");
    }
}
\`\`\`

**Benefits:**
- Loose coupling between subject and observers
- Dynamic relationships (add/remove observers at runtime)
- Broadcast communication
- Follows Open/Closed Principle

**C# Built-in Support:**
\`\`\`csharp
// Using Events (C# implementation of Observer)
public class NewsAgency {
    public event Action<string> NewsPublished;
    
    public void PublishNews(string news) {
        NewsPublished?.Invoke(news);
    }
}

// Usage
var agency = new NewsAgency();
agency.NewsPublished += (news) => Console.WriteLine($"Received: {news}");
agency.PublishNews("Breaking news!");
\`\`\``
  },
  {
    id: 5006,
    category: 'Design Patterns',
    question: 'What is the Decorator Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Decorator Pattern allows behavior to be added to individual objects dynamically without affecting other objects of the same class.

**The Core Concept:** Think of ordering a pizza. You start with a base pizza, then add toppings (decorators): cheese, pepperoni, mushrooms. Each topping adds to the pizza without changing the base. Decorator Pattern works similarly - you wrap objects with decorators to add functionality.

**When to Use:**
- When you need to add responsibilities to objects dynamically
- When you want to avoid subclassing for every combination
- When you need to add/remove features at runtime
- When inheritance is impractical (too many combinations)

**Deep Example:**
\`\`\`csharp
// Component Interface
public interface ICoffee {
    string GetDescription();
    decimal GetCost();
}

// Concrete Component
public class SimpleCoffee : ICoffee {
    public string GetDescription() {
        return "Simple Coffee";
    }
    
    public decimal GetCost() {
        return 2.00m;
    }
}

// Base Decorator
public abstract class CoffeeDecorator : ICoffee {
    protected ICoffee _coffee;
    
    public CoffeeDecorator(ICoffee coffee) {
        _coffee = coffee;
    }
    
    public virtual string GetDescription() {
        return _coffee.GetDescription();
    }
    
    public virtual decimal GetCost() {
        return _coffee.GetCost();
    }
}

// Concrete Decorators
public class MilkDecorator : CoffeeDecorator {
    public MilkDecorator(ICoffee coffee) : base(coffee) { }
    
    public override string GetDescription() {
        return _coffee.GetDescription() + ", Milk";
    }
    
    public override decimal GetCost() {
        return _coffee.GetCost() + 0.50m;
    }
}

public class SugarDecorator : CoffeeDecorator {
    public SugarDecorator(ICoffee coffee) : base(coffee) { }
    
    public override string GetDescription() {
        return _coffee.GetDescription() + ", Sugar";
    }
    
    public override decimal GetCost() {
        return _coffee.GetCost() + 0.25m;
    }
}

public class WhippedCreamDecorator : CoffeeDecorator {
    public WhippedCreamDecorator(ICoffee coffee) : base(coffee) { }
    
    public override string GetDescription() {
        return _coffee.GetDescription() + ", Whipped Cream";
    }
    
    public override decimal GetCost() {
        return _coffee.GetCost() + 0.75m;
    }
}

// Usage
ICoffee coffee = new SimpleCoffee();
Console.WriteLine($"{coffee.GetDescription()}: \${coffee.GetCost()}");
// Output: Simple Coffee: $2.00

coffee = new MilkDecorator(coffee);
Console.WriteLine($"{coffee.GetDescription()}: \${coffee.GetCost()}");
// Output: Simple Coffee, Milk: $2.50

coffee = new SugarDecorator(coffee);
Console.WriteLine($"{coffee.GetDescription()}: \${coffee.GetCost()}");
// Output: Simple Coffee, Milk, Sugar: $2.75

coffee = new WhippedCreamDecorator(coffee);
Console.WriteLine($"{coffee.GetDescription()}: \${coffee.GetCost()}");
// Output: Simple Coffee, Milk, Sugar, Whipped Cream: $3.50

// Real-world: Stream Decorators in .NET
// FileStream -> BufferedStream -> GZipStream
// Each decorator adds functionality without modifying base stream
\`\`\`

**Benefits:**
- Add responsibilities dynamically
- More flexible than inheritance
- Follows Open/Closed Principle
- Can combine decorators in any order

**Comparison with Inheritance:**
- Inheritance: Static, compile-time (CoffeeWithMilk, CoffeeWithSugar, CoffeeWithMilkAndSugar - 3 classes)
- Decorator: Dynamic, runtime (1 base + 3 decorators = infinite combinations)`
  },
  {
    id: 5007,
    category: 'Design Patterns',
    question: 'What is the Adapter Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Adapter Pattern allows incompatible interfaces to work together by wrapping an object with an adapter that translates between them.

**The Core Concept:** Think of a travel adapter. Your phone charger has a US plug, but the outlet is European. The adapter converts one interface (US plug) to another (European socket). Adapter Pattern does the same for code interfaces.

**When to Use:**
- When you need to use an existing class with an incompatible interface
- When integrating third-party libraries
- When you want to reuse classes that don't match your interface
- When you need to create a reusable class that cooperates with unrelated classes

**Deep Example:**
\`\`\`csharp
// Target Interface (what client expects)
public interface IMediaPlayer {
    void Play(string audioType, string fileName);
}

// Adaptee (existing class with incompatible interface)
public class AdvancedMediaPlayer {
    public void PlayVlc(string fileName) {
        Console.WriteLine($"Playing VLC file: {fileName}");
    }
    
    public void PlayMp4(string fileName) {
        Console.WriteLine($"Playing MP4 file: {fileName}");
    }
}

// Adapter (adapts Adaptee to Target interface)
public class MediaAdapter : IMediaPlayer {
    private AdvancedMediaPlayer _advancedPlayer;
    
    public MediaAdapter(string audioType) {
        if (audioType.Equals("vlc", StringComparison.OrdinalIgnoreCase)) {
            _advancedPlayer = new AdvancedMediaPlayer();
        } else if (audioType.Equals("mp4", StringComparison.OrdinalIgnoreCase)) {
            _advancedPlayer = new AdvancedMediaPlayer();
        }
    }
    
    public void Play(string audioType, string fileName) {
        if (audioType.Equals("vlc", StringComparison.OrdinalIgnoreCase)) {
            _advancedPlayer.PlayVlc(fileName);
        } else if (audioType.Equals("mp4", StringComparison.OrdinalIgnoreCase)) {
            _advancedPlayer.PlayMp4(fileName);
        }
    }
}

// Client
public class AudioPlayer : IMediaPlayer {
    private MediaAdapter _adapter;
    
    public void Play(string audioType, string fileName) {
        // Built-in support for mp3
        if (audioType.Equals("mp3", StringComparison.OrdinalIgnoreCase)) {
            Console.WriteLine($"Playing MP3 file: {fileName}");
        }
        // Use adapter for other formats
        else if (audioType.Equals("vlc", StringComparison.OrdinalIgnoreCase) ||
                 audioType.Equals("mp4", StringComparison.OrdinalIgnoreCase)) {
            _adapter = new MediaAdapter(audioType);
            _adapter.Play(audioType, fileName);
        } else {
            Console.WriteLine($"Invalid media type: {audioType}");
        }
    }
}

// Usage
var player = new AudioPlayer();
player.Play("mp3", "song.mp3");
player.Play("mp4", "video.mp4");
player.Play("vlc", "movie.vlc");

// Real-world: Database Adapter
// Your code expects IRepository, but third-party library has different interface
public interface IRepository {
    void Save(object entity);
    object Get(int id);
}

// Third-party library (incompatible)
public class ThirdPartyDatabase {
    public void Insert(object data) { }
    public object Select(int id) { return null; }
}

// Adapter
public class DatabaseAdapter : IRepository {
    private ThirdPartyDatabase _database;
    
    public DatabaseAdapter(ThirdPartyDatabase database) {
        _database = database;
    }
    
    public void Save(object entity) {
        _database.Insert(entity); // Adapting method call
    }
    
    public object Get(int id) {
        return _database.Select(id); // Adapting method call
    }
}
\`\`\`

**Benefits:**
- Allows incompatible interfaces to work together
- Reuses existing classes
- Single Responsibility (adapter handles conversion)
- Open/Closed Principle (can add new adapters)

**Types of Adapters:**
1. **Object Adapter:** Uses composition (wraps adaptee)
2. **Class Adapter:** Uses inheritance (extends adaptee) - not possible in C# (single inheritance)`
  },
  {
    id: 5008,
    category: 'Design Patterns',
    question: 'What is the Builder Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Builder Pattern constructs complex objects step by step, allowing you to produce different types and representations using the same construction code.

**The Core Concept:** Think of building a house. You don't build it all at once. You have steps: foundation, walls, roof, interior. Builder Pattern lets you build complex objects step by step, and you can have different builders (luxury house builder, budget house builder) using the same process.

**When to Use:**
- When object construction is complex
- When you need to create objects with many optional parameters
- When you want to avoid telescoping constructor anti-pattern
- When you need different representations of the same object

**Deep Example:**
\`\`\`csharp
// Product
public class Pizza {
    public string Dough { get; set; }
    public string Sauce { get; set; }
    public string Topping { get; set; }
    public bool Cheese { get; set; }
    public bool Pepperoni { get; set; }
    public bool Mushrooms { get; set; }
    
    public override string ToString() {
        return $"Pizza: Dough={Dough}, Sauce={Sauce}, Topping={Topping}, " +
               $"Cheese={Cheese}, Pepperoni={Pepperoni}, Mushrooms={Mushrooms}";
    }
}

// Builder Interface
public interface IPizzaBuilder {
    IPizzaBuilder SetDough(string dough);
    IPizzaBuilder SetSauce(string sauce);
    IPizzaBuilder SetTopping(string topping);
    IPizzaBuilder AddCheese();
    IPizzaBuilder AddPepperoni();
    IPizzaBuilder AddMushrooms();
    Pizza Build();
}

// Concrete Builder
public class PizzaBuilder : IPizzaBuilder {
    private Pizza _pizza = new Pizza();
    
    public IPizzaBuilder SetDough(string dough) {
        _pizza.Dough = dough;
        return this;
    }
    
    public IPizzaBuilder SetSauce(string sauce) {
        _pizza.Sauce = sauce;
        return this;
    }
    
    public IPizzaBuilder SetTopping(string topping) {
        _pizza.Topping = topping;
        return this;
    }
    
    public IPizzaBuilder AddCheese() {
        _pizza.Cheese = true;
        return this;
    }
    
    public IPizzaBuilder AddPepperoni() {
        _pizza.Pepperoni = true;
        return this;
    }
    
    public IPizzaBuilder AddMushrooms() {
        _pizza.Mushrooms = true;
        return this;
    }
    
    public Pizza Build() {
        return _pizza;
    }
    
    public void Reset() {
        _pizza = new Pizza();
    }
}

// Director (optional - defines construction steps)
public class PizzaDirector {
    private IPizzaBuilder _builder;
    
    public PizzaDirector(IPizzaBuilder builder) {
        _builder = builder;
    }
    
    public Pizza MakeMargherita() {
        return _builder
            .SetDough("Thin")
            .SetSauce("Tomato")
            .AddCheese()
            .Build();
    }
    
    public Pizza MakePepperoni() {
        return _builder
            .SetDough("Thick")
            .SetSauce("Tomato")
            .AddCheese()
            .AddPepperoni()
            .Build();
    }
}

// Usage - Fluent Interface
var builder = new PizzaBuilder();
var pizza = builder
    .SetDough("Thick")
    .SetSauce("Tomato")
    .AddCheese()
    .AddPepperoni()
    .AddMushrooms()
    .Build();

Console.WriteLine(pizza);

// Using Director
var director = new PizzaDirector(builder);
var margherita = director.MakeMargherita();
var pepperoni = director.MakePepperoni();

// Real-world: StringBuilder, QueryBuilder
var query = new StringBuilder()
    .Append("SELECT * FROM Users")
    .Append(" WHERE Age > 18")
    .Append(" ORDER BY Name")
    .ToString();
\`\`\`

**Benefits:**
- Constructs objects step by step
- Reuses construction code
- Isolates complex construction code
- Allows different representations
- Fluent interface (method chaining)

**Comparison with Other Patterns:**
- **Factory:** Creates objects in one step
- **Builder:** Creates objects step by step
- **Abstract Factory:** Creates families of objects`
  },
  {
    id: 5009,
    category: 'Design Patterns',
    question: 'What is the Command Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Command Pattern encapsulates a request as an object, allowing you to parameterize clients with different requests, queue operations, and support undo operations.

**The Core Concept:** Think of a remote control. Each button (command) encapsulates an action (turn on TV, change channel). You can press buttons, undo actions, or program sequences. Command Pattern treats requests as objects that can be stored, queued, and executed.

**When to Use:**
- When you need to parameterize objects with operations
- When you need to queue operations
- When you need to support undo/redo
- When you need to log operations
- When you need to support transactions

**Deep Example:**
\`\`\`csharp
// Command Interface
public interface ICommand {
    void Execute();
    void Undo();
}

// Receiver (knows how to perform operations)
public class Light {
    public void TurnOn() {
        Console.WriteLine("Light is ON");
    }
    
    public void TurnOff() {
        Console.WriteLine("Light is OFF");
    }
}

// Concrete Commands
public class TurnOnLightCommand : ICommand {
    private Light _light;
    
    public TurnOnLightCommand(Light light) {
        _light = light;
    }
    
    public void Execute() {
        _light.TurnOn();
    }
    
    public void Undo() {
        _light.TurnOff();
    }
}

public class TurnOffLightCommand : ICommand {
    private Light _light;
    
    public TurnOffLightCommand(Light light) {
        _light = light;
    }
    
    public void Execute() {
        _light.TurnOff();
    }
    
    public void Undo() {
        _light.TurnOn();
    }
}

// Invoker (calls commands)
public class RemoteControl {
    private ICommand _command;
    private Stack<ICommand> _history = new Stack<ICommand>();
    
    public void SetCommand(ICommand command) {
        _command = command;
    }
    
    public void PressButton() {
        if (_command != null) {
            _command.Execute();
            _history.Push(_command);
        }
    }
    
    public void PressUndo() {
        if (_history.Count > 0) {
            var lastCommand = _history.Pop();
            lastCommand.Undo();
        }
    }
}

// Usage
var light = new Light();
var turnOn = new TurnOnLightCommand(light);
var turnOff = new TurnOffLightCommand(light);

var remote = new RemoteControl();

remote.SetCommand(turnOn);
remote.PressButton(); // Light is ON

remote.SetCommand(turnOff);
remote.PressButton(); // Light is OFF

remote.PressUndo(); // Light is ON (undo last command)

// Real-world: Database Transaction
public class DatabaseCommand : ICommand {
    private string _sql;
    private Database _database;
    
    public DatabaseCommand(Database database, string sql) {
        _database = database;
        _sql = sql;
    }
    
    public void Execute() {
        _database.Execute(_sql);
    }
    
    public void Undo() {
        // Rollback or execute reverse operation
        _database.Rollback();
    }
}

// Command Queue
public class CommandQueue {
    private Queue<ICommand> _queue = new Queue<ICommand>();
    
    public void AddCommand(ICommand command) {
        _queue.Enqueue(command);
    }
    
    public void ProcessCommands() {
        while (_queue.Count > 0) {
            var command = _queue.Dequeue();
            command.Execute();
        }
    }
}
\`\`\`

**Benefits:**
- Decouples invoker from receiver
- Supports undo/redo operations
- Supports queuing and logging
- Supports transactions
- Easy to add new commands

**Use Cases:**
- GUI buttons and menu items
- Macro recording
- Undo/redo functionality
- Transaction management
- Job queues`
  },
  {
    id: 5010,
    category: 'Design Patterns',
    question: 'What is the Facade Pattern? (Deep Explanation)',
    answer: `**One-Sentence Definition:** Facade Pattern provides a simplified interface to a complex subsystem, hiding its complexity behind a single interface.

**The Core Concept:** Think of a home theater system. You have TV, DVD player, sound system, lights - all complex. A remote control (facade) provides one simple interface to control everything. Facade Pattern does the same - one simple interface for complex subsystems.

**When to Use:**
- When you want to provide a simple interface to a complex subsystem
- When you want to decouple clients from subsystem
- When you want to layer your subsystems
- When you want to reduce dependencies

**Deep Example:**
\`\`\`csharp
// Complex Subsystem Classes
public class CPU {
    public void Freeze() {
        Console.WriteLine("CPU: Freezing...");
    }
    
    public void Jump(long position) {
        Console.WriteLine($"CPU: Jumping to position {position}");
    }
    
    public void Execute() {
        Console.WriteLine("CPU: Executing...");
    }
}

public class Memory {
    public void Load(long position, byte[] data) {
        Console.WriteLine($"Memory: Loading data at position {position}");
    }
}

public class HardDrive {
    public byte[] Read(long lba, int size) {
        Console.WriteLine($"HardDrive: Reading {size} bytes from LBA {lba}");
        return new byte[size];
    }
}

// Facade - Simple Interface
public class ComputerFacade {
    private CPU _cpu;
    private Memory _memory;
    private HardDrive _hardDrive;
    
    public ComputerFacade() {
        _cpu = new CPU();
        _memory = new Memory();
        _hardDrive = new HardDrive();
    }
    
    public void Start() {
        Console.WriteLine("Starting computer...");
        _cpu.Freeze();
        _memory.Load(0, _hardDrive.Read(0, 1024));
        _cpu.Jump(0);
        _cpu.Execute();
        Console.WriteLine("Computer started!");
    }
    
    public void Shutdown() {
        Console.WriteLine("Shutting down computer...");
        // Complex shutdown logic
        Console.WriteLine("Computer shut down!");
    }
}

// Client - Uses simple facade interface
public class User {
    public void UseComputer() {
        var computer = new ComputerFacade();
        computer.Start(); // Simple one-method call
        // Instead of:
        // cpu.Freeze();
        // memory.Load(...);
        // cpu.Jump(...);
        // cpu.Execute();
    }
}

// Real-world: API Facade
public class PaymentFacade {
    private PaymentGateway _gateway;
    private EmailService _email;
    private Logger _logger;
    private NotificationService _notification;
    
    public PaymentFacade() {
        _gateway = new PaymentGateway();
        _email = new EmailService();
        _logger = new Logger();
        _notification = new NotificationService();
    }
    
    public bool ProcessPayment(decimal amount, string cardNumber) {
        try {
            _logger.Log("Payment processing started");
            
            // Complex payment processing
            var result = _gateway.Charge(amount, cardNumber);
            
            if (result.Success) {
                _email.SendReceipt(result.TransactionId);
                _notification.SendSMS("Payment successful");
                _logger.Log("Payment processed successfully");
                return true;
            } else {
                _logger.Log("Payment failed");
                return false;
            }
        } catch (Exception ex) {
            _logger.Log($"Error: {ex.Message}");
            return false;
        }
    }
}

// Usage - Simple interface
var payment = new PaymentFacade();
payment.ProcessPayment(100.00m, "1234-5678-9012-3456");
// Client doesn't need to know about gateway, email, logger, etc.
\`\`\`

**Benefits:**
- Simplifies complex subsystems
- Reduces coupling between clients and subsystems
- Provides a single entry point
- Makes subsystem easier to use

**Comparison:**
- **Facade:** Simplifies interface to subsystem
- **Adapter:** Changes interface to match client expectations
- **Mediator:** Coordinates communication between objects`
  }
];
