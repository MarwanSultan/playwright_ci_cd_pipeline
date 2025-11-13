# Playwright CI/CD Automation Framework

This repository contains a **full-featured Playwright automation framework** with integrated **CI/CD pipeline support**, comprehensive metrics reporting, and monitoring dashboards. It is designed to run end-to-end UI tests efficiently while providing detailed metrics for reporting and visualization.

---

## **Repository Overview**

* **Playwright Automation**: Automates browser-based testing using Playwright across multiple browsers (Chromium, Firefox, WebKit).
* **Metrics Reporting**: Uses a custom Playwright reporter that pushes test metrics, including pass/fail counts, skipped tests, flaky tests, and test durations, to **Prometheus Pushgateway**.
* **Monitoring & Visualization**: Metrics can be visualized in **Grafana dashboards** with Prometheus as the data source.
* **CI/CD Ready**: Configured to integrate with pipelines for automated testing on commits and pull requests.

---

## **Project Structure**

```
playwright_ci_cd_pipeline/
├─ docker-compose.yml            # Docker Compose configuration for Playwright, Prometheus, Pushgateway, Grafana
├─ Dockerfile                    # Dockerfile for running Playwright tests
├─ prometheus/
│  └─ prometheus.yml            # Prometheus configuration
├─ grafana/
│  ├─ provisioning/
│  │  ├─ datasources/datasource.yml   # Grafana Prometheus data source config
│  │  └─ dashboards/dashboards.yml    # Grafana dashboard provisioning
│  └─ dashboards/
│      └─ PlaywrightMetricsDashboard.json  # Fully configured Grafana dashboard JSON
├─ utils/
│  └─ reporters/metrics-reporter.ts  # Custom Playwright reporter for Prometheus with enhanced metrics
├─ playwright.config.ts          # Playwright configuration
├─ package.json                  # Project dependencies
└─ README.md                     # Project documentation
```

---

## **Features**

### 1. Playwright Automation

* Supports **parallel test execution**.
* Handles **multi-browser testing**.
* Includes **custom metrics reporting** via Prometheus.
* Provides human-like response timing simulation (configurable delays).

### 2. Metrics & Monitoring

* **Counters**: Total tests run, passed, failed, skipped, flaky tests.
* **Histogram**: Test execution durations.
* Metrics are **pushed to Prometheus Pushgateway**.
* **Grafana dashboards** automatically provisioned and ready for use.
* Industry-standard QA metrics for pass rate, failure trends, and test duration analysis.

### 3. Dockerized Setup

* Fully Dockerized for reproducibility.
* Services included:

  * Playwright container for running tests
  * Prometheus for scraping metrics
  * Pushgateway for receiving metrics
  * Grafana for dashboard visualization

### 4. CI/CD Integration

* Easily integrates with pipelines.
* Metrics and dashboards provide insights into test stability and performance.

---

## **Getting Started**

### **Prerequisites**

* Docker and Docker Compose installed.
* Node.js installed locally if you want to run tests outside Docker.

### **Running the Full Stack with Docker**

1. Clone the repository:

```bash
git clone https://github.com/MarwanSultan/playwright_ci_cd_pipeline.git
cd playwright_ci_cd_pipeline
```

2. Start all services with Docker Compose:

```bash
docker-compose up --build
```

* This will build the Playwright test container, start Prometheus, Pushgateway, and Grafana.
* Playwright tests will automatically execute in the container and push metrics to Prometheus.

3. Access dashboards:

* Grafana: [http://localhost:3000](http://localhost:3000) (admin/admin)
* Prometheus: [http://localhost:9090](http://localhost:9090)
* Pushgateway: [http://localhost:9091](http://localhost:9091)

4. Grafana dashboards will automatically load from `PlaywrightMetricsDashboard.json` with enhanced metrics.

### **Stopping the Stack**

```bash
docker-compose down
```

---

## **Metrics Dashboard**

The Grafana dashboard (`PlaywrightMetricsDashboard.json`) includes:

* Total tests run, passed, failed, skipped, flaky
* Pass rate % and failure trends
* Average test duration and duration histogram
* Browser/project/build breakdown
* Filters and dynamic variables for project, browser, and build

Dashboards are **automatically loaded** on Grafana startup via provisioning.

---

## **Custom Reporter**

* Located at `utils/reporters/metrics-reporter.ts`
* Exposes **Prometheus metrics** for Playwright tests:

  * `playwright_tests_run_total`
  * `playwright_tests_passed_total`
  * `playwright_tests_failed_total`
  * `playwright_tests_skipped_total`
  * `playwright_tests_flaky_total`
  * `playwright_test_duration_seconds`
* Metrics include labels: `project`, `browser`, `build`

---

## **Contributing**

Contributions are welcome! Please submit a pull request or open an issue for suggestions or bug fixes.

---

## **License**

This repository is licensed under the MIT License.

---

## **References**

* [Playwright Documentation](https://playwright.dev/)
* [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
* [Grafana Documentation](https://grafana.com/docs/)
