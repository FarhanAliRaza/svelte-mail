import { beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/svelte';

// Automatically cleanup DOM after each test
afterEach(() => {
  cleanup();
});

