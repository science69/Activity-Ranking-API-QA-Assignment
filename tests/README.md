# Test Suite for Activity Ranking API

Setup
1. cd tests
2. npm install
3. Run the mock server in a separate terminal:
   - cd tests/mock-server
   - npm install
   - npm start

Run
- npm test

Notes
- Tests use a local mock server (`tests/mock-server`) to provide deterministic `/suggestions` and `/rankings` endpoints. If you want to test a real API, update `BASE_URL` in `tests/steps/activity-ranking.steps.ts` and stop the mock server.
- These are integration-style tests that assume an API endpoint `/rankings?city=...` that returns JSON shaped like:
  {
    "days": [
      { "date": "2025-01-01", "activities": { "Skiing": {"rank":7, "reasoning":"..."}, ... } },
      ... 7 items
    ]
  }
