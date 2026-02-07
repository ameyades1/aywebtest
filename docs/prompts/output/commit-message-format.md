# Commit Message Format Recommendation

## Recommended Format: Conventional Commits

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types (what kind of change):
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style/formatting (no logic change)
- **refactor**: Code restructuring (no behavior change)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, config)

### Scopes (what part of project):
- **frontend**: Frontend/Next.js changes
- **backend**: Backend/API changes
- **auth**: Authentication-related
- **db**: Database changes
- **prompts**: Documentation/prompts folder
- **config**: Configuration files

### Guidelines:
- **Use clear, descriptive messages**: Explain what changed and why
- **Use imperative mood**: "add feature" not "added feature"
- **Keep subject line under 50 characters**: For readability
- **No emojis**: Avoid emojis - they look unprofessional in commit history
- **Capitalize first letter**: Start with uppercase letter

## Examples:

### Simple commits
```bash
git commit -m "feat(frontend): add home page component"
git commit -m "feat(backend): create user authentication API"
git commit -m "fix(auth): resolve JWT token expiration issue"
git commit -m "docs(prompts): update role definition"
git commit -m "chore(frontend): install tailwind dependencies"
```

### With body (for more context)
```bash
git commit -m "feat(frontend): add login form

- Create login component with email/password fields
- Add form validation
- Connect to backend auth API"
```

### Breaking changes
```bash
git commit -m "feat(backend): update auth endpoints

BREAKING CHANGE: /api/login now requires email instead of username"
```

## Quick Reference:

**For beginners, start simple:**
```bash
feat: add something new
fix: fix a bug
docs: update documentation
chore: install packages, config changes
```

**As you grow:**
- Add scopes: `feat(frontend):` or `feat(backend):`
- Add bodies for complex changes
- Use conventional commits tools for automation

## Benefits:
✅ Easy to scan git history
✅ Auto-generate changelogs later
✅ Clear what each commit does
✅ Works with CI/CD tools
✅ Industry standard (used by Angular, React, etc.)

## Why Conventional Commits?

1. **Clarity**: Immediately see what changed and why
2. **Scalability**: Works for 10 commits or 10,000 commits
3. **Automation**: Tools can automatically generate changelogs
4. **Professionalism**: Industry standard used by major projects
5. **Team Coordination**: Everyone uses same format, no confusion

## Implementation Tips

- Start with simple format: `type: description`
- Add scopes once team grows
- Use bodies for non-obvious changes
- Be consistent across all commits
- Review commit history regularly

---

**Generated:** February 2026
**For Project:** AntarYog Foundation Website
