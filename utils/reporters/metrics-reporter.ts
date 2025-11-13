// CommonJS imports for compatibility
import client from 'prom-client';

/**
 * MetricsReporter
 * ----------------
 * Custom Playwright reporter that exposes test metrics to a Prometheus Pushgateway.
 */


class MetricsReporter {
  private registry: any;
  private pushGatewayUrl: string;
  private buildLabel: string;

  private testsRun: any;
  private testsPassed: any;
  private testsFailed: any;
  private testDuration: any;

  constructor(options: { pushGateway?: string; buildLabel?: string } = {}) {
    this.pushGatewayUrl = options.pushGateway || process.env.PUSHGATEWAY_URL || 'http://localhost:9091';
    this.buildLabel = options.buildLabel || process.env.GITHUB_RUN_ID || 'local-run';

    this.registry = new client.Registry();

    this.testsRun = new client.Counter({
      name: 'playwright_tests_run_total',
      help: 'Total Playwright tests executed',
      labelNames: ['project', 'browser', 'build'],
      registers: [this.registry],
    });

    this.testsPassed = new client.Counter({
      name: 'playwright_tests_passed_total',
      help: 'Total Playwright tests passed',
      labelNames: ['project', 'browser', 'build'],
      registers: [this.registry],
    });

    this.testsFailed = new client.Counter({
      name: 'playwright_tests_failed_total',
      help: 'Total Playwright tests failed',
      labelNames: ['project', 'browser', 'build'],
      registers: [this.registry],
    });

    this.testDuration = new client.Histogram({
      name: 'playwright_test_duration_seconds',
      help: 'Histogram of test durations in seconds',
      labelNames: ['project', 'browser', 'build'],
      buckets: [0.1, 0.5, 1, 2, 5, 10, 30, 60],
      registers: [this.registry],
    });
  }

  onBegin(config: any) {
    console.log(`🚀 Starting Playwright tests (${config.projects.length} project(s))`);
  }

  onTestEnd(test: any, result: any) {
    const project = test.project()?.name || 'default';
    const browser = test.project()?.metadata?.browserName || project;
    const labels = { project, browser, build: this.buildLabel };

    this.testsRun.inc(labels, 1);
    this.testDuration.observe(labels, result.duration / 1000);

    if (result.status === 'passed') {
      this.testsPassed.inc(labels, 1);
    } else if (result.status === 'failed') {
      this.testsFailed.inc(labels, 1);
    }
  }

  async onEnd() {
    console.log('📊 Pushing Playwright test metrics to Pushgateway...');
    try {
      const metrics = await this.registry.metrics();
      const jobName = `playwright_${this.buildLabel}`;
      const pushUrl = `${this.pushGatewayUrl}/metrics/job/${encodeURIComponent(jobName)}`;

      const response = await fetch(pushUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'text/plain' },
        body: metrics,
      });

      if (!response.ok) {
        console.error(`Failed to push metrics: ${response.statusText}`);
      } else {
        console.log(`Metrics successfully pushed to ${this.pushGatewayUrl}`);
      }
    } catch (error) {
      console.error('Error while pushing metrics:', error);
    }
  }
}

// Required for Playwright reporter
export default MetricsReporter;