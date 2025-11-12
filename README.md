# Playwright CI/CD Pipeline

## 🧪 Project Overview  
This repository provides a robust end‑to‑end (E2E) test automation framework built with Playwright, integrated into a CI/CD workflow to support rapid, reliable, and maintainable test executions.  
It’s designed for automation engineers and QA teams looking to adopt modern automated UI testing with full pipeline support (build → test → report).

## 🚀 Why This Project  
- Enables **automated browser testing** across Chromium, Firefox, WebKit using Playwright.  
- Integrates a CI/CD flow that triggers tests on pushes / pull requests and publishes test reports.  
- Facilitates **parallel execution**, efficient feedback loops, and improved test reliability.  
- Supports maintainable test architecture, clear structure, and consistent framework usage.

## 📂 Repository Structure  
```
├─ /tests                   # Playwright test suites  
├─ playwright.config.ts     # Playwright configuration file  
├─ /pages                   # Page‑object models (POM) or reusable UI abstractions  
├─ /utils                   # Utility helpers (data, fixtures, custom commands)  
├─ .github/workflows/       # CI/CD workflow definitions (GitHub Actions)  
└─ README.md                # This file  
```

> Adjust paths as needed if your folder structure is slightly different.

## 🛠 Getting Started  
1. Clone the repository:  
   ```bash
   git clone https://github.com/MarwanSultan/playwright_ci_cd_pipeline.git
   cd playwright_ci_cd_pipeline
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Install required browsers for Playwright:  
   ```bash
   npx playwright install --with-deps
   ```  
4. Run tests locally:  
   ```bash
   npx playwright test
   ```  
   Or to run a specific project/profile:  
   ```bash
   npx playwright test --project=chromium
   ```

## 🧱 Playwright Configuration Highlights  
- Uses `playwright.config.ts` to define test runner behavior (e.g., browsers, timeouts, retries).  
- Base URL and environment variables are read from the CI/CD workflow or `.env` as needed.  
- Supports parallel shards and workers for improved execution speed.  
- Reports generated automatically (HTML, trace, screenshots) for test failures.

## 🔄 CI/CD Workflow  
The `.github/workflows` directory contains YAML files that define automated behavior such as:  
- Triggering on `push` and `pull_request` (against `main` or `develop` branches).  
- Installing dependencies, setting up Node & Playwright, running tests.  
- Uploading artifacts (test reports) and failing the build on test failures.  
- (Optional) Configuring environment variables, parallel matrix/shards execution.

## ✅ Usage & Best Practices  
- Write tests using the POM (Page Object Model) pattern in `/pages` for readability and maintainability.  
- Keep test cases independent and idempotent — one test should not rely on state from another.  
- Use environment variables or `.env` for configuration like `BASE_URL`, `ENV`, credentials.  
- Enable retries and conditional logic for flaky tests via `playwright.config.ts`.  
- Monitor test reports: failures should be reviewed and flaky tests should be fixed or quarantined.  
- Commit meaningful test changes and ensure pull requests trigger the CI pipeline.

## 📊 Test Reporting  
- HTML reports are generated (via Playwright’s built‑in reporter) and stored under `playwright-report/`.  
- Screenshots, videos, and trace viewers are available for failing tests to support root cause analysis.  
- CI artifacts allow download and review of test execution results from the pipeline.

## 🔧 Customization & Extensions  
You can adapt or extend this framework by:  
1. Adding custom reporters (e.g., Allure, JUnit) in `playwright.config.ts`.  
2. Expanding the CI pipeline to include deployment/staging validations, or integrating tools like Jenkins or GitLab CI.  
3. Parameterizing test runs (e.g., tags, browsers, shards) via workflow dispatch inputs.  
4. Incorporating API tests (Playwright supports both UI and API flows) alongside UI tests.  
5. Integrating with dashboards or test‑management tools for richer metrics.

## 🤝 Contributing  
Contributions are welcome! If you’d like to add new tests, page objects, or CI workflow enhancements:  
- Fork this repository.  
- Create a branch for your feature or fix.  
- Add tests or update docs as appropriate.  
- Submit a pull request describing the change and why it’s needed.

## 📄 License  
This project is provided under the terms of the [MIT License](LICENSE).

## ✉️ Contact  
For questions or feedback, please open an issue in the repository or contact the maintainer: Marwan Sultan.

---

*Thank you for using this Playwright CI/CD pipeline — may your tests run fast, reliably, and help you ship with confidence!*
