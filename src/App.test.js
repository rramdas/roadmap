import React from 'react';
import { render, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';  // or wherever your main component is


// Mock the Airtable function call in airtableUtils.js
jest.mock('./airtableUtils.js', () => ({
  updateAirtable: jest.fn(() => Promise.resolve({ success: true }))
}));

describe('Create a FeatureCard', () => {
  it('successfully creates a card', async () => {
    // Render your main component
    render(<App />);

    // Find the button to open the NewFeature modal and click it
    userEvent.click(screen.getByRole('button', {
      name: 'Add New Feature'
    }));

    // Wait for the modal to appear
    await screen.findByLabelText('Title:');

    // Fill out the form
    userEvent.type(screen.getByLabelText('Title:'), 'Test Feature');
    userEvent.type(screen.getByLabelText('Description:'), 'This is a test feature description.');

    // Submit the form
    userEvent.click(screen.getByText('Save'));

    // Wait for the asynchronous actions (like the Airtable API call)
    await waitFor(() => {
      expect(screen.getByText('Test Feature')).toBeInTheDocument();
    });
  });
});

describe('Drag and Drop FeatureCard', () => {
  it('checks if a card moved successfully', async () => {
    // Render your main component
    render(<App />);

    // Find the draggable card and the target column
    const card = screen.getByText('Your FeatureCard Text or Identifier');
    const targetColumn = screen.getByText('Target Column Header');

    // Simulate the drag-and-drop
    userEvent.dragToElement(card, targetColumn);

    // Wait for any asynchronous actions (like the Airtable API call)
    await waitFor(() => {
      expect(screen.getByText('Your FeatureCard Text or Identifier')).toBeInTheDocument();
    });

    // Check if the card is now inside the target column
    const movedCard = within(targetColumn).getByText('Your FeatureCard Text or Identifier');
    expect(movedCard).toBeInTheDocument();
  });
});
