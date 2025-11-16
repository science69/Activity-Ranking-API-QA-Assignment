# Activity-Ranking-API-QA-Assignment
Activity Ranking API – City-Based Weather Forecast Integration with Search Suggestions

Overview

This repository contains QA artifacts and a small test harness to validate an Activity Ranking API that accepts a city name and returns ranked activities (Skiing, Surfing, Outdoor Sightseeing, Indoor Sightseeing) for the next 7 days. It also verifies autocomplete suggestions as the user types.

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
- If you have a real API to test, update `BASE_URL` in `tests/steps/activity-ranking.steps.ts` to point to it and stop the mock server.
