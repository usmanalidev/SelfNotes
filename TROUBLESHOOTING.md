# Troubleshooting - Website Not Loading

## Quick Fixes

### 1. Restart the Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 2. Clear Cache and Reinstall Dependencies
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Start the server
npm run dev
```

### 3. Check Browser Console
- Open browser Developer Tools (F12)
- Check the Console tab for errors
- Check the Network tab for failed requests

### 4. Verify Port Availability
- The app runs on port 3000 by default
- Make sure port 3000 is not in use by another application
- Check vite.config.js for port configuration

### 5. Check for Syntax Errors
- All JavaScript files should be valid
- Check for missing imports/exports
- Verify all data files are properly exported

## Common Issues

### Issue: "Cannot find module" error
**Solution:** Make sure all files in `src/data` are properly exported and imported in `sampleNotes.js`

### Issue: Blank white screen
**Solution:** 
- Check browser console for React errors
- Verify React and ReactDOM are installed: `npm list react react-dom`
- Check if ThemeContext is properly set up

### Issue: Port already in use
**Solution:** 
- Change port in `vite.config.js`:
```javascript
server: {
  port: 3001, // or any other available port
}
```

### Issue: Ant Design not loading
**Solution:**
- Verify antd is installed: `npm list antd`
- Check if @ant-design/icons is installed: `npm list @ant-design/icons`

## Verify Installation

Run these commands to verify everything is set up correctly:

```bash
# Check Node.js version (should be 14+)
node --version

# Check npm version
npm --version

# Verify dependencies
npm list --depth=0

# Check if vite is working
npx vite --version
```

## Still Not Working?

1. Check the terminal where `npm run dev` is running for error messages
2. Share the error message from browser console
3. Verify all files in `src/data` folder exist and are properly formatted
4. Make sure there are no syntax errors in any .jsx or .js files

