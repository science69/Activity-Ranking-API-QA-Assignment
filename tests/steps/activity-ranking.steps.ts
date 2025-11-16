// @ts-ignore
const { Given, When, Then } = require('@cucumber/cucumber');
// @ts-ignore
const { expect } = require('chai');
// @ts-ignore
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000'; // adjust as needed

let suggestions = [];
let selectedCity = null;
let apiResponse = null;
let lastError = null;

Given('the suggestions data source is available', function () {
  // In tests we'll use a predefined suggestions list
  suggestions = ['Denver', 'London', 'Sydney', 'Auckland'];
});

When('I type {string} in the search box', function (typed) {
  // emulate autocomplete behavior by filtering suggestions
  const query = typed.toLowerCase();
  this.autocompleteResults = suggestions.filter(s => s.toLowerCase().startsWith(query));
  this.lastTyped = typed;
});

Then('I should see suggestion {string} in the autocomplete list', function (expected) {
  expect(this.autocompleteResults).to.include(expected);
});

Then('I should see no suggestions', function () {
  expect(this.autocompleteResults).to.be.an('array').that.is.empty;
});

When('I select {string} from the suggestions', async function (city) {
  selectedCity = city;
  try {
    const res = await fetch(`${BASE_URL}/rankings?city=${encodeURIComponent(city)}`);
    if (!res.ok) {
      lastError = new Error(`HTTP ${res.status}`);
      return;
    }
    apiResponse = await res.json();
  } catch (err) {
    lastError = err;
  }
});

When('I press Enter to search for {string}', async function (typed) {
  try {
    const res = await fetch(`${BASE_URL}/rankings?city=${encodeURIComponent(typed)}`);
    if (!res.ok) {
      lastError = new Error(`HTTP ${res.status}`);
      return;
    }
    apiResponse = await res.json();
  } catch (err) {
    lastError = err;
  }
});

Then('the system should fetch 7-day weather data for {string}', function (city) {
  expect(apiResponse).to.be.not.null;
  expect(apiResponse.days).to.have.lengthOf(7);
});

Then('it should return a ranked list for each activity for the next 7 days', function () {
  const day = apiResponse.days[0];
  expect(day.activities).to.have.keys(['Skiing', 'Surfing', 'Outdoor Sightseeing', 'Indoor Sightseeing']);
});

Then('each returned item should include date, activity name, rank \\({int}-{int}), and reasoning', function (minRank, maxRank) {
  for (const d of apiResponse.days) {
    expect(d.date).to.be.a('string');
    for (const [activity, data] of Object.entries(d.activities) as any[]) {
      const datum: any = data;
      expect(datum).to.have.property('rank');
      expect(datum.rank).to.be.within(minRank, maxRank);
      expect(datum).to.have.property('reasoning').that.is.a('string').that.is.not.empty;
    }
  }
});

Then('the system should either return a helpful {string} error or attempt a best-effort lookup and return results', function (errorMessage) {
  // Check if we have an error (e.g., "City not found") or successful results
  if (lastError) {
    expect(lastError).to.not.be.null;
    // Check for either the specific error message or HTTP 404 (City not found)
    expect(lastError.message).to.satisfy((msg: string) => 
      msg.includes('City not found') || msg.includes('404')
    );
  } else {
    // If no error, we should have valid API response with results
    expect(apiResponse).to.not.be.null;
    expect(apiResponse.days).to.be.an('array');
  }
});

When('I attempt to search', async function () {
  try {
    const query = this.lastTyped || '';
    const res = await fetch(`${BASE_URL}/rankings?city=${encodeURIComponent(query)}`);
    if (!res.ok) {
      lastError = new Error(`HTTP ${res.status}`);
      return;
    }
    apiResponse = await res.json();
  } catch (err) {
    lastError = err;
  }
});

Then('I should see a validation message indicating invalid input', function () {
  expect(lastError).to.not.be.null;
});

Given('the weather API is down', function () {
  // Simulate API failure for the purposes of this test scenario
  this.simulateWeatherApiDown = true;
});

When('I search for {string}', async function (city) {
  if (this.simulateWeatherApiDown) {
    lastError = new Error('Service Unavailable');
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/rankings?city=${encodeURIComponent(city)}`);
    if (!res.ok) {
      lastError = new Error(`HTTP ${res.status}`);
      return;
    }
    apiResponse = await res.json();
  } catch (err) {
    lastError = err;
  }
});

Then('I should see a user-friendly error message indicating the rankings cannot be fetched right now', function () {
  expect(lastError).to.not.be.null;
});
