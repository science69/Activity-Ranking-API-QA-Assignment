Activity Ranking API – QA Assignment
City-Based Weather Forecast Integration with Search Suggestions

This project was completed as part of a QA Lead technical assessment. The objective was to design and implement a complete testing solution for the Activity Ranking API feature, which integrates weather-based activity recommendations and city search suggestions.

This repository includes:

✅ A manual test script

✅ BDD test criteria (Gherkin)

✅ Automated tests using CucumberJS

✅ A lightweight Express.js mock server simulating endpoint behavior

✅ Clear documentation, setup instructions, and structured test coverage

The focus of the solution is test clarity, coverage, and a realistic testing approach aligned with QA best practices.

📁 Project Structure
Activity-Ranking-API-QA-Assignment/
│
├── mock-server/             # Express.js mock API service
├── tests/
│    ├── features/           # Gherkin BDD feature files
│    ├── step-definitions/   # Step definitions for Cucumber
│    └── utils/              # Reusable helper functions
│
├── manual-test-script.md    # Manual test scenarios
├── README.md                # Project overview & setup
└── package.json

🧠 Feature Overview
Activity Ranking API

The system recommends ranked activities based on:

The selected city

Its 7-day weather forecast

Pre-defined activity rules (e.g., swimming, hiking, indoor activities)

City Search Suggestions

Users receive dynamic search suggestions as they type a city name.

These two components were tested through manual, BDD, and automated approaches.

🧪 Testing Approach
✔ 1. Manual Testing

All key user flows were covered in manual-test-script.md, including:

Searching for cities

Receiving suggested city results

Fetching ranked activity results

Validating weather-driven activity logic

Error handling (invalid city, no results, server issues)

The test script includes:

Preconditions

Test steps

Expected results

Test data

Negative / edge case scenarios

✔ 2. BDD Testing (Gherkin)

Gherkin feature files include scenarios such as:

Valid city suggestion retrieval

No suggestion results

Correct activity ranking logic based on weather

Error response handling

Boundary conditions for temperature, rainfall, and wind speed

Example snippet:

Scenario: Retrieve ranked activities for a valid city
  Given the city "Cape Town" exists
  When I request activity rankings for "Cape Town"
  Then I should receive a ranked list of activities
  And the rankings should follow weather-based rules

✔ 3. Automated Testing (CucumberJS)

The automated test suite uses:

CucumberJS for BDD

Node.js runtime

Axios / fetch for API calls

Reusable helper utilities

Express.js mock server to simulate API responses

What the automation covers:

Fetching city suggestions

Validating suggestion responses

Validating activity ranking logic

Weather-based decision rules

Negative & edge case responses

Schema validation (if applicable)

Why use a Mock Server?

The API for this assignment does not exist, so a lightweight Express mock server was created to:

Mimic real API behaviour

Enable deterministic test results

Allow controlled positive/negative scenarios

Support rapid iteration during the assessment timeframe

⚙️ Setup & Execution
👉 Install Dependencies
npm install

👉 Start the Mock Server
cd .\tests\mock-server; npm start

👉 Run Automated Tests
npm test

Test Output

Cucumber will generate a readable BDD-style console report.

🏗 Tech Stack
Area	Technology
Automation	CucumberJS (BDD)
Runtime	Node.js
Mock API	Express.js
Assertions	Built-in Cucumber / Chai (if applicable)
HTTP Client	Axios or fetch
Version Control	Git + GitHub
🔍 Key Design Decisions
✔ Use of CucumberJS

Chosen for its readability, stakeholder-friendly syntax, and strong behaviour-driven approach.

✔ Mock Server Instead of Live API

Provides:

Full control over responses

Reproducible test conditions

Ability to simulate failures

Faster development

No reliance on external API uptime

✔ Modular Step Definitions

Reusable steps improve scalability for future scenarios.

🛠 Trade-offs & Limitations

Due to the 2–3 hour time constraint, a few intentional trade-offs were made:

Limited number of automated tests (focused on core logic)

Mock server responses are static rather than dynamically generated

No CI integration (though easy to add)

No contract testing or performance tests

No full schema validation layer (optional future enhancement)

Despite time limits, the structure supports easy expansion.

🚀 Future Improvements (If Given More Time)

Add dynamic mock behaviour (based on city, weather variability, etc.)

Integrate with Jest or Playwright API for hybrid testing

Add JSON schema validation for all responses

Add CI/CD pipeline using GitHub Actions

Add reporting tools (Allure / HTML reports)

Expand BDD scenarios for edge cases and performance

Add contract tests using Pact

Integrate real weather APIs for end-to-end flows
