import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('renders App without crashing', () => {
  render(<App />);
});
