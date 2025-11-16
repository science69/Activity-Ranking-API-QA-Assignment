Manual Test Script: Activity Ranking API – City-Based Weather Forecast Integration

Preconditions:
- The API server is running and reachable at the configured base URL (e.g., http://localhost:3000).
- The city suggestions data source is available (predefined list or dynamic service).
- Tester has access to a modern browser or API client (Postman).

Test Data:
- Valid city with expected suggestions: `Denver`
- Valid city with no suggestions: `XyzNoCity`
- Invalid input: empty string, special chars `@@@`.

1) Happy path — suggestions appear and selecting one returns ranked activities
Preconditions:
- API server running
Steps:
1. Open the application UI or API client.
2. Type `Den` into the search box slowly (simulate user typing).
3. Observe autocomplete suggestions appear.
4. Select the suggestion `Denver` from the list.
5. Submit the search (or verify selection auto-submits).
Expected results:
- Suggestions list includes `Denver` while typing `Den`.
- After selecting `Denver`, the app sends a request to the activity ranking endpoint.
- The response is received and contains a ranked list for the next 7 days.
- Each day contains entries for activities (Skiing, Surfing, Outdoor Sightseeing, Indoor Sightseeing) with:
  - `date` in ISO format
  - `activity name`
  - `rank` between 1 and 10 (1 = worst, 10 = best)
  - `reasoning` string (e.g., "High snowfall expected")
Edge checks:
- Check at least one day where `Skiing` has a high rank if snow expected (seasonal/simulated).

2) Edge case — no suggestions returned
Preconditions:
- Suggestions data source does not contain `XyzNoCity`.
Steps:
1. Type `XyzNoCity` into the search box.
2. Observe suggestions list.
3. Try to select a suggestion or press Search.
Expected results:
- No suggestions are displayed.
- The UI shows an appropriate message such as "No suggestions found" or disables selection.
- If the user presses Search with the typed city, the API should still accept the typed city and return results if it can resolve weather data; otherwise show an informative error (e.g., "City not found").
Edge checks:
- Verify pressing Enter with no suggestion triggers behavior: either search is allowed (best-effort lookup) or an inline validation prevents submission.

3) Error handling — invalid input and API failure
Preconditions:
- Simulate API failure or rate limiting.
Steps:
1. Enter invalid input such as empty string or `@@@`.
2. Attempt to search or select suggestion.
3. Simulate the weather API (Open-Meteo) returning a 500 or network timeout.
Expected results:
- For invalid input: UI shows validation message "Please enter a valid city name" and prevents search.
- For API failure: UI shows a user-friendly error like "Unable to fetch rankings right now. Please try again later." and logs technical details to console/network inspector.
Edge checks:
- Slow API response: ensure the UI shows a loading indicator and does not block the main thread.
- Retry behavior: pressing Retry re-initiates the request.

4) Data validation checks
Steps:
1. For a returned dataset, verify each day's entries include all four activities.
2. Verify ranks are numeric and within the expected range (1-10).
3. Verify `reasoning` is non-empty and describes weather (e.g., mentions "snow", "rain", "clear", or a temperature in °C).
Expected results:
- Data format matches API contract and values are reasonable.

5) Security/Robustness checks
Steps:
1. Inject script characters into the search box (e.g., `<script>alert(1)</script>`) and submit.
Expected results:
- Inputs are sanitized; no script execution in the UI.
- API rejects malformed inputs with 400 and reason.

Notes for testers:
- Use network throttling to check slow response handling.
- Use mock servers to simulate different Open-Meteo responses (snow, rain, clear skies) to validate ranking logic.
