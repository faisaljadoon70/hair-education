import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import chalk from 'chalk';

// Constants for rules
const FORBIDDEN_IMPORTS = [
  '/web/',
  '/app/',
  '/levelwheel/',  // Only if imported from non-mobile
  '/components/(?!mobile)',  // Any component not in mobile
  'shared'
];

const REQUIRED_MOBILE_STRUCTURE = [
  '/mobile/core/',
  '/mobile/components/',
  '/mobile/pages/',
];

const ALLOWED_DEPENDENCIES = [
  'react',
  'next',
  '@heroicons',
  '@headlessui',
  'framer-motion',
  'tailwindcss',
  '@/lib/',
  '@/utils/',
  '@/types/',
  '@/context/',  // Allow context for now
  '@/hooks/'     // Allow hooks for now
];

interface ViolationReport {
  filePath: string;
  forbiddenImports: string[];
  styleViolations: string[];
  directoryStructureIssues: string[];
  crossComponentDependencies: string[];
}

async function checkFile(filePath: string): Promise<ViolationReport> {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  const report: ViolationReport = {
    filePath,
    forbiddenImports: [],
    styleViolations: [],
    directoryStructureIssues: [],
    crossComponentDependencies: [],
  };

  // Check directory structure for mobile components
  if (filePath.includes('/mobile/')) {
    const normalizedPath = filePath.replace(/\\/g, '/');
    if (!REQUIRED_MOBILE_STRUCTURE.some(dir => normalizedPath.includes(dir))) {
      report.directoryStructureIssues.push(
        `Component not in correct mobile directory structure. Should be in one of: ${REQUIRED_MOBILE_STRUCTURE.join(', ')}`
      );
    }
  }

  // Check each line for violations
  lines.forEach((line, index) => {
    // Check imports
    const importMatch = line.match(/import .* from ['"](.*)['"]/);
    if (importMatch) {
      const importPath = importMatch[1];
      
      // Check for forbidden imports
      FORBIDDEN_IMPORTS.forEach(forbidden => {
        if (importPath.includes(forbidden)) {
          report.forbiddenImports.push(
            `Line ${index + 1}: Forbidden import from ${forbidden}: ${importPath}`
          );
        }
      });

      // Check for cross-component dependencies
      if (filePath.includes('/mobile/')) {
        const isAllowed = ALLOWED_DEPENDENCIES.some(dep => importPath.startsWith(dep));
        if (!importPath.startsWith('.') && !importPath.includes('/mobile/') && !isAllowed) {
          report.crossComponentDependencies.push(
            `Line ${index + 1}: Non-mobile dependency: ${importPath}`
          );
        }
      }
    }

    // Check styles
    if (line.includes('global.css') || 
        (line.includes('styles/') && !line.includes('/mobile/styles/'))) {
      report.styleViolations.push(
        `Line ${index + 1}: Possible shared style usage: ${line.trim()}`
      );
    }
  });

  return report;
}

async function generateSummaryReport(reports: ViolationReport[]) {
  const summary = {
    totalFiles: reports.length,
    totalViolations: 0,
    filesWithViolations: 0,
    violationTypes: {
      forbiddenImports: 0,
      styleViolations: 0,
      directoryStructureIssues: 0,
      crossComponentDependencies: 0
    }
  };

  reports.forEach(report => {
    const hasViolations = 
      report.forbiddenImports.length > 0 ||
      report.styleViolations.length > 0 ||
      report.directoryStructureIssues.length > 0 ||
      report.crossComponentDependencies.length > 0;

    if (hasViolations) {
      summary.filesWithViolations++;
    }

    summary.violationTypes.forbiddenImports += report.forbiddenImports.length;
    summary.violationTypes.styleViolations += report.styleViolations.length;
    summary.violationTypes.directoryStructureIssues += report.directoryStructureIssues.length;
    summary.violationTypes.crossComponentDependencies += report.crossComponentDependencies.length;
  });

  summary.totalViolations = 
    summary.violationTypes.forbiddenImports +
    summary.violationTypes.styleViolations +
    summary.violationTypes.directoryStructureIssues +
    summary.violationTypes.crossComponentDependencies;

  return summary;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  try {
    console.log(chalk.blue.bold('🔍 Starting Level Wheel Component Check...\n'));

    // Define level wheel related paths
    const levelWheelPaths = [
      // Mobile components
      'src/components/mobile/pages/MobileLevelWheelPage.tsx',
      'src/components/mobile/pages/MobileAdvancedLevelWheelPage.tsx',
      // Web components
      'src/app/level-wheel/page.tsx',
      'src/app/advanced-level-wheel/page.tsx',
      // Shared components
      'src/components/levelwheel/**/*.tsx',
      'src/components/advancedlevelwheel/**/*.tsx'
    ];

    const files = [];
    for (const pattern of levelWheelPaths) {
      if (pattern.includes('*')) {
        const matches = await glob(pattern);
        files.push(...matches);
      } else if (await fileExists(pattern)) {
        files.push(pattern);
      }
    }

    console.log(chalk.blue.bold(`Found ${files.length} level wheel related files to check.\n`));

    const reports: ViolationReport[] = [];
    let filesWithViolations = 0;

    // Check each file
    for (const file of files) {
      const report = await checkFile(file);
      reports.push(report);
      
      // Always show file status for level wheel components
      const hasViolations = 
        report.forbiddenImports.length > 0 ||
        report.styleViolations.length > 0 ||
        report.directoryStructureIssues.length > 0 ||
        report.crossComponentDependencies.length > 0;

      if (hasViolations) {
        filesWithViolations++;
        console.log(chalk.red(`\n❌ Violations in ${file}:`));
        printViolations(report);
      } else {
        console.log(chalk.green(`✓ ${file} - No violations`));
      }

      // Special check for circular dependencies
      if (file.includes('/mobile/') && report.forbiddenImports.some(imp => imp.includes('levelwheel'))) {
        console.log(chalk.yellow(`\n⚠️ Warning: Mobile component importing from shared levelwheel: ${file}`));
      }
      if (!file.includes('/mobile/') && report.forbiddenImports.some(imp => imp.includes('/mobile/'))) {
        console.log(chalk.yellow(`\n⚠️ Warning: Web/shared component importing from mobile: ${file}`));
      }
    }

    // Generate and print summary
    const summary = {
      totalFiles: files.length,
      filesWithViolations,
      totalViolations: reports.reduce((acc, r) => 
        acc + r.forbiddenImports.length + 
        r.styleViolations.length + 
        r.directoryStructureIssues.length + 
        r.crossComponentDependencies.length, 0
      ),
      mobileComponents: reports.filter(r => r.filePath.includes('/mobile/')).length,
      webComponents: reports.filter(r => r.filePath.includes('/app/')).length,
      sharedComponents: reports.filter(r => !r.filePath.includes('/mobile/') && !r.filePath.includes('/app/')).length
    };
    
    console.log(chalk.blue.bold('\n📊 Level Wheel Component Summary:'));
    console.log(`Total Files: ${summary.totalFiles}`);
    console.log(`- Mobile Components: ${summary.mobileComponents}`);
    console.log(`- Web Components: ${summary.webComponents}`);
    console.log(`- Shared Components: ${summary.sharedComponents}`);
    console.log(`\nFiles with Violations: ${summary.filesWithViolations}`);
    console.log(`Total Violations: ${summary.totalViolations}`);

    // Save report to file
    const reportPath = path.join(process.cwd(), 'level-wheel-report.json');
    await fs.writeFile(
      reportPath,
      JSON.stringify({ reports, summary }, null, 2)
    );
    console.log(chalk.green(`\n✅ Full report saved to: ${reportPath}`));

    // Exit with error if violations found
    if (summary.totalViolations > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error(chalk.red('Error during compliance check:'), err);
    process.exit(1);
  }
}

function printViolations(report: ViolationReport) {
  if (report.forbiddenImports.length > 0) {
    console.log(chalk.yellow('\nForbidden Imports:'));
    report.forbiddenImports.forEach(imp => console.log(`  ${imp}`));
  }

  if (report.styleViolations.length > 0) {
    console.log(chalk.yellow('\nStyle Violations:'));
    report.styleViolations.forEach(violation => console.log(`  ${violation}`));
  }

  if (report.directoryStructureIssues.length > 0) {
    console.log(chalk.yellow('\nDirectory Structure Issues:'));
    report.directoryStructureIssues.forEach(issue => console.log(`  ${issue}`));
  }

  if (report.crossComponentDependencies.length > 0) {
    console.log(chalk.yellow('\nCross-Component Dependencies:'));
    report.crossComponentDependencies.forEach(dep => console.log(`  ${dep}`));
  }

  console.log(chalk.gray('\n----------------------------------------'));
}

main();
