// React JS Category Notes - Comprehensive Interview Preparation
export const reactNotes = [
  {
    id: 3,
    category: 'React JS',
    question: 'What are React Hooks and why were they introduced?',
    answer: `**One-Sentence Definition:** React Hooks are functions that let you "hook into" React state and lifecycle features from function components without writing class components.

**The Core Concept:** Think of Hooks like power outlets. Before Hooks, you needed a class component (like a special adapter) to use state and lifecycle features. Hooks let function components plug directly into React's power (state, effects, context) without needing that adapter. It's like having universal outlets that work everywhere.

**Key Points to Remember:**
- Allow function components to use state and lifecycle methods
- Reduce code complexity and improve reusability
- Eliminate the need for class components in most cases
- Better code organization and logic sharing
- Must be called at the top level (not in loops, conditions, or nested functions)
- Follow naming convention: start with "use" (useState, useEffect, etc.)

**Common Hooks:**
- **useState**: Manages component state
- **useEffect**: Handles side effects (like API calls, subscriptions)
- **useContext**: Accesses React context
- **useReducer**: Manages complex state logic
- **useMemo**: Memoizes expensive calculations
- **useCallback**: Memoizes functions

**Example:**
\`\`\`javascript
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\``
  },
  {
    id: 4,
    category: 'React JS',
    question: 'Explain the Virtual DOM in React',
    answer: `**One-Sentence Definition:** The Virtual DOM is a lightweight JavaScript representation of the real DOM that React uses to optimize updates by comparing changes before applying them to the actual DOM.

**The Core Concept:** Think of Virtual DOM like a blueprint. Instead of directly modifying a building (real DOM), you first update the blueprint (Virtual DOM), compare it with the old blueprint, identify what changed, and then make only those specific changes to the actual building. This is much more efficient than rebuilding everything.

**How it works:**
1. React creates a virtual representation of the DOM in memory
2. When state changes, React creates a new virtual DOM tree
3. React compares (diffs) the new tree with the previous one
4. React updates only the changed nodes in the real DOM (reconciliation)

**Benefits:**
- Improved performance by minimizing direct DOM manipulation
- Declarative programming model
- Better developer experience
- Cross-browser compatibility
- Batch updates for efficiency

**Example:**
When you update state, React doesn't immediately update the DOM. Instead, it:
1. Updates the Virtual DOM
2. Compares with previous Virtual DOM (diffing algorithm)
3. Calculates the minimal set of changes
4. Updates only those parts of the real DOM

**Why Interviewers Ask This:**
Understanding Virtual DOM shows you know how React optimizes performance and why it's faster than direct DOM manipulation.`
  },
  {
    id: 5,
    category: 'React JS',
    question: 'What is the difference between controlled and uncontrolled components?',
    answer: `**One-Sentence Definition:** Controlled components have their value controlled by React state, while uncontrolled components store their value in the DOM and are accessed via refs.

**The Core Concept:** Controlled components are like a remote-controlled car - React (the remote) controls everything. Uncontrolled components are like a regular car - you drive it directly (DOM controls it), and you check the dashboard (refs) to see what's happening.

**Key Differences:**

| Feature | Controlled | Uncontrolled |
|---------|-----------|--------------|
| Value Source | React state | DOM |
| Updates | Via setState | Via DOM events |
| Access Value | From state | Via ref |
| Validation | Easy (in state) | Harder (need ref) |
| Use Case | Most forms | Simple forms, file inputs |

**Example - Controlled:**
\`\`\`javascript
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}
\`\`\`

**Example - Uncontrolled:**
\`\`\`javascript
function UncontrolledInput() {
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return <input ref={inputRef} defaultValue="initial" />;
}
\`\`\`

**When to use:**
- Controlled: Most cases, better for validation and form handling
- Uncontrolled: Simple forms, integrating with non-React code, file inputs`
  },
  {
    id: 6,
    category: 'React JS',
    question: 'What is the difference between useState and useReducer?',
    answer: `**One-Sentence Definition:** useState is for simple state management with direct value updates, while useReducer is for complex state logic with multiple sub-values and predictable state transitions.

**The Core Concept:** useState is like a simple light switch - on or off. useReducer is like a complex control panel with multiple switches, dials, and buttons that need to work together in specific ways. When you have many related state updates, useReducer helps manage them predictably.

**Key Differences:**

| Feature | useState | useReducer |
|---------|----------|------------|
| Complexity | Simple state | Complex state |
| Updates | Direct setter | Action-based |
| Predictability | Less predictable | More predictable |
| Testing | Harder | Easier |
| Use Case | Single values | Multiple related values |

**Example - useState:**
\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
\`\`\`

**Example - useReducer:**
\`\`\`javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
\`\`\`

**When to use useReducer:**
- Complex state logic with multiple sub-values
- Next state depends on previous state
- Need predictable state transitions
- Easier to test and debug`
  },
  {
    id: 7,
    category: 'React JS',
    question: 'What is the purpose of useEffect hook?',
    answer: `**One-Sentence Definition:** useEffect lets you perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM, similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.

**The Core Concept:** Think of useEffect as a way to "do something" after React has updated the DOM. It's like a post-it note that says "after rendering, do this." You can also clean up (like unsubscribing) when the component unmounts or before the effect runs again.

**Key Points to Remember:**
- Runs after every render by default
- Can return a cleanup function
- Dependency array controls when it runs
- Empty array [] = runs once (like componentDidMount)
- No array = runs on every render
- Array with values = runs when those values change

**Common Use Cases:**
- Data fetching
- Setting up subscriptions
- Manually changing the DOM
- Timers and intervals
- Cleanup operations

**Example:**
\`\`\`javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Fetch data
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
    
    // Cleanup function
    return () => {
      // Cancel request if component unmounts
    };
  }, [userId]); // Only re-run if userId changes
  
  return <div>{user?.name}</div>;
}
\`\`\`

**Cleanup Example:**
\`\`\`javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  // Cleanup: clear interval when component unmounts
  return () => clearInterval(timer);
}, []); // Run once on mount
\`\`\``
  },
  {
    id: 8,
    category: 'React JS',
    question: 'What is the difference between useMemo and useCallback?',
    answer: `**One-Sentence Definition:** useMemo memoizes the result of a computation, while useCallback memoizes a function itself to prevent unnecessary re-creations.

**The Core Concept:** useMemo is like caching a calculation result - you remember the answer so you don't recalculate. useCallback is like remembering a recipe - you keep the same recipe (function) so you don't create a new one each time. Both prevent unnecessary work, but for different things.

**Key Differences:**

| Feature | useMemo | useCallback |
|---------|---------|-------------|
| Memoizes | Computed values | Functions |
| Returns | Memoized value | Memoized function |
| Use Case | Expensive calculations | Function references |
| Example | Filtered list | Event handlers |

**Example - useMemo:**
\`\`\`javascript
function ExpensiveComponent({ items, filter }) {
  // Expensive calculation - only runs when items or filter changes
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  return <div>{filteredItems.map(item => <div key={item.id}>{item.name}</div>)}</div>;
}
\`\`\`

**Example - useCallback:**
\`\`\`javascript
function Parent({ items }) {
  const [count, setCount] = useState(0);
  
  // Memoize function so Child doesn't re-render unnecessarily
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = function never changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child items={items} onClick={handleClick} />
    </div>
  );
}

const Child = React.memo(({ items, onClick }) => {
  return <div onClick={onClick}>{items.length} items</div>;
});
\`\`\`

**When to use:**
- useMemo: Expensive calculations, derived state
- useCallback: Passing functions to memoized children, preventing unnecessary re-renders`
  },
  {
    id: 9,
    category: 'React JS',
    question: 'What is React.memo and when should you use it?',
    answer: `**One-Sentence Definition:** React.memo is a higher-order component that memoizes a component, preventing re-renders when props haven't changed.

**The Core Concept:** Think of React.memo like a smart cache. If you show someone the same picture (same props), you don't need to redraw it - just show the cached version. React.memo does the same - if props are the same, it skips re-rendering and uses the cached result.

**Key Points to Remember:**
- Only does shallow comparison by default
- Can provide custom comparison function
- Prevents unnecessary re-renders
- Use for expensive components
- Don't overuse - has its own overhead

**Example:**
\`\`\`javascript
// Without React.memo - re-renders on every parent update
function ExpensiveComponent({ data }) {
  // Expensive rendering logic
  return <div>{/* complex rendering */}</div>;
}

// With React.memo - only re-renders if props change
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{/* complex rendering */}</div>;
});

// Custom comparison
const ExpensiveComponent = React.memo(
  function ExpensiveComponent({ data }) {
    return <div>{/* complex rendering */}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.data.id === nextProps.data.id;
  }
);
\`\`\`

**When to use:**
- Component renders frequently with same props
- Component is expensive to render
- Parent re-renders often but props don't change
- Performance optimization needed

**When NOT to use:**
- Props change frequently anyway
- Component is cheap to render
- Premature optimization`
  },
  {
    id: 10,
    category: 'React JS',
    question: 'What is the difference between useRef and useState?',
    answer: `**One-Sentence Definition:** useState triggers re-renders when the value changes, while useRef doesn't trigger re-renders and persists across renders.

**The Core Concept:** useState is like a public announcement - when it changes, everyone (the component) knows and reacts. useRef is like a private notebook - you can write in it, but it doesn't notify anyone. It's perfect for storing values you need but don't want to cause re-renders.

**Key Differences:**

| Feature | useState | useRef |
|---------|----------|--------|
| Re-renders | Yes, when value changes | No |
| Persistence | Yes, across renders | Yes, across renders |
| Use Case | UI state | DOM refs, mutable values |
| Access | Via state variable | Via .current property |

**Example - useState:**
\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // Component re-renders when count changes
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

**Example - useRef:**
\`\`\`javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(intervalRef.current);
  }, []);
  
  // intervalRef.current doesn't cause re-renders
  return <div>{seconds}</div>;
}

// DOM ref example
function InputFocus() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus(); // Direct DOM manipulation
  };
  
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}
\`\`\`

**When to use useRef:**
- Accessing DOM elements
- Storing mutable values that don't need re-renders
- Storing previous values
- Timer IDs, interval IDs`
  },
  {
    id: 11,
    category: 'React JS',
    question: 'What is Context API and when should you use it?',
    answer: `**One-Sentence Definition:** Context API provides a way to pass data through the component tree without having to pass props down manually at every level (prop drilling).

**The Core Concept:** Think of Context like a public bulletin board. Instead of passing a message through many people (prop drilling), you post it on the board (Context), and anyone who needs it can read it directly. It's like a shortcut for data that many components need.

**Key Points to Remember:**
- Avoids prop drilling
- Can cause performance issues if overused
- Use for theme, authentication, language
- Combine with useMemo for optimization
- Not a replacement for state management libraries

**Example:**
\`\`\`javascript
// Create Context
const ThemeContext = React.createContext('light');

// Provider
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer (using useContext hook)
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button 
      style={{ background: theme === 'light' ? '#fff' : '#000' }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle Theme
    </button>
  );
}
\`\`\`

**When to use:**
- Data needed by many components at different levels
- Theme, authentication, language preferences
- Avoiding prop drilling

**When NOT to use:**
- Data only needed by few components
- Frequently changing data (performance issues)
- Complex state management (use Redux, Zustand, etc.)`
  },
  {
    id: 12,
    category: 'React JS',
    question: 'What are Higher-Order Components (HOCs)?',
    answer: `**One-Sentence Definition:** Higher-Order Components are functions that take a component and return a new component with additional functionality.

**The Core Concept:** Think of HOCs like wrapping a gift. You take a component (the gift), wrap it with additional functionality (the wrapping paper and bow), and get a new enhanced component. It's a pattern for reusing component logic.

**Key Points to Remember:**
- Function that takes a component, returns a component
- Used for code reuse and logic sharing
- Don't modify the original component
- Common pattern before Hooks (still useful)
- Examples: withRouter, connect (Redux)

**Example:**
\`\`\`javascript
// HOC that adds loading functionality
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage
const UserListWithLoading = withLoading(UserList);

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  
  return <UserListWithLoading isLoading={loading} users={users} />;
}

// Authentication HOC
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user } = useContext(AuthContext);
    
    if (!user) {
      return <div>Please log in</div>;
    }
    
    return <Component {...props} user={user} />;
  };
}
\`\`\`

**HOCs vs Hooks:**
- HOCs: Wrap components, can be harder to compose
- Hooks: Extract logic, easier to compose and test
- Modern React prefers Hooks for most use cases`
  },
  {
    id: 13,
    category: 'React JS',
    question: 'What is the difference between React.PureComponent and React.Component?',
    answer: `**One-Sentence Definition:** PureComponent automatically implements shouldComponentUpdate with a shallow prop and state comparison, while Component requires manual implementation of shouldComponentUpdate.

**The Core Concept:** Think of PureComponent as a smart component that automatically checks if it needs to update. Regular Component is like a worker who always does the job - PureComponent is like a worker who first checks if the job actually needs doing, saving effort when nothing changed.

**Key Differences:**

| Feature | Component | PureComponent |
|---------|-----------|---------------|
| shouldComponentUpdate | Manual | Automatic (shallow comparison) |
| Performance | Re-renders always | Skips if props/state unchanged |
| Use Case | Default choice | Performance optimization |
| Comparison | N/A | Shallow (reference equality) |

**Example:**
\`\`\`javascript
// Regular Component - always re-renders
class RegularCounter extends React.Component {
  render() {
    console.log('RegularCounter rendered');
    return <div>{this.props.count}</div>;
  }
}

// PureComponent - only re-renders if props/state change
class PureCounter extends React.PureComponent {
  render() {
    console.log('PureCounter rendered');
    return <div>{this.props.count}</div>;
  }
}

// Parent component
function App() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setOther(other + 1)}>Other: {other}</button>
      {/* RegularCounter re-renders on every parent update */}
      <RegularCounter count={count} />
      {/* PureCounter only re-renders when count changes */}
      <PureCounter count={count} />
    </div>
  );
}
\`\`\`

**Important Notes:**
- PureComponent does shallow comparison
- Works best with immutable data
- Can miss updates if you mutate objects/arrays
- Function components: use React.memo instead`
  },
  {
    id: 14,
    category: 'React JS',
    question: 'What are React Portals and when should you use them?',
    answer: `**One-Sentence Definition:** React Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

**The Core Concept:** Think of Portals like a magic door. Normally, components render inside their parent (like rooms in a house). Portals let you render a component in a completely different location (like a window that shows a different room). Perfect for modals, tooltips, and overlays that need to break out of their container.

**Key Points to Remember:**
- Renders children outside parent DOM hierarchy
- Event bubbling still works through React tree
- Useful for modals, tooltips, popovers
- Helps with z-index and overflow issues
- Maintains React component tree structure

**Example:**
\`\`\`javascript
import { createPortal } from 'react-dom';

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body // Render into body, not parent
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div style={{ overflow: 'hidden' }}>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {/* Modal renders in body, not inside this div */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Modal Content</h2>
        <p>This renders outside the parent's DOM hierarchy</p>
      </Modal>
    </div>
  );
}
\`\`\`

**When to use:**
- Modals and dialogs
- Tooltips and popovers
- Breaking out of overflow: hidden
- Z-index issues
- Full-screen overlays`
  },
  {
    id: 15,
    category: 'React JS',
    question: 'What is the purpose of keys in React lists?',
    answer: `**One-Sentence Definition:** Keys help React identify which items have changed, been added, or removed, enabling efficient updates to the list.

**The Core Concept:** Think of keys like ID badges. When you have a list of people, you use their ID badges (keys) to tell them apart. React uses keys to track which list items are which, so when the list changes, it knows exactly what to update, add, or remove without re-rendering everything.

**Key Points to Remember:**
- Must be unique among siblings
- Help React identify items efficiently
- Should be stable (don't use index if list can reorder)
- Improve performance of list updates
- Required when rendering lists

**Example - Good Keys:**
\`\`\`javascript
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li> // Stable, unique ID
      ))}
    </ul>
  );
}
\`\`\`

**Example - Bad Keys (using index):**
\`\`\`javascript
function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li> // Bad if list can reorder
      ))}
    </ul>
  );
}
\`\`\`

**Why Keys Matter:**
- Without keys, React may re-render all items
- With keys, React can efficiently update only changed items
- Prevents bugs when list items have state
- Improves performance for large lists

**Best Practices:**
- Use unique, stable IDs when possible
- Don't use index if items can be reordered
- Don't generate keys in render (creates new keys each time)`
  },
  {
    id: 16,
    category: 'React JS',
    question: 'What is the difference between Element and Component in React?',
    answer: `**One-Sentence Definition:** An Element is a plain object describing what you want to see on screen, while a Component is a function or class that returns Elements.

**The Core Concept:** Think of an Element as a blueprint (a description of a house), and a Component as an architect (someone who creates blueprints). The Element is the "what" (description), the Component is the "who" (the creator of descriptions).

**Key Differences:**

| Feature | Element | Component |
|---------|---------|-----------|
| Type | Plain object | Function or class |
| Immutable | Yes | No (can have state) |
| Cost | Cheap to create | Can be expensive |
| Example | { type: 'div', props: {} } | function Button() {} |

**Example:**
\`\`\`javascript
// Element - plain object
const element = <h1>Hello, world!</h1>;
// React.createElement('h1', null, 'Hello, world!')
// Results in: { type: 'h1', props: { children: 'Hello, world!' } }

// Component - function that returns elements
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using component creates element
const element = <Welcome name="Sara" />;
// React.createElement(Welcome, { name: 'Sara' })
\`\`\`

**Important Notes:**
- Elements are immutable
- Components can have state and lifecycle
- JSX compiles to React.createElement() calls
- Components must return elements (or null)`
  },
  {
    id: 17,
    category: 'React JS',
    question: 'What is React Fiber?',
    answer: `**One-Sentence Definition:** React Fiber is the reconciliation algorithm rewrite that enables incremental rendering, allowing React to split work into chunks and prioritize updates.

**The Core Concept:** Think of React Fiber like a smart task manager. Old React was like doing all tasks in one go (blocking). Fiber is like breaking tasks into small pieces, doing high-priority ones first, pausing when needed, and resuming later. This makes the UI more responsive.

**Key Points to Remember:**
- Rewrite of React's reconciliation algorithm
- Enables incremental rendering
- Can pause, abort, or reuse work
- Assigns priority to different types of updates
- Improves perceived performance
- Enables features like Suspense and Concurrent Mode

**Benefits:**
- Better performance for complex UIs
- Ability to interrupt and resume work
- Priority-based updates
- Better user experience (no blocking)
- Enables concurrent features

**How It Works:**
1. Breaks work into units (fiber nodes)
2. Can pause work to handle high-priority updates
3. Can reuse completed work
4. Can abort work if no longer needed
5. Prioritizes user-visible updates

**Example:**
\`\`\`javascript
// Fiber enables features like:
// 1. Concurrent Mode
ReactDOM.createRoot(root).render(<App />);

// 2. Suspense
<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>

// 3. Priority-based updates
startTransition(() => {
  setNonUrgentState(newValue);
});
\`\`\`

**Why Interviewers Ask This:**
Shows understanding of React's internal architecture and how it achieves better performance and user experience.`
  },
  {
    id: 18,
    category: 'React JS',
    question: 'What are Custom Hooks and how do you create them?',
    answer: `**One-Sentence Definition:** Custom Hooks are JavaScript functions that start with "use" and can call other Hooks, allowing you to extract and reuse stateful logic between components.

**The Core Concept:** Think of Custom Hooks like creating your own tool. Instead of using the same set of basic tools (Hooks) in every component, you combine them into a specialized tool (Custom Hook) that does exactly what you need, and you can reuse it anywhere.

**Key Points to Remember:**
- Must start with "use"
- Can call other Hooks
- Share stateful logic between components
- Each component using a custom hook has independent state
- Follow Hooks rules (top level, etc.)

**Example - Custom Hook:**
\`\`\`javascript
// Custom hook for API data fetching
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Usage in component
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(\`/api/users/\${userId}\`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{user.name}</div>;
}

// Another custom hook - localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}
\`\`\`

**Benefits:**
- Code reuse
- Separation of concerns
- Easier testing
- Cleaner components
- Share logic across components`
  },
  {
    id: 19,
    category: 'React JS',
    question: 'What is the difference between props and state?',
    answer: `**One-Sentence Definition:** Props are data passed from parent to child (read-only), while state is data managed within a component that can change over time.

**The Core Concept:** Think of props like instructions given to you (you can't change them), and state like your own notes (you can update them). Props come from outside (parent), state is internal to the component.

**Key Differences:**

| Feature | Props | State |
|---------|-------|-------|
| Source | Parent component | Component itself |
| Mutability | Read-only | Mutable (via setState) |
| Purpose | Pass data down | Manage component data |
| Can change | No (by component) | Yes |
| Initial value | From parent | Defined in component |

**Example:**
\`\`\`javascript
// Props - passed from parent
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>; // Read-only
}

// State - managed internally
function Counter() {
  const [count, setCount] = useState(0); // Can change
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Combining both
function UserCard({ userId }) { // Props
  const [user, setUser] = useState(null); // State
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return <div>{user?.name}</div>;
}
\`\`\`

**Rules:**
- Props are read-only (don't modify in child)
- State updates trigger re-renders
- Lift state up when multiple components need it
- Use props for configuration, state for interactivity`
  },
  {
    id: 20,
    category: 'React JS',
    question: 'What is React Suspense and how does it work?',
    answer: `**One-Sentence Definition:** React Suspense lets components "wait" for something (like data loading) before rendering, displaying a fallback UI in the meantime.

**The Core Concept:** Think of Suspense like a loading screen at a restaurant. While your food is being prepared (data loading), you see a "Please wait" message (fallback). When ready, you get your food (content). Suspense does this for React components.

**Key Points to Remember:**
- Shows fallback while waiting
- Works with React.lazy for code splitting
- Can wrap multiple components
- Enables better loading states
- Part of Concurrent React

**Example - Code Splitting:**
\`\`\`javascript
import { Suspense, lazy } from 'react';

// Lazy load component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

**Example - Data Fetching (with libraries):**
\`\`\`javascript
// With React Query or similar
function UserProfile({ userId }) {
  const { data: user } = useQuery(['user', userId], () => fetchUser(userId));
  
  return <div>{user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile userId={1} />
    </Suspense>
  );
}
\`\`\`

**Benefits:**
- Better loading UX
- Declarative loading states
- Works with code splitting
- Can nest multiple Suspense boundaries
- Part of Concurrent React features`
  },
  {
    id: 21,
    category: 'React JS',
    question: 'What is the purpose of React.Fragment?',
    answer: `**One-Sentence Definition:** React.Fragment lets you group multiple elements without adding an extra DOM node, useful when you need to return multiple elements from a component.

**The Core Concept:** Think of Fragment like an invisible container. Normally, you need a box (div) to group items. Fragment is like an invisible box - it groups items but doesn't show up in the final result. Perfect when you don't want extra DOM elements.

**Key Points to Remember:**
- Groups elements without extra DOM node
- Shorthand syntax: <> </>
- Can have keys when needed
- Useful for lists, conditional rendering
- Cleaner DOM structure

**Example:**
\`\`\`javascript
// Without Fragment - adds extra div
function List() {
  return (
    <div>
      <Item />
      <Item />
      <Item />
    </div>
  );
}

// With Fragment - no extra DOM node
function List() {
  return (
    <>
      <Item />
      <Item />
      <Item />
    </>
  );
}

// With keys (must use full syntax)
function List({ items }) {
  return (
    <>
      {items.map(item => (
        <React.Fragment key={item.id}>
          <td>{item.name}</td>
          <td>{item.value}</td>
        </React.Fragment>
      ))}
    </>
  );
}
\`\`\`

**When to use:**
- Returning multiple elements
- Conditional rendering
- Lists with keys
- Avoiding wrapper divs
- Cleaner DOM structure`
  },
  {
    id: 22,
    category: 'React JS',
    question: 'What is the difference between class components and function components?',
    answer: `**One-Sentence Definition:** Class components use ES6 classes and have access to lifecycle methods and state, while function components are simpler JavaScript functions that use Hooks for state and effects.

**The Core Concept:** Think of class components like a full-featured car with all the controls (lifecycle methods, state). Function components are like a simpler car, but with Hooks, you can add the same features. Modern React prefers function components for simplicity.

**Key Differences:**

| Feature | Class Component | Function Component |
|---------|----------------|-------------------|
| Syntax | ES6 class | JavaScript function |
| State | this.state | useState hook |
| Lifecycle | componentDidMount, etc. | useEffect hook |
| this binding | Required | Not needed |
| Code | More verbose | More concise |
| Modern | Legacy (still works) | Preferred |

**Example - Class Component:**
\`\`\`javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
  }
  
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  
  componentDidMount() {
    console.log('Mounted');
  }
  
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}
\`\`\`

**Example - Function Component:**
\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Mounted');
  }, []);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
\`\`\`

**Modern React:**
- Function components are preferred
- Hooks provide all class component features
- Simpler, more readable code
- Better performance optimizations
- Easier to test and maintain`
  },
  {
    id: 23,
    category: 'React JS',
    question: 'What is React Router and how does it work?',
    answer: `**One-Sentence Definition:** React Router is a library for routing in React applications, enabling navigation between different views/components based on the URL.

**The Core Concept:** Think of React Router like a GPS for your app. Different URLs (addresses) take you to different places (components). React Router watches the URL and shows the right component for that address, making your single-page app feel like multiple pages.

**Key Concepts:**
- BrowserRouter: Uses HTML5 history API
- Routes: Define URL paths
- Route: Maps path to component
- Link: Navigation without page reload
- useNavigate/useHistory: Programmatic navigation
- useParams: Access route parameters

**Example:**
\`\`\`javascript
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserDetail() {
  const { id } = useParams(); // Get route parameter
  return <div>User ID: {id}</div>;
}

function Users() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/users/123')}>
      Go to User 123
    </button>
  );
}
\`\`\`

**Common Patterns:**
- Nested routes
- Protected routes (authentication)
- Route parameters
- Query strings
- Programmatic navigation`
  },
  {
    id: 24,
    category: 'React JS',
    question: 'What are React Error Boundaries?',
    answer: `**One-Sentence Definition:** Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app.

**The Core Concept:** Think of Error Boundaries like safety nets. If something goes wrong in a component (like a trapeze artist falling), the error boundary catches it and shows a safe landing (fallback UI) instead of the whole show crashing. It's React's way of graceful error handling.

**Key Points to Remember:**
- Class components only (or use react-error-boundary library)
- Catch errors in child components
- Display fallback UI
- Don't catch errors in event handlers, async code, or during rendering
- Can have multiple error boundaries

**Example:**
\`\`\`javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
\`\`\`

**What They Catch:**
- Rendering errors
- Lifecycle method errors
- Constructor errors

**What They DON'T Catch:**
- Event handlers
- Async code (setTimeout, promises)
- Server-side rendering errors
- Errors in the error boundary itself`
  },
  {
    id: 25,
    category: 'React JS',
    question: 'What is the purpose of useLayoutEffect?',
    answer: `**One-Sentence Definition:** useLayoutEffect is similar to useEffect, but it runs synchronously after all DOM mutations, before the browser paints, useful for measurements and DOM manipulations that need to happen before the user sees the update.

**The Core Concept:** Think of useEffect like painting a room after moving furniture (async, user might see the transition). useLayoutEffect is like moving furniture before anyone enters (synchronous, happens before the user sees anything). Use it when you need to measure or change the DOM before the browser paints.

**Key Differences:**

| Feature | useEffect | useLayoutEffect |
|---------|-----------|-----------------|
| Timing | After paint | Before paint |
| Blocking | Non-blocking | Blocking |
| Use Case | Most side effects | DOM measurements |
| Performance | Better | Can block rendering |

**Example:**
\`\`\`javascript
function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  
  useLayoutEffect(() => {
    // Measure before browser paints
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 30,
        left: rect.left
      });
    }
  }, [text]);
  
  return (
    <div>
      {children}
      <div 
        ref={tooltipRef}
        style={{ position: 'absolute', ...position }}
      >
        {text}
      </div>
    </div>
  );
}
\`\`\`

**When to use useLayoutEffect:**
- DOM measurements
- Preventing visual flicker
- Synchronous DOM updates
- When you need values before paint

**When to use useEffect:**
- Data fetching
- Subscriptions
- Most side effects
- When timing doesn't matter`
  },
  {
    id: 26,
    category: 'React JS',
    question: 'What is code splitting in React?',
    answer: `**One-Sentence Definition:** Code splitting is a technique to split your JavaScript bundle into smaller chunks that are loaded on-demand, reducing initial load time and improving performance.

**The Core Concept:** Think of code splitting like a restaurant menu. Instead of bringing all dishes at once (loading all code), you bring dishes as customers order them (load code when needed). This makes the initial service faster and more efficient.

**Key Points to Remember:**
- Reduces initial bundle size
- Loads code on-demand
- Improves performance
- Better user experience
- Uses React.lazy and Suspense

**Methods:**

**1. Route-based splitting:**
\`\`\`javascript
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

**2. Component-based splitting:**
\`\`\`javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  const [showHeavy, setShowHeavy] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>Load Heavy</button>
      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
\`\`\`

**Benefits:**
- Faster initial load
- Better performance
- Reduced bundle size
- Improved user experience
- Load only what's needed`
  },
  {
    id: 27,
    category: 'React JS',
    question: 'What is the difference between shallow and deep comparison?',
    answer: `**One-Sentence Definition:** Shallow comparison checks if two objects have the same references, while deep comparison checks if all nested properties and values are equal.

**The Core Concept:** Think of shallow comparison like comparing two houses by their addresses (references). Deep comparison is like going inside and checking every room, furniture, and detail. Shallow is fast but can miss changes; deep is thorough but slower.

**Key Differences:**

| Feature | Shallow | Deep |
|---------|---------|------|
| Checks | References only | All nested values |
| Speed | Fast | Slow |
| Use Case | React.memo, PureComponent | Custom comparisons |
| Example | obj1 === obj2 | Deep equality check |

**Example:**
\`\`\`javascript
// Shallow comparison
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = obj1;

console.log(obj1 === obj2); // false (different references)
console.log(obj1 === obj3); // true (same reference)

// Shallow comparison in React
const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
  // Shallow comparison by default
  return prevProps.user.id === nextProps.user.id; // Only checks top level
});

// Deep comparison (manual)
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || obj1 === null) return false;
  if (typeof obj2 !== 'object' || obj2 === null) return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
}
\`\`\`

**In React:**
- React.memo uses shallow comparison
- PureComponent uses shallow comparison
- For deep comparison, use custom comparison function
- Prefer immutable updates to avoid deep comparison needs`
  },
  {
    id: 28,
    category: 'React JS',
    question: 'What are React Server Components?',
    answer: `**One-Sentence Definition:** React Server Components are components that render on the server, allowing you to build apps that combine server-rendered and client-rendered components for optimal performance.

**The Core Concept:** Think of Server Components like a restaurant kitchen. Some preparation happens in the kitchen (server) before serving, while some happens at the table (client). Server Components do heavy work on the server, sending only the results to the client, making apps faster.

**Key Points to Remember:**
- Render on the server
- Zero bundle size (don't ship to client)
- Can access server resources directly
- Can't use browser APIs or state
- Work alongside Client Components
- Part of React 18+ and Next.js 13+

**Benefits:**
- Reduced JavaScript bundle
- Direct database/API access
- Better performance
- Improved security (secrets stay on server)
- Faster initial load

**Example:**
\`\`\`javascript
// Server Component (Next.js 13+)
// app/users/page.js
async function UsersPage() {
  // Direct database access on server
  const users = await db.users.findMany();
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// Client Component (marked with 'use client')
'use client';
function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

**When to use:**
- Server Components: Data fetching, static content, server-only logic
- Client Components: Interactivity, browser APIs, state, effects`
  },
  {
    id: 29,
    category: 'React JS',
    question: 'What is the purpose of useImperativeHandle?',
    answer: `**One-Sentence Definition:** useImperativeHandle customizes the instance value that is exposed when using ref, allowing parent components to access specific methods or properties of a child component.

**The Core Concept:** Think of useImperativeHandle like a controlled interface. Normally, a ref gives you full access (like a master key). useImperativeHandle lets you create a limited key that only opens specific doors (exposes only what you want), giving you control over what the parent can access.

**Key Points to Remember:**
- Used with forwardRef
- Customizes ref value
- Exposes specific methods/properties
- Limits parent access
- Use sparingly (breaks encapsulation)

**Example:**
\`\`\`javascript
// Child component
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    scrollIntoView: () => {
      inputRef.current.scrollIntoView();
    },
    // Don't expose inputRef.current directly
  }));
  
  return <input ref={inputRef} {...props} />;
});

// Parent component
function Form() {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    inputRef.current.focus(); // Only focus method is available
    // inputRef.current.value is NOT accessible
  };
  
  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
\`\`\`

**When to use:**
- Exposing specific methods to parent
- Limiting ref access
- Creating imperative APIs
- Library development

**When NOT to use:**
- Most cases (prefer declarative props)
- Breaks component encapsulation
- Makes components harder to reason about`
  },
  {
    id: 30,
    category: 'React JS',
    question: 'What is the difference between useCallback and useMemo?',
    answer: `**One-Sentence Definition:** useCallback memoizes a function to prevent recreation on every render, while useMemo memoizes the result of a computation to avoid recalculating it.

**The Core Concept:** useCallback is like saving a recipe card (the function itself), while useMemo is like saving the cooked meal (the result). Both prevent unnecessary work, but one saves the process (function), the other saves the outcome (value).

**Key Differences:**

| Feature | useCallback | useMemo |
|---------|-------------|---------|
| Memoizes | Function | Computed value |
| Returns | Function reference | Computed value |
| Use Case | Event handlers, props | Expensive calculations |
| Dependencies | Same as useMemo | Same as useCallback |

**Example - useCallback:**
\`\`\`javascript
function Parent({ items }) {
  const [count, setCount] = useState(0);
  
  // Memoize function - same reference unless deps change
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = never changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child items={items} onClick={handleClick} />
    </div>
  );
}

const Child = React.memo(({ items, onClick }) => {
  // Won't re-render when count changes (onClick reference is stable)
  return <div onClick={onClick}>{items.length} items</div>;
});
\`\`\`

**Example - useMemo:**
\`\`\`javascript
function ExpensiveList({ items, filter }) {
  // Memoize computed value - only recalculates when items or filter change
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Expensive filtering operation
      return item.category === filter && item.price > 100;
    });
  }, [items, filter]);
  
  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
\`\`\`

**When to use:**
- useCallback: Passing functions to memoized children, preventing re-renders
- useMemo: Expensive calculations, derived state, object/array creation

**Performance Note:**
- Both have overhead - don't overuse
- Only use when you have a performance problem
- Measure before optimizing`
  },
  {
    id: 31,
    category: 'React JS',
    question: 'What is React.StrictMode and why is it used?',
    answer: `**One-Sentence Definition:** React.StrictMode is a development tool that highlights potential problems in your application by intentionally double-invoking certain functions and detecting unsafe lifecycles.

**The Core Concept:** Think of StrictMode like a strict teacher. It intentionally does things twice (like rendering) to help you find bugs. It's like a safety inspector that checks your code more thoroughly, but only in development - it doesn't affect production.

**Key Points to Remember:**
- Development tool only (no effect in production)
- Intentionally double-invokes functions
- Detects unsafe lifecycles
- Warns about deprecated APIs
- Helps identify side effects

**What It Does:**
- Double-invokes render methods
- Double-invokes state updater functions
- Detects legacy string refs
- Warns about deprecated findDOMNode
- Detects unexpected side effects

**Example:**
\`\`\`javascript
function App() {
  return (
    <React.StrictMode>
      <MyComponent />
    </React.StrictMode>
  );
}

function MyComponent() {
  useEffect(() => {
    console.log('Effect runs'); // Logs twice in dev (StrictMode)
    
    return () => {
      console.log('Cleanup'); // Also runs twice
    };
  }, []);
  
  return <div>Hello</div>;
}
\`\`\`

**Why It's Useful:**
- Finds bugs early
- Ensures components are pure
- Detects side effects
- Helps prepare for Concurrent React
- Better development experience

**Important:**
- Only runs in development
- Doesn't affect production builds
- Helps write better React code`
  },
  {
    id: 32,
    category: 'React JS',
    question: 'What is the purpose of React.lazy?',
    answer: `**One-Sentence Definition:** React.lazy allows you to dynamically import and render a component only when it's needed, enabling code splitting and reducing initial bundle size.

**The Core Concept:** Think of React.lazy like on-demand delivery. Instead of loading everything upfront (large bundle), you order components when needed (lazy load). It's like a restaurant that prepares dishes when ordered, not all at once.

**Key Points to Remember:**
- Dynamic import of components
- Must be used with Suspense
- Reduces initial bundle size
- Loads components on-demand
- Improves performance

**Example:**
\`\`\`javascript
import { lazy, Suspense } from 'react';

// Lazy load component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Multiple lazy components
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

**Benefits:**
- Smaller initial bundle
- Faster page load
- Load only what's needed
- Better performance
- Improved user experience

**Requirements:**
- Must use with Suspense
- Component must have default export
- Works with dynamic imports`
  }
];
