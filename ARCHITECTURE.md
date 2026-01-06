# CodeMorphix Architecture

## Project Structure

```
CodeMorphix/
├── client/          - React frontend with Tailwind CSS
├── server/          - Backend server
├── analyzer/        - Code analysis module
├── ai/              - AI processing module
└── ARCHITECTURE.md  - This file
```

## Frontend Setup

- **Tailwind CSS**: Configured in `client/src/index.css`
- **PostCSS**: Processes Tailwind with autoprefixer
- **React**: Modern React 18 with functional components

### Tailwind Integration
- All Tailwind directives in `src/index.css` only
- `src/App.css` for component-specific styling if needed
- Configuration: `tailwind.config.js`
