# Contributing to AntarYog Foundation Website

Thank you for volunteering your time to help build this website! This document provides guidelines to help you contribute effectively.

## Getting Started

1. **Read the Project Documentation**
   - [Project Overview](../README.md)
   - [Role Definition](prompts/output/ROLE_DEFINITION.md)
   - [Prompts & Documentation](prompts/)

2. **Set Up Your Development Environment**
   - Follow the [Quick Start Guide](../README.md#quick-start)
   - Ensure both frontend and backend run successfully

3. **Familiarize Yourself with the Codebase**
   - Explore the folder structure
   - Read existing code
   - Understand the current architecture

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Write clean, readable code
- Follow the existing code style
- Keep changes focused and small

### 3. Test Your Changes
- Test frontend changes in the browser
- Test backend API endpoints with curl or Postman
- Verify no existing functionality breaks

### 4. Commit Your Changes
See [Commit Message Format](#commit-message-format) below

### 5. Push and Create a Pull Request
```bash
git push origin feature/your-feature-name
```

## Commit Message Format

We follow **Conventional Commits** format for clear, scannable commit history.

### Format:
```
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

### Types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style/formatting (no logic change)
- **refactor**: Code restructuring (no behavior change)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies, configuration

### Scopes:
- **frontend**: Frontend/Next.js changes
- **backend**: Backend/API changes
- **auth**: Authentication-related changes
- **db**: Database changes
- **prompts**: Documentation/prompts folder
- **config**: Configuration files
- **docs**: Documentation

### Guidelines:
- **Use clear, descriptive messages**: Explain what changed and why
- **Use imperative mood**: "add feature" not "added feature"
- **Keep subject line under 50 characters**: For readability
- **No emojis**: Avoid emojis - they look unprofessional in commit history
- **Capitalize first letter**: Start with uppercase letter

### Examples:

**Simple feature:**
```bash
git commit -m "feat(frontend): add home page component"
```

**Bug fix:**
```bash
git commit -m "fix(auth): resolve JWT token expiration issue"
```

**With detailed body:**
```bash
git commit -m "feat(backend): create user authentication API

- Implement user registration endpoint
- Add login endpoint with JWT token generation
- Create JWT verification middleware
- Add password hashing with bcryptjs"
```

**Documentation:**
```bash
git commit -m "docs(prompts): update role definition with new features"
```

**Dependency update:**
```bash
git commit -m "chore(backend): update express to latest version"
```

## Code Style Guidelines

### Frontend (React/Next.js)
- Use functional components with hooks
- Use meaningful variable and component names
- Keep components focused and reusable
- Add comments for complex logic
- Follow Tailwind CSS conventions for styling

### Backend (Express.js)
- Use async/await for asynchronous operations
- Organize routes logically by feature
- Add middleware for cross-cutting concerns
- Use descriptive function and variable names
- Handle errors properly and return appropriate status codes

### General
- Keep lines reasonably short (max 100-120 characters)
- Use consistent indentation (2 or 4 spaces)
- Remove unused imports and variables
- Write meaningful variable names (avoid single letters except in loops)

## Testing

### Before Submitting
- Test your changes thoroughly
- Test frontend in different browsers if possible
- Test API endpoints with sample requests
- Verify no console errors or warnings

### Testing Tools
- **Frontend**: Browser DevTools, curl/Postman for API calls
- **Backend**: Postman, curl, or other API testing tools
- **Database**: Check MongoDB/database directly to verify data

## Pull Request Process

1. **Ensure your branch is up to date**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push your changes**
   ```bash
   git push origin your-branch-name
   ```

3. **Create a descriptive PR**
   - Title: Use same format as commit messages
   - Description: Explain what changed and why
   - Reference any related issues

4. **Respond to feedback**
   - Be open to suggestions
   - Make requested changes promptly
   - Ask questions if anything is unclear

## Reporting Issues

When reporting bugs or suggesting features:
- Be specific and detailed
- Include steps to reproduce (for bugs)
- Include screenshots if relevant
- Check if similar issues already exist

## Questions?

- Check existing documentation first
- Ask in comments or discussions
- Reach out to the project maintainers

---

## Quick Reference

```bash
# Create a new branch
git checkout -b feature/my-feature

# Make changes, then stage them
git add .

# Commit with proper message
git commit -m "feat(frontend): add new component"

# Push to remote
git push origin feature/my-feature

# Create pull request on GitHub
```

Thank you for contributing! 🙏
