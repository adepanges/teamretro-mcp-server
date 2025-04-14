# Contribution Guidelines

## GitFlow Workflow
### Branch Types
- `master` - Production-ready code
- `develop` - Integration branch for features
- `feature/` - New functionality branches
- `doc/` - Documentation improvements
- `misc/` - Miscellaneous non-code changes  
- `bugfix/` - Non-critical bug fixes
- `release/` - Preparation for production releases  
- `hotfix/` - Critical production fixes

### Contribution Process
1. Fork the repository
2. Clone your fork locally
3. Create a branch from `develop` based on change type:
   - Features: `git checkout -b feature/your-feature-name develop`
   - Docs: `git checkout -b doc/your-doc-update develop`
   - Misc: `git checkout -b misc/your-change develop`
   - Bugfixes: `git checkout -b bugfix/issue-number develop`
4. Make your changes with clear commit messages
5. Push to your fork: `git push origin branch-name`
6. Open a Pull Request to our `develop` branch

### Versioning
We follow Semantic Versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: Backwards-compatible features  
- PATCH: Backwards-compatible bug fixes

### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Start with a capital letter
- Reference issues/tickets when applicable

### Pull Requests
- Target the `develop` branch
- Include clear description of changes
- Reference related issues
- Ensure all tests pass

Reference: Based on Atlassian GitFlow guide (https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
