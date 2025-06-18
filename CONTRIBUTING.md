# 🤝 Contributing to QuickDrop

First off, thank you for considering contributing to QuickDrop! 🎉 Your contributions help make this file sharing tool better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Contribution Types](#contribution-types)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful, inclusive, and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Ngrok** (for local testing)

### 🍴 Fork & Clone

1. **Fork the repository** by clicking the "Fork" button on GitHub
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/QuickDrop.git
   cd QuickDrop
   ```

3. **Add the original repository as upstream:**
   ```bash
   git remote add upstream https://github.com/SreeAditya-Dev/QuickDrop.git
   git remote -v
   ```

### 🛠️ Local Development Setup

1. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

3. **Start Development Servers:**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   node server.js
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

4. **Access the Application:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## 🔄 Development Workflow

### 1. 🆕 Create a Feature Branch

**Always create a new branch for your work:**
```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/add-dark-mode` - for new features
- `fix/upload-bug` - for bug fixes
- `docs/update-readme` - for documentation
- `refactor/cleanup-components` - for code refactoring

### 2. 💻 Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly

### 3. 🧪 Test Your Changes

```bash
# Frontend tests
cd frontend
npm test

# Backend tests (if available)
cd backend
npm test

# Manual testing
# Test the full application flow
```

### 4. 💾 Commit Your Changes

**Use clear, descriptive commit messages:**
```bash
git add .
git commit -m "feat: add dark mode toggle functionality

- Added theme context provider
- Created dark/light mode switcher component
- Updated all components to support themes
- Added toggle button in header

Fixes #15"
```

**Commit message format:**
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - new feature
- `fix` - bug fix
- `docs` - documentation
- `style` - formatting changes
- `refactor` - code restructuring
- `test` - adding tests
- `chore` - maintenance tasks

### 5. 🔄 Stay Up to Date

**Keep your branch updated with the latest changes:**
```bash
git fetch upstream
git rebase upstream/main
```

### 6. 📤 Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 7. 🔀 Create a Pull Request

1. Go to your fork on GitHub
2. Click **"Create Pull Request"**
3. Select:
   - **Base repository:** `SreeAditya-Dev/QuickDrop`
   - **Base branch:** `main`
   - **Head repository:** `YOUR_USERNAME/QuickDrop`
   - **Compare branch:** `feature/your-feature-name`

4. Fill out the PR template with:
   - Clear description of changes
   - Screenshots (if UI changes)
   - Testing steps
   - Related issue numbers

## 🎯 Contribution Types

### 🎨 Frontend Contributions
- **UI/UX improvements**
- **React component development**
- **Responsive design fixes**
- **Animation and interactions**
- **Accessibility improvements**

**Tech Stack:** React, TypeScript, Material-UI, Styled Components, Framer Motion

### ⚙️ Backend Contributions
- **API development**
- **Performance optimizations**
- **Security enhancements**
- **File handling improvements**
- **Error handling**

**Tech Stack:** Node.js, Express.js, Multer, Ngrok

### 📚 Documentation
- **README improvements**
- **API documentation**
- **Code comments**
- **Tutorial creation**
- **Deployment guides**

### 🧪 Testing
- **Unit tests**
- **Integration tests**
- **End-to-end tests**
- **Performance testing**

## 🔍 Pull Request Process

### ✅ Before Submitting

**Make sure your PR:**
- [ ] Has a clear, descriptive title
- [ ] Includes a detailed description of changes
- [ ] References related issues (`Fixes #123`)
- [ ] Follows the coding standards
- [ ] Includes tests (if applicable)
- [ ] Updates documentation (if needed)
- [ ] Has been tested locally
- [ ] Doesn't break existing functionality

### 📋 PR Template

Your PR should include:

```markdown
## 📋 Description
Brief description of what this PR does

## 🔗 Related Issues
Fixes #(issue number)

## 🧪 Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests pass

## 📸 Screenshots (if applicable)
Include before/after screenshots for UI changes

## 📝 Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### 🔄 Review Process

1. **Automated checks** will run (CI/CD)
2. **Maintainer review** - we'll review your code
3. **Feedback** - we may request changes
4. **Approval** - once approved, we'll merge your PR
5. **Celebration** - your contribution is now part of QuickDrop! 🎉

## 💻 Coding Standards

### 📁 File Structure
```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Helper functions
│   ├── styles/        # Styled components
│   └── types/         # TypeScript types

backend/
├── routes/            # Express routes
├── middleware/        # Custom middleware
├── utils/            # Helper functions
└── uploads/          # Temporary file storage
```

### 🎨 Frontend Standards

**React Components:**
```tsx
// Use functional components with hooks
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ title, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <ModalContainer>
      <ModalTitle>{title}</ModalTitle>
      <CloseButton onClick={onClose}>×</CloseButton>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
```

### ⚙️ Backend Standards

**Express Routes:**
```javascript
// Use async/await for asynchronous operations
const express = require('express');
const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    // Handle file upload logic
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ 
        error: 'No file provided' 
      });
    }

    // Process file
    const result = await processFile(file);
    
    res.json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});
```

### 📝 Code Style

- **Use Javascript** for frontend code
- **Use ES6+ features** (arrow functions, destructuring, etc.)
- **Use meaningful variable names**
- **Add JSDoc comments** for functions
- **Follow existing patterns** in the codebase

## 🧪 Testing Guidelines

### Frontend Testing
```bash
# Run tests
cd frontend
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Manual Testing Checklist
- [ ] File upload works correctly
- [ ] QR code generation functions
- [ ] File download works
- [ ] Responsive design on mobile
- [ ] Error handling displays properly
- [ ] Performance is acceptable

## 🐛 Issue Guidelines

### 🐞 Bug Reports

**Use the bug report template and include:**
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos
- Environment details (OS, browser, Node version)
- Console errors

### ✨ Feature Requests

**Use the feature request template and include:**
- Clear description of the feature
- Use case and motivation
- Possible implementation approach
- Screenshots/mockups (if applicable)

### ❓ Questions

**For questions:**
- Check existing issues first
- Use GitHub Discussions
- Be specific about what you need help with

## 🏷️ Labels

We use these labels to organize issues and PRs:

- `good first issue` - Perfect for newcomers
- `help wanted` - Community input needed
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `frontend` - Frontend/React work
- `backend` - Backend/Node.js work
- `testing` - Testing related
- `priority: high` - Urgent issues
- `priority: low` - Nice to have

## 🤝 Community

### 💬 Communication

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions and general discussion
- **Pull Request Comments** - Code review discussions

### 🆘 Getting Help

**Stuck? Need help?**
1. Check the [README](./README.md)
2. Search existing issues
3. Ask in GitHub Discussions
4. Tag @SreeAditya-Dev in your issue

### 🎉 Recognition

Contributors will be:
- Added to the README contributors section
- Mentioned in release notes
- Thanked in our social media posts

## 📞 Contact

- **Maintainer:** [@SreeAditya-Dev](https://github.com/SreeAditya-Dev)
- **Repository:** [QuickDrop](https://github.com/SreeAditya-Dev/QuickDrop)
- **Issues:** [Create an issue](https://github.com/SreeAditya-Dev/QuickDrop/issues/new)

---

## 🙏 Thank You!

Your contributions make QuickDrop better for everyone. We appreciate your time and effort in helping improve this project!

**Happy coding! 🚀**

---

*Last updated: June 18, 2025*
