const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const chalk = require('chalk');
const glob = require('glob');

class ComplianceChecker {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.FORBIDDEN_IMPORTS = [
      '/levelwheel/',
      '/web/',
      'shared',
    ];
    this.REQUIRED_MOBILE_STRUCTURE = [
      '/mobile/core/',
      '/mobile/components/',
      '/mobile/pages/',
    ];
    this.webPages = new Set();
    this.mobilePages = new Set();
    this.reports = new Map();
    this.findAllPages();
  }

  findAllPages() {
    // Find web pages using glob
    const webPagesPattern = path.join(this.projectRoot, 'src/app/**/page.tsx');
    const webPages = glob.sync(webPagesPattern);
    webPages.forEach(page => this.webPages.add(this.normalizePath(page)));

    // Find mobile pages using glob
    const mobilePagesPattern = path.join(this.projectRoot, 'src/components/mobile/pages/*Page.tsx');
    const mobilePages = glob.sync(mobilePagesPattern);
    mobilePages.forEach(page => this.mobilePages.add(this.normalizePath(page)));
  }

  normalizePath(filePath) {
    return filePath.replace(/\\/g, '/');
  }

  checkImports(sourceFile) {
    const issues = [];
    
    ts.forEachChild(sourceFile, node => {
      if (ts.isImportDeclaration(node)) {
        const importPath = node.moduleSpecifier.text;
        
        for (const forbidden of this.FORBIDDEN_IMPORTS) {
          if (importPath.includes(forbidden)) {
            issues.push({
              file: sourceFile.fileName,
              line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
              type: 'ERROR',
              message: `Forbidden import from ${forbidden}`,
              code: node.getText()
            });
          }
        }
      }
    });

    return issues;
  }

  checkStyles(sourceFile) {
    const issues = [];
    
    ts.forEachChild(sourceFile, node => {
      if (ts.isImportDeclaration(node)) {
        const importPath = node.moduleSpecifier.text;
        if (importPath.includes('global.css') || importPath.includes('styles/')) {
          issues.push({
            file: sourceFile.fileName,
            line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
            type: 'WARNING',
            message: 'Possible global style usage detected',
            code: node.getText()
          });
        }
      }
    });

    return issues;
  }

  checkDependencies(sourceFile) {
    const issues = [];
    
    ts.forEachChild(sourceFile, node => {
      if (ts.isImportDeclaration(node)) {
        const importPath = node.moduleSpecifier.text;
        if (importPath.startsWith('../') && !importPath.includes('/mobile/')) {
          issues.push({
            file: sourceFile.fileName,
            line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
            type: 'WARNING',
            message: 'Possible dependency outside mobile directory',
            code: node.getText()
          });
        }
      }
    });

    return issues;
  }

  checkComponentLocation(filePath) {
    const issues = [];
    const normalizedPath = this.normalizePath(filePath);

    if (normalizedPath.includes('/mobile/') && 
        !this.REQUIRED_MOBILE_STRUCTURE.some(dir => normalizedPath.includes(dir))) {
      issues.push({
        file: filePath,
        line: 0,
        type: 'ERROR',
        message: 'Mobile component not in correct directory structure',
        code: 'File location'
      });
    }

    return issues;
  }

  async checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true
    );

    const importIssues = this.checkImports(sourceFile);
    const styleIssues = this.checkStyles(sourceFile);
    const locationIssues = this.checkComponentLocation(filePath);
    const dependencyIssues = this.checkDependencies(sourceFile);

    const allIssues = [
      ...importIssues,
      ...styleIssues,
      ...locationIssues,
      ...dependencyIssues
    ];

    // Calculate compliance score (0-100)
    const score = Math.max(0, 100 - (allIssues.length * 10));

    const report = {
      file: filePath,
      issues: allIssues,
      score,
      passed: allIssues.length === 0,
      details: {
        imports: importIssues,
        styles: styleIssues,
        location: locationIssues,
        dependencies: dependencyIssues
      }
    };

    this.reports.set(filePath, report);
    return report;
  }

  printReport(report) {
    console.log(chalk.bold(`\nFile: ${report.file}`));
    console.log(chalk.bold(`Score: ${report.score}/100`));
    console.log(chalk.bold(`Status: ${report.passed ? chalk.green('PASSED') : chalk.red('FAILED')}`));

    if (report.details.imports.length > 0) {
      console.log(chalk.yellow('\nImport Issues:'));
      report.details.imports.forEach(issue => {
        console.log(`${chalk.red(issue.type)}: ${issue.message} (Line ${issue.line})`);
        console.log(`Code: ${issue.code}`);
      });
    }

    if (report.details.styles.length > 0) {
      console.log(chalk.yellow('\nStyle Issues:'));
      report.details.styles.forEach(issue => {
        console.log(`${chalk.red(issue.type)}: ${issue.message} (Line ${issue.line})`);
        console.log(`Code: ${issue.code}`);
      });
    }

    if (report.details.location.length > 0) {
      console.log(chalk.yellow('\nLocation Issues:'));
      report.details.location.forEach(issue => {
        console.log(`${chalk.red(issue.type)}: ${issue.message}`);
      });
    }

    if (report.details.dependencies.length > 0) {
      console.log(chalk.yellow('\nDependency Issues:'));
      report.details.dependencies.forEach(issue => {
        console.log(`${chalk.red(issue.type)}: ${issue.message} (Line ${issue.line})`);
        console.log(`Code: ${issue.code}`);
      });
    }

    console.log(chalk.gray('\n----------------------------------------'));
  }

  async runBatchCheck() {
    console.log(chalk.blue.bold('🔍 Starting Batch Compliance Check...\n'));

    const webReports = [];
    const mobileReports = [];
    
    // Check all web pages
    for (const webPage of this.webPages) {
      webReports.push(await this.checkFile(webPage));
    }

    // Check all mobile pages
    for (const mobilePage of this.mobilePages) {
      mobileReports.push(await this.checkFile(mobilePage));
    }

    // Calculate overall score
    const totalScore = [...webReports, ...mobileReports]
      .reduce((acc, report) => acc + report.score, 0);
    const overallScore = totalScore / (webReports.length + mobileReports.length);

    // Find missing mobile pages
    const missingMobile = Array.from(this.webPages)
      .filter(webPage => {
        const pageName = path.basename(webPage, '.tsx')
          .replace('page', '')
          .toLowerCase();
        return !Array.from(this.mobilePages)
          .some(mobilePage => 
            path.basename(mobilePage, '.tsx')
              .replace('Mobile', '')
              .replace('Page', '')
              .toLowerCase() === pageName
          );
      });

    // Print web page reports
    console.log(chalk.blue.bold('\n📱 Web Pages Report:'));
    webReports.forEach(report => this.printReport(report));

    // Print mobile page reports
    console.log(chalk.blue.bold('\n📱 Mobile Pages Report:'));
    mobileReports.forEach(report => this.printReport(report));

    // Print missing mobile pages
    if (missingMobile.length > 0) {
      console.log(chalk.yellow.bold('\n⚠️ Missing Mobile Versions:'));
      missingMobile.forEach(page => 
        console.log(chalk.yellow(`- ${page}`))
      );
    }

    // Print overall statistics
    console.log(chalk.blue.bold('\n📊 Overall Statistics:'));
    console.log(chalk.bold(`Overall Compliance Score: ${Math.round(overallScore)}/100`));
    console.log(`Total Web Pages: ${webReports.length}`);
    console.log(`Total Mobile Pages: ${mobileReports.length}`);
    console.log(`Missing Mobile Pages: ${missingMobile.length}`);
    
    // Save report to file
    const reportPath = path.join(this.projectRoot, 'compliance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      webPages: webReports,
      mobilePages: mobileReports,
      missingMobilePages: missingMobile,
      overallScore,
      timestamp: new Date().toISOString()
    }, null, 2));
    console.log(chalk.green(`\n✅ Full report saved to: ${reportPath}`));
  }

  async checkSpecificPages(pages) {
    console.log(chalk.blue.bold('🔍 Checking Specific Pages...\n'));

    for (const page of pages) {
      const report = await this.checkFile(page);
      this.printReport(report);
    }
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const checker = new ComplianceChecker(process.cwd());

if (args.length > 0) {
  // Check specific pages using glob
  const pages = args.reduce((acc, pattern) => {
    const matches = glob.sync(pattern);
    return [...acc, ...matches];
  }, []);
  checker.checkSpecificPages(pages).catch(console.error);
} else {
  // Run full batch check
  checker.runBatchCheck().catch(console.error);
}
