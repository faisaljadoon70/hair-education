import { promises as fs } from 'node:fs';
import path from 'node:path';
// @ts-ignore
import chalk from 'chalk';

interface TestResult {
    category: string;
    name: string;
    passed: boolean;
    error?: string;
    details?: string;
}

interface TestGroup {
    name: string;
    tests: TestResult[];
}

class MobileTestSuite {
    private results: TestGroup[] = [];

    constructor() {
        console.log(chalk.blue('Mobile Test Suite Initialized'));
    }

    async runAllTests(projectPath: string) {
        try {
            console.log(chalk.blue(`Starting tests for project: ${projectPath}`));
            this.results = [];

            // 1. Core Implementation
            await this.testCoreStructure(projectPath);
            await this.testMobileComponents(projectPath);
            await this.testDataManagement(projectPath);
            
            // 2. UI and Interaction
            await this.testUIComponents(projectPath);
            await this.testGestureHandling(projectPath);
            await this.testDeviceSpecific(projectPath);
            
            // 3. Performance and Security
            await this.testPerformance(projectPath);
            await this.testSecurity(projectPath);
            await this.testErrorHandling(projectPath);
            
            // 4. Testing and Quality
            await this.testCodeQuality(projectPath);
            await this.testImplementationTests(projectPath);

            this.displayResults();
        } catch (error) {
            console.error(chalk.red(`Test execution failed: ${error.message}`));
            process.exit(1);
        }
    }

    private async testCoreStructure(projectPath: string) {
        const group: TestGroup = {
            name: 'Core Structure',
            tests: []
        };

        const components = [
            {
                name: 'Mobile Container',
                pattern: /\b(MobileContainer|ToolContainer|ChapterContainer)\b/,
                details: 'Must use one of: MobileContainer, ToolContainer, or ChapterContainer'
            },
            {
                name: 'Error Boundary',
                pattern: /MobileErrorBoundary/,
                details: 'MobileErrorBoundary must wrap the page content'
            },
            {
                name: 'Layout Component',
                pattern: /(BaseMobileLayout|HomeMobileLayout|ToolMobileLayout)/,
                details: 'Must use a mobile layout component'
            }
        ];

        for (const component of components) {
            const content = await this.readFile(path.join(projectPath, 'src/components/mobile/core/index.tsx'));
            group.tests.push({
                category: 'Core',
                name: component.name,
                passed: component.pattern.test(content),
                details: component.details
            });
        }

        this.results.push(group);
    }

    private async testMobileComponents(projectPath: string) {
        const group: TestGroup = {
            name: 'Mobile Components',
            tests: []
        };

        const components = [
            {
                name: 'Safe Area Handler',
                file: 'components/SafeAreaHandler.tsx',
                required: ['SafeAreaProvider', 'useSafeArea', 'style']
            },
            {
                name: 'Gesture Handler',
                file: 'components/GestureHandler.tsx',
                required: ['PanGestureHandler', 'TapGestureHandler', 'gestureHandlerRootHOC']
            },
            {
                name: 'Device Specific Components',
                file: 'components/DeviceSpecific.tsx',
                required: ['isIOS', 'isAndroid', 'Platform']
            }
        ];

        for (const component of components) {
            const content = await this.readFile(path.join(projectPath, 'src/components/mobile', component.file));
            group.tests.push({
                category: 'Components',
                name: component.name,
                passed: component.required.every(req => content.includes(req)),
                error: `Missing: ${component.required.filter(req => !content.includes(req)).join(', ')}`
            });
        }

        this.results.push(group);
    }

    private async testDataManagement(projectPath: string) {
        const group: TestGroup = {
            name: 'Data Management',
            tests: []
        };

        const features = [
            {
                name: 'IndexedDB Integration',
                pattern: /useIndexedDB/,
                details: 'Must use useIndexedDB for offline storage'
            },
            {
                name: 'Sync Queue',
                pattern: /useSyncQueue/,
                details: 'Must implement sync queue for offline changes'
            },
            {
                name: 'Loading States',
                pattern: /(isLoading|isFetching)/,
                details: 'Must handle loading states'
            },
            {
                name: 'Data Context',
                pattern: /DataContext\.Provider/,
                details: 'Must use DataContext for state management'
            }
        ];

        const content = await this.readFile(path.join(projectPath, 'src/components/mobile/core/MobileContainer.tsx'));
        for (const feature of features) {
            group.tests.push({
                category: 'Data',
                name: feature.name,
                passed: feature.pattern.test(content),
                details: feature.details
            });
        }

        this.results.push(group);
    }

