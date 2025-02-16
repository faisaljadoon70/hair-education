# Formula Builder Implementation Plan

## Project Configuration
- Next.js 14.1.0 with TypeScript
- Node.js version: 18.x
- Key dependencies:
  - Supabase for auth/backend
  - Headless UI and Hero Icons
  - Framer Motion
  - Jest for testing
  - Tailwind CSS

## Implementation Rules
1. Web/Mobile Separation
   - When working on mobile interface, never modify existing web files
   - Use device detection for conditional rendering
   - Mobile components must stay in mobile directory

2. Mobile Structure
   ```
   src/
   ├── components/
   │   └── mobile/
       ├── core/
       ├── containers/
       ├── layouts/
       ├── navigation/
       ├── gestures/
       └── templates/
   ```

3. Code Separation Patterns
   - Use Container-Presenter pattern
   - Separate mobile-specific hooks
   - Isolated mobile layouts
   - Independent navigation components

## Existing Files and Their Purposes

### Database
- `supabase/migrations/20240215_create_saved_formulas.sql`
  - Creates the saved_formulas table with fields:
    * Core fields (id, user_id, name, levels, volumes, etc.)
    * Custom approach fields (custom_developer_volume, custom_processing_time, etc.)
    * Timestamps and subscription info
  - Implements Row Level Security (RLS) policies:
    * Users can only view their own formulas
    * Users can only create/update/delete their own formulas
  - Creates updated_at trigger for timestamp management

### Types (`src/types/formula.ts`)
- Interfaces:
  1. `EnvironmentalFactors`
     - climate
     - humidity
     - temperature
  2. `TechniqueDetails`
     - applicationMethod
     - specialTools
     - heatApplication
  3. `ClientSpecificNotes`
     - hairTexture
     - porosityNotes
     - previousChemicalServices
  4. `ResultsDocumentation`
     - beforeAfterExpectations
     - commonPitfalls
     - successRate
  5. `SavedFormula` (main interface)
     - Core features
     - Custom approach fields
     - Optional features
  6. `FormulaError`
  7. `FormulaBuilderProps`

### Components
- `src/components/formula/FormulaBuilder.tsx`
  - Main UI component for formula creation
  - Features:
    * System vs User formula display
    * Level and tone selection
    * Developer volume controls
    * Processing time inputs
    * Expandable optional features
    * Save functionality
  
- `src/components/formula/FormulaBuilderContainer.tsx`
  - Container component that:
    * Manages formula state
    * Handles API calls to Supabase
    * Provides data to FormulaBuilder
    * Manages error handling
  
- `src/components/formula/FormulaCard.tsx`
  - Display component for saved formulas that shows:
    * System-generated formula details
    * User customizations
    * Optional features if present
    * Edit/delete options

### Hooks
- `src/hooks/useFormulas.ts`
  - Custom hook for formula management:
    * CRUD operations for formulas
    * Formula calculations and validations
    * State management for formulas
    * Error handling
    * Supabase integration:
      - Load formulas
      - Save formula
      - Delete formula
      - Update formula
  
- `src/hooks/useUser.ts`
  - Custom hook for user management:
    * Authentication state
    * User preferences
    * Subscription tier access control
    * Session management

### Pages
- `src/app/formula-builder/page.tsx`
  - Next.js page component that:
    * Handles routing
    * Manages authentication
    * Renders FormulaBuilderContainer
    * Handles loading states
    * Implements navigation header

## Implementation Tasks

### 1. Core System vs User Formula Display
- [ ] Update `FormulaBuilder.tsx` to show side-by-side comparison
- [ ] Modify `FormulaCard.tsx` to display both approaches
- [ ] Enhance `types/formula.ts` to support both formula types

### 2. System-Generated Formula Section
- [ ] Add calculation logic in `useFormulas.ts`
- [ ] Update database schema for precise level values
- [ ] Implement display in `FormulaBuilder.tsx`

### 3. User's Custom Approach Section
- [ ] Add input fields in `FormulaBuilder.tsx`
- [ ] Update `types/formula.ts` with custom fields
- [ ] Modify database schema to store custom approaches

### 4. Optional Features
- [ ] Add collapsible sections in `FormulaBuilder.tsx`
- [ ] Update database schema for optional fields
- [ ] Enhance `FormulaCard.tsx` to show optional data

### 5. Formula Card Display
- [ ] Complete `FormulaCard.tsx` implementation
- [ ] Add comparison view
- [ ] Implement edit/delete functionality

### 6. Database Updates
- [ ] Complete implementation of `20240215_create_saved_formulas.sql`
- [ ] Add indices for efficient queries
- [ ] Implement data migration if needed

### 7. UI/UX Improvements
- [ ] Add animations for collapsible sections
- [ ] Implement responsive design
- [ ] Add tooltips and help text

### 8. Educational Features
- [ ] Add success tracking
- [ ] Implement notes system
- [ ] Add comparison tools

### 9. Testing
- [ ] Test all CRUD operations
- [ ] Verify formula calculations
- [ ] Test responsive design
- [ ] Validate database operations
- [ ] Test both web and mobile views
- [ ] Verify web interface remains intact
- [ ] Test on multiple devices

## Next Steps Priority
1. Complete the database schema implementation
2. Finish the core formula types
3. Implement the main FormulaBuilder UI
4. Add the FormulaCard display
5. Implement optional features
6. Add educational features
7. Polish UI/UX
8. Comprehensive testing

## Safety Checklist
✓ Verify web routes still work
✓ Check web styling remains intact
✓ Test desktop navigation
✓ Confirm mobile changes are isolated
✓ Review any shared component changes

## Red Flags to Watch For
❌ Modifying existing web components
❌ Mixing mobile and web styles
❌ Changing shared navigation
❌ Editing core layout files
❌ Modifying global state without separation
