// MVC Category Notes
export const mvcNotes = [
  {
    id: 8000,
    category: 'MVC',
    question: 'What is MVC and MVC Application Lifecycle?',
    answer: `**One-Sentence Definition:** MVC (Model-View-Controller) is an architectural pattern that separates application into three components: Model (data), View (UI), and Controller (logic).

**The Core Concept:** Think of a restaurant: Model is the kitchen (data/food), View is the dining area (what customers see), Controller is the waiter (coordinates between kitchen and customers). Customer (user) talks to waiter, waiter talks to kitchen, kitchen prepares food, waiter brings it to customer.

**MVC Lifecycle:**
1. **Routing:** URL is parsed, route matched
2. **Controller Activation:** Controller instance created
3. **Action Method Selection:** Appropriate action method chosen
4. **Model Binding:** Request data bound to action parameters
5. **Action Execution:** Action method executes
6. **Result Execution:** Action returns result (View, JSON, Redirect)
7. **View Rendering:** View engine renders HTML
8. **Response:** HTML sent to client

**Key Points to Remember:**
- Model: Represents data and business logic
- View: Displays data (HTML, JSON, etc.)
- Controller: Handles user input, processes requests
- Separation of concerns (each component has one responsibility)
- Testable architecture
- Supports multiple views for same model

**Example:**
\`\`\`csharp
// Model
public class User {
    public int Id { get; set; }
    public string Name { get; set; }
}

// Controller
public class UserController : Controller {
    public IActionResult Index() {
        var users = GetUsers(); // Get data
        return View(users); // Return view with data
    }
    
    [HttpPost]
    public IActionResult Create(User user) {
        if (ModelState.IsValid) {
            SaveUser(user);
            return RedirectToAction("Index");
        }
        return View(user);
    }
}

// View (Index.cshtml)
@model List<User>
@foreach (var user in Model) {
    <p>@user.Name</p>
}
\`\`\``
  },
  {
    id: 8001,
    category: 'MVC',
    question: 'What is the difference between ViewData, ViewBag, and TempData?',
    answer: `**One-Sentence Definition:** ViewData and ViewBag pass data from controller to view in the same request, while TempData persists data across redirects.

**The Core Concept:** ViewData/ViewBag are like sticky notes on your desk (same request only). TempData is like a message board that persists until read (survives redirects). ViewBag is just a wrapper around ViewData with dynamic syntax.

**Key Points to Remember:**
- ViewData: Dictionary<string, object>, requires casting, strongly-typed
- ViewBag: Dynamic wrapper around ViewData, no casting needed
- TempData: Persists across redirects, stored in session, cleared after read
- ViewData/ViewBag: Same request only
- TempData: Can survive one redirect
- All three: Pass data from controller to view

**Quick Comparison:**

| Feature | ViewData | ViewBag | TempData |
|--------|----------|---------|----------|
| Type | Dictionary | Dynamic | Dictionary |
| Casting | Required | Not needed | Required |
| Scope | Same request | Same request | Across redirects |
| Storage | ViewState | ViewState | Session |

**Example:**
\`\`\`csharp
// ViewData
public IActionResult Index() {
    ViewData["Message"] = "Hello";
    ViewData["Count"] = 10;
    return View();
}
// In View: @ViewData["Message"] or @((string)ViewData["Message"])

// ViewBag
public IActionResult Index() {
    ViewBag.Message = "Hello";
    ViewBag.Count = 10;
    return View();
}
// In View: @ViewBag.Message (no casting)

// TempData (survives redirect)
public IActionResult Create(User user) {
    TempData["Success"] = "User created!";
    return RedirectToAction("Index");
}
// In Index view: @TempData["Success"] (available after redirect)
\`\`\``
  },
  {
    id: 8002,
    category: 'MVC',
    question: 'What are Action Filters in MVC?',
    answer: `**One-Sentence Definition:** Action Filters are attributes that allow you to add pre-action and post-action behavior to controller actions, like authorization, logging, or exception handling.

**The Core Concept:** Think of action filters as security checkpoints or service stations. Before you enter (action executes), you go through checks (authorization, logging). After you leave (action completes), you might get a receipt (logging). Filters are like middleware for specific actions.

**Key Points to Remember:**
- Execute before/after action methods
- Types: Authorization, Action, Result, Exception filters
- Can be applied at controller or action level
- Built-in: [Authorize], [AllowAnonymous], [ValidateAntiForgeryToken]
- Custom filters: Implement IActionFilter, IAuthorizationFilter, etc.
- Execution order: Authorization → Action → Result → Exception

**Classic Interview Q&A:**
**Q:** What's the difference between Action Filters and Attributes?
**A:** Action Filters are a type of attribute. All action filters are attributes, but not all attributes are action filters. Action filters specifically implement filter interfaces (IActionFilter, IAuthorizationFilter, etc.).

**Example:**
\`\`\`csharp
// Built-in Authorization Filter
[Authorize(Roles = "Admin")]
public class AdminController : Controller {
    public IActionResult Index() {
        return View();
    }
}

// Custom Action Filter
public class LogActionFilter : IActionFilter {
    public void OnActionExecuting(ActionExecutingContext context) {
        // Before action
        Console.WriteLine($"Action: {context.ActionDescriptor.DisplayName}");
    }
    
    public void OnActionExecuted(ActionExecutedContext context) {
        // After action
        Console.WriteLine($"Completed: {context.Result}");
    }
}

// Usage
[ServiceFilter(typeof(LogActionFilter))]
public IActionResult Index() {
    return View();
}

// Exception Filter
public class CustomExceptionFilter : IExceptionFilter {
    public void OnException(ExceptionContext context) {
        // Handle exception
        context.Result = new ViewResult {
            ViewName = "Error"
        };
        context.ExceptionHandled = true;
    }
}
\`\`\``
  },
  {
    id: 8003,
    category: 'MVC',
    question: 'What is Routing in MVC and its types?',
    answer: `**One-Sentence Definition:** Routing maps URLs to controller actions, determining which controller and action method should handle a request.

**The Core Concept:** Think of routing like a postal system. The URL is an address. The routing system reads the address and delivers it to the right house (controller) and person (action). Different routing types are like different addressing systems.

**Key Points to Remember:**
- Maps URLs to controller actions
- Default route: {controller}/{action}/{id}
- Convention-based routing: Define routes in Startup.cs
- Attribute routing: [Route] attribute on controllers/actions
- Route constraints: Restrict parameter values
- Route defaults: Provide default values

**Routing Types:**

1. **Convention-Based Routing:**
\`\`\`csharp
// In Startup.cs
app.UseRouting();
app.UseEndpoints(endpoints => {
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}"
    );
});
// URL: /User/Details/1 → UserController.Details(1)
\`\`\`

2. **Attribute Routing:**
\`\`\`csharp
[Route("api/[controller]")]
public class UserController : Controller {
    [HttpGet("{id}")]
    public IActionResult Get(int id) {
        // URL: /api/User/1
    }
    
    [HttpPost("create")]
    public IActionResult Create() {
        // URL: /api/User/create
    }
}
\`\`\`

3. **Route Constraints:**
\`\`\`csharp
[Route("user/{id:int}")] // id must be integer
public IActionResult GetUser(int id) { }

[Route("user/{name:alpha}")] // name must be alphabetic
public IActionResult GetUserByName(string name) { }
\`\`\`

**Example:**
\`\`\`csharp
// Convention-based
// URL: /Product/Details/5
// Maps to: ProductController.Details(5)

// Attribute routing
[Route("products")]
public class ProductController : Controller {
    [HttpGet("{id}")]
    public IActionResult Get(int id) { }
    // URL: /products/5
}
\`\`\``
  },
  {
    id: 8004,
    category: 'MVC',
    question: 'What is the difference between Session and Cookie?',
    answer: `**One-Sentence Definition:** Session stores data on the server for a user session, while Cookies store data on the client's browser.

**The Core Concept:** Session is like a locker at a gym - your stuff is stored there (server), and you get a key (session ID in cookie). Cookie is like a note you carry with you (browser) - it travels with every request. Session is server-side, Cookie is client-side.

**Key Points to Remember:**
- Session: Stored on server, identified by session ID (usually in cookie)
- Cookie: Stored on client browser, sent with every request
- Session: More secure (data not exposed), uses server memory
- Cookie: Limited size (4KB), can be disabled by user
- Session: Expires when browser closes (or timeout)
- Cookie: Can have expiration date, can be persistent

**Quick Comparison:**

| Feature | Session | Cookie |
|---------|---------|--------|
| Storage | Server | Client Browser |
| Security | More secure | Less secure |
| Size Limit | Large | 4KB |
| Data Type | Any object | String only |
| Expiration | Session timeout | Configurable |

**Example:**
\`\`\`csharp
// Session
public IActionResult Login(string username) {
    HttpContext.Session.SetString("Username", username);
    HttpContext.Session.SetInt32("UserId", 123);
    return RedirectToAction("Index");
}

// Read Session
var username = HttpContext.Session.GetString("Username");
var userId = HttpContext.Session.GetInt32("UserId");

// Cookie
Response.Cookies.Append("Username", "john", new CookieOptions {
    Expires = DateTimeOffset.Now.AddDays(7),
    HttpOnly = true, // Prevents JavaScript access
    Secure = true // HTTPS only
});

// Read Cookie
var username = Request.Cookies["Username"];

// Session vs Cookie Use Cases
// Session: User authentication, shopping cart, sensitive data
// Cookie: User preferences, tracking, non-sensitive data
\`\`\``
  }
];

