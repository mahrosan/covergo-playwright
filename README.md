# Playwright QA Testing Framework

Automated end-to-end testing framework for CoverGo using Playwright.

## Prerequisites

- Node.js
- npm

## Installation

Clone the repository and install the dependencies:

```bash

# Change this section later
git clone git@github.com:mahrosan/covergo-playwright.git
cd covergo-playwright
npm install
npx playwright install
```

## Formatting

The project uses Prettier for code quality and consistent formatting:

```bash
# Format code with Prettier
npm run format
```

## Environment Setup

Copy the `.env.example` file to `.env` and update the environment variables:

```bash
cp .env.example .env
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode

```bash
npm run test:headed
```

## For Specific test and selected browser

```bash
npx playwright test tests\covergo\dashboardsurf.spec.ts --project=chromium --headed
```

## View the HTML report

```bash
npm run report
```

## Project Structure

```
covergo-playwright/
├── tests/                # All test files
│   └── covergo # Customer-specific tests and configurations
│       │── flows     # Named the pages as flows
│       │── *.spec.ts # Test specs
├── playwright.config.ts  # Playwright configuration
├── .env                  # Environment variables (not committed to git)
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```
