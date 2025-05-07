# Playwright QA Testing Framework

Automated end-to-end testing framework for CoverGo using Playwright.

## Prerequisites

- Node.js v18.20.7 (used for this project) or higher (Playwright requires Node.js 14+)
- npm

## Installation

Clone the repository and install the dependencies:

```bash

# Change this section later
git clone git@bitbucket.org:benekiva/playwright-qa-testing.git
cd playwright-qa-testing
npm install
npx playwright install
```

## Linting and Formatting

The project uses ESLint and Prettier for code quality and consistent formatting:

```bash
# Run ESLint to check for issues
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

## Environment Setup

Copy the `.env.example` file to `.env` and update the environment variables:

```bash
cp .env.example .env
```

Update the following variables in the `.env` file:

- `USAA_QA_URL`: Base URL for the USAA QA environment
- `USAA_USERNAME`: Login username for testing
- `USAA_PASSWORD`: Login password for testing

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests for a specific customer

```bash
npm run test:usaa
npm run test:lf
npm run test:wel
npm run test:hlc
```

### Run tests with UI

```bash
npm run test:ui
```

### Run tests in headed mode

```bash
npm run test:headed
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Generate code with Playwright Codegen

```bash
npm run test:codegen
```

### View the HTML report

```bash
npm run report
```

## Project Structure

```
playwright-qa-testing/
├── tests/                # All test files
│   └── customers/        # Customer-specific tests and configurations
│       ├── usaa/         # USAA-specific tests
│       │   ├── fixtures/ # USAA-specific fixtures
│       │   ├── config.ts # USAA-specific configuration
│       │   └── *.spec.ts # USAA-specific test files
│       ├── lf/           # Lincoln Financial tests
│       ├── wel/          # Wellington tests
│       └── hlc/          # HLC tests
├── playwright.config.ts  # Playwright configuration
├── .env                  # Environment variables (not committed to git)
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Adding New Customer

To add a new customer:

1. Create a new directory under `tests/customers/`
2. Copy the structure from an existing customer
3. Update the `config.ts` file with customer-specific settings
4. Create customer-specific fixtures if needed
5. Add a new script in `package.json`
