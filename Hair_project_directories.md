# Hair Education Project Directory Structure

## Root Directory
```
hair-education/
├── src/               # Source code directory
├── public/            # Static assets
├── course_layout.md   # Detailed course curriculum documentation
├── lastdone.md        # Session progress tracking
└── package.json       # Project dependencies and scripts
```

## Source Code Structure (`src/`)

### App Directory (`src/app/`)
Core application pages and routing:

- `page.tsx`
  - Main landing page
  - Features navigation cards for different course levels
  - Gradient background with modern UI
  - Purpose: Entry point and course level selection

- `beginner/page.tsx`
  - Beginner level course content
  - Pink theme with 5 detailed modules
  - Features interactive elements and course overview
  - Purpose: Deliver foundational hair education content

- `intermediate/page.tsx`
  - Intermediate level course content
  - Purple theme with 5 advanced modules
  - Professional techniques and application methods
  - Purpose: Advanced application and technique training

- `expert/page.tsx`
  - Expert level course content
  - Blue theme with 5 specialized modules
  - Advanced techniques and business management
  - Purpose: Master-level education and business skills

- `contact/page.tsx`
  - Contact form and information
  - Professional communication channel
  - Purpose: Student support and inquiries

### Components Directory (`src/components/`)
Reusable UI components:

- `HomeButton.tsx`
  - Navigation component
  - Fixed position in top-left corner
  - Pink gradient styling
  - Purpose: Consistent navigation back to home page

### Styles Directory (`src/styles/`)
Global styling and theme definitions:

- `globals.css`
  - Global CSS styles
  - Tailwind CSS utilities
  - Custom color schemes
  - Purpose: Consistent styling across the application

## Documentation Files

- `course_layout.md`
  - Comprehensive course curriculum
  - Detailed module descriptions
  - Learning objectives and assessments
  - Purpose: Course content reference and planning

- `Hair_project_directories.md` (this file)
  - Project structure documentation
  - File and directory explanations
  - Purpose: Development reference and maintenance

- `lastdone.md`
  - Session progress tracking
  - Completed tasks and current status
  - Next steps and priorities
  - Outstanding issues
  - Purpose: Development continuity between sessions

## Configuration Files

- `package.json`
  - Project dependencies
  - Build scripts
  - Development tools
  - Purpose: Project configuration and dependency management

- `tailwind.config.js`
  - Tailwind CSS configuration
  - Custom theme settings
  - Color schemes and responsive design
  - Purpose: Styling framework configuration

- `next.config.js`
  - Next.js configuration
  - Build settings
  - Environment variables
  - Purpose: Framework configuration

## Version Control

- `.gitignore`
  - Excludes node_modules
  - Ignores build artifacts
  - Skips environment files
  - Purpose: Version control management

## Development Notes

1. **Component Organization**
   - All reusable components go in `src/components/`
   - Page-specific components stay in their page directories
   - Maintain consistent naming conventions

2. **Styling Approach**
   - Use Tailwind CSS for styling
   - Maintain theme consistency per level:
     - Beginner: Pink theme
     - Intermediate: Purple theme
     - Expert: Blue theme

3. **Documentation**
   - Keep documentation files updated
   - Document any new components or features
   - Maintain clear code comments

4. **Best Practices**
   - Follow Next.js conventions
   - Implement responsive design
   - Optimize for performance
   - Maintain accessibility standards

## Future Additions

1. **Planned Directories**
   - `src/lib/` - Utility functions and helpers
   - `src/hooks/` - Custom React hooks
   - `src/types/` - TypeScript type definitions
   - `src/context/` - React context providers

2. **Upcoming Features**
   - User authentication
   - Course progress tracking
   - Interactive assessments
   - Media content management

## Deployment & Domain Configuration

### Domain Structure
- Primary domain: `faisaljadoon.com`
  - Main website access
  - SSL protected
  - Assigned to production

- WWW domain: `www.faisaljadoon.com`
  - Redirects to primary domain
  - SSL protected
  - Configured for redirection

- Development domain: `hair-education.vercel.app`
  - Vercel preview deployments
  - Development testing
  - Staging environment

### Deployment Configuration
- Vercel hosting platform
- Automatic deployments from main branch
- Environment variables managed in Vercel dashboard
- SSL/TLS certificates auto-managed
- DNS configuration through Cloudflare
