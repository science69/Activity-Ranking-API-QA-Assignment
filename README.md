# Activity-Ranking-API-QA-Assignment
Activity Ranking API – City-Based Weather Forecast Integration with Search Suggestions

Overview

This repo includes the QA documentation and a simple test setup for checking the Activity Ranking API. The API takes a city name and returns a ranking of activities (Skiing, Surfing, Outdoor Sightseeing, Indoor Sightseeing) for the upcoming week. It also covers testing the autocomplete suggestions that appear as a user types.

Contents

- `manual-test-script.md` — Manual test script with preconditions, steps, expected results, and edge cases.
- `bdd-scenarios.feature` — Gherkin scenarios describing feature behavior.
- `tests/` — Automation test harness built with Cucumber/TypeScript and a local mock server to simulate the API under test.
  - `tests/features` — feature files.
  - `tests/steps` — step definition implementations.
  - `tests/mock-server` — Local mock implementation of `/suggestions` and `/rankings` endpoints so tests can run without the real API.

How to run the mock server and tests

1. Run the mock server (in a separate terminal):
   - `cd tests/mock-server`
   - `npm install`
   - `npm start`
   This starts a mock server on `http://localhost:3000` that implements `GET /suggestions?q=...` and `GET /rankings?city=...`.

2. Run the automated tests:
   - `cd tests`
   - `npm install`
   - `npm test`

Notes
- The mock server returns deterministic responses to simplify assertions in the automated tests. It also simulates validation errors and not-found responses.
- If there is a real API to test, just update `BASE_URL` in `tests/steps/activity-ranking.steps.ts` to point to it and stop the mock server.

- How AI Assisted Me:

AI tools (such as ChatGPT and GitHub Copilot) were used to speed up certain parts of the process, but not to fully generate the final deliverables. I used AI mainly for:

Suggesting boilerplate code patterns for Cucumber step definitions and test setup.

Rewording and simplifying explanations in the README.

All test logic, validations, assertions, and scenario decisions were reviewed and adjusted manually to ensure they aligned realistically with the feature requirements and with typical QA best practices. AI suggestions were treated as drafts and not accepted without verification.

Omissions & Trade-offs (Example Answer)

Given the short timeframe for this task (2–3 hours), I had to make a few intentional trade-offs:

1. Limited API Mocking

I used simplified or static mocks instead of building a full dynamic mock of the Open-Meteo API.
A more complete setup would include:

Contract testing

Swagger/OpenAPI validation

Mock server with dynamic responses

These were omitted due to time constraints.

2. Partial Automation Coverage

Only the core scenarios defined in the BDD feature file were automated.
Additional scenarios that I would normally include, but did not due to time, include:

Load/performance behavior (e.g., 429 responses)

Fuzzy-matching for city names

The selected tests focus instead on functional correctness.

3. Reduced Data Validation Complexity

The weather-based ranking algorithm can get very complex, so I only validated:

Correct structure of the response

Correct ranking order based on simple mocked rules

A full solution might:

Validate all possible weather patterns

Test cross-comparison of multiple activities under varying conditions

This was out of scope for the time limit.

4. Simplified Test Harness

I intentionally avoided over-engineering the automation framework.
In a real project, I would structure it with:

Page object models (if UI existed)

API client utilities

Centralized fixtures

CI pipeline integration

For this exercise, I kept the setup minimal to keep focus on clarity and test design.
