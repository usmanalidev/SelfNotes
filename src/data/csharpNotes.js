// C# Category Notes - Comprehensive Interview Preparation
export const csharpNotes = [
  {
    id: 10,
    category: 'C#',
    question: 'What is the difference between value types and reference types in C#?',
    answer: `**One-Sentence Definition:** Value types store data directly on the stack, while reference types store a reference (pointer) to data on the heap.

**The Core Concept:** Think of value types like owning a book - you have the actual book. Reference types are like having a library card - the card points to where the book is stored. When you copy a value type, you get a new copy. When you copy a reference type, you get a new card pointing to the same book.

**Key Points to Remember:**
- Value types: int, float, bool, struct, enum (stored on stack)
- Reference types: class, interface, delegate, array, string (stored on heap)
- Value types copy by value (independent copies)
- Reference types copy by reference (share same object)
- Value types default to zero, reference types default to null

**Quick Comparison:**

| Feature | Value Types | Reference Types |
|---------|-------------|----------------|
| Storage | Stack | Heap |
| Copy Behavior | Creates new copy | Shares reference |
| Default Value | Zero | null |
| Examples | int, struct | class, string |

**Example:**
\`\`\`csharp
// Value type - independent copies
int a = 10;
int b = a;  // b is a copy, a is still 10
b = 20;     // a = 10, b = 20

// Reference type - shared reference
class Person { public string Name; }
Person p1 = new Person { Name = "John" };
Person p2 = p1;        // Both point to same object
p2.Name = "Jane";      // p1.Name is also "Jane"
\`\`\``
  },
  {
    id: 11,
    category: 'C#',
    question: 'What is the difference between abstract class and interface?',
    answer: `**One-Sentence Definition:** Abstract classes can have both abstract and concrete methods with fields, while interfaces define contracts that classes must implement.

**The Core Concept:** Abstract class is like a partially built house blueprint - some rooms are designed, others are just marked "to be designed." Interface is like a checklist of features a house must have (plumbing, electricity) but doesn't say how to implement them.

**Key Points to Remember:**
- Abstract class: Can have fields, constructors, concrete methods
- Interface: Only method signatures (default implementations in C# 8.0+)
- Abstract class: Single inheritance
- Interface: Multiple inheritance allowed
- Use abstract class for "is-a" relationship, interface for "can-do" relationship

**Quick Comparison:**

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Fields | ✅ | ❌ (properties only) |
| Constructors | ✅ | ❌ |
| Concrete Methods | ✅ | ✅ (C# 8.0+) |
| Inheritance | Single | Multiple |
| Access Modifiers | Any | Public by default |

**Example:**
\`\`\`csharp
// Abstract Class
abstract class Animal {
    protected string name; // Can have fields
    
    public Animal(string name) { // Can have constructor
        this.name = name;
    }
    
    public abstract void MakeSound(); // Abstract method
    
    public void Sleep() { // Concrete method
        Console.WriteLine($"{name} is sleeping");
    }
}

// Interface
interface IFlyable {
    void Fly(); // Only signature
}

class Bird : Animal, IFlyable { // Multiple inheritance
    public Bird(string name) : base(name) {}
    
    public override void MakeSound() {
        Console.WriteLine("Chirp!");
    }
    
    public void Fly() {
        Console.WriteLine($"{name} is flying");
    }
}
\`\`\``
  },
  {
    id: 12,
    category: 'C#',
    question: 'What is the difference between const, readonly, and static?',
    answer: `**One-Sentence Definition:** const is compile-time constant, readonly is runtime constant that can be set in constructor, and static belongs to the class rather than instances.

**The Core Concept:** const is like a fixed sign that never changes. readonly is like a nameplate that's set once when the building is constructed. static is like a shared resource that all instances use (like a shared parking lot).

**Key Points to Remember:**
- const: Must be initialized at declaration, compile-time constant, implicitly static
- readonly: Can be initialized at declaration or in constructor, runtime constant, per-instance
- static: Belongs to class, not instance, shared across all instances
- const: Value known at compile time (numbers, strings)
- readonly: Value can be calculated at runtime

**Quick Comparison:**

| Feature | const | readonly | static |
|---------|-------|----------|--------|
| Initialization | Declaration only | Declaration or constructor | Declaration or static constructor |
| When Set | Compile time | Runtime | Runtime |
| Scope | Class-level | Instance-level | Class-level |
| Can Change | Never | After constructor | Yes |

**Example:**
\`\`\`csharp
public class MyClass {
    public const int MaxUsers = 100; // Compile-time constant
    
    public readonly string DatabaseName; // Set in constructor
    
    public static int InstanceCount = 0; // Shared across all instances
    
    public MyClass(string dbName) {
        DatabaseName = dbName; // readonly set here
        InstanceCount++; // Increment shared counter
    }
    
    public static void PrintCount() {
        Console.WriteLine(InstanceCount); // Static method
    }
}

// Usage
Console.WriteLine(MyClass.MaxUsers); // 100
var obj1 = new MyClass("DB1");
var obj2 = new MyClass("DB2");
Console.WriteLine(MyClass.InstanceCount); // 2
\`\`\``
  },
  {
    id: 13,
    category: 'C#',
    question: 'What is the difference between ref and out keywords?',
    answer: `**One-Sentence Definition:** Both allow passing parameters by reference, but ref requires initialization before passing, while out doesn't require initialization but must be assigned in the method.

**The Core Concept:** ref is like lending someone a book they can read and modify. out is like giving someone an empty box they must fill and return. With ref, the variable must have a value. With out, the method guarantees to assign a value.

**Key Points to Remember:**
- ref: Variable must be initialized before passing
- out: Variable doesn't need initialization, but method must assign it
- ref: Can read and write the value
- out: Method must assign before returning
- Use ref when you want to modify existing value
- Use out when you want to return multiple values

**Quick Comparison:**

| Feature | ref | out |
|---------|-----|-----|
| Initialization Required | ✅ | ❌ |
| Method Must Assign | ❌ | ✅ |
| Can Read Before Assign | ✅ | ❌ |
| Use Case | Modify existing | Return new value |

**Example:**
\`\`\`csharp
// ref - must initialize
int number = 10;
Increment(ref number); // number is now 11
Console.WriteLine(number); // 11

void Increment(ref int x) {
    x++; // Can read and modify
}

// out - doesn't need initialization
int result;
bool success = TryParse("123", out result);
if (success) {
    Console.WriteLine(result); // 123
}

bool TryParse(string input, out int value) {
    if (int.TryParse(input, out value)) {
        return true; // value is assigned
    }
    value = 0; // Must assign before return
    return false;
}

// Multiple return values with out
int sum, product;
Calculate(5, 3, out sum, out product);
// sum = 8, product = 15

void Calculate(int a, int b, out int s, out int p) {
    s = a + b; // Must assign
    p = a * b; // Must assign
}
\`\`\``
  },
  {
    id: 14,
    category: 'C#',
    question: 'What is the difference between var and dynamic?',
    answer: `**One-Sentence Definition:** var is compile-time type inference (type is determined at compile time), while dynamic is runtime type resolution (type checking happens at runtime).

**The Core Concept:** var is like a label that's determined when you package the box (compile time). dynamic is like a mystery box - you don't know what's inside until you open it (runtime). var is still strongly typed, just inferred. dynamic bypasses type checking.

**Key Points to Remember:**
- var: Type inferred at compile time, still strongly typed
- dynamic: Type resolved at runtime, no compile-time checking
- var: IntelliSense works, compile-time errors caught
- dynamic: No IntelliSense, runtime errors possible
- Use var for cleaner code with obvious types
- Use dynamic for COM interop, dynamic languages, or when type is truly unknown

**Quick Comparison:**

| Feature | var | dynamic |
|---------|-----|---------|
| Type Checking | Compile time | Runtime |
| IntelliSense | ✅ | ❌ |
| Performance | Same as explicit type | Slower (runtime binding) |
| Errors | Compile-time | Runtime |

**Example:**
\`\`\`csharp
// var - type inferred at compile time
var name = "John"; // Compiler knows it's string
var age = 25; // Compiler knows it's int
// name = 123; // Compile error - can't assign int to string

// dynamic - type resolved at runtime
dynamic value = "Hello";
Console.WriteLine(value); // Works
value = 123; // Also works - no compile error
Console.WriteLine(value.ToUpper()); // Runtime error if value is int

// var with LINQ
var users = from u in db.Users
            where u.Age > 18
            select u; // Type is IQueryable<User>

// dynamic for COM or JSON
dynamic json = JsonConvert.DeserializeObject(jsonString);
string name = json.Name; // No compile-time checking
\`\`\``
  },
  {
    id: 15,
    category: 'C#',
    question: 'What is the difference between String and StringBuilder?',
    answer: `**One-Sentence Definition:** String is immutable (cannot be changed), while StringBuilder is mutable and efficient for multiple string operations.

**The Core Concept:** String is like writing on paper - each change creates a new paper. StringBuilder is like a whiteboard - you can erase and rewrite efficiently. For many string operations, StringBuilder is much faster because it doesn't create new objects each time.

**Key Points to Remember:**
- String: Immutable, creates new object on each operation
- StringBuilder: Mutable, modifies existing buffer
- String: Good for few operations, simple concatenation
- StringBuilder: Good for many operations, loops
- StringBuilder: More memory efficient for multiple appends
- Use String for simple cases, StringBuilder for performance-critical loops

**Quick Comparison:**

| Feature | String | StringBuilder |
|---------|--------|---------------|
| Mutability | Immutable | Mutable |
| Performance (many ops) | Slow | Fast |
| Memory | Creates new objects | Reuses buffer |
| Use Case | Simple concatenation | Loops, many operations |

**Example:**
\`\`\`csharp
// String - creates new objects (slow in loops)
string result = "";
for (int i = 0; i < 1000; i++) {
    result += i.ToString(); // Creates new string each time!
}
// Creates 1000+ string objects

// StringBuilder - efficient (fast in loops)
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.Append(i.ToString()); // Modifies existing buffer
}
string result = sb.ToString(); // Convert once at end
// Much faster and uses less memory

// Simple concatenation - String is fine
string name = "John" + " " + "Doe"; // OK for few operations
\`\`\``
  },
  {
    id: 16,
    category: 'C#',
    question: 'What is the difference between compile-time and runtime polymorphism?',
    answer: `**One-Sentence Definition:** Compile-time polymorphism (method overloading) is resolved at compile time, while runtime polymorphism (method overriding) is resolved at runtime based on object type.

**The Core Concept:** Compile-time is like a restaurant menu - you see all options (methods) and choose before ordering. Runtime is like a mystery meal - you don't know what you'll get until it arrives (the actual object type determines which method runs).

**Key Points to Remember:**
- Compile-time: Method overloading (same name, different parameters)
- Runtime: Method overriding (virtual/override keywords)
- Compile-time: Resolved by compiler based on parameters
- Runtime: Resolved at runtime based on actual object type
- Runtime requires virtual in base class and override in derived class

**Quick Comparison:**

| Feature | Compile-time | Runtime |
|---------|--------------|---------|
| Mechanism | Method overloading | Method overriding |
| Resolution | Compile time | Runtime |
| Keywords | None needed | virtual, override |
| Based On | Parameters | Object type |

**Example:**
\`\`\`csharp
// Compile-time polymorphism (Overloading)
public class Calculator {
    public int Add(int a, int b) {
        return a + b; // Called for int parameters
    }
    
    public double Add(double a, double b) {
        return a + b; // Called for double parameters
    }
    
    public string Add(string a, string b) {
        return a + b; // Called for string parameters
    }
}

// Runtime polymorphism (Overriding)
public class Animal {
    public virtual void MakeSound() {
        Console.WriteLine("Some sound");
    }
}

public class Dog : Animal {
    public override void MakeSound() {
        Console.WriteLine("Woof!"); // Called for Dog objects
    }
}

public class Cat : Animal {
    public override void MakeSound() {
        Console.WriteLine("Meow!"); // Called for Cat objects
    }
}

// Usage
Animal animal = new Dog(); // Reference is Animal, object is Dog
animal.MakeSound(); // "Woof!" - runtime determines which method
\`\`\``
  },
  {
    id: 17,
    category: 'C#',
    question: 'What are Delegates and Events in C#?',
    answer: `**One-Sentence Definition:** Delegates are type-safe function pointers that hold references to methods, and events are a special type of delegate for implementing the observer pattern.

**The Core Concept:** Delegate is like a phone number - you can call it to reach a method. Event is like a notification system - when something happens (event fires), all subscribers (registered methods) are notified. Think of a button click - multiple handlers can respond to the same click event.

**Key Points to Remember:**
- Delegate: Type-safe method reference, can hold multiple methods (multicast)
- Event: Encapsulated delegate with add/remove accessors
- Delegate: Can be invoked directly
- Event: Can only be invoked from declaring class
- Use delegates for callbacks, events for notifications
- Func<T> and Action<T> are built-in generic delegates

**Classic Interview Q&A:**
**Q:** What's the difference between delegate and event?
**A:** Events are encapsulated delegates. Events can only be invoked from the declaring class, while delegates can be invoked from anywhere. Events provide better encapsulation and are used for the observer pattern.

**Example:**
\`\`\`csharp
// Delegate
public delegate void Notify(string message);

public class Publisher {
    public Notify OnNotify; // Delegate
    
    public void DoSomething() {
        OnNotify?.Invoke("Something happened");
    }
}

// Event (better encapsulation)
public class Publisher {
    public event EventHandler<string> OnNotify; // Event
    
    public void DoSomething() {
        OnNotify?.Invoke(this, "Something happened");
    }
}

// Usage
var pub = new Publisher();
pub.OnNotify += (sender, msg) => Console.WriteLine(msg);
pub.DoSomething(); // Triggers event

// Built-in delegates
Func<int, int, int> add = (a, b) => a + b; // Returns value
Action<string> print = msg => Console.WriteLine(msg); // No return
Predicate<int> isEven = n => n % 2 == 0; // Returns bool
\`\`\``
  },
  {
    id: 18,
    category: 'C#',
    question: 'What are Generics in C#?',
    answer: `**One-Sentence Definition:** Generics allow you to define classes, methods, and interfaces with type parameters, enabling code reuse with type safety.

**The Core Concept:** Think of generics like a container label. Instead of having separate boxes labeled "Box for Books" and "Box for Toys," you have a generic "Box<T>" where T can be Book, Toy, or anything. The compiler ensures type safety - you can't put a Book in a Box<Toy>.

**Key Points to Remember:**
- Allows writing code that works with any type
- Type safety at compile time (no runtime casting)
- Better performance (no boxing/unboxing for value types)
- Reduces code duplication
- Common examples: List<T>, Dictionary<TKey, TValue>

**Classic Interview Q&A:**
**Q:** What are the benefits of generics?
**A:** Type safety (compile-time checking), performance (no boxing/casting), code reuse (one implementation for multiple types), and IntelliSense support.

**Example:**
\`\`\`csharp
// Without Generics - type unsafe
ArrayList list = new ArrayList();
list.Add(1);
list.Add("hello"); // No error, but wrong type
int value = (int)list[0]; // Need casting

// With Generics - type safe
List<int> numbers = new List<int>();
numbers.Add(1);
// numbers.Add("hello"); // Compile error!
int value = numbers[0]; // No casting needed

// Generic Class
public class Repository<T> where T : class {
    private List<T> items = new List<T>();
    
    public void Add(T item) {
        items.Add(item);
    }
    
    public T GetById(int id) {
        return items[id];
    }
}

// Usage
var userRepo = new Repository<User>();
var productRepo = new Repository<Product>();

// Generic Method
public T Max<T>(T a, T b) where T : IComparable<T> {
    return a.CompareTo(b) > 0 ? a : b;
}

int max = Max(10, 20); // 20
string maxStr = Max("apple", "zebra"); // "zebra"
\`\`\``
  },
  {
    id: 19,
    category: 'C#',
    question: 'What is the difference between deep copy and shallow copy?',
    answer: `**One-Sentence Definition:** Shallow copy creates a new object but copies references to nested objects, while deep copy creates new copies of all nested objects recursively.

**The Core Concept:** Shallow copy is like photocopying a document with sticky notes - you get a new document, but the sticky notes still point to the same items. Deep copy is like rewriting everything - you create completely independent copies of everything, including nested items.

**Key Points to Remember:**
- Shallow copy: Copies object and references to nested objects
- Deep copy: Copies object and all nested objects recursively
- Shallow copy: Changes to nested objects affect both copies
- Deep copy: Changes to nested objects are independent
- Use MemberwiseClone() for shallow copy
- Implement ICloneable or custom method for deep copy

**Example:**
\`\`\`csharp
public class Person {
    public string Name;
    public Address Address; // Reference type
    
    // Shallow copy
    public Person ShallowCopy() {
        return (Person)this.MemberwiseClone();
    }
    
    // Deep copy
    public Person DeepCopy() {
        return new Person {
            Name = this.Name,
            Address = new Address {
                Street = this.Address.Street,
                City = this.Address.City
            }
        };
    }
}

// Usage
var original = new Person {
    Name = "John",
    Address = new Address { Street = "123 Main", City = "NYC" }
};

var shallow = original.ShallowCopy();
shallow.Address.Street = "456 Oak"; // Changes original too!

var deep = original.DeepCopy();
deep.Address.Street = "789 Pine"; // Original unchanged
\`\`\``
  },
  {
    id: 20,
    category: 'C#',
    question: 'What is the difference between Stack and Heap?',
    answer: `**One-Sentence Definition:** Stack is fast memory for value types and method calls, while Heap is slower memory for reference types that requires garbage collection.

**The Core Concept:** Stack is like a stack of plates - last in, first out (LIFO). When you call a method, it's added to the stack. When it returns, it's removed. Heap is like a warehouse - you can store things anywhere, but you need a manager (GC) to clean up. Stack is automatic and fast. Heap requires management.

**Key Points to Remember:**
- Stack: Stores value types, method parameters, local variables
- Heap: Stores reference types (objects)
- Stack: Fast allocation/deallocation, automatic cleanup
- Heap: Slower, requires garbage collection
- Stack: Limited size, can overflow
- Heap: Larger size, managed by GC

**Quick Comparison:**

| Feature | Stack | Heap |
|---------|-------|------|
| Speed | Fast | Slower |
| Management | Automatic | GC required |
| Size | Limited | Larger |
| Stores | Value types, references | Objects |
| Lifetime | Method scope | Until GC |

**Example:**
\`\`\`csharp
public void Method() {
    int x = 10; // Value type on stack
    string name = "John"; // Reference on stack, object on heap
    
    Person p = new Person(); // Reference on stack, object on heap
    // When method ends, stack is cleared
    // Heap objects remain until GC
}

// Stack: int, bool, struct, method calls
// Heap: class instances, arrays, strings
\`\`\``
  }
];
