# AntarYog Foundation Website

A modern, full-stack website for the AntarYog Foundation - a spiritual and educational organization dedicated to reviving Vedantic knowledge and creating societal transformation.

## Project Overview

This project is a volunteer initiative to build a new website for AntarYog Foundation. The website will serve as a digital platform to:
- Share spiritual teachings and Vedantic knowledge
- Organize events, programs, and initiatives
- Enable community participation and volunteer opportunities
- Facilitate donations and membership management
- Provide consultation booking (Naadi Jyotish, Vastu)
- Support multi-language content (English, Hindi, Marathi)

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (or your chosen database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aywebtest
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

### Running the Project

You'll need to run the frontend and backend servers simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

Or run both with a single command (if using `concurrently`):
```bash
npm run dev:all
```

## Project Structure

```
aywebtest/
├── docs/                    # Documentation
│   ├── prompts/            # AI prompts and outputs
│   │   ├── input/          # Raw prompt requests
│   │   ├── output/         # Generated outputs
│   │   └── templates/      # Reusable prompt templates (for future use)
│   └── CONTRIBUTING.md     # Contribution guidelines
├── frontend/               # Next.js React application
│   ├── src/app/           # Pages and routes
│   ├── src/components/    # Reusable UI components
│   └── src/lib/           # Utilities and API client
├── backend/                # Express.js API server
│   ├── routes/            # API endpoints
│   ├── models/            # Database schemas
│   ├── middleware/        # Auth and other middleware
│   └── config/            # Configuration files
└── .git/                   # Git repository
```

## Development Roadmap

### Phase 1: MVP (Current)
- [x] Project structure setup
- [ ] Frontend: Basic pages (home, about, login, dashboard)
- [ ] Backend: User authentication (register, login)
- [ ] Database: User model and connection

### Phase 2: Content Management
- [ ] Spiritual content management system
- [ ] Multi-language support (i18n)
- [ ] Content recommendation engine

### Phase 3: Community Features
- [ ] Event scheduling system
- [ ] Program enrollment
- [ ] User profiles and interaction

### Phase 4: Advanced Features
- [ ] Consultation booking system (Naadi Jyotish, Vastu)
- [ ] Donation and membership management
- [ ] Advanced analytics

## Technology Stack

**Frontend:**
- Next.js 14+ (React framework)
- Tailwind CSS (styling)
- JavaScript

**Backend:**
- Node.js + Express.js
- MongoDB (or PostgreSQL/SQLite)
- JWT authentication

## Contributing

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines on:
- Code style and commit message format
- Development workflow
- How to submit changes

## Documentation

- [Role Definition](docs/prompts/output/ROLE_DEFINITION.md) - Project role and responsibilities
- [Commit Message Format](docs/CONTRIBUTING.md#commit-message-format) - How to write commits
- [Prompts & Documentation](docs/prompts/) - Detailed prompts and outputs

## Environment Setup

Create `.env.local` files in both frontend and backend directories:

**frontend/.env.local:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**backend/.env.local:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aywebtest
JWT_SECRET=your-secret-key-here
```

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB/Mongoose](https://mongoosejs.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Support

For questions or guidance on this project, please open an issue or reach out to the AntarYog Foundation team.

## License

This project is for AntarYog Foundation. See LICENSE file for details.

---

**Last Updated:** February 2026
**Project Status:** In Development (MVP Phase)