    private async testUIComponents(projectPath: string) {
        const group: TestGroup = {
            name: 'UI Components',
            tests: []
        };

        // Test CSS implementations
        const cssFile = await this.findCssFile(path.join(projectPath, 'src/components/mobile/styles'));
        if (cssFile) {
            const cssContent = await this.readFile(cssFile);
            group.tests.push(
                {
                    category: 'UI',
                    name: 'Safe Areas CSS',
                    passed: /env\(safe-area-inset/.test(cssContent),
                    details: 'Must handle safe areas for notched devices'
                },
                {
                    category: 'UI',
                    name: 'Touch Feedback',
                    passed: /@media \(hover: none\)/.test(cssContent),
                    details: 'Must implement touch-specific feedback'
                }
            );
        }

        this.results.push(group);
    }

    private async testGestureHandling(projectPath: string) {
        const group: TestGroup = {
            name: 'Gesture Handling',
            tests: []
        };

        const gestures = [
            {
                name: 'Pan Gesture',
                pattern: /PanGestureHandler/,
                details: 'Must implement pan gesture handling'
            },
            {
                name: 'Tap Gesture',
                pattern: /TapGestureHandler/,
                details: 'Must implement tap gesture handling'
            },
            {
                name: 'Gesture Root',
                pattern: /gestureHandlerRootHOC/,
                details: 'Must wrap with gesture handler root'
            }
        ];

        const content = await this.readFile(path.join(projectPath, 'src/components/mobile/gestures/index.tsx'));
        for (const gesture of gestures) {
            group.tests.push({
                category: 'Gestures',
                name: gesture.name,
                passed: gesture.pattern.test(content),
                details: gesture.details
            });
        }

        this.results.push(group);
    }

    private async testDeviceSpecific(projectPath: string) {
        const group: TestGroup = {
            name: 'Device Specific',
            tests: []
        };

        const features = [
            {
                name: 'Platform Detection',
                pattern: /Platform\.(OS|select)/,
                details: 'Must use Platform API for device detection'
            },
            {
                name: 'Screen Dimensions',
                pattern: /(useWindowDimensions|Dimensions\.get)/,
                details: 'Must handle different screen sizes'
            },
            {
                name: 'Safe Area',
                pattern: /useSafeArea/,
                details: 'Must use safe area hooks'
            }
        ];

        const content = await this.readFile(path.join(projectPath, 'src/components/mobile/core/DeviceSpecific.tsx'));
        for (const feature of features) {
            group.tests.push({
                category: 'Device',
                name: feature.name,
                passed: feature.pattern.test(content),
                details: feature.details
            });
        }

        this.results.push(group);
    }

    private async testPerformance(projectPath: string) {
        const group: TestGroup = {
            name: 'Performance',
            tests: []
        };

        const metrics = [
            {
                name: 'Memory Management',
                pattern: /(useCallback|useMemo|memo)/,
                details: 'Must implement memory optimization'
            },
            {
                name: 'Lazy Loading',
                pattern: /(React\.lazy|Suspense)/,
                details: 'Must implement code splitting'
            },
            {
                name: 'Performance Monitoring',
                pattern: /(Performance|performance\.mark)/,
                details: 'Must include performance monitoring'
            }
        ];

        const content = await this.readFile(path.join(projectPath, 'src/components/mobile/core/Performance.tsx'));
        for (const metric of metrics) {
            group.tests.push({
                category: 'Performance',
                name: metric.name,
                passed: metric.pattern.test(content),
                details: metric.details
            });
        }

        this.results.push(group);
    }

    private async testSecurity(projectPath: string) {
        const group: TestGroup = {
            name: 'Security',
            tests: []
        };

        const checks = [
            {
                name: 'Data Encryption',
                pattern: /encrypt|decrypt/,
                details: 'Must implement data encryption'
            },
            {
                name: 'Input Sanitization',
                pattern: /sanitize|escape/,
                details: 'Must sanitize user inputs'
            },
            {
                name: 'Secure Storage',
                pattern: /SecureStore|EncryptedStorage/,
                details: 'Must use secure storage for sensitive data'
            }
        ];

        const content = await this.readFile(path.join(projectPath, 'src/components/mobile/core/Security.tsx'));
        for (const check of checks) {
            group.tests.push({
                category: 'Security',
                name: check.name,
                passed: check.pattern.test(content),
                details: check.details
            });
        }

        this.results.push(group);
    }

    private async testErrorHandling(projectPath: string) {
        const group: TestGroup = {
            name: 'Error Handling',
            tests: []
        };

        const handlers = [
            {
                name: 'Error Boundaries',
                pattern: /ErrorBoundary/,
                details: 'Must implement error boundaries'
            },
            {
                name: 'Network Errors',
                pattern: /catch.*network|NetworkError/,
                details: 'Must handle network errors'
            },
            {
                name: 'Fallback UI',
                pattern: /fallback|ErrorFallback/,
                details: 'Must provide fallback UI'
            }
        ];

        const content = await this.readFile(path.join(projectPath, 'src/components/mobile/core/ErrorHandling.tsx'));
        for (const handler of handlers) {
            group.tests.push({
                category: 'Errors',
                name: handler.name,
                passed: handler.pattern.test(content),
                details: handler.details
            });
        }

        this.results.push(group);
    }

    private async testCodeQuality(projectPath: string) {
        const group: TestGroup = {
            name: 'Code Quality',
            tests: []
        };

        const checks = [
            {
                name: 'TypeScript Usage',
                pattern: /\.tsx?$/,
                details: 'Must use TypeScript'
            },
            {
                name: 'Props Validation',
                pattern: /interface|type.*Props/,
                details: 'Must validate component props'
            },
            {
                name: 'Documentation',
                pattern: /\/\*\*|\*\/|@param|@returns/,
                details: 'Must include JSDoc documentation'
            }
        ];

        const files = await this.findFiles(path.join(projectPath, 'src/components/mobile'));
        for (const check of checks) {
            const passed = files.some(file => check.pattern.test(file));
            group.tests.push({
                category: 'Quality',
                name: check.name,
                passed,
                details: check.details
            });
        }

        this.results.push(group);
    }

    private async testImplementationTests(projectPath: string) {
        const group: TestGroup = {
            name: 'Implementation Tests',
            tests: []
        };

        const testChecks = [
            {
                name: 'Unit Tests',
                pattern: /\.test\.(ts|tsx)$/,
                details: 'Must have unit tests'
            },
            {
                name: 'Mobile Tests',
                pattern: /viewport.*mobile/,
                details: 'Must include mobile-specific tests'
            },
            {
                name: 'Integration Tests',
                pattern: /integration|e2e/,
                details: 'Must have integration tests'
            }
        ];

        const testFiles = await this.findFiles(path.join(projectPath, 'src/components/mobile/__tests__'));
        for (const check of testChecks) {
            const passed = testFiles.some(file => check.pattern.test(file));
            group.tests.push({
                category: 'Tests',
                name: check.name,
                passed,
                details: check.details
            });
        }

        this.results.push(group);
    }

    private async readFile(filePath: string): Promise<string> {
        try {
            return await fs.readFile(filePath, 'utf-8');
        } catch (error) {
            return ''; // Return empty string if file doesn't exist
        }
    }

    private async findCssFile(dir: string): Promise<string | null> {
        try {
            const files = await fs.readdir(dir);
            const cssFile = files.find(f => f.endsWith('.css') || f.endsWith('.scss'));
            return cssFile ? path.join(dir, cssFile) : null;
        } catch (error) {
            return null;
        }
    }

    private async findFiles(dir: string): Promise<string[]> {
        try {
            const files = await fs.readdir(dir);
            return files;
        } catch (error) {
            return [];
        }
    }

    private displayResults() {
        console.log(chalk.bold('\nMobile Implementation Test Results'));
        console.log(chalk.bold('================================\n'));

        let totalTests = 0;
        let passedTests = 0;

        this.results.forEach(group => {
            console.log(chalk.blue.bold(`\n${group.name}:`));
            
            group.tests.forEach(test => {
                totalTests++;
                if (test.passed) {
                    passedTests++;
                    console.log(chalk.green(`✓ ${test.name}`));
                } else {
                    console.log(chalk.red(`✗ ${test.name}`));
                    if (test.details) {
                        console.log(chalk.gray(`  → ${test.details}`));
                    }
                    if (test.error) {
                        console.log(chalk.gray(`  → ${test.error}`));
                    }
                }
            });
        });

        console.log(chalk.bold('\nSummary:'));
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${chalk.green(passedTests)}`);
        console.log(`Failed: ${chalk.red(totalTests - passedTests)}`);

        if (passedTests < totalTests) {
            console.log(chalk.yellow('\nPlease fix the failed checks before proceeding.'));
            process.exit(1);
        } else {
            console.log(chalk.green('\nAll checks passed! ✨'));
        }
    }
}

// CLI
if (require.main === module) {
    const projectPath = process.argv[2];
    if (!projectPath) {
        console.error(chalk.red('Please provide a project path to verify'));
        process.exit(1);
    }

    const suite = new MobileTestSuite();
    suite.runAllTests(projectPath).catch(error => {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
    });
}
