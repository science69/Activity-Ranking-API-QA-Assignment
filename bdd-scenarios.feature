Feature: Activity Ranking by City with Autocomplete Suggestions
  As a user
  I want to enter a city or town name and receive a ranked list of activities for the next 7 days
  And see autocomplete suggestions as I type to help complete my query quickly

  Background:
    Given the suggestions data source is available

  Scenario: Happy path - valid city with suggestions
    When I type "Den" in the search box
    Then I should see suggestion "Denver" in the autocomplete list
    When I select "Denver" from the suggestions
    Then the system should fetch 7-day weather data for "Denver"
    And it should return a ranked list for each activity for the next 7 days
    And each returned item should include date, activity name, rank (1-10), and reasoning

  Scenario: Edge case - no suggestions returned
    When I type "XyzNoCity" in the search box
    Then I should see no suggestions
    When I press Enter to search for "XyzNoCity"
    Then the system should either return a helpful "City not found" error or attempt a best-effort lookup and return results

  Scenario: Error handling - invalid input or API failure
    When I type "@@@" in the search box
    And I attempt to search
    Then I should see a validation message indicating invalid input

    Given the weather API is down
    When I search for "Denver"
    Then I should see a user-friendly error message indicating the rankings cannot be fetched right now
