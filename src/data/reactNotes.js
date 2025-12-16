// React JS Category Notes
export const reactNotes = [
  {
    id: 3,
    category: 'React JS',
    question: 'What are React Hooks and why were they introduced?',
    answer: `React Hooks are functions that let you "hook into" React state and lifecycle features from function components.

**Why Hooks?**
- Allow function components to use state and lifecycle methods
- Reduce code complexity and improve reusability
- Eliminate the need for class components in most cases
- Better code organization and logic sharing

**Common Hooks:**
- **useState**: Manages component state
- **useEffect**: Handles side effects (like API calls, subscriptions)
- **useContext**: Accesses React context
- **useReducer**: Manages complex state logic

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
    answer: `The Virtual DOM is a programming concept where a virtual representation of the UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM.

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

**Example:**
When you update state, React doesn't immediately update the DOM. Instead, it:
1. Updates the Virtual DOM
2. Compares with previous Virtual DOM
3. Calculates the minimal set of changes
4. Updates only those parts of the real DOM`
  },
  {
    id: 5,
    category: 'React JS',
    question: 'What is the difference between controlled and uncontrolled components?',
    answer: `**Controlled Components:**
- Form data is handled by React component state
- Input value is controlled by React state
- Changes are handled by event handlers
- Single source of truth (React state)

**Uncontrolled Components:**
- Form data is handled by the DOM itself
- Use refs to access form values
- Default values set via defaultValue prop
- DOM is the source of truth

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
- Uncontrolled: Simple forms, integrating with non-React code`
  }
];

