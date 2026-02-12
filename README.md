# AI Lead Scraping Platform

Intelligent lead generation and qualification system powered by AI.

## 🚀 Project Status

**Phase**: 1 - Foundation & Setup (Week 1)  
**Status**: ✅ Project Initialized  
**Last Updated**: 2026-02-10

## 📋 Tech Stack

- **Framework**: Next.js 15.5.12 (App Router)
- **Runtime**: Node.js 22.15.1
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (planned)
- **State Management**: Zustand (planned)
- **Database**: PostgreSQL + Supabase (planned)
- **Authentication**: Supabase Auth (planned)
- **AI/MCP**: Custom MCP servers (planned)

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+ (currently using v22.15.1)
- npm 10+ (currently using v10.9.2)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 📁 Project Structure

```
LeadScrapping/
├── .agent/                 # AI agent configurations
├── .docs/                  # Project documentation
│   ├── README.md          # Documentation index
│   ├── PRD.md             # Product requirements
│   ├── SYSTEM_DESIGN.md   # System architecture
│   ├── APP_FLOW.md        # User flows
│   ├── ROADMAP.md         # Development roadmap
│   ├── API_DOCS.md        # API documentation
│   └── RUNTIME_STATUS.md  # Current system status
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript types
│   └── styles/            # Additional styles
├── .env.example           # Environment variables template
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- `DATABASE_URL` - Supabase database connection
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `ANTHROPIC_API_KEY` - Claude API key for AI qualification
- `OPENAI_API_KEY` - OpenAI API key (fallback)

### TypeScript

The project uses TypeScript strict mode for maximum type safety. Configuration is in `tsconfig.json`.

### Tailwind CSS

Tailwind CSS v4 is configured with custom design tokens. See `tailwind.config.ts` for customization.

## 📚 Documentation

Complete documentation is available in the `.docs` directory:

- **[Documentation Index](.docs/README.md)** - Start here
- **[Product Requirements](.docs/PRD.md)** - What we're building
- **[System Design](.docs/SYSTEM_DESIGN.md)** - Technical architecture
- **[Application Flow](.docs/APP_FLOW.md)** - User journeys
- **[Development Roadmap](.docs/ROADMAP.md)** - 12-week timeline
- **[API Documentation](.docs/API_DOCS.md)** - API reference
- **[Runtime Status](.docs/RUNTIME_STATUS.md)** - Current state

## 🎯 Development Roadmap

### Phase 1: Foundation (Weeks 1-4) - Current

- [x] Project initialization
- [ ] Database setup (Supabase)
- [ ] Authentication system
- [ ] Design system & components
- [ ] Dashboard layout

### Phase 2: Core Features (Weeks 5-8)

- [ ] MCP server architecture
- [ ] Lead scraper implementation
- [ ] AI qualification engine
- [ ] Job queue system
- [ ] Leads management interface

### Phase 3: Scale & Polish (Weeks 9-12)

- [ ] Credit system
- [ ] Analytics dashboard
- [ ] Webhooks & public API
- [ ] Security hardening
- [ ] Performance optimization
- [ ] E2E testing

## 🤝 Contributing

This is a private project. For team members:

1. Create a feature branch from `develop`
2. Make your changes
3. Run `npm run lint` and `npm run type-check`
4. Submit a pull request

## 📄 License

Private - All Rights Reserved

## 📞 Support

For questions or issues, contact the development team.

---

**Built with** ❤️ **using Next.js, TypeScript, and AI**
