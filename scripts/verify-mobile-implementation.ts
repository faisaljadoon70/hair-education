C:\Users\thatc\Desktop\Faisal\Hair project\hair-educationimport { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

interface VerificationResult {
  category: string;
  check: string;
  passed: boolean;
  details?: string;
}

async function verifyMobileImplementation(pagePath: string) {
  const results: VerificationResult[] = [];
  const sourceCode = await fs.readFile(pagePath, 'utf-8');
  const dirPath = path.dirname(pagePath);
  
  // 1. Core Structure Checks
  results.push(
    {
      category: 'Core Structure',
      check: 'Mobile Container',
      passed: /\b(MobileContainer|ToolContainer|ChapterContainer)\b/.test(sourceCode),
      details: 'Must use one of: MobileContainer, ToolContainer, or ChapterContainer'
    },
    {
      category: 'Core Structure',
      check: 'Error Boundary',
      passed: /MobileErrorBoundary/.test(sourceCode),
      details: 'MobileErrorBoundary must wrap the page content'
    },
    {
      category: 'Core Structure',
      check: 'Layout Component',
      passed: /(BaseMobileLayout|HomeMobileLayout|ToolMobileLayout)/.test(sourceCode),
      details: 'Must use a mobile layout component'
    }
  );

  // 2. Data Management Checks
  results.push(
    {
      category: 'Data Management',
      check: 'IndexedDB Integration',
      passed: /useIndexedDB/.test(sourceCode),
      details: 'Must use useIndexedDB for offline storage'
    },
    {
      category: 'Data Management',
      check: 'Sync Queue',
      passed: /useSyncQueue/.test(sourceCode),
      details: 'Must implement sync queue for offline changes'
    },
    {
      category: 'Data Management',
      check: 'Loading States',
      passed: /(isLoading|isFetching)/.test(sourceCode),
      details: 'Must handle loading states'
    }
  );

  // 3. UI Checks
  const cssFile = await findCssFile(dirPath);
  if (cssFile) {
    const cssCode = await fs.readFile(cssFile, 'utf-8');
    results.push(
      {
        category: 'UI',
        check: 'Safe Areas',
        passed: /env\(safe-area-inset/.test(cssCode),
        details: 'Must handle safe areas for notched devices'
      },
      {
        category: 'UI',
        check: 'Touch Feedback',
        passed: /@media \(hover: none\)/.test(cssCode),
        details: 'Must implement touch-specific feedback'
      }
    );
  }

  // 4. Testing Checks
  const testFile = `${pagePath.replace(/\.[jt]sx?$/, '')}.test.tsx`;
  const hasTests = await fileExists(testFile);
  const testCode = hasTests ? await fs.readFile(testFile, 'utf-8') : '';
  
  results.push(
    {
      category: 'Testing',
      check: 'Unit Tests Exist',
      passed: hasTests,
      details: 'Must have corresponding test file'
    },
    {
      category: 'Testing',
      check: 'Mobile Tests',
      passed: hasTests && /viewport\(.*mobile/.test(testCode),
      details: 'Must include mobile-specific tests'
    },
    {
      category: 'Testing',
      check: 'Offline Tests',
      passed: hasTests && /offline/.test(testCode),
      details: 'Must test offline functionality'
    }
  );

  // 5. Error Handling Checks
  results.push(
    {
      category: 'Error Handling',
      check: 'Error States',
      passed: /error/.test(sourceCode),
      details: 'Must handle error states'
    },
    {
      category: 'Error Handling',
      check: 'Network Error',
      passed: /catch.*network/.test(sourceCode),
      details: 'Must handle network errors'
    }
  );

  // Generate Report
  console.log(chalk.bold('\nMobile Implementation Verification Report'));
  console.log(chalk.bold('==========================================\n'));

  let currentCategory = '';
  let failedChecks = 0;

  results.forEach(({ category, check, passed, details }) => {
    if (category !== currentCategory) {
      console.log(chalk.blue.bold(`\n${category}:`));
      currentCategory = category;
    }

    if (passed) {
      console.log(chalk.green(`✓ ${check}`));
    } else {
      console.log(chalk.red(`✗ ${check}`));
      console.log(chalk.gray(`  → ${details}`));
      failedChecks++;
    }
  });

  console.log(chalk.bold('\nSummary:'));
  console.log(`Total Checks: ${results.length}`);
  console.log(`Passed: ${results.length - failedChecks}`);
  console.log(`Failed: ${failedChecks}`);

  if (failedChecks > 0) {
    console.log(chalk.yellow('\nPlease fix the failed checks before proceeding.'));
    process.exit(1);
  } else {
    console.log(chalk.green('\nAll checks passed! ✨'));
  }
}

// Helper functions
async function findCssFile(dir: string): Promise<string | null> {
  const files = await fs.readdir(dir);
  const cssFile = files.find(f => f.endsWith('.css') || f.endsWith('.scss'));
  return cssFile ? path.join(dir, cssFile) : null;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// CLI
if (require.main === module) {
  const pagePath = process.argv[2];
  if (!pagePath) {
    console.error('Please provide a page path to verify');
    process.exit(1);
  }

  verifyMobileImplementation(pagePath).catch(error => {
    console.error('Verification failed:', error);
    process.exit(1);
  });
}

export { verifyMobileImplementation };
