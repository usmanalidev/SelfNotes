# Interview Prep Notes App

A modern, beautiful Notes frontend web application built with React and Ant Design for organizing personal study notes in a question-answer format.

## Features

- 📝 **Category-based Organization**: Organize notes by categories (.NET, React JS, Angular, C#, SQL, Microservices)
- 🎨 **Beautiful UI**: Clean, modern interface with Ant Design components
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔍 **Collapsible Sidebar**: Easy navigation with collapsible sidebar menu
- ➕ **Add/Edit Notes**: Modal form for adding and editing notes
- 💾 **Local State Management**: Notes stored in React state (ready for backend integration)
- 📚 **Sample Data**: Pre-loaded example notes for .NET, React, and SQL

## Tech Stack

- **React 18** - Functional components with hooks
- **Ant Design 5** - UI component library
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling and animations

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## Project Structure

```
interview-prep-app/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Sidebar with categories menu
│   │   ├── NotesDisplay.jsx     # Notes display with Collapse/Accordion
│   │   └── AddNoteModal.jsx     # Modal for adding/editing notes
│   ├── data/
│   │   └── sampleNotes.js       # Sample notes data
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Custom styles
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                    # This file
```

## Usage

### Viewing Notes

1. Click on a category in the sidebar to filter notes
2. Click "All Notes" to view all notes
3. Click on a question to expand and view the answer
4. Use the collapse button (☰) to collapse/expand the sidebar

### Adding Notes

1. Click the "Add Note" button in the header
2. Fill in the form:
   - Select a category
   - Enter a question
   - Enter an answer (supports markdown-style formatting)
3. Click "Save" to add the note

### Editing Notes

- Currently, notes can be added and will be stored in local state
- Edit functionality is ready in the code structure for future implementation

## Formatting Support

The app supports basic markdown-style formatting in answers:

- **Bold text**: Use `**text**` for bold
- **Code blocks**: Use triple backticks with language:
  ````markdown
  ```javascript
  // your code here
  ```
  ````

## Customization

### Adding New Categories

Edit `src/data/sampleNotes.js` and add a new category to the `categories` array:

```javascript
{ key: 'NewCategory', label: 'New Category', icon: 'IconName' }
```

### Styling

- Global styles: `src/index.css`
- Component styles: `src/App.css`
- Inline styles: Used in components for dynamic styling

## Future Enhancements

- [ ] Backend integration (API calls)
- [ ] Search functionality
- [ ] Delete notes
- [ ] Edit existing notes
- [ ] Export notes (PDF, Markdown)
- [ ] Tags and filtering
- [ ] Dark mode
- [ ] Local storage persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Contributing

Feel free to submit issues and enhancement requests!

