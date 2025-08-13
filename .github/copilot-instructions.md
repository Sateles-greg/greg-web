# Greg Web Application

Greg is an advanced React + TypeScript + Tauri application that combines AI integration, monitoring systems, and automation. It features a React frontend, Node.js Express backend, and Tauri desktop application wrapper.

**ALWAYS follow these instructions first and only search or run additional commands if the information here is incomplete or found to be in error.**

## Working Effectively

### Bootstrap and Build Process
- **CRITICAL**: Node.js 18+ required. Node.js 20+ recommended.
- Install main dependencies:
  ```bash
  npm install
  ```
  **NEVER CANCEL**: npm install takes 15-30 minutes. Set timeout to 45+ minutes. This is normal due to large dependency tree including AI/ML packages.

- Install server dependencies:
  ```bash
  cd server && npm install
  ```
  **NEVER CANCEL**: Server install takes 5-10 minutes. Set timeout to 20+ minutes.

- Build the application:
  ```bash
  npm run build
  ```
  **NEVER CANCEL**: Build takes 5-15 minutes. Set timeout to 30+ minutes. Runs TypeScript compilation and Vite build.

### Testing
- Run test suite:
  ```bash
  npm test
  ```
  **NEVER CANCEL**: Tests take 2-5 minutes. Set timeout to 15+ minutes.

### Development Servers
- Start frontend development server:
  ```bash
  npm run dev
  ```
  Runs on http://localhost:5173 (Vite default port)

- Start backend server:
  ```bash
  cd server && npm run dev
  ```
  Runs on http://localhost:3001

### Tauri Desktop Application
- **REQUIRES**: Rust toolchain installed
- Build Tauri app:
  ```bash
  # After frontend build
  cd src-tauri && cargo build
  ```
  **NEVER CANCEL**: Tauri build takes 10-20 minutes on first run. Set timeout to 45+ minutes.

## Environment Setup

### Required Environment Variables
Create `.env` file based on `.env.example`:
```bash
# Frontend API URL
VITE_API_URL=http://localhost:3001

# AI Integration
OPENAI_API_KEY="your_openai_api_key_here"
JWT_SECRET="secure_jwt_secret_here"

# Google Cloud Platform (Optional)
GOOGLE_APPLICATION_CREDENTIALS="./keys/greg-service-account.json"
GOOGLE_CLOUD_PROJECT="greg-simbiotico"
```

## Validation Scenarios

### Always Test After Changes
1. **Frontend Validation**:
   - Start dev server: `npm run dev`
   - Open http://localhost:5173
   - Verify main UI loads without errors
   - Check browser console for errors

2. **Backend Validation**:
   - Start server: `cd server && npm run dev`
   - Test health endpoint: `curl http://localhost:3001/api/health`
   - Check server logs for errors

3. **Full Stack Integration**:
   - Start both frontend and backend
   - Test API proxy functionality
   - Verify AI integration works (if API key configured)

4. **Build Validation**:
   - Run full build: `npm run build`
   - Preview build: `npm run preview`
   - Verify no build errors or warnings

## Code Quality and CI/CD

### Pre-commit Validation
Always run these commands before committing:
```bash
# Lint check
npx eslint src/ --ext .ts,.tsx

# Format check
npx prettier --check src/

# Type check
npx tsc --noEmit

# Run tests
npm test
```

### CI/CD Pipeline
- GitHub Actions runs on Node.js 16 and 20
- Pipeline runs: npm install → npm test
- Located at `.github/workflows/ci.yml` and `.github/workflows/ci-dashboard.yml`

## Key Projects and Architecture

### Frontend (`/src`)
- **Main Entry**: `src/App.tsx`
- **Components**: React components with TypeScript
- **Services**: API integration and utilities
- **UI**: Modern React with Framer Motion animations
- **State**: Context-based state management

### Backend (`/server`)
- **Main**: Express server with OpenAI proxy
- **APIs**: RESTful endpoints for AI integration
- **Security**: CORS and rate limiting configured

### Desktop App (`/src-tauri`)
- **Rust Backend**: Tauri commands and system integration
- **Config**: `tauri.conf.json` for app settings
- **Build**: Cargo-based Rust compilation

### Scripts (`/scripts`)
- **Automation**: Various monitoring and automation scripts
- **Cloud Integration**: GCP monitoring scripts
- **Health Checks**: System monitoring utilities

## Common Issues and Solutions

### Long Build Times
- First npm install: 15-30 minutes (normal)
- Subsequent installs: 2-5 minutes
- Build process: 5-15 minutes
- **Solution**: Always use long timeouts, never cancel

### Dependency Warnings
- Expect deprecation warnings for tsparticles packages
- These are non-blocking and don't affect functionality
- **Solution**: Ignore deprecated package warnings

### Tauri Requirements
- Requires Rust toolchain
- May not work in all environments
- **Solution**: Focus on web version if Rust unavailable

## Directory Structure Reference
```
/
├── .github/workflows/     # CI/CD pipelines
├── src/                  # React frontend source
├── server/               # Express backend
├── src-tauri/           # Tauri desktop app
├── scripts/             # Automation scripts
├── tests/               # Test files
├── public/              # Static assets
├── package.json         # Main dependencies
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
└── .env.example         # Environment template
```

## Frequently Used Commands Output

### Package.json Main Scripts
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "jest --config jest.config.cjs --passWithNoTests",
  "start-cloud-dashboard": "node scripts/auto-monitor-ml-dashboard-cloud.js"
}
```

### Server Package.json Scripts
```json
{
  "dev": "node openai-proxy.js"
}
```

**Remember**: Always set appropriate timeouts (30-45 minutes for builds, 15-20 minutes for installs) and NEVER cancel long-running operations.