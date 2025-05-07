# Playwright QA Testing Framework

Automated end-to-end testing framework for CoverGo using Playwright.

## Prerequisites

- Node.js v18.20.7 (used for this project) or higher (Playwright requires Node.js 14+)
- npm

## Installation

Clone the repository and install the dependencies:

```bash

# Change this section later
git clone git@github.com:mahrosan/covergo-playwright.git
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


### Run tests in headed mode

```bash
npx playwright test tests\covergo\dashboardsurf.spec.ts --project=chromium --headed

### For Parallel testing
npx playwright test tests\covergo\dashboardsurf.spec.ts --headed 
### View the HTML report

```bash
npx playwright show-report
```

## Project Structure

```
playwright-qa-testing/
├── tests/                # All test files
│   └── customers/covergo/        # Customer-specific tests and configurations
│       ├── usaa/         # USAA-specific tests
│       │   ├── fixtures/ # USAA-specific fixtures
│       │   └── *.spec.ts # USAA-specific test files
├── playwright.config.ts  # Playwright configuration
├── .env                  # Environment variables (not committed to git)
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Adding New Customer

To add a new customer:

1. Create a new directory under `tests/customers/`
2. Copy the structure from an existing Covergo
3. Update the `config.ts` file with customer-specific settings
4. Create customer-specific fixtures if needed
5. Add a new script in `package.json`
