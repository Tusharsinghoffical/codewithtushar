import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { ErrorBoundary } from '../components/ErrorBoundary';

describe('Routing & Error Boundary Smoke Tests', () => {
  it('should render the 404 NotFound page correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Return Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Work/i)).toBeInTheDocument();
  });

  it('should catch rendering errors and display recovery UI', () => {
    const ProblematicComponent = () => {
      throw new Error('Test crash event');
    };

    // Suppress console.error during expected throw
    const originalError = console.error;
    console.error = () => {};

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Reload Page/i)).toBeInTheDocument();

    console.error = originalError;
  });
});
