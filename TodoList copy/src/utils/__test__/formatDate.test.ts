import { expect, test } from 'vitest';
import { formatDate } from '../formatDate'; // 确保路径正确

test('formats date correctly', () => {
  const testDate = new Date('2023-02-23T14:00:00Z');
  const formattedDate = formatDate(testDate);
  expect(formattedDate).toBe('02/23/2023 14:00');
});

test('handles invalid date correctly', () => {
  const testDate = new Date('This is not a date');
  const formattedDate = formatDate(testDate);
  expect(formattedDate).toBe('Invalid Date');
});