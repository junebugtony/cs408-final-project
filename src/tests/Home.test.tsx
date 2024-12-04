// src/tests/Home.test.tsx
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // This adds the matchers globally
import HomePage from "../app/page"; // Adjust the import based on your file structure
import React from 'react';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks(); // Reset fetch mocks before each test
});

test("renders the page with header and search input", async () => {
  // Mock the fetch response
  fetchMock.mockResponseOnce(
    JSON.stringify({ songs: [] }) // Replace this with the data your app expects
  );

  render(<HomePage />);

  // Check if the header is displayed
  expect(screen.getByText(/View and Manage your Library/i)).toBeInTheDocument();
  // Check for the presence of search input
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
